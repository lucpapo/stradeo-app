import { Validators } from '@angular/forms';
import { AbstractFilterStrategy } from '@pcode/ui/base-filter';
/**
 * Estratégia de filtro para Categoria.
 */
export class CategoriaFilterStrategy extends AbstractFilterStrategy<Record<string, any>> {
  /**
   * Define o valor inicial para cada campo do filtro.
   */
  protected readonly initialValue = {
    id: '',
    concessao_id: '',
    descricao: '',
    numero_eixos: '',
    tipo_categoria_id: '',
    codigo_tarifa_basica: '',
    codigo_categoria_adm: '',
    codigo_poder_concedente: '',
    considera_trafego: '',
    ordem: '',
    tipo: '',
    maximo_eixos_suspenso: '',
    eixos_equivalentes: '',
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
      concessao_id: [data.concessao_id],
      descricao: [data.descricao],
      numero_eixos: [data.numero_eixos],
      tipo_categoria_id: [data.tipo_categoria_id],
      codigo_tarifa_basica: [data.codigo_tarifa_basica],
      codigo_categoria_adm: [data.codigo_categoria_adm],
      codigo_poder_concedente: [data.codigo_poder_concedente],
      considera_trafego: [data.considera_trafego],
      ordem: [data.ordem],
      tipo: [data.tipo],
      maximo_eixos_suspenso: [data.maximo_eixos_suspenso],
      eixos_equivalentes: [data.eixos_equivalentes],
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
      concessao_id: 'Concessao_id',
      descricao: 'Descricao',
      numero_eixos: 'Numero_eixos',
      tipo_categoria_id: 'Tipo_categoria_id',
      codigo_tarifa_basica: 'Codigo_tarifa_basica',
      codigo_categoria_adm: 'Codigo_categoria_adm',
      codigo_poder_concedente: 'Codigo_poder_concedente',
      considera_trafego: 'Considera_trafego',
      ordem: 'Ordem',
      tipo: 'Tipo',
      maximo_eixos_suspenso: 'Maximo_eixos_suspenso',
      eixos_equivalentes: 'Eixos_equivalentes',
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
      console.log('[CategoriaFilterStrategy] Payload do filtro:', contextualPayload);
      return contextualPayload;
    }
}