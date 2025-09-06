// Arquivo: src/app/pcode/ui/detail/BaseDetailPage.ts (VERSÃO CORRIGIDA)
import { Directive, inject, OnInit, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IServiceBase } from '../../api/IServiceBase';
import { KeyInput } from '../../api/key.util';
import { ToastService } from '../../toast/toast.service';
import { switchMap, of } from 'rxjs';

@Directive()
export abstract class BaseDetailPage<
  TItem extends Record<string, any>,
  TFilter extends object,
  TKey extends KeyInput
> implements OnInit {

  // --- Propriedades de Dependência ---
  // Agora são declaradas aqui, mas inicializadas no construtor.
  protected readonly router: Router;
  protected readonly route: ActivatedRoute;
  protected readonly fb: FormBuilder;
  protected readonly toast: ToastService;

  // --- Sinais de Estado ---
  public readonly loading = signal(false);
  public readonly error = signal<string | null>(null);
  public readonly id = signal<TKey | null>(null);
  public readonly mode = signal<'create' | 'view' | 'edit'>('create');
  public readonly item = signal<TItem | null>(null);

  // --- Sinais Computados ---
  public readonly isViewMode = computed(() => this.mode() === 'view');
  public readonly isCreateMode = computed(() => this.mode() === 'create');

  // --- Formulário Reativo ---
  public form!: FormGroup;

  // --- CONSTRUTOR ---
  // A injeção de dependência agora acontece aqui.
  constructor() {
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.fb = inject(FormBuilder);
    this.toast = inject(ToastService);
  }

  // --- Métodos Abstratos (sem alterações) ---
  protected abstract obterServico(): IServiceBase<TItem, TFilter, TKey>;
  protected abstract construirFormulario(): FormGroup;
  protected abstract obterRotaBase(): string;

  // --- Hooks e Lógica Principal (sem alterações) ---
  protected prepararPayload(payload: any): Partial<TItem> {
    return payload;
  }

  protected aposCarregarDados(data: TItem): void {
    // Implementação opcional na classe filha
  }

  ngOnInit(): void {
    this.form = this.construirFormulario(); // Agora this.fb está garantidamente disponível

    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        const urlSegments = this.route.snapshot.url;
        const isView = urlSegments.some(seg => seg.path === 'view');

        if (idParam && idParam !== 'novo') {
          // Converte o ID baseado no tipo esperado (assumindo number por padrão)
          const numericId = (isNaN(Number(idParam)) ? idParam : Number(idParam)) as TKey;
          this.id.set(numericId);
          this.mode.set(isView ? 'view' : 'edit');
          this.loading.set(true);
          return this.obterServico().get<TItem>(numericId);
        } else {
          this.mode.set('create');
          return of(null);
        }
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.item.set(data);
          this.form.patchValue(data as any);
          this.aposCarregarDados(data);
          if (this.isViewMode()) {
            this.form.disable();
          }
        }
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(`Erro ao carregar dados: ${err.message}`);
        this.toast.danger('Falha ao carregar o registro.', { title: 'Erro' });
        this.loading.set(false);
      }
    });
  }

  save(): void {
    this.saveAndNavigate('list');
  }

  saveAndContinue(): void {
    this.saveAndNavigate('edit');
  }

  private saveAndNavigate(navigateTo: 'list' | 'edit'): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.warning('Existem campos inválidos. Por favor, verifique.', { title: 'Atenção' });
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const formValue = this.form.getRawValue();
    const payload = this.prepararPayload(formValue);
    const currentId = this.id();

    const saveOperation = this.isCreateMode()
      ? this.obterServico().create(payload)
      : this.obterServico().update(currentId!, payload);

    saveOperation.subscribe({
      next: (savedItem: any) => {
        this.toast.success('Registro salvo com sucesso!', { title: 'Sucesso' });
        
        if (navigateTo === 'list') {
          this.router.navigate([this.obterRotaBase()]);
        } else {
          // Para "Salvar e Continuar"
          if (this.isCreateMode()) {
            // Se estava criando, navega para edição do item recém-criado
            const newId = savedItem?.id || savedItem;
            this.router.navigate([this.obterRotaBase(), newId, 'edit']);
          } else {
            // Se já estava editando, apenas recarrega os dados
            this.recarregarDados();
          }
        }
      },
      error: (err: HttpErrorResponse) => {
        const message = err.message || 'Ocorreu um erro desconhecido.';
        this.error.set(`Erro ao salvar: ${message}`);
        this.toast.danger(`Falha ao salvar: ${message}`, { title: 'Erro' });
        this.loading.set(false);
      }
    });
  }

  private recarregarDados(): void {
    const currentId = this.id();
    if (currentId) {
      this.loading.set(true);
      this.obterServico().get<TItem>(currentId).subscribe({
        next: (data) => {
          this.item.set(data);
          this.form.patchValue(data as any);
          this.aposCarregarDados(data);
          this.loading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.error.set(`Erro ao recarregar dados: ${err.message}`);
          this.loading.set(false);
        }
      });
    }
  }
  
  goBack(): void {
    this.router.navigate([this.obterRotaBase()]);
  }

  switchToEditMode(): void {
    const currentId = this.id();
    if (currentId && this.isViewMode()) {
      this.router.navigate([this.obterRotaBase(), currentId, 'edit']);
    }
  }
}