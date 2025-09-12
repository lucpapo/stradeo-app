// src\app\features\configuracoes\tipocategoria\crud\search\filter\tipocategoria-filter.strategy.ts

import { inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { LOCAL_STORAGE_KEY, StateProvider } from '@pcode/store/state-provider';
import { DetailState } from '@pcode/ui/base-detail';
import { AbstractFilterStrategy } from '@pcode/ui/base-filter';
// REMOVER as importações de '@stradeo/domain/types/tipocategoria-filter.types'

/** 
 * Estratégia de filtro para Tipo Categoria, agora usando o modelo flexível.
 */
// ALTERAR o tipo genérico aqui
export class TipocategoriaSRFilterStrategy extends AbstractFilterStrategy<Record<string, any>> {

// Injetamos as ferramentas que a estratégia precisa para buscar o estado
  private stateProvider = inject(StateProvider);
  private shellKey = inject(LOCAL_STORAGE_KEY);
 
  /**
   * Valor inicial padrão definido como um objeto JSON flexível.
   */
  // ADICIONAR a nova definição do valor inicial
  protected readonly initialValue = {
    descricao: '',
    status_delecao: '' // Usar string vazia para 'Todos'
  };


/**
   * Método privado que busca o estado do DetailPage e retorna a entidade.
   * Esta é a implementação do seu "getState(root, child)".
   */
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
   * Define os controles do formulário. A assinatura do parâmetro foi atualizada.
   */
  // ALTERAR a assinatura do método
  createFormControls(savedData?: Record<string, any>): { [key: string]: any } {
     
    const data:any = savedData || this.initialValue;

    return {
      descricao: [data.descricao, [ Validators.maxLength(100)]],
      status_delecao: [data.status_delecao],
      id: [{ value: data.id || null, disabled: true }]
      
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
   * O transformData também busca o contexto para "engordar" o filtro.
   */
  // override transformData(formValue: any): any {
  //   const payload = { ...formValue };
  //   const context = this.getParentContext();

  //   // "engordar o filtro"
  //   if (context) {
  //     payload.id_pai = context.id;
  //   }

  //   console.log('[Strategy] Payload final enriquecido:', payload);
  //   return payload;
  // }


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