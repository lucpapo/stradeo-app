import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// PCODE
import { BaseService } from '@pcode/api';
// DYNAMIC IMPORTS
import { CategoriaTarifa } from '@stradeo/domain/models/categoriatarifa.model';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root',
})
export class CategoriaTarifaService extends BaseService<
CategoriaTarifa,
Record<string, any>, // Tipo para filtros (pode ser customizado se necessário)
number > // Tipo da chave primária (ajuste se for string/guid)
{
constructor() {
const http = inject(HttpClient);
// O endpoint da API é construído dinamicamente com o nome da tabela
super(http, `${environment.apiBase}/categoriatarifa`);
}
}