import { inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { LOCAL_STORAGE_KEY, StateProvider } from '@pcode/store/state-provider';
import { DetailState } from '@pcode/ui/base-detail';
import { AbstractFilterStrategy } from '@pcode/ui/base-filter';
/**
 * Estratégia de filtro para CategoriaEspecial.
 */
export class CategoriaEspecialFilterStrategy extends AbstractFilterStrategy<Record<string, any>> {
  
  // Injetamos as ferramentas que a estratégia precisa para buscar o estado
    private stateProvider = inject(StateProvider);
    private shellKey = inject(LOCAL_STORAGE_KEY);
  
  /**
   * Define o valor inicial para cada campo do filtro.
   */
  protected readonly initialValue = {
    id: '',
    categoria_id: '',
    quantidade_eixos: '',
    categoria_adm: ''
  };

/**
   * Método privado que busca o estado do DetailPage e retorna a entidade.
   * Esta é a implementação do seu "getState(root, child)".
   */
  private getParentContext(): any  {
    // A "origem" do dado:
    const rootKey = this.shellKey;
    const childKey = 'CategoriaDetailPage#main';

    // Buscamos o estado completo do detalhe
    const detailState = this.stateProvider.getChild<DetailState<any>>(rootKey, childKey);

    // Retornamos apenas a parte que nos interessa: a 'entity'
    return detailState ? detailState.entity : null;
  }


   override getInitialValue(): any {
    const context = this.getParentContext();

     let inicialValue: any = { ...this.initialValue };
   console.log( context)
    if (context) {
       inicialValue['categoria_id'] = context.id;
     
    }

    console.log('[Strategy] Gerando filtro inicial inteligente:', inicialValue);
    return inicialValue;
  }




  /**
   * Cria os controles do formulário reativo do Angular com suas validações.
   */
  createFormControls(savedData?: Record<string, any>): { [key: string]: any } {
    const data = savedData || this.initialValue;
    return {
      id: [data.id],
      categoria_id: [data.categoria_id],
      quantidade_eixos: [data.quantidade_eixos],
      categoria_adm: [data.categoria_adm]
    };
  }
  /**
   * Define os rótulos (labels) para cada campo, usados em mensagens de validação.
   */
  getFieldLabels(): { [key: string]: string } {
    return {
      id: 'Id',
      categoria_id: 'Categoria_id',
      quantidade_eixos: 'Quantidade_eixos',
      categoria_adm: 'Categoria_adm'
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
      console.log('[CategoriaEspecialFilterStrategy] Payload do filtro:', contextualPayload);
      return contextualPayload;
    }
}