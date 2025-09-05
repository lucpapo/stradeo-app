import { Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface IFiltroGerenciador<T extends object> {
  /** O FormGroup do Angular para ser usado no template. */
  readonly form: FormGroup;

  /** Um Signal que emite o valor atual do formulário reativamente. */
  readonly valor: Signal<T>;

  /** Atualiza parte do valor do formulário. */
  patchValue(valor: Partial<T>): void;

  /** Reseta o formulário para seu estado inicial. */
  limpar(): void;

  /** Retorna um snapshot do valor atual do formulário. */
  getValorAtual(): T;
}