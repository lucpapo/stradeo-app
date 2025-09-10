import { EventEmitter, Input, OnChanges, OnInit, Output, inject, Directive, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { FilterStrategy } from './filter-strategy.interface';
import { FilterState } from '@pcode/ui/base-list';

/**
 * Classe base abstrata para componentes de filtro
 * Contém toda a lógica comum de gerenciamento de formulário, estado e validação
 */
@Directive()
export abstract class BaseFilterPage<T extends Record<string, any>> implements OnInit, OnDestroy, OnChanges {

  /**
    * Se 'true', o estado deste componente no StateProvider será
    * destruído quando o componente for fechado/destruído.
    * Padrão: false (mantém o estado).
    */
  @Input() destroyStateOnClose = false;

  protected readonly fb = inject(FormBuilder);
  protected readonly stateProvider = inject(StateProvider);

  @Input() value!: T;
  @Output() apply = new EventEmitter<T>();
  @Output() clear = new EventEmitter<void>();

  form!: FormGroup;
  fieldLabels: { [key: string]: string } = {};

  // StateRef específico para os filtros - agora usa FilterState
  protected filterStateRef!: StateRef<FilterState<T>>;

  constructor() { }

  ngOnInit(): void {
    this.initializeStateRef();
    this.fieldLabels = this.getStrategy().getFieldLabels();
    this.createForm();
    this.loadSavedFilters();
  }

  ngOnDestroy(): void {
    if (this.destroyStateOnClose && this.filterStateRef) {
      this.filterStateRef.remove();
    }
  }

  /**
   * Inicializa o StateRef específico para esta entidade
   * Deve ser implementado por cada componente filho
   */
  protected abstract initializeStateRef(): void;

  /**
   * Retorna a estratégia específica para esta entidade
   * Implementação genérica que cria a strategy automaticamente
   * Requer que a filter page tenha uma propriedade 'strategy'
   */
  protected getStrategy(): FilterStrategy<T> {
    const filterPage = this as any;
    return filterPage.strategy;
  }

  /**
   * Cria o formulário com dados do StateProvider ou valores iniciais
   */
  private createForm(): void {
    const strategy = this.getStrategy();

    // Busca dados salvos no StateProvider
    let savedFilterState = this.filterStateRef.get();

    // Se não há estado salvo, cria um estado inicial
    if (!savedFilterState) {
      const initialValue = strategy.getInitialValue();
      savedFilterState = {
        data: initialValue,
        valid: strategy.hasValidSearchData(initialValue)
      };
      console.log('🆕 Criando estado inicial no StateProvider:', savedFilterState);
      this.filterStateRef.set(savedFilterState);
    }

    console.log('🏗️ Criando formulário com dados:', {
      savedFilterState,
      hasStateData: !!savedFilterState,
      initialValue: strategy.getInitialValue()
    });

    // Cria o formulário usando a estratégia com os dados do estado
    const formControls = strategy.createFormControls(savedFilterState.data);
    this.form = this.fb.group(formControls);

    // Marca todos os campos como touched para mostrar validações iniciais
    this.form.markAllAsTouched();
  }

  /**
   * Carrega os filtros salvos do estado ou usa valores iniciais
   */
  private loadSavedFilters(): void {
    const savedFilterState = this.filterStateRef.get();
    const strategy = this.getStrategy();

    if (savedFilterState) {
      console.log('🔄 Filtros já carregados no createForm do estado:', savedFilterState);
    } else if (this.value && !strategy.isInitialValue(this.value)) {
      console.log('📝 Atualizando com filtros do @Input:', this.value);
      this.form.patchValue(this.value as { [key: string]: any });
    } else {
      console.log('🆕 Formulário criado com valores iniciais padrão');
    }

    // Garante que as validações sejam aplicadas após carregar os dados
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
  }

  /**
   * Atualiza o formulário com os valores recebidos via @Input
   */
  private updateFormWithValue(): void {
    if (this.value) {
      this.form.patchValue(this.value as { [key: string]: any });
    }
  }

  /**
   * Detecta mudanças no @Input value
   */
  ngOnChanges(): void {
    if (this.form) {
      this.updateFormWithValue();
    }
  }

  /**
   * Aplica o filtro
   */
  onApply(): void {
    this.form.markAllAsTouched();
    const strategy = this.getStrategy();
    const isFormValid = strategy.validateForm ? strategy.validateForm(this.form) : this.form.valid;

    if (isFormValid) {
      let filterValue: T = this.form.getRawValue();

      if (strategy.transformData) {
        filterValue = strategy.transformData(filterValue);
      }

      // Agora ele apenas salva e emite o que veio do formulário
      const hasValidSearchData = strategy.hasValidSearchData(filterValue);
      console.log('✅ Filtro (sem enriquecimento) válido - Aplicando:', { filterValue, hasValidSearchData });

      this.saveFiltersWithState(filterValue, hasValidSearchData);
      this.apply.emit(filterValue); // Emite o payload simples
    } else {
      console.log('❌ Filtro inválido - Não aplicando:', this.form.errors);

      // Salva o estado como inválido
      this.saveFiltersWithState(this.form.value, false);

      // Não emite o evento se o formulário for inválido
    }
  }

  // ====================================================================
  // ADICIONAR ESTE NOVO MÉTODO PRIVADO
  // ====================================================================
  /**
   * Enriquece o payload do filtro com o estado global da concessionária.
   * Este comportamento pode ser desabilitado na strategy.
   */
  // Substitua o método inteiro por este:
  private enrichWithGlobalState(payload: T): T {
    const strategy = this.getStrategy();

    if (strategy.enableGlobalEnrichment === false) {
      return payload;
    }

    try {
      // A tipagem aqui reflete a estrutura real do seu estado
      const stateWrapper = this.stateProvider.getChild<{ value: { id: number; nome: string } }>(
        'ui-MasterAppComponent',
        'ConcessionariaSelector#main'
      );

      console.log('🌍 Estado da Concessionária obtido do StateProvider:', stateWrapper);
      // Acessamos a propriedade aninhada .value para pegar os dados
      const concessionariaState = stateWrapper?.value;

      // Verificamos o .id dentro do objeto de valor
      if (concessionariaState?.id) {
        console.log(`✨ Enriquecendo filtro com Concessionária ID: ${concessionariaState.id}`);
        return {
          ...payload,
          id_concessionaria: concessionariaState.id
        };
      }
    } catch (error) {
      console.warn('Não foi possível enriquecer o filtro com o estado da concessionária.', error);
    }

    return payload;
  }

  /**
   * Limpa o filtro
   */
  onClear(): void {
    const strategy = this.getStrategy();
    const initialValue = strategy.getInitialValue();

    this.form.patchValue(initialValue);

    // Mantém os campos como touched para mostrar validações
    this.form.markAllAsTouched();

    // Salva os filtros limpos no estado com validação
    const isValid = strategy.hasValidSearchData(initialValue);
    this.saveFiltersWithState(initialValue, isValid);

    this.clear.emit();
  }

  /**
   * Salva os filtros no estado com validação
   */
  private saveFiltersWithState(filters: T, valid: boolean): void {
    const filterState: FilterState<T> = {
      data: filters,
      valid: valid
    };
    console.log('💾 Salvando filtros no estado:', filterState);
    this.filterStateRef.set(filterState);
  }

  /**
   * Getter genérico para acessar controles do formulário
   * Substitui os getters específicos como descricaoControl, statusControl, etc.
   */
  getControl(controlName: string) {
    return this.form.get(controlName);
  }

  /**
   * Verifica se o formulário tem dados válidos para pesquisar
   */
  get hasValidSearchData(): boolean {
    const strategy = this.getStrategy();
    return strategy.hasValidSearchData(this.form.value);
  }

  /**
   * Getter para acessar o formulário diretamente no template
   */
  get formRef() {
    return this.form;
  }
}