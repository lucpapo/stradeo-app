import { Directive, inject, OnInit, signal, computed, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, of } from 'rxjs';
import { StateRef } from '@pcode/store/state-ref';
import { LOCAL_STORAGE_KEY, StateProvider } from '@pcode/store/state-provider';
import { ToastService } from '../../toast/toast.service';
import { DetailStrategy } from './detail-strategy.interface';
import { AuditData } from '@pcodeshared/components/audit';

export interface DetailState<TEntity> {
  entity: TEntity | null;
  mode: 'create' | 'view' | 'edit';
  loading: boolean;
  error: string | null;
}

/**
 * Classe base abstrata para componentes de detalhes
 * Contém toda a lógica comum de gerenciamento de formulário, estado e navegação
 */
@Directive()
export abstract class BaseDetailPage<TEntity extends Record<string, any>, TKey> implements OnInit, OnDestroy {

 /**
   * Se 'true', o estado deste componente no StateProvider será
   * destruído quando o componente for fechado/destruído.
   * Padrão: false (mantém o estado).
   */
  @Input() destroyStateOnClose = true;


  // Dependências
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly fb = inject(FormBuilder);
  protected readonly toast = inject(ToastService);
  protected readonly stateProvider = inject(StateProvider);

  // Sinais de Estado
  public readonly loading = signal(false);
  public readonly error = signal<string | null>(null);
  public readonly id = signal<TKey | null>(null);
  public readonly mode = signal<'create' | 'view' | 'edit'>('create');
  public readonly entity = signal<TEntity | null>(null);

  // Sinais Computados
  public readonly isViewMode = computed(() => this.mode() === 'view');
  public readonly isCreateMode = computed(() => this.mode() === 'create');
  public readonly isEditMode = computed(() => this.mode() === 'edit');

  // Formulário Reativo
  public form!: FormGroup;

  // StateRef para persistir estado
  protected detailStateRef!: StateRef<DetailState<TEntity>>;

  constructor() { }

  ngOnInit(): void {
    this.initializeStateRef();
    this.initializeFromRoute();
  }

  ngOnDestroy(): void {
    if (this.destroyStateOnClose && this.detailStateRef) {
      this.detailStateRef.remove();
    }
  }


   // ====================================================================
  // ADICIONAR ESTA LINHA: Injetamos a chave do shell atual
  // ====================================================================
  protected readonly shellKey = inject(LOCAL_STORAGE_KEY);

  /**
   * Inicializa o StateRef específico para esta entidade
   */
  private initializeStateRef(): void {
    const strategy = this.getStrategy();
    const stateKeys = strategy.getStateKeys();

    // ====================================================================
    // MUDAR ESTA LINHA: Usamos a chave injetada
    // ====================================================================
    this.detailStateRef = new StateRef<DetailState<TEntity>>(
      this.stateProvider,
      // ANTES: stateKeys.shellKey (vinha da strategy, que tinha que 'adivinhar')
      this.shellKey, // AGORA: Usa a chave fornecida pelo shell correto via DI
      stateKeys.detailKey
    );
  }

