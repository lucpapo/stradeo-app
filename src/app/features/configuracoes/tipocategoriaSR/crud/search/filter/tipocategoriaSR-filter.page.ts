import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
// PCODE
import { StateRef } from '@pcode/store/state-ref';
import { StateProvider } from '@pcode/store/state-provider';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { FilterState } from '@pcode/ui/base-list';
import { TipocategoriaFilterValue, TipocategoriaFilterState } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipocategoriaSRFilterStrategy } from './tipocategoriaSR-filter.strategy';
// STRADEO
 
@Component({
  standalone: true,
  selector: 'app-tipocategoriaSR-filter',
  imports: [CommonModule, ReactiveFormsModule, ValidationIndicatorComponent],
  templateUrl: './tipocategoriaSR-filter.page.html',
  styleUrls: [ ],
})
export class TipocategoriaSRFilterPage implements OnInit {

  @Input() value!: TipocategoriaFilterValue;
  @Output() apply = new EventEmitter<TipocategoriaFilterValue>();
  @Output() clear = new EventEmitter<void>();

  private strategy = new TipocategoriaSRFilterStrategy();
  private stateProvider = inject(StateProvider);
  private filterStateRef!: StateRef<FilterState<TipocategoriaFilterValue>>;

  // Propriedades necessárias para o template
  form!: FormGroup;
  formRef!: FormGroup;
  fieldLabels: { [key: string]: string } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeStateRef();
    this.initializeForm();
  }

  /**
   * Inicializa o formulário usando a estratégia
   */
  private initializeForm() {
    const formControls = this.strategy.createFormControls(this.value);
    this.form = this.fb.group(formControls);
    this.formRef = this.form; // Referência para o template
    this.fieldLabels = this.strategy.getFieldLabels();
  }

  /**
   * Inicializa o StateRef específico para Tipo Categoria Sem Rota
   * Agora usa FilterState para incluir validação
   */
  private initializeStateRef(): void {
    this.filterStateRef = new StateRef<FilterState<TipocategoriaFilterValue>>(
      this.stateProvider,
      'ui-TipocategoriaSRShellComponent',
      'TipocategoriaSRFilterPage#main'
    );
  }

  /**
   * Aplica o filtro
   */
  onApply() {
    if (this.form.valid) {
      const filterValue = this.form.value as TipocategoriaFilterValue;
      // Emite o evento para o componente pai
      this.apply.emit(filterValue);
    }
  }

  /**
   * Limpa o filtro
   */
  onClear() {
    this.form.reset();
    const initialControls = this.strategy.createFormControls();
    // Extrai apenas os valores dos controles
    const initialValues: any = {};
    Object.keys(initialControls).forEach(key => {
      const control = initialControls[key];
      initialValues[key] = Array.isArray(control) ? control[0] : control;
    });
    this.form.patchValue(initialValues);
    this.clear.emit();
  }
}