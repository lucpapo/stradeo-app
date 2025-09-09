import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
import { AbstractDetailStrategy } from '@pcode/ui/base-detail';
import { TipoCategoria } from '../../../../../corestradeo/domain/models/tipocategoria.model';
import { TipoCategoriaService } from '../../../../../corestradeo/services/tipocategoria.service';
import { ToastService } from '../../../../../corepcode/toast/toast.service';

/**
 * Estratégia específica para detalhes de Tipo Categoria
 * Implementa as regras de negócio específicas desta entidade
 */
export class TipocategoriaDetailStrategy extends AbstractDetailStrategy<TipoCategoria, number> {

  private readonly datePipe = inject(DatePipe);

  // Desabilita o toast padrão da classe base
  public readonly showDefaultSuccessToast = false;

  constructor(
    readonly service: TipoCategoriaService,
    readonly router: Router,
    private readonly toastService: ToastService
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
   * Ações específicas pós-salvamento para Tipo Categoria
   */
  override afterSave(savedEntity: TipoCategoria, mode: 'create' | 'edit'): void {
    console.log(`✅ TipoCategoria ${mode === 'create' ? 'criado' : 'atualizado'}:`, savedEntity);

    // Limpa todos os toasts anteriores
    this.toastService.closeAll();

    // Mostra o toast de sucesso
    const action = mode === 'create' ? 'criado' : 'atualizado';
    this.toastService.success(`Tipo de Categoria ${action} com sucesso!`, {
      title: 'Sucesso'
    });
  }
}