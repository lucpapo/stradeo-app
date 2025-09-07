import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { TipocategoriaFilterValue, TIPOCATEGORIA_FILTER_INITIAL_VALUE } from '@stradeo/domain/types/tipocategoria-filter.types';

@Component({
  standalone: true,
  selector: 'app-tipocategoria-filter',
  imports: [CommonModule, ReactiveFormsModule, ValidationIndicatorComponent],
  templateUrl: './tipocategoria-filter.page.html',
  styleUrls: ['./tipocategoria-filter.page.scss'],
})
export class TipocategoriaFilterPage implements OnInit, OnChanges {

  private readonly fb = inject(FormBuilder);
  private readonly stateProvider = inject(StateProvider);

  @Input() value: TipocategoriaFilterValue = TIPOCATEGORIA_FILTER_INITIAL_VALUE;
  @Output() apply = new EventEmitter<TipocategoriaFilterValue>();
  @Output() clear = new EventEmitter<void>();

  form!: FormGroup;

  // StateRef específico para os filtros
  private filterStateRef: StateRef<TipocategoriaFilterValue>;

  // Labels dos campos para o ValidationIndicator
  fieldLabels = {
    descricao: 'Descrição',
    status_delecao: 'Status'
  };

  constructor() {
    // StateRef específico para filtros
    this.filterStateRef = new StateRef<TipocategoriaFilterValue>(
      this.stateProvider,
      'ui-TipocategoriaShellComponent',
      'TipocategoriaFilterPage#main'
    );
  }

  ngOnInit(): void {
    this.createForm();
    this.loadSavedFilters();
  }

  /**
   * Cria o formulário com dados do StateProvider ou valores iniciais
   */
  private createForm(): void {
    // Busca dados salvos no StateProvider ou usa valores iniciais
    const savedFilters = this.filterStateRef.get();
    const initialData = savedFilters || TIPOCATEGORIA_FILTER_INITIAL_VALUE;
    
    console.log('🏗️ Criando formulário com dados:', {
      savedFilters,
      initialData,
      hasStateData: !!savedFilters
    });

    this.form = this.fb.group({
      descricao: [initialData.descricao, [Validators.required, Validators.maxLength(100)]],
      status_delecao: [initialData.status_delecao]
    });

    // Marca todos os campos como touched para mostrar validações iniciais
    this.form.markAllAsTouched();
  }

  /**
   * Carrega os filtros salvos do estado ou usa valores iniciais
   */
  private loadSavedFilters(): void {
    const savedFilters = this.filterStateRef.get();

    if (savedFilters) {
      console.log('🔄 Filtros já carregados no createForm do estado:', savedFilters);
    } else if (this.value && !this.isInitialValue(this.value)) {
      console.log('📝 Atualizando com filtros do @Input:', this.value);
      this.form.patchValue(this.value);
    } else {
      console.log('🆕 Formulário criado com valores iniciais padrão');
    }

    // Garante que as validações sejam aplicadas após carregar os dados
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
  }

  /**
   * Verifica se o valor é igual aos valores iniciais
   */
  private isInitialValue(value: TipocategoriaFilterValue): boolean {
    return value.descricao === TIPOCATEGORIA_FILTER_INITIAL_VALUE.descricao && 
           value.status_delecao === TIPOCATEGORIA_FILTER_INITIAL_VALUE.status_delecao;
  }

  /**
   * Atualiza o formulário com os valores recebidos via @Input
   */
  private updateFormWithValue(): void {
    if (this.value) {
      this.form.patchValue(this.value);
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

    if (this.form.valid) {
      const filterValue: TipocategoriaFilterValue = this.form.value;
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
    this.form.patchValue(TIPOCATEGORIA_FILTER_INITIAL_VALUE);

    // Mantém os campos como touched para mostrar validações
    this.form.markAllAsTouched();

    // Salva os filtros limpos no estado
    this.saveFilters(TIPOCATEGORIA_FILTER_INITIAL_VALUE);

    this.clear.emit();
  }

  /**
   * Salva os filtros no estado
   */
  private saveFilters(filters: TipocategoriaFilterValue): void {
    console.log('💾 Salvando filtros no estado:', filters);
    this.filterStateRef.set(filters);
  }

  /**
   * Getters para facilitar o acesso no template
   */
  get descricaoControl() {
    return this.form.get('descricao');
  }

  get statusControl() {
    return this.form.get('status_delecao');
  }

  /**
   * Verifica se o formulário tem dados para pesquisar
   */
  /**
   * Verifica se o formulário tem dados válidos para pesquisar
   */
  get hasValidSearchData(): boolean {
    const formValue = this.form.value;
    return formValue.descricao?.trim() !== '';
  }
}