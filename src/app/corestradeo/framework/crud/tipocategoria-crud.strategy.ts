import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultCrudStrategy, ColumnDef } from './crud-strategy';
import { TipoCategoria } from '../../domain/models/tipocategoria.model';

@Injectable({
  providedIn: 'root'
})
export class TipoCategoriaCrudStrategy extends DefaultCrudStrategy<TipoCategoria, number> {
  endpoint = '/tipocategoria';
  entityName = 'Tipo de Categoria';
  stateKey = 'tipocategoria-filters';

  columns(): ColumnDef<TipoCategoria>[] {
    return [
      { key: 'id', label: 'ID', width: '80px' },
      { key: 'descricao', label: 'Descrição' },
      { key: 'status_delecao', label: 'Status', width: '100px', template: 'badge' },
      { key: 'data_cadastro', label: 'Cadastro', width: '150px', template: 'date' },
      { key: 'data_atualizacao', label: 'Atualização', width: '150px', template: 'date' }
    ];
  }

  buildForm(fb: FormBuilder, item?: Partial<TipoCategoria>): FormGroup {
    return fb.group({
      id: [{ value: item?.id || null, disabled: true }],
      descricao: [item?.descricao || '', [Validators.required, Validators.maxLength(100)]],
      status_delecao: [item?.status_delecao ?? 0, Validators.required],
      data_cadastro: [{ value: item?.data_cadastro || '', disabled: true }],
      usuario_cadastro: [{ value: item?.usuario_cadastro || '', disabled: true }],
      data_atualizacao: [{ value: item?.data_atualizacao || '', disabled: true }],
      usuario_atualizacao: [{ value: item?.usuario_atualizacao || '', disabled: true }],
    });
  }

  buildFilterForm(fb: FormBuilder): FormGroup {
    return fb.group({
      q: [''], // busca geral
      descricao: [''],
      status: ['A'], // A=Ativo, I=Inativo, T=Todos
    });
  }

  override toDto(formValue: any): Partial<TipoCategoria> {
    // Remove campos de auditoria antes de enviar para API
    const { data_cadastro, data_atualizacao, usuario_cadastro, usuario_atualizacao, ...cleanPayload } = formValue;
    return cleanPayload;
  }

  keyOf(item: TipoCategoria): number {
    return item.id;
  }

  canDelete(item: TipoCategoria): boolean {
    // Regra de negócio: só pode deletar se estiver inativo
    return item.status_delecao === 1;
  }
}