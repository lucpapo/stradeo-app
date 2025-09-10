import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// PCODE
import { StateRef } from '@pcode/store/state-ref';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { FilterState } from '@pcode/ui/base-list';
import { BaseFilterPage } from '@pcode/ui/base-filter';
import { TipocategoriaSRFilterStrategy } from './tipocategoriaSR-filter.strategy';
 

@Component({
  standalone: true,
  selector: 'app-tipocategoriaSR-filter',
  imports: [CommonModule, ReactiveFormsModule, ValidationIndicatorComponent],
  templateUrl: './tipocategoriaSR-filter.page.html',
  styleUrls: [ ],
})
export class TipocategoriaSRFilterPage extends BaseFilterPage<Record<string, any>> {

  // A anotação de tipo do @Input também deve ser atualizada para ser consistente
  @Input() override value!: Record<string, any>;

  private strategy = new TipocategoriaSRFilterStrategy();

  constructor() {
    super();
  }

  // O resto da classe permanece igual...
  protected initializeStateRef(): void {
    // A tipagem do StateRef também é atualizada automaticamente
    this.filterStateRef = new StateRef<FilterState<Record<string, any>>>(
      this.stateProvider,
      'ui-TipocategoriaShellComponent',
      'TipocategoriaSRFilterPage#main'
    );
  }
}