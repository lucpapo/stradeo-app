import { FilterState } from '@pcodeshared/components/base-list';

export type TipocategoriaFilterValue = {
    descricao: string;
    status_delecao: '' | '0' | '1';
};

export const TIPOCATEGORIA_FILTER_INITIAL_VALUE: TipocategoriaFilterValue = {
    descricao: '',
    status_delecao: '1'
};

/**
 * Estado do filtro TipoCategoria seguindo o padrão FilterState
 * O state provider deve fornecer este formato
 */
export type TipocategoriaFilterState = FilterState<TipocategoriaFilterValue>;

/**
 * Estado inicial do filtro com validação
 * O state provider deve inicializar com este formato
 */
export const TIPOCATEGORIA_FILTER_INITIAL_STATE: TipocategoriaFilterState = {
    data: TIPOCATEGORIA_FILTER_INITIAL_VALUE,
    valid: false // Inicialmente inválido porque descrição está vazia
};