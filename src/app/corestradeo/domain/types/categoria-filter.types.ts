import { FilterState } from '@pcode/ui/base-list';

export type CategoriaFilterValue = {
    descricao: string;
    status_delecao: '' | '0' | '1';
};

export const CATEGORIA_FILTER_INITIAL_VALUE: CategoriaFilterValue = {
    descricao: '',
    status_delecao: '1'
};

/**
 * Estado do filtro TipoCategoria seguindo o padrão FilterState
 * O state provider deve fornecer este formato
 */
export type CategoriaFilterState = FilterState<CategoriaFilterValue>;

/**
 * Estado inicial do filtro com validação
 * O state provider deve inicializar com este formato
 */
export const CATEGORIA_FILTER_INITIAL_STATE: CategoriaFilterState = {
    data: CATEGORIA_FILTER_INITIAL_VALUE,
    valid: false // Inicialmente inválido porque descrição está vazia
};