import { Router } from '@angular/router';
// PCODE
import { AbstractListStrategy } from '@pcode/ui/base-list/list-strategy';
// STRADEO
import { CategoriaService } from '@stradeo/services/categoria.service';
/**
Estratégia específica para listagem de Categoria
*/
export class CategoriaListStrategy extends AbstractListStrategy < Record<string, any>, any > {
    readonly baseRoute = '/configuracoes/categoria';
    constructor(readonly service: CategoriaService, readonly router: Router) {
    super();
}
/**
Retorna as chaves do StateProvider para Categoria
*/
getStateKeys() {
    return {
        shellKey: 'ui-CategoriaShellComponent',
        paginationKey: 'CategoriaListPage#main',
        filterKey: 'CategoriaFilterPage#main'
    };
}
}