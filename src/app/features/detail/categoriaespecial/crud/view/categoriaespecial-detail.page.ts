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
import { CategoriaEspecial } from '@stradeo/domain/models/categoriaespecial.model';
import { CategoriaEspecialService } from '@stradeo/services/categoriaespecial.service';
import { CategoriaEspecialDetailStrategy } from './categoriaespecial.detail.strategy';
@Component({
    standalone: true,
    selector: 'app-categoriaespecial-detail',
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
    templateUrl: './categoriaespecial-detail.page.html',
    styleUrls: ['./categoriaespecial-detail.page.scss'],
    providers: [DatePipe]
})
export class CategoriaEspecialDetailPage extends BaseDetailPage<CategoriaEspecial, number> {
    // Dependências específicas
    private readonly service = inject(CategoriaEspecialService);
    // Estratégia específica
    private strategy = new CategoriaEspecialDetailStrategy(
        this.service,
        this.router
    );
    constructor() {
        super();
    }
    /**
    Retorna a estratégia específica para CategoriaEspecial
    */
    protected getStrategy(): DetailStrategy<CategoriaEspecial, number> {
        return this.strategy;
    }
    public get fieldLabels(): { [key: string]: string } {
        return this.strategy.getFieldLabels();
    }
}