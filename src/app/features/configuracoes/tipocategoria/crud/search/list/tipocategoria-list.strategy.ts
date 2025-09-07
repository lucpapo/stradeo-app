import { ListStrategy } from '@pcodeshared/components/base-list';
import { TipocategoriaFilterValue } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';

/**
 * Estratégia específica para listagem de Tipo Categoria
 * Implementa as regras de negócio específicas desta entidade
 */
export class TipocategoriaListStrategy extends ListStrategy<TipocategoriaFilterValue, TipoCategoria> {

  /**
   * Validações adicionais específicas para TipoCategoria
   * O state provider já valida o básico, aqui só adicionamos regras extras se necessário
   */
  protected override validateAdditionalRules(filters: TipocategoriaFilterValue): boolean {
    // Por enquanto, não temos validações extras além do que o state provider já faz
    // Se precisar de validações específicas de negócio, adicione aqui
    return true;
  }

  /**
   * Validação legacy para compatibilidade com código existente
   * Para TipoCategoria, a descrição é obrigatória
   */
  protected override validateFiltersLegacy(filters: TipocategoriaFilterValue): boolean {
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