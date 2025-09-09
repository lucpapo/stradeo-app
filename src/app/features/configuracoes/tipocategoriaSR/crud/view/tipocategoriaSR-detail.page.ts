import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseDetailPage, DetailStrategy } from '@pcode/ui/base-detail';
import { ValidationIndicatorComponent } from '@pcodeshared/components/validation-indicator/validation-indicator.component';
import { FullScreenLoadingComponent } from '@pcodeshared/components/full-screen-loading/full-screen-loading.component';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';

import { CompactErrorComponent } from '@pcodeshared/components/compact-error/compact-error.component';
import { AuditComponent, AuditData } from '@pcodeshared/components/audit';
import { TipocategoriaSRDetailStrategy } from './tipocategoriaSR-detail.strategy';

@Component({
  standalone: true,
  selector: 'app-tipocategoriaSR-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ValidationIndicatorComponent, FullScreenLoadingComponent, CompactErrorComponent, AuditComponent],
  templateUrl: './tipocategoriaSR-detail.page.html',
  styleUrls: ['./tipocategoriaSR-detail.page.scss'],
  providers: [DatePipe]
})
export class TipocategoriaSRDetailPage extends BaseDetailPage<TipoCategoria, number> {

  // Dependências específicas
  private readonly service = inject(TipoCategoriaService);

  // Estratégia específica
  private strategy = new TipocategoriaSRDetailStrategy(
    this.service,
    this.router
  );

  constructor() {
    super();
  }

  /**
   * Retorna a estratégia específica para TipoCategoria Sem Rota
   */
  protected getStrategy(): DetailStrategy<TipoCategoria, number> {
    return this.strategy;
  }

  public get fieldLabels(): { [key: string]: string } {
    return this.strategy.getFieldLabels();
  }

   
}