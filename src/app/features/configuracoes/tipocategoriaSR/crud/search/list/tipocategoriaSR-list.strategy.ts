import { Router } from '@angular/router';
// PCODE
import { AbstractListStrategy } from '@pcode/ui/base-list/list-strategy';
// STRADEO
import { TipocategoriaFilterValue } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';

/**
 * Estratégia específica para listagem de Tipo Categoria Sem Rota
 * Implementa as regras de negócio específicas desta entidade
 * Usa 'any' para permitir propriedades dinâmicas como status_delecao_descricao
 */
export class TipocategoriaSRListStrategy extends AbstractListStrategy<TipocategoriaFilterValue, any> {

  readonly baseRoute = '/configuracoes/tipocategoriaSR';

  constructor(readonly service: TipoCategoriaService, readonly router: Router) {
    super();
  }

  /**
   * Retorna as chaves do StateProvider para TipoCategoria Sem Rota
   */
  getStateKeys() {
    return {
      shellKey: 'ui-TipocategoriaSRShellComponent',
      paginationKey: 'TipocategoriaSRListPage#main',
      filterKey: 'TipocategoriaSRFilterPage#main'
    };
  }
}