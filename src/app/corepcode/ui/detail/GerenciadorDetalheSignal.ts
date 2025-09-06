// Arquivo: src/app/pcode/ui/detail/GerenciadorDetalheSignal.ts
import { signal, computed } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IServiceBase } from '@pcode/api/IServiceBase';
import { KeyInput } from '@pcode/api';
import { ToastService } from '@pcode/toast/toast.service';
import { switchMap, of, firstValueFrom } from 'rxjs';
import { IGerenciadorDetalhe } from './IGerenciadorDetalhe';

export class GerenciadorDetalheSignal<
  TItem,
  TFilter extends object,
  TKey extends KeyInput
> implements IGerenciadorDetalhe<TItem, TKey> {

  // Sinais de Estado
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly item = signal<TItem | null>(null);
  readonly id = signal<TKey | null>(null);
  readonly mode = signal<'create' | 'view' | 'edit'>('create');
  readonly isViewMode = computed(() => this.mode() === 'view');

  constructor(
    public readonly form: FormGroup, // Recebe o formulário já construído
    private readonly service: IServiceBase<TItem, TFilter, TKey>,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: ToastService,
    private readonly rotaBase: string,
    private readonly prepararPayload: (p: TItem) => Partial<TItem> = p => p
  ) {}

  loadFromRoute(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        // ... (toda a lógica de parsing da rota que estava no ngOnInit da BaseDetailPage)
        const idParam = params.get('id');
        if (idParam && idParam !== 'novo') {
            const numericId = Number(idParam) as TKey;
            this.id.set(numericId);
            this.mode.set(this.route.snapshot.url.some(s => s.path === 'view') ? 'view' : 'edit');
            this.loading.set(true);
            return this.service.get<TItem>(numericId);
        }
        this.mode.set('create');
        return of(null);
      })
    ).subscribe({
        next: (data) => {
            if (data) {
                this.item.set(data);
                this.form.patchValue(data);
                if (this.isViewMode()) this.form.disable();
            }
            this.loading.set(false);
        },
        error: (err: HttpErrorResponse) => {
            this.error.set(`Erro ao carregar: ${err.message}`);
            this.loading.set(false);
        }
    });
  }

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Verifique os campos inválidos.');
      return Promise.reject('Formulário inválido');
    }

    this.loading.set(true);
    this.error.set(null);

    const formValue = this.form.getRawValue();
    const payload = this.prepararPayload(formValue);

    const saveOperation = this.mode() === 'create'
      ? this.service.create(payload)
      : this.service.update(this.id()!, payload);

    try {
      await firstValueFrom(saveOperation);
      this.toast.success('Registro salvo com sucesso!');
      this.router.navigate([this.rotaBase]);
    } catch (err: any) {
      this.error.set(`Erro ao salvar: ${err.message}`);
      this.toast.danger('Falha ao salvar o registro.');
      this.loading.set(false);
      throw err;
    }
  }
}