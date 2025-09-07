import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StateRef } from '@pcode/store/state-ref';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { BaseFilterPage } from '../../../../../../shared/components/base-filter/base-filter.component';
import { FilterStrategy } from '../../../../../../shared/components/base-filter/filter-strategy.interface';
import { TipocategoriaFilterValue } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipocategoriaFilterStrategy } from './tipocategoria-filter.strategy';

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
   */
  protected initializeStateRef(): void {
    this.filterStateRef = new StateRef<TipocategoriaFilterValue>(
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