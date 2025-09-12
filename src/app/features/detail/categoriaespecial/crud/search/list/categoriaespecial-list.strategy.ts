import { Router } from '@angular/router';
// PCODE
import { AbstractListStrategy } from '@pcode/ui/base-list/list-strategy';
// STRADEO
import { CategoriaEspecialService } from '@stradeo/services/categoriaespecial.service';
/**
Estratégia específica para listagem de CategoriaEspecial
*/
export class CategoriaEspecialListStrategy extends AbstractListStrategy < Record<string, any>, any > {
    readonly baseRoute = '/configuracoes/categoriaespecial';
    constructor(readonly service: CategoriaEspecialService, readonly router: Router) {
    super();
}
/**
Retorna as chaves do StateProvider para CategoriaEspecial
*/
getStateKeys() {
    return {
        shellKey: 'ui-CategoriaShellComponent',
        paginationKey: 'CategoriaEspecialListPage#main',
        filterKey: 'CategoriaEspecialFilterPage#main'
    };
}
}