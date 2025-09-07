import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StateRef } from '@pcode/store/state-ref';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
 
import { TipocategoriaFilterValue, TipocategoriaFilterState } from '@stradeo/domain/types/tipocategoria-filter.types';
import { FilterState } from '@pcodeshared/components/base-list';
import { TipocategoriaFilterStrategy } from './tipocategoria-filter.strategy';
import { BaseFilterPage, FilterStrategy } from '@pcodeshared/components/base-filter';

@Component({
  standalone: true,
  selector: 'app-tipocategoria-filter',
  imports: [CommonModule, ReactiveFormsModule, ValidationIndicatorComponent],
  templateUrl: './tipocategoria-filter.page.html',
  styleUrls: ['./tipocategoria-filter.page.scss'],
})
export class TipocategoriaFilterPage extends BaseFilterPage<TipocategoriaFilterValue> {

  @Input() override value!: TipocategoriaFilterValue;

  private strategy = new TipocategoriaFilterStrategy();

  constructor() {
    super();
  }

  /**
   * Inicializa o StateRef específico para Tipo Categoria
   * Agora usa FilterState para incluir validação
   */
  protected initializeStateRef(): void {
    this.filterStateRef = new StateRef<FilterState<TipocategoriaFilterValue>>(
      this.stateProvider,
      'ui-TipocategoriaShellComponent',
      'TipocategoriaFilterPage#main'
    );
  }

  /**
   * Retorna a estratégia específica para Tipo Categoria
   */
  protected getStrategy(): FilterStrategy<TipocategoriaFilterValue> {
    return this.strategy;
  }

 
}