  /**
   * Inicializa o componente baseado na rota
   */
  private initializeFromRoute(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        const urlSegments = this.route.snapshot.url;
        const strategy = this.getStrategy();

        // Determina o modo usando a strategy
        const detectedMode = strategy.determineModeFromUrl
          ? strategy.determineModeFromUrl(urlSegments, idParam)
          : this.defaultDetermineModeFromUrl(urlSegments, idParam);

        this.mode.set(detectedMode);

        if (idParam && idParam !== 'novo') {
          // Converte o ID baseado no tipo esperado
          const convertedId = this.convertId(idParam);
          this.id.set(convertedId);
          this.loading.set(true);
          return strategy.loadEntity(convertedId);
        } else {
          return of(null);
        }
      })
    ).subscribe({
      next: (data) => {
        this.handleLoadedData(data);
      },
      error: (err: HttpErrorResponse) => {
        this.handleLoadError(err);
      }
    });
  }

  /**
   * Lida com os dados carregados
   */
  private handleLoadedData(data: TEntity | null): void {
    if (data) {
      const strategy = this.getStrategy();

      // Processa os dados usando a strategy
      const processedData = strategy.processLoadedData
        ? strategy.processLoadedData(data)
        : data;

      this.entity.set(processedData);
      this.createFormWithData(processedData);

      if (this.isViewMode()) {
        this.form.disable();
      }
    } else {
      this.createFormWithData(null);
    }

    this.loading.set(false);
    this.saveCurrentState();
  }

  /**
   * Lida com erros de carregamento
   */
  private handleLoadError(err: HttpErrorResponse): void {
    this.error.set(`Erro ao carregar dados: ${err.message}`);
    this.toast.danger('Falha ao carregar o registro.', { title: 'Erro' });
    this.loading.set(false);
  }

  /**
   * Cria o formulário com os dados fornecidos
   */
  private createFormWithData(data: TEntity | null): void {
    const strategy = this.getStrategy();
    const formControls = strategy.createFormControls(data || undefined);
    this.form = this.fb.group(formControls);

    if (data) {
      this.form.patchValue(data as any);
    }
  }

  /**
   * Converte o ID da string para o tipo apropriado
   */
  private convertId(idParam: string): TKey {
    // Assumindo number por padrão, pode ser sobrescrito se necessário
    return (isNaN(Number(idParam)) ? idParam : Number(idParam)) as TKey;
  }

  /**
   * Implementação padrão para determinar modo da URL
   */
  private defaultDetermineModeFromUrl(urlSegments: any[], idParam: string | null): 'create' | 'view' | 'edit' {
    const isView = urlSegments.some(seg => seg.path === 'view');

    if (idParam && idParam !== 'novo') {
      return isView ? 'view' : 'edit';
    } else {
      return 'create';
    }
  }

  /**
   * Salva o estado atual
   */
  private saveCurrentState(): void {
    const currentState: DetailState<TEntity> = {
      entity: this.entity(),
      mode: this.mode(),
      loading: this.loading(),
      error: this.error()
    };

    console.log('💾 Salvando estado do detalhe:', currentState);
    this.detailStateRef.set(currentState);
  }

  /**
   * Salva o registro
   */
  save(): void {
    this.saveAndNavigate('list');
  }

  /**
   * Salva e continua editando
   */
  saveAndContinue(): void {
    this.saveAndNavigate('edit');
  }

  /**
   * Lógica principal de salvamento
   */
  private saveAndNavigate(navigateTo: 'list' | 'edit'): void {
    const strategy = this.getStrategy();

    // Validação usando strategy se disponível
    const isValid = strategy.validateForm
      ? strategy.validateForm(this.form)
      : this.form.valid;

    if (!isValid) {
      this.form.markAllAsTouched();
      this.toast.warning('Existem campos inválidos. Por favor, verifique.', { title: 'Atenção' });
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const formValue = this.form.getRawValue();

    // Prepara payload usando strategy
    const payload = strategy.preparePayload
      ? strategy.preparePayload(formValue)
      : formValue;

    const currentId = this.id();

    const saveOperation = this.isCreateMode()
      ? strategy.createEntity(payload)
      : strategy.updateEntity(currentId!, payload);

    saveOperation.subscribe({
      next: (savedEntity: TEntity) => {
        this.handleSaveSuccess(savedEntity, navigateTo);
      },
      error: (err: HttpErrorResponse) => {
        this.handleSaveError(err);
      }
    });
  }

  /**
   * Lida com sucesso no salvamento
   */
  private handleSaveSuccess(savedEntity: TEntity, navigateTo: 'list' | 'edit'): void {
    const strategy = this.getStrategy();

    // Só mostra o toast padrão se a strategy não desabilitar
    const showDefaultToast = (strategy as any).showDefaultSuccessToast !== false;
    if (showDefaultToast) {
      this.toast.success('Registro salvo com sucesso!', { title: 'Sucesso' });
    }

    // Chama hook pós-salvamento se disponível
    if (strategy.afterSave) {
      strategy.afterSave(savedEntity, this.isCreateMode() ? 'create' : 'edit');
    }

    if (navigateTo === 'list') {
      strategy.navigateToList();
    } else {
      // Para "Salvar e Continuar"
      if (this.isCreateMode()) {
        // Se estava criando, navega para edição do item recém-criado
        const newId = (savedEntity as any)?.id || savedEntity;
        strategy.navigateToEdit(newId);
      } else {
        // Se já estava editando, apenas recarrega os dados
        this.reloadData();
      }
    }
  }

  /**
   * Lida com erro no salvamento
   */
  private handleSaveError(err: HttpErrorResponse): void {
    const message = err.message || 'Ocorreu um erro desconhecido.';
    this.error.set(`Erro ao salvar: ${message}`);
    this.toast.danger(`Falha ao salvar: ${message}`, { title: 'Erro' });
    this.loading.set(false);
  }

  /**
   * Recarrega os dados
   */
  private reloadData(): void {
    const currentId = this.id();
    if (currentId) {
      this.loading.set(true);
      const strategy = this.getStrategy();

      strategy.loadEntity(currentId).subscribe({
        next: (data) => {
          this.handleLoadedData(data);
        },
        error: (err: HttpErrorResponse) => {
          this.handleLoadError(err);
        }
      });
    }
  }

  /**
   * Volta para a lista
   */
  goBack(): void {
    const strategy = this.getStrategy();
    strategy.navigateToList();
  }

  /**
   * Muda para modo de edição
   */
  switchToEditMode(): void {
    const currentId = this.id();
    if (currentId && this.isViewMode()) {
      const strategy = this.getStrategy();
      strategy.navigateToEdit(currentId);
    }
  }

public getAuditData(): AuditData {
    if (!this.form) {
      return {
        dataCadastro: undefined,
        usuarioCadastro: undefined,
        dataAtualizacao: undefined,
        usuarioAtualizacao: undefined
      };
    }

    try {
      return {
        dataCadastro: this.form.get('data_cadastro')?.value || undefined,
        usuarioCadastro: this.form.get('usuario_cadastro')?.value || undefined,
        dataAtualizacao: this.form.get('data_atualizacao')?.value || undefined,
        usuarioAtualizacao: this.form.get('usuario_atualizacao')?.value || undefined
      };
    } catch (error) {
      console.warn('Erro ao acessar auditData:', error);
      return {
        dataCadastro: undefined,
        usuarioCadastro: undefined,
        dataAtualizacao: undefined,
        usuarioAtualizacao: undefined
      };
    }
  }



  /**
   * Método abstrato que deve ser implementado pelas classes filhas
   * Retorna a estratégia específica para esta entidade
   */
  protected abstract getStrategy(): DetailStrategy<TEntity, TKey>;
}