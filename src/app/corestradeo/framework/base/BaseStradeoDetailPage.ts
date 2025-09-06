import { Directive, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BaseDetailPage } from '../../../corepcode/ui/detail/BaseDetailPage';
import { KeyInput } from '../../../corepcode/api/key.util';

/**
 * Classe base específica do Stradeo que estende o BaseDetailPage do corepcode
 * Adiciona funcionalidades específicas desta aplicação
 */
@Directive()
export abstract class BaseStradeoDetailPage<
  TItem extends Record<string, any>,
  TFilter extends object,
  TKey extends KeyInput
> extends BaseDetailPage<TItem, TFilter, TKey> {

  protected readonly datePipe = inject(DatePipe);

  /**
   * Formata datas de auditoria automaticamente
   * Sobrescreve o método da classe pai para adicionar formatação de datas
   */
  protected override aposCarregarDados(data: TItem): void {
    const formattedData = this.formatarDatasAuditoria(data);
    this.form.patchValue(formattedData as any);
    
    // Chama implementação específica da classe filha se existir
    this.aposCarregarDadosCustomizado(data);
  }

  /**
   * Remove campos de auditoria automaticamente
   * Sobrescreve o método da classe pai para limpar payload
   */
  protected override prepararPayload(payload: any): Partial<TItem> {
    return this.limparCamposAuditoria(payload);
  }

  /**
   * Formata campos de data para exibição
   */
  protected formatarDatasAuditoria(data: any): any {
    if (!data) return data;

    return {
      ...data,
      data_cadastro: this.datePipe.transform(data.data_cadastro, 'dd/MM/yyyy HH:mm:ss'),
      data_atualizacao: this.datePipe.transform(data.data_atualizacao, 'dd/MM/yyyy HH:mm:ss')
    };
  }

  /**
   * Remove campos de auditoria do payload
   */
  protected limparCamposAuditoria(payload: any): Partial<TItem> {
    const { 
      data_cadastro, 
      data_atualizacao, 
      usuario_cadastro, 
      usuario_atualizacao, 
      ...cleanPayload 
    } = payload;
    return cleanPayload;
  }

  /**
   * Hook opcional para implementação específica após carregar dados
   */
  protected aposCarregarDadosCustomizado(data: TItem): void {
    // Implementação opcional na classe filha
  }
}