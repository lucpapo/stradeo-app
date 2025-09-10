import { Router } from '@angular/router';
// PCODE
import { AbstractListStrategy } from '@pcode/ui/base-list/list-strategy';
// STRADEO
// REMOVA a importação do TipocategoriaFilterValue
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';

/**
 * Estratégia específica para listagem de Tipo Categoria
 */
// ALTERE O TIPO GENÉRICO AQUI
export class TipocategoriaSRListStrategy extends AbstractListStrategy<Record<string, any>, any> {

  readonly baseRoute = '/configuracoes/tipocategoria';

  constructor(readonly service: TipoCategoriaService, readonly router: Router) {
    super();
  }

  /**
   * Retorna as chaves do StateProvider para TipoCategoria
   */
  getStateKeys() {
    return {
      // Esta chave está sendo lida via DI agora, podemos remover se quiser simplificar,
      // mas por enquanto não prejudica.
      shellKey: 'ui-TipocategoriaShellComponent',
      paginationKey: 'TipocategoriaSRListPage#main',
      filterKey: 'TipocategoriaSRFilterPage#main'
    };
  }
}