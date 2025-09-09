import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BaseDetailPage, DetailStrategy } from '@pcode/ui/base-detail';
import { TipoCategoria } from '../../../../../corestradeo/domain/models/tipocategoria.model';
import { TipoCategoriaService } from '../../../../../corestradeo/services/tipocategoria.service';
import { TipocategoriaDetailStrategy } from './tipocategoria-detail.strategy';
import { AuditCanvasComponent, AuditTriggerComponent, AuditData } from '../../../../../shared/components/audit';
import { ToastService } from '../../../../../corepcode/toast/toast.service';

@Component({
  standalone: true,
  selector: 'app-tipocategoria-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AuditCanvasComponent, AuditTriggerComponent],
  templateUrl: './tipocategoria-detail.page.html',
  styleUrls: ['./tipocategoria-detail.page.scss'],
  providers: [DatePipe]
})
export class TipocategoriaDetailPage extends BaseDetailPage<TipoCategoria, number> {

  // Dependências específicas
  private readonly service = inject(TipoCategoriaService);
  private readonly toastService = inject(ToastService);

  // Estado adicional específico desta página
  public readonly auditOffcanvasOpen = signal(false);

  // Estratégia específica
  private strategy = new TipocategoriaDetailStrategy(
    this.service,
    this.router,
    this.toastService
  );

  constructor() {
    super();
  }

  /**
   * Retorna a estratégia específica para TipoCategoria
   */
  protected getStrategy(): DetailStrategy<TipoCategoria, number> {
    return this.strategy;
  }

  // Métodos específicos da auditoria (funcionalidade extra desta página)
  public openAuditOffcanvas(): void {
    this.auditOffcanvasOpen.set(true);
  }

  public closeAuditOffcanvas(): void {
    this.auditOffcanvasOpen.set(false);
  }

  // Método para obter os dados de auditoria
  public getAuditData(): AuditData {
    if (!this.form) {
      return {
        dataCadastro: undefined,
        usuarioCadastro: undefined,
        dataAtualizacao: undefined,
        usuarioAtualizacao: undefined
      };
    }
    
    try {
      return {
        dataCadastro: this.form.get('data_cadastro')?.value || undefined,
        usuarioCadastro: this.form.get('usuario_cadastro')?.value || undefined,
        dataAtualizacao: this.form.get('data_atualizacao')?.value || undefined,
        usuarioAtualizacao: this.form.get('usuario_atualizacao')?.value || undefined
      };
    } catch (error) {
      console.warn('Erro ao acessar auditData:', error);
      return {
        dataCadastro: undefined,
        usuarioCadastro: undefined,
        dataAtualizacao: undefined,
        usuarioAtualizacao: undefined
      };
    }
  }
}