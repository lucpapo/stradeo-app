// src/app/corestradeo/project/services/tipocategoria.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@pcode/api';
import { environment } from '../../../environments/environment';
 
export interface TipoCategoria {
  id: number;
  descricao: string;
  status_delecao: '0' | '1';
}

@Injectable({ providedIn: 'root' })
export class TipoCategoriaService extends BaseService<TipoCategoria, number> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBase}/tipocategoria`, 'modern', 'path');
  }
}
