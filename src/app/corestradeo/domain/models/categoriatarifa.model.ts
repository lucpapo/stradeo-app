/**
Define a estrutura de dados para a entidade CategoriaTarifa.
Esta interface é usada em toda a aplicação para garantir a tipagem correta dos dados
que vêm da API.
*/
export interface CategoriaTarifa {
id?: number | null;
tarifa_id?: number;
categoria_id?: number;
valor?: number;
data_cadastro?: Date;
usuario_cadastro?: number;
data_atualizacao?: Date;
usuario_atualizacao?: number;
status_delecao?: number;
}