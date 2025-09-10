import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@pcode/api';
import { TipoCategoria } from '@stradeo/domain/models/tipocategoria.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoCategoriaService extends BaseService<
  TipoCategoria,
  Record<string, any>, 
  number
> {
  constructor() {
    const http = inject(HttpClient);
    super(http, `${environment.apiBase}/tipocategoria`);
  }

 
  
}