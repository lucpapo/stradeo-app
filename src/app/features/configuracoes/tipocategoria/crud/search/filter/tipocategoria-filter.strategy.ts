// src\app\features\configuracoes\tipocategoria\crud\search\filter\tipocategoria-filter.strategy.ts

import { Validators } from '@angular/forms';
import { AbstractFilterStrategy } from '@pcode/ui/base-filter';
// REMOVER as importações de '@stradeo/domain/types/tipocategoria-filter.types'

/**
 * Estratégia de filtro para Tipo Categoria, agora usando o modelo flexível.
 */
// ALTERAR o tipo genérico aqui
export class TipocategoriaFilterStrategy extends AbstractFilterStrategy<Record<string, any>> {

  /**
   * Valor inicial padrão definido como um objeto JSON flexível.
   */
  // ADICIONAR a nova definição do valor inicial
  protected readonly initialValue = {
    descricao: '',
    status_delecao: '' // Usar string vazia para 'Todos'
  };

  /**
   * Define os controles do formulário. A assinatura do parâmetro foi atualizada.
   */
  // ALTERAR a assinatura do método
  createFormControls(savedData?: Record<string, any>): { [key: string]: any } {
    const data = savedData || this.initialValue;

    return {
      // O campo 'descricao' continua obrigatório para a pesquisa
      descricao: [data.descricao, [Validators.required, Validators.maxLength(100)]],
      // O campo 'status' é opcional
      status_delecao: [data.status_delecao]
    };
  }

  /**
   * Labels dos campos para o ValidationIndicator (sem alterações aqui)
   */
  getFieldLabels(): { [key: string]: string } {
    return {
      descricao: 'Descrição',
      status_delecao: 'Status'
    };
  }

  /**
   * EXEMPLO DE ENRIQUECIMENTO DE PAYLOAD:
   * Adiciona um dado de contexto ao filtro antes de enviá-lo.
   * Mesmo que não seja usado agora, serve como template.
   */
  // override transformData(formValue: Record<string, any>): Record<string, any> {
  //   const cleanedData = super.transformData(formValue); // Mantém o trim()

  //   // Simulando a adição de um ID de contexto (ex: tenant, empresa, etc.)
  //   const contextualPayload = {
  //     ...cleanedData,
  //     tenant_id: 'empresa-principal-xpto'
  //   };
    
  //   console.log('[TipoCategoriaFilterStrategy] Payload enriquecido:', contextualPayload);

  //   return contextualPayload;
  // }
}