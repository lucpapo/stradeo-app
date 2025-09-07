import { ListStrategy } from '@pcodeshared/components/base-list';
import { TipocategoriaFilterValue } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';

/**
 * Estratégia específica para listagem de Tipo Categoria
 * Implementa as regras de negócio específicas desta entidade
 */
export class TipocategoriaListStrategy extends ListStrategy<TipocategoriaFilterValue, TipoCategoria> {

  /**
   * Valida se os filtros são suficientes para carregar dados
   * Para TipoCategoria, a descrição é obrigatória
   */
  hasValidFilters(filters: TipocategoriaFilterValue): boolean {
    return filters.descricao.trim() !== '';
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

 
}