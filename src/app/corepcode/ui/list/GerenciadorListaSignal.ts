import { computed, signal, WritableSignal, Signal } from '@angular/core';
 
import { IGerenciadorLista } from './IGerenciadorLista';
import { IServiceBase } from '@pcode/api/IServiceBase';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

type KeyInput = number | string | Record<string, any>;

export class GerenciadorListaSignal<
  TRow,
  TFilter extends Record<string, any>,
  TKey extends KeyInput = number
> implements IGerenciadorLista<TRow, TFilter, TKey> {

  // ... (propriedades e construtor não mudam) ...
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly rows = signal<TRow[]>([]);
  readonly total = signal(0);
  readonly query: WritableSignal<{ page: number; pageSize: number; filters: TFilter }>;

  private readonly estadoInicialFiltros: TFilter;

  readonly maxPage: Signal<number>;
  readonly showingRange: Signal<string>;
  readonly filterValue: Signal<TFilter>;

  constructor(
    private readonly service: IServiceBase<TRow, TFilter, TKey>,
    estadoInicialQuery: { page: number; pageSize: number; filters: TFilter }
  ) {
    this.query = signal(estadoInicialQuery);
    this.estadoInicialFiltros = estadoInicialQuery.filters;

    this.filterValue = computed(() => this.query().filters);
    this.maxPage = computed(() => {
      const t = this.total();
      const ps = this.query().pageSize || 1;
      return Math.max(1, Math.ceil(t / ps));
    });
    this.showingRange = computed(() => {
      const q = this.query();
      const t = this.total();
      if (!t) return 'Nenhum item encontrado';
      const start = (q.page - 1) * q.pageSize + 1;
      const end = Math.min(q.page * q.pageSize, t);
      return `Mostrando ${start}–${end} de ${t}`;
    });
  }

  hydrateQuery(q: { page: number; pageSize: number; filters: TFilter }): void {
    this.query.set(q);
  }

  hydrateData(data: TRow[], total?: number): void {
    this.rows.set(data ?? []);
    if (typeof total === 'number') this.total.set(total);
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);
    const q = this.query();
    this.service.list(q).subscribe({
      next: (res) => {
        this.rows.set(res.data ?? []);
        this.total.set(res.total ?? (res.data?.length ?? 0));
        this.loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(err.message || 'Erro ao carregar os dados.');
      }
    });
  }

  prevPage(): void {
    const q = this.query();
    if (q.page <= 1) return;
    this.query.update(c => ({ ...c, page: c.page - 1 }));
    this.load();
  }

  nextPage(): void {
    const q = this.query();
    if (q.page >= this.maxPage()) return;
    this.query.update(c => ({ ...c, page: c.page + 1 }));
    this.load();
  }
  
  // <<< ADICIONANDO DE VOLTA A IMPLEMENTAÇÃO
  aplicarFiltro(filtro: TFilter): void {
    this.query.update(c => ({ ...c, page: 1, filters: filtro }));
    this.load();
  }

  limparFiltro(): void {
    this.query.update(c => ({ ...c, page: 1, filters: this.estadoInicialFiltros }));
    this.load();
  }

  async removerItem(item: TRow & { id: TKey; [key: string]: any }): Promise<void> {
    const displayProperty = (item as any).descricao || (item as any).nome || 'o item selecionado';
    if (!confirm(`Tem certeza que deseja excluir "${displayProperty}"?`)) {
      return;
    }
    this.loading.set(true);
    try {
      await firstValueFrom(this.service.delete(item.id));
      this.load();
    } catch (err: any) {
      this.error.set(err?.message || 'Erro ao excluir o item.');
      throw err;
    } finally {
      this.loading.set(false);
    }
  }
}