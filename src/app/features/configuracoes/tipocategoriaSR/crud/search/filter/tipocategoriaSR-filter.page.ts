import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// PCODE
import { StateRef } from '@pcode/store/state-ref';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { FilterState } from '@pcode/ui/base-list';
import { BaseFilterPage } from '@pcode/ui/base-filter';
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
export class TipocategoriaSRFilterPage extends BaseFilterPage<TipocategoriaFilterValue> {

  @Input() override value!: TipocategoriaFilterValue;

  private strategy = new TipocategoriaSRFilterStrategy();

  constructor() {
    super();
  }

  /**
   * Inicializa o StateRef específico para Tipo Categoria Sem Rota
   * Agora usa FilterState para incluir validação
   */
  protected initializeStateRef(): void {
    this.filterStateRef = new StateRef<FilterState<TipocategoriaFilterValue>>(
      this.stateProvider,
       'ui-TipocategoriaShellComponent',
      'TipocategoriaSRFilterPage#main'
    );
  }
}