import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CRUD_STRATEGY } from './crud-strategy.token';
import { CrudStrategy, ListQuery, ListResult } from './crud-strategy';

// Seu BaseService<T> já existe; tipamos por generics aqui
export abstract class AbstractService<T> {
  abstract list(query?: ListQuery): import('rxjs').Observable<ListResult<T>>;
}

@Component({
  selector: 'app-list-base',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: '' // a classe é só lógica; o template fica nos filhos
})
export class ListBasePage<T> implements OnInit {
  protected fb = inject(FormBuilder);
  protected destroyRef = inject(DestroyRef);

  strategy = inject(CRUD_STRATEGY) as CrudStrategy<T>;

  // Estado
  loading = signal(false);
  items = signal<T[]>([]);
  total = signal(0);

  // Filtro e paginação
  filterForm = this.strategy.buildFilterForm(this.fb);
  page = signal(this.strategy.defaultQuery().page ?? 1);
  pageSize = signal(this.strategy.defaultQuery().pageSize ?? 10);

  // Exposição para template do filho
  vm = computed(() => ({
    columns: this.strategy.columns(),
    items: this.items(),
    total: this.total(),
    page: this.page(),
    pageSize: this.pageSize(),
    loading: this.loading(),
    filter: this.filterForm,
  }));

  constructor(protected service: AbstractService<T>) {}

  ngOnInit(): void {
    // Restaura filtro (simples) se houver stateKey
    const sk = this.strategy.stateKey;
    if (sk) {
      const raw = localStorage.getItem('crud-state:' + sk);
      if (raw) {
        try { this.filterForm.patchValue(JSON.parse(raw)); } catch {}
      }
      // Observa mudanças no filtro para persistir
      this.filterForm.valueChanges.pipe().subscribe(v => {
        localStorage.setItem('crud-state:' + sk, JSON.stringify(v));
      });
    }

    // Reage às mudanças (filtro/página)
    const sub = this.filterForm.valueChanges
      .pipe(debounceTime(250))
      .subscribe(() => this.reload());
    // inicial
    this.reload();

    // limpa
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  setPage(p: number) { this.page.set(p); this.reload(); }
  setPageSize(z: number) { this.pageSize.set(z); this.reload(); }

  reload() {
    const q: ListQuery = {
      ...(this.strategy.defaultQuery()),
      ...this.filterForm.getRawValue(),
      page: this.page(),
      pageSize: this.pageSize(),
    };
    this.loading.set(true);
    this.service.list(q).subscribe({
      next: (res) => {
        this.items.set(res.data);
        this.total.set(res.total ?? res.data.length);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}