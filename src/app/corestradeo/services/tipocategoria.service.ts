import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@pcode/api';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { TipocategoriaFilterValue } from 'app/features/configuracoes/tipocategoria/crud/search/filter/tipocategoria-filter.page';

import { environment } from '../../../environments/environment';
 
@Injectable({
  providedIn: 'root',
})
/**
 * A correção está na assinatura da classe. Agora especificamos que o tipo de filtro (TFilter)
 * para este serviço é 'TipocategoriaFilterValue', alinhando-o com a interface IServiceBase
 * e resolvendo o erro de incompatibilidade.
 */
export class TipoCategoriaService extends BaseService<
  TipoCategoria,          // TItem
  TipocategoriaFilterValue, // TFilter
  number                  // TKey
> {
  constructor() {
    const http = inject(HttpClient);
    
  // O construtor da classe base é chamado com o endpoint específico usando a URL base do environment.
  super(http, `${environment.apiBase}/tipocategoria`); 
  }
}
