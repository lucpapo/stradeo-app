import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
// PCODE
import { BaseDetailPage, DetailStrategy } from '@pcode/ui/base-detail';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { FullScreenLoadingComponent } from '@pcodeshared/components/full-screen-loading/full-screen-loading.component';
import { CompactErrorComponent } from '@pcodeshared/components/compact-error/compact-error.component';
import { AuditComponent } from '@pcodeshared/components/audit';
// DYNAMIC IMPORTS
import { CategoriaTarifa } from '@stradeo/domain/models/categoriatarifa.model';
import { CategoriaTarifaService } from '@stradeo/services/categoriatarifa.service';
import { CategoriaTarifaDetailStrategy } from './categoriatarifa.detail.strategy';
@Component({
standalone: true,
selector: 'app-categoriatarifa-detail',
imports: [
CommonModule,
RouterModule,
ReactiveFormsModule,
ValidationIndicatorComponent,
FullScreenLoadingComponent,
CompactErrorComponent,
AuditComponent,
NgbNavModule,
// Adiciona os componentes de detalhe aos imports
],
templateUrl: './categoriatarifa-detail.page.html',
styleUrls: ['./categoriatarifa-detail.page.scss'],
providers: [DatePipe]
})
export class CategoriaTarifaDetailPage extends BaseDetailPage<CategoriaTarifa, number> {
// Dependências específicas
private readonly service = inject(CategoriaTarifaService);
// Estratégia específica
private strategy = new CategoriaTarifaDetailStrategy(
this.service,
this.router
);
constructor() {
super();
}
/**
Retorna a estratégia específica para CategoriaTarifa
*/
protected getStrategy(): DetailStrategy<CategoriaTarifa, number> {
return this.strategy;
}
public get fieldLabels(): { [key: string]: string } {
return this.strategy.getFieldLabels();
}
}