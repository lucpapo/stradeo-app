import { ListStrategy, NavigationStrategy } from '@pcodeshared/components/base-list';
import { TipocategoriaFilterValue } from '@stradeo/domain/types/tipocategoria-filter.types';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { TipoCategoriaService } from '@stradeo/services/tipocategoria.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

/**
 * Estratégia específica para listagem de Tipo Categoria
 * Implementa as regras de negócio específicas desta entidade
 */
export class TipocategoriaListStrategy extends ListStrategy<TipocategoriaFilterValue, TipoCategoria> implements NavigationStrategy<TipoCategoria> {

  private readonly baseRoute = '/configuracoes/tipocategoria';

  constructor(private service: TipoCategoriaService, private router: Router) {
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

  /**
   * Carrega os dados do serviço
   */
  loadDataFromService(queryParams: any): Observable<any> {
    return this.service.list(queryParams);
  }

}