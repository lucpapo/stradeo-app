/**
Define a estrutura de dados para a entidade CalendarioFeriado.
Esta interface é usada em toda a aplicação para garantir a tipagem correta dos dados
que vêm da API.
*/
export interface CalendarioFeriado {
id?: number | null;
data?: Date;
estado_id?: number;
municipio_id?: number;
tipo_feriado?: #erro#;
descricao?: string;
data_cadastro?: Date;
usuario_cadastro?: number;
data_atualizacao?: Date;
usuario_atualizacao?: number;
status_delecao?: number;
concessao_id?: number;
}