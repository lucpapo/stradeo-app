import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// PCODE (Importações do Framework - Estáticas)
import { StateRef } from '@pcode/store/state-ref';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { FilterState } from '@pcode/ui/base-list';
import { BaseFilterPage } from '@pcode/ui/base-filter';
// Importações Dinâmicas baseadas no nome da tabela
import { CategoriaEspecialFilterStrategy } from './categoriaespecial-filter.strategy';
@Component({
standalone: true,
selector: 'app-categoriaespecial-filter',
imports: [CommonModule, ReactiveFormsModule, ValidationIndicatorComponent],
templateUrl: './categoriaespecial-filter.page.html',
styleUrls: [],
})
export class CategoriaEspecialFilterPage extends BaseFilterPage < Record < string, any >> {
// A anotação de tipo do @Input também deve ser atualizada para ser consistente
@Input() override value!: Record<string, any>;
private strategy = new CategoriaEspecialFilterStrategy();
constructor() { super(); }
protected initializeStateRef(): void {
// A tipagem do StateRef também é atualizada automaticamente
this.filterStateRef = new StateRef<FilterState<Record<string, any>>>(
this.stateProvider,
'ui-CategoriaShellComponent',
'CategoriaEspecialFilterPage#main'
);
}
}