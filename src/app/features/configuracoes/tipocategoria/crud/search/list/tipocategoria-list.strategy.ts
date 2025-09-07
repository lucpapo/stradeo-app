import { ListStrategy, FilterState } from '@pcodeshared/components/base-list';
import { TipocategoriaFilterValue } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';

/**
 * Estratégia específica para listagem de Tipo Categoria
 * Implementa as regras de negócio específicas desta entidade
 */
export class TipocategoriaListStrategy extends ListStrategy<TipocategoriaFilterValue, TipoCategoria> {

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