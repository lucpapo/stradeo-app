import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseStradeoDetailPage } from '../../../../../corestradeo/framework/base/BaseStradeoDetailPage';
import { IServiceBase } from '../../../../../corepcode/api/IServiceBase';
import { TipoCategoria } from '../../../../../corestradeo/domain/models/tipocategoria.model';
import { TipoCategoriaService } from '../../../../../corestradeo/services/tipocategoria.service';
import { TipocategoriaFilterValue } from '../search/filter/tipocategoria-filter-simple.page';

@Component({
  standalone: true,
  selector: 'app-tipocategoria-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './tipocategoria-detail.page.html',
  styleUrls: ['./tipocategoria-detail.page.scss'],
  providers: [DatePipe]
})
export class TipocategoriaDetailPage extends BaseStradeoDetailPage<
  TipoCategoria,
  TipocategoriaFilterValue,
  number
> {
  private readonly service = inject(TipoCategoriaService);

  // Estado adicional específico desta página
  public readonly auditOpen = signal(false);

  protected obterServico(): IServiceBase<TipoCategoria, TipocategoriaFilterValue, number> {
    return this.service;
  }

  protected construirFormulario(): FormGroup {
    return this.fb.group({
      id: [{ value: null, disabled: true }],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      status_delecao: [0, Validators.required],
      data_cadastro: [{ value: '', disabled: true }],
      usuario_cadastro: [{ value: '', disabled: true }],
      data_atualizacao: [{ value: '', disabled: true }],
      usuario_atualizacao: [{ value: '', disabled: true }],
    });
  }

  protected obterRotaBase(): string {
    return '/configuracoes/tipocategoria';
  }

  public toggleAudit(): void {
    this.auditOpen.set(!this.auditOpen());
  }

  // Métodos de salvamento herdados da classe base
  // save() - Salva e volta para lista
  // saveAndContinue() - Salva e continua editando
}