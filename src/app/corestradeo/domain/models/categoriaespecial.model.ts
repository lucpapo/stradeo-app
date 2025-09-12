/**
Define a estrutura de dados para a entidade CategoriaEspecial.
Esta interface é usada em toda a aplicação para garantir a tipagem correta dos dados
que vêm da API.
*/
export interface CategoriaEspecial {
id?: number | null;
categoria_id?: number;
quantidade_eixos?: number;
categoria_adm?: number;
}