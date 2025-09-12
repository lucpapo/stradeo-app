import { Router } from '@angular/router';
// PCODE
import { AbstractListStrategy } from '@pcode/ui/base-list/list-strategy';
// STRADEO
import { CategoriaTarifaService } from '@stradeo/services/categoriatarifa.service';
/**
Estratégia específica para listagem de CategoriaTarifa
*/
export class CategoriaTarifaListStrategy extends AbstractListStrategy < Record<string, any>, any > {
    readonly baseRoute = '/configuracoes/categoriatarifa';
    constructor(readonly service: CategoriaTarifaService, readonly router: Router) {
    super();
}
/**
Retorna as chaves do StateProvider para CategoriaTarifa
*/
getStateKeys() {
    return {
        shellKey: 'ui-CategoriaShellComponent',
        paginationKey: 'CategoriaTarifaListPage#main',
        filterKey: 'CategoriaTarifaFilterPage#main'
    };
}
} 