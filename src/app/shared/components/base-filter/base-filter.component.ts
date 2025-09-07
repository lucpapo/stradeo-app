import { EventEmitter, Input, OnChanges, OnInit, Output, inject, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { FilterStrategy } from './filter-strategy.interface';
import { FilterState } from '@pcodeshared/components/base-list';

/**
 * Classe base abstrata para componentes de filtro
 * Contém toda a lógica comum de gerenciamento de formulário, estado e validação
 */
@Directive()
export abstract class BaseFilterPage<T extends Record<string, any>> implements OnInit, OnChanges {

  protected readonly fb = inject(FormBuilder);
  protected readonly stateProvider = inject(StateProvider);

  @Input() value!: T;
  @Output() apply = new EventEmitter<T>();
  @Output() clear = new EventEmitter<void>();

  form!: FormGroup;
  fieldLabels: { [key: string]: string } = {};

  // StateRef específico para os filtros - agora usa FilterState
  protected filterStateRef!: StateRef<FilterState<T>>;

  constructor() {}

  ngOnInit(): void {
    this.initializeStateRef();
    this.fieldLabels = this.getStrategy().getFieldLabels();
    this.createForm();
    this.loadSavedFilters();
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
    // Força a validação de todos os campos
    this.form.markAllAsTouched();

    const strategy = this.getStrategy();
    const isFormValid = strategy.validateForm ? strategy.validateForm(this.form) : this.form.valid;

    if (isFormValid) {
      let filterValue: T = this.form.value;
      
      // Aplica transformação de dados se definida na estratégia
      if (strategy.transformData) {
        filterValue = strategy.transformData(filterValue);
      }

      // Verifica se tem dados válidos para pesquisa
      const hasValidSearchData = strategy.hasValidSearchData(filterValue);

      console.log('✅ Filtro válido - Aplicando:', { filterValue, hasValidSearchData });

      // Salva os filtros no estado com validação
      this.saveFiltersWithState(filterValue, hasValidSearchData);

      // Emite para a lista
      this.apply.emit(filterValue);
    } else {
      console.log('❌ Filtro inválido - Não aplicando:', this.form.errors);
      
      // Salva o estado como inválido
      this.saveFiltersWithState(this.form.value, false);
      
      // Não emite o evento se o formulário for inválido
    }
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