/**
Define a estrutura de dados para a entidade Categoria.
Esta interface é usada em toda a aplicação para garantir a tipagem correta dos dados
que vêm da API.
*/
export interface Categoria {
id?: number | null;
concessao_id?: number;
descricao?: string;
numero_eixos?: number;
tipo_categoria_id?: number;
codigo_tarifa_basica?: number;
codigo_categoria_adm?: number;
codigo_poder_concedente?: number;
considera_trafego?: number;
ordem?: number;
tipo?: number;
maximo_eixos_suspenso?: number;
eixos_equivalentes?: number;
data_cadastro?: Date;
usuario_cadastro?: number;
data_atualizacao?: Date;
usuario_atualizacao?: number;
status_delecao?: number;
}