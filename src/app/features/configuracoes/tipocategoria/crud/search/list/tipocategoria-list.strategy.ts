import { ListStrategy } from '@pcodeshared/components/base-list';
import { TipocategoriaFilterValue, TIPOCATEGORIA_FILTER_INITIAL_VALUE } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';

/**
 * Estratégia específica para listagem de Tipo Categoria
 * Implementa as regras de negócio específicas desta entidade
 */
export class TipocategoriaListStrategy implements ListStrategy<TipocategoriaFilterValue, TipoCategoria> {

  /**
   * Valida se os filtros são suficientes para carregar dados
   * Para TipoCategoria, a descrição é obrigatória
   */
  hasValidFilters(filters: TipocategoriaFilterValue): boolean {
    return filters.descricao.trim() !== '';
  }

  /**
   * Retorna as configurações de paginação padrão
   */
  getDefaultPagination() {
    return {
      page: 1,
      pageSize: 5,
      total: 0
    };
  }

  /**
   * Retorna as chaves do StateProvider para TipoCategoria
   */
  getStateKeys() {
    return {
      shellKey: 'ui-TipocategoriaShellComponent',
      paginationKey: 'TipocategoriaListPage#main',
      filterKey: 'TipocategoriaFilterPage#main'
    };
  }

  /**
   * Transforma os parâmetros antes de enviar para a API (opcional)
   * Aqui podemos fazer ajustes específicos nos parâmetros se necessário
   */
  transformQueryParams(params: {
    page: number;
    pageSize: number;
    filters: TipocategoriaFilterValue;
  }) {
    // Para TipoCategoria, mantemos a estrutura atual
    return params;
  }

  /**
   * Processa a resposta da API antes de atualizar o estado (opcional)
   * Aqui podemos fazer transformações específicas na resposta se necessário
   */
  processResponse(response: any): { data: TipoCategoria[]; total: number } {
    return {
      data: response.data || [],
      total: response.total || 0
    };
  }
}