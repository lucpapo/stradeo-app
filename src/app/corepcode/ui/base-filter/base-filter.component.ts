// src/app/corepcode/ui/base-filter/base-filter.component.ts

import { EventEmitter, Input, OnChanges, OnInit, Output, inject, Directive, OnDestroy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { FilterStrategy } from './filter-strategy.interface';
import { FilterState } from '@pcode/ui/base-list';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class BaseFilterPage<T extends Record<string, any>> implements OnInit, OnDestroy, OnChanges {

  @Input() destroyStateOnClose = false;
  @Input() value!: T;
  @Output() apply = new EventEmitter<T>();
  @Output() clear = new EventEmitter<void>();

  protected readonly fb = inject(FormBuilder);
  protected readonly stateProvider = inject(StateProvider);

  form!: FormGroup;
  fieldLabels: { [key: string]: string } = {};

  protected filterStateRef!: StateRef<FilterState<T>>;
  private destroy$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.initializeStateRef();
    this.fieldLabels = this.getStrategy().getFieldLabels();
    this.ensureStateExists();
    this.buildFormFromState();
    this.syncFormValidityToState(); // Sincroniza a validade logo após a construção

    // Ouve qualquer mudança que afete a validade do formulário
    this.form.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.syncFormValidityToState();
    });
  }

  ngOnDestroy(): void {
    if (this.destroyStateOnClose && this.filterStateRef) {
      this.filterStateRef.remove();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getStrategy(): FilterStrategy<T> {
    const filterPage = this as any;
    if (!filterPage.strategy) {
      throw new Error(`Componente de filtro deve ter uma propriedade \`strategy\`.`);
    }
    return filterPage.strategy;
  }

  protected abstract initializeStateRef(): void;

  private ensureStateExists(): void {
    const strategy = this.getStrategy();
    let savedFilterState = this.filterStateRef.get();

    if (!savedFilterState) {
      const initialValue = strategy.getInitialValue();
      // CORREÇÃO DEFINITIVA: O estado inicial agora é sempre 'true' por padrão.
      // A validade real será calculada e corrigida imediatamente após o form ser criado.
      savedFilterState = { data: initialValue, valid: true };
      this.filterStateRef.set(savedFilterState);
    }
  }

  private buildFormFromState(): void {
    const strategy = this.getStrategy();
    const currentState = this.filterStateRef.get()!;
    const formControls = strategy.createFormControls(currentState.data);
    console.log('Form Controls:', formControls);
    this.form = this.fb.group(formControls);
  }

  // CORREÇÃO DEFINITIVA: Este método agora usa APENAS this.form.valid.
  // private syncFormValidityToState(): void {
  //   const currentState = this.filterStateRef.get();
  //   if (!currentState) return;

  //   // A validade do estado DEVE ser um espelho da validade do formulário. Fim da discussão.
  //   const isFormCurrentlyValid = this.form.valid;

  //   if (currentState.valid !== isFormCurrentlyValid) {
  //     console.log(`🔄 [BaseFilterPage] Sincronizando estado. Validade do formulário é: ${isFormCurrentlyValid}`);
  //     this.saveFiltersWithState(this.form.getRawValue(), isFormCurrentlyValid);
  //   }
  // }

  private syncFormValidityToState(): void {
    const currentState = this.filterStateRef.get();
    if (!currentState) return;

    const isFormCurrentlyValid = this.form.valid;
    const currentFormValue = this.form.getRawValue();

    // ALTERAÇÃO: Verificamos se a VALIDADE mudou OU se os DADOS mudaram.
    // JSON.stringify é uma forma simples de comparar se os dois objetos de filtro são diferentes.
    if (currentState.valid !== isFormCurrentlyValid || JSON.stringify(currentState.data) !== JSON.stringify(currentFormValue)) {
      console.log(`🔄 [BaseFilterPage] Sincronizando estado completo. Validade: ${isFormCurrentlyValid}, Dados:`, currentFormValue);
      this.saveFiltersWithState(currentFormValue, isFormCurrentlyValid);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Lógica original da classe base: reagir a mudanças no @Input() 'value'
    if (this.form && changes['value']) {
      this.form.patchValue(this.value as { [key: string]: any });
    }
  }
  onApply(): void {
    this.form.markAllAsTouched();

    // CORREÇÃO DEFINITIVA: A única condição é a validade do formulário.
    if (this.form.valid) {
      let filterValue: T = this.form.getRawValue();
      const strategy = this.getStrategy();
      if (strategy.transformData) {
        filterValue = strategy.transformData(filterValue);
      }
      this.saveFiltersWithState(filterValue, true);
      this.apply.emit(filterValue);
    } else {
      console.log('❌ Filtro inválido - Não aplicando:', this.form.errors);
      this.saveFiltersWithState(this.form.value, false);
    }
  }

  onClear(): void {
    const strategy = this.getStrategy();
    const initialValue = strategy.getInitialValue();
    this.form.reset(initialValue);
    // Após limpar, a validade do formulário será recalculada, e o 'statusChanges' vai sincronizar o estado.
  }

  private saveFiltersWithState(filters: T, valid: boolean): void {
    const filterState: FilterState<T> = { data: filters, valid: valid };
    this.filterStateRef.set(filterState);
  }

  getControl(controlName: string) { return this.form.get(controlName); }
  get formRef() { return this.form; }
}