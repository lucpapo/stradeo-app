import { inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { LOCAL_STORAGE_KEY, StateProvider } from '@pcode/store/state-provider';
import { DetailState } from '@pcode/ui/base-detail';
import { AbstractFilterStrategy } from '@pcode/ui/base-filter';
/**
 * Estratégia de filtro para CategoriaTarifa.
 */
export class CategoriaTarifaFilterStrategy extends AbstractFilterStrategy<Record<string, any>> {
  
    private stateProvider = inject(StateProvider);
    private shellKey = inject(LOCAL_STORAGE_KEY);
   
  
   private getParentContext(): any  {
      // A "origem" do dado:
      const rootKey = this.shellKey;
      const childKey = 'TipocategoriaDetailPage#main';
  
      // Buscamos o estado completo do detalhe
      const detailState = this.stateProvider.getChild<DetailState<any>>(rootKey, childKey);
  
      // Retornamos apenas a parte que nos interessa: a 'entity'
      return detailState ? detailState.entity : null;
    }
  

     override getInitialValue(): any {
    const context = this.getParentContext();

     let inicialValue: any = { ...this.initialValue };
 
    if (context) {
       inicialValue['status_delecao'] = 1;
    }

    console.log('[Strategy] Gerando filtro inicial inteligente:', inicialValue);
    return inicialValue;
  }

  /**
   * Define o valor inicial para cada campo do filtro.
   */
  protected readonly initialValue = {
    id: '',
    tarifa_id: '',
    categoria_id: '',
    valor: '',
    data_cadastro: '',
    usuario_cadastro: '',
    data_atualizacao: '',
    usuario_atualizacao: '',
    status_delecao: ''
  };
  /**
   * Cria os controles do formulário reativo do Angular com suas validações.
   */
  createFormControls(savedData?: Record<string, any>): { [key: string]: any } {
    const data = savedData || this.initialValue;
    return {
      id: [data.id],
      tarifa_id: [data.tarifa_id],
      categoria_id: [data.categoria_id],
      valor: [data.valor],
      data_cadastro: [data.data_cadastro],
      usuario_cadastro: [data.usuario_cadastro],
      data_atualizacao: [data.data_atualizacao],
      usuario_atualizacao: [data.usuario_atualizacao],
      status_delecao: [data.status_delecao]
    };
  }
  /**
   * Define os rótulos (labels) para cada campo, usados em mensagens de validação.
   */
  getFieldLabels(): { [key: string]: string } {
    return {
      id: 'Id',
      tarifa_id: 'Tarifa_id',
      categoria_id: 'Categoria_id',
      valor: 'Valor',
      data_cadastro: 'Data_cadastro',
      usuario_cadastro: 'Usuario_cadastro',
      data_atualizacao: 'Data_atualizacao',
      usuario_atualizacao: 'Usuario_atualizacao',
      status_delecao: 'Status_delecao'
    };
  }
  /**
   * Permite transformar os dados do filtro antes de serem enviados para a API.
   * Útil para adicionar dados de contexto, como tenant_id, etc.
   */
    override transformData(formValue: Record<string, any>): Record<string, any> {
      // O método `super.transformData` remove espaços em branco (trim) de todos os campos.
      const cleanedData = super.transformData(formValue);
      // Exemplo: Adicionando um dado de contexto fixo ao payload
      const contextualPayload = {
        ...cleanedData,
        // tenant_id: 'empresa-principal-xpto' // Descomente para adicionar dados de contexto
      };
      console.log('[CategoriaTarifaFilterStrategy] Payload do filtro:', contextualPayload);
      return contextualPayload;
    }
}