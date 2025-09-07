import { EventEmitter, Input, OnChanges, OnInit, Output, inject, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { FilterStrategy } from './filter-strategy.interface';

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

  // StateRef específico para os filtros
  protected filterStateRef!: StateRef<T>;

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
   */
  protected abstract getStrategy(): FilterStrategy<T>;

  /**
   * Cria o formulário com dados do StateProvider ou valores iniciais
   */
  private createForm(): void {
    const strategy = this.getStrategy();
    
    // Busca dados salvos no StateProvider
    let savedFilters = this.filterStateRef.get();
    
    // Se não há estado salvo, cria um estado inicial
    if (!savedFilters) {
      console.log('🆕 Criando estado inicial no StateProvider:', strategy.getInitialValue());
      this.filterStateRef.set(strategy.getInitialValue());
      savedFilters = strategy.getInitialValue();
    }
    
    console.log('🏗️ Criando formulário com dados:', {
      savedFilters,
      hasStateData: !!savedFilters,
      initialValue: strategy.getInitialValue()
    });

    // Cria o formulário usando a estratégia
    const formControls = strategy.createFormControls(savedFilters);
    this.form = this.fb.group(formControls);

    // Marca todos os campos como touched para mostrar validações iniciais
    this.form.markAllAsTouched();
  }

  /**
   * Carrega os filtros salvos do estado ou usa valores iniciais
   */
  private loadSavedFilters(): void {
    const savedFilters = this.filterStateRef.get();
    const strategy = this.getStrategy();

    if (savedFilters) {
      console.log('🔄 Filtros já carregados no createForm do estado:', savedFilters);
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
    const isValid = strategy.validateForm ? strategy.validateForm(this.form) : this.form.valid;

    if (isValid) {
      let filterValue: T = this.form.value;
      
      // Aplica transformação de dados se definida na estratégia
      if (strategy.transformData) {
        filterValue = strategy.transformData(filterValue);
      }

      console.log('✅ Filtro válido - Aplicando:', filterValue);

      // Salva os filtros no estado
      this.saveFilters(filterValue);

      // Emite para a lista
      this.apply.emit(filterValue);
    } else {
      console.log('❌ Filtro inválido - Não aplicando:', this.form.errors);
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

    // Salva os filtros limpos no estado
    this.saveFilters(initialValue);

    this.clear.emit();
  }

  /**
   * Salva os filtros no estado
   */
  private saveFilters(filters: T): void {
    console.log('💾 Salvando filtros no estado:', filters);
    this.filterStateRef.set(filters);
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