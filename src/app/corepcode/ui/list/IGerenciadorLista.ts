import { Signal } from '@angular/core';
type KeyInput = number | string | Record<string, any>;

export interface IGerenciadorLista<TRow, TFilter, TKey extends KeyInput = number> {
  readonly loading: Signal<boolean>;
  readonly error: Signal<string | null>;
  readonly rows: Signal<TRow[]>;
  readonly total: Signal<number>;
  readonly query: Signal<{ page: number; pageSize: number; filters: TFilter }>;

  readonly maxPage: Signal<number>;
  readonly showingRange: Signal<string>;
  readonly filterValue: Signal<TFilter>;

  load(): void;
  prevPage(): void;
  nextPage(): void;
  aplicarFiltro(filtro: TFilter): void;
  limparFiltro(): void;

  /** hidrata page/pageSize/filters antes do primeiro load */
  hydrateQuery(q: { page: number; pageSize: number; filters: TFilter }): void;

  /** hidrata dados (exibir algo já salvo após refresh, opcional) */
  hydrateData(data: TRow[], total?: number): void;

  removerItem(item: TRow & { id: TKey; [key: string]: any }): Promise<void>;
}
