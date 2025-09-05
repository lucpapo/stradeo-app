import { FormBuilder, FormGroup } from '@angular/forms';

export type KeyInput = number | string | { [k: string]: any };

export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  width?: string;
  template?: 'text' | 'badge' | 'date' | 'money';
}

export interface ListQuery {
  page?: number;
  pageSize?: number;
  q?: string;
  status?: 'A' | 'I' | 'T';
  sort?: string;
}

export interface ListResult<T> {
  data: T[];
  total?: number;
}

export interface CrudStrategy<T, TKey = KeyInput> {
  /** endpoint base da entidade (ex.: '/api/tipocategoria') */
  endpoint: string;
  /** usado para títulos e mensagens */
  entityName: string;

  columns(): ColumnDef<T>[];

  /** filtro padrão da listagem (status, paginação, etc.) */
  defaultQuery(): ListQuery;

  /** cria o form de filtro */
  buildFilterForm(fb: FormBuilder): FormGroup;

  /** cria o form de edição */
  buildForm(fb: FormBuilder, item?: Partial<T>): FormGroup;

  /** mapeia valores do form -> DTO da API */
  toDto(formValue: any): Partial<T>;

  /** mapeia DTO da API -> modelo interno */
  parse(item: any): T;

  /** extrai a chave primária do item */
  keyOf(item: T): TKey;

  /** regra de deleção */
  canDelete(item: T): boolean;

  /** opcional: chave de estado para persistir filtros */
  stateKey?: string;
}

export abstract class DefaultCrudStrategy<T, TKey = KeyInput> implements CrudStrategy<T, TKey> {
  abstract endpoint: string;
  abstract entityName: string;

  columns(): ColumnDef<T>[] { return []; }

  defaultQuery(): ListQuery { return { page: 1, pageSize: 10, status: 'A' }; }

  buildFilterForm(fb: FormBuilder): FormGroup {
    return fb.group({
      q: [''],
      status: ['A'], // <- Garante existência do control "status"
    });
  }

  buildForm(_fb: FormBuilder, _item?: Partial<T>): FormGroup {
    // Cada entidade implementa o seu
    throw new Error('buildForm não implementado');
  }

  toDto(formValue: any): Partial<T> { return formValue as Partial<T>; }

  parse(item: any): T { return item as T; }

  keyOf(_item: T): TKey { return undefined as unknown as TKey; }

  canDelete(_item: T): boolean { return true; }
}