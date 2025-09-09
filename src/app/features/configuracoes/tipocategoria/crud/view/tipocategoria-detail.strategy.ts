import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
import { AbstractDetailStrategy } from '@pcode/ui/base-detail';
 
import { ToastService } from '@pcode/toast/toast.service';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
 

/**
 * Estratégia específica para detalhes de Tipo Categoria
 * Implementa as regras de negócio específicas desta entidade
 */
export class TipocategoriaDetailStrategy extends AbstractDetailStrategy<TipoCategoria, number> {

  private readonly datePipe = inject(DatePipe);
  private readonly toastService = inject(ToastService);

  // Desabilita o toast padrão da classe base
  public readonly showDefaultSuccessToast = false;

  constructor(
    readonly service: TipoCategoriaService,
    readonly router: Router
  ) {
    super();
  }

  /**
   * Define os controles do formulário específicos para Tipo Categoria
   */
  createFormControls(entity?: TipoCategoria): { [key: string]: any } {
    return {
      id: [{ value: entity?.id || null, disabled: true }],
      descricao: [entity?.descricao || '', [Validators.required, Validators.maxLength(100)]],
      status_delecao: [entity?.status_delecao ?? 0, Validators.required],
      data_cadastro: [{ value: entity?.data_cadastro || '', disabled: true }],
      usuario_cadastro: [{ value: entity?.usuario_cadastro || '', disabled: true }],
      data_atualizacao: [{ value: entity?.data_atualizacao || '', disabled: true }],
      usuario_atualizacao: [{ value: entity?.usuario_atualizacao || '', disabled: true }],
    };
  }

  /**
   * Retorna as chaves do StateProvider para Tipo Categoria
   */
  getStateKeys(): { shellKey: string; detailKey: string; } {
    return {
      shellKey: 'ui-TipocategoriaShellComponent',
      detailKey: 'TipocategoriaDetailPage#main'
    };
  }

  /**
   * Retorna a rota base para navegação
   */
  getBaseRoute(): string {
    return '/configuracoes/tipocategoria';
  }

  /**
   * Processa os dados após carregar da API
   * Formata as datas de auditoria usando DatePipe
   */
  override processLoadedData(data: TipoCategoria): TipoCategoria {
    if (!data) return data;

    return {
      ...data,
      data_cadastro: this.datePipe.transform(data.data_cadastro, 'dd/MM/yyyy HH:mm:ss') || data.data_cadastro,
      data_atualizacao: this.datePipe.transform(data.data_atualizacao, 'dd/MM/yyyy HH:mm:ss') || data.data_atualizacao
    };
  }

  /**
   * Labels dos campos para o ValidationIndicator
   */
  getFieldLabels(): { [key: string]: string } {
    return {
      descricao: 'Descrição',
      status_delecao: 'Status'
    };
  }

  /**
   * Retorna o título da entidade para mensagens
   */
  getEntityTitle(): string {
    return 'Tipo de Categoria';
  }
}