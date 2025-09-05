// src/app/features/configuracoes/tipocategoria/crud/search/list/tipocategoria-list.page.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TipocategoriaFilterPage, TipocategoriaFilterValue } from '../filter/tipocategoria-filter.page';
import { TipoCategoria, TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
 
@Component({
  standalone: true,
  selector: 'app-tipocategoria-list',
  imports: [CommonModule, RouterModule, TipocategoriaFilterPage],
  templateUrl: './tipocategoria-list.page.html'
})
export class TipocategoriaListPage implements OnInit {
  // DI moderna
  private readonly service = inject(TipoCategoriaService);
  private readonly router = inject(Router);

  // Signals que seu template chama como funções: loading(), error(), rows(), query(), maxPage(), showingRange()
  loading = signal(false);
  error = signal<string | null>(null);
  rows = signal<TipoCategoria[]>([]);
  total = signal(0);

  // Estado de paginação + filtros genéricos (JSON)
  query = signal<{ page: number; pageSize: number; filters: TipocategoriaFilterValue }>({
    page: 1,
    pageSize: 10,
    filters: { descricao: '', status_delecao: '' }
  });

  // Para [value]="filterValue()" no template
  filterValue = computed(() => this.query().filters);

  maxPage = computed(() => {
    const t = this.total();
    const ps = this.query().pageSize || 1;
    return Math.max(1, Math.ceil(t / ps));
  });

  showingRange = computed(() => {
    const q = this.query();
    const start = (q.page - 1) * q.pageSize + 1;
    const end = Math.min(q.page * q.pageSize, this.total());
    return this.total() ? `Mostrando ${start}–${end} de ${this.total()}` : '';
  });

  ngOnInit(): void { this.load(); }

  // Handlers que seu template chama
  goNew() { this.router.navigate(['/configuracoes/tipocategoria', 'novo']); }
  view(r: TipoCategoria) { this.router.navigate(['/configuracoes/tipocategoria', r.id, 'view']); }
  edit(r: TipoCategoria) { this.router.navigate(['/configuracoes/tipocategoria', r.id, 'edit']); }

  remove(r: TipoCategoria) {
    if (!confirm(`Excluir "${r.descricao}"?`)) return;
    this.loading.set(true);
    this.service.delete(r.id).subscribe({
      next: () => this.load(),
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(err.message || 'Erro ao excluir.');
      }
    });
  }

  prevPage() {
    const q = this.query();
    if (q.page <= 1) return;
    this.query.set({ ...q, page: q.page - 1 });
    this.load();
  }

  nextPage() {
    const q = this.query();
    if (q.page >= this.maxPage()) return;
    this.query.set({ ...q, page: q.page + 1 });
    this.load();
  }

  onApplyFilter(v: TipocategoriaFilterValue) {
    const q = this.query();
    this.query.set({ ...q, page: 1, filters: v });
    this.load();
  }

  onClearFilter() {
    const q = this.query();
    this.query.set({ ...q, page: 1, filters: { descricao: '', status_delecao: '' } });
    this.load();
  }

  private load() {
    this.loading.set(true);
    this.error.set(null);
    const q = this.query();

    this.service
      .list<TipoCategoria, TipocategoriaFilterValue>(
        { page: q.page, pageSize: q.pageSize, filters: q.filters },
        {
          // aliases/serialize opcionais por legado:
          // aliases: { status: (v) => v ? { status_delecao: v === 'A' ? 0 : 1 } : null }
        }
      )
      .subscribe({
        next: (res: { data: TipoCategoria[]; total?: number }) => {
          this.rows.set(res.data ?? []);
          this.total.set(res.total ?? (res.data?.length ?? 0));
          this.loading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.loading.set(false);
          this.error.set(err.message || 'Erro ao carregar.');
        }
      });
  }
}
