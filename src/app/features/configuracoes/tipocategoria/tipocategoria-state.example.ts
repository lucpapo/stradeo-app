// Exemplo de uso do StateProvider em componentes filhos
import { Component, OnInit } from '@angular/core';
import { createTipocategoriaStateRef } from './tipocategoria-state.helper';
import { StateRef } from '../../../corepcode/store/state-ref';

// Exemplo 1: Componente de Lista
@Component({
  selector: 'app-tipocategoria-list',
  template: `<!-- template aqui -->`
})
export class TipocategoriaListComponent implements OnInit {
  private stateRef: StateRef<TipocategoriaListState>;

  constructor() {
    this.stateRef = createTipocategoriaStateRef<TipocategoriaListState>('TipocategoriaListPage#main');
  }

  ngOnInit() {
    // Carrega estado salvo ou inicializa
    const savedState = this.stateRef.get();
    if (savedState) {
      this.loadFromState(savedState);
    } else {
      this.initializeDefaultState();
    }
  }

  private loadFromState(state: TipocategoriaListState) {
    // Restaura filtros, paginação, etc.
    console.log('Estado carregado:', state);
  }

  private initializeDefaultState() {
    this.stateRef.set({
      filters: {},
      pagination: { page: 1, size: 10 },
      selectedItems: []
    });
  }

  onFilterChange(filters: any) {
    this.stateRef.patch({ filters });
  }

  onPageChange(pagination: any) {
    this.stateRef.patch({ pagination });
  }
}

// Exemplo 2: Componente de Filtro (linkado ao componente de lista)
@Component({
  selector: 'app-tipocategoria-filter',
  template: `<!-- template aqui -->`
})
export class TipocategoriaFilterComponent implements OnInit {
  private stateRef: StateRef<TipocategoriaFilterState>;

  constructor() {
    this.stateRef = createTipocategoriaStateRef<TipocategoriaFilterState>('TipocategoriaFilterPage#main');
  }

  ngOnInit() {
    // Link para o filtro do componente de lista
    this.stateRef.linkTo('TipocategoriaListPage#main.value.filters');
    
    const currentFilters = this.stateRef.linked();
    if (currentFilters) {
      this.loadFilters(currentFilters);
    }
  }

  private loadFilters(filters: any) {
    console.log('Filtros linkados:', filters);
  }

  onFilterSubmit(filters: any) {
    this.stateRef.set({ filters });
  }
}

// Interfaces de estado
interface TipocategoriaListState {
  filters: any;
  pagination: { page: number; size: number };
  selectedItems: any[];
}

interface TipocategoriaFilterState {
  filters: any;
}