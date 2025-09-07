export type TipocategoriaFilterValue = {
    descricao: string;
    status_delecao: '' | '0' | '1';
};

export const TIPOCATEGORIA_FILTER_INITIAL_VALUE: TipocategoriaFilterValue = {
    descricao: '',
    status_delecao: '0'
};