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
import { Categoria } from '@stradeo/domain/models/categoria.model';
import { CategoriaService } from '@stradeo/services/categoria.service';
import { CategoriaDetailStrategy } from './categoria.detail.strategy';
import { CategoriaEspecialContainerComponent } from 'app/features/detail/categoriaespecial/categoriaespecial-container.component';
@Component({
standalone: true,
selector: 'app-categoria-detail',
imports: [
CommonModule,
RouterModule,
ReactiveFormsModule,
ValidationIndicatorComponent,
FullScreenLoadingComponent,
CompactErrorComponent,
AuditComponent,
NgbNavModule,
CategoriaEspecialContainerComponent
// Adiciona os componentes de detalhe aos imports
],
templateUrl: './categoria-detail.page.html',
styleUrls: ['./categoria-detail.page.scss'],
providers: [DatePipe]
})
export class CategoriaDetailPage extends BaseDetailPage<Categoria, number> {
// Dependências específicas
private readonly service = inject(CategoriaService);
// Estratégia específica
private strategy = new CategoriaDetailStrategy(
this.service,
this.router
);
constructor() {
super();
}
/**
Retorna a estratégia específica para Categoria
*/
protected getStrategy(): DetailStrategy<Categoria, number> {
return this.strategy;
}
public get fieldLabels(): { [key: string]: string } {
return this.strategy.getFieldLabels();
}
}