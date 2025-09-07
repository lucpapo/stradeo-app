import { Router } from '@angular/router';
// PCODE
import { AbstractListStrategy } from '@pcode/ui/base-list/list-strategy';
// STRADEO
import { TipocategoriaFilterValue } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';

/**
 * Estratégia específica para listagem de Tipo Categoria
 * Implementa as regras de negócio específicas desta entidade
 * Usa 'any' para permitir propriedades dinâmicas como status_delecao_descricao
 */
export class TipocategoriaListStrategy extends AbstractListStrategy<TipocategoriaFilterValue, any> {

  readonly baseRoute = '/configuracoes/tipocategoria';

  constructor(readonly service: TipoCategoriaService, readonly router: Router) {
    super();
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