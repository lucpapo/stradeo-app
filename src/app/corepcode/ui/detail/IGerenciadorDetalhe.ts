// Arquivo: src/app/pcode/ui/detail/IGerenciadorDetalhe.ts
import { Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeyInput } from '@pcode/api';

export interface IGerenciadorDetalhe<TItem, TKey extends KeyInput> {
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  readonly item: Signal<TItem | null>;
  readonly id: Signal<TKey | null>;
  readonly mode: Signal<'create' | 'view' | 'edit'>;
  readonly isViewMode: Signal<boolean>;
  readonly form: FormGroup;

  /** Carrega os dados iniciais com base na rota */
  loadFromRoute(): void;

  /** Salva os dados do formulário (cria ou atualiza) */
  save(): Promise<void>;
}