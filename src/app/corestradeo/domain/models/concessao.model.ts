export interface Concessao {
  total_registros: number;
  id: number;
  codigo_msg: string;
  nome: string;
  razao_concessao: string;
  cnpj_concessao: string | null;
  endereco: string | null;
  endereco_complemento: string | null;
  endereco_numero: string | null;
  bairro: string | null;
  municipio: string | null;
  uf: string | null;
  cep: string | null;
  pais: string | null;
  telefone: string | null;
  email: string | null;
  data_cadastro: string | null;
  usuario_cadastro: number | null;
  data_atualizacao: string | null;
  usuario_atualizacao: number | null;
  status_delecao: number;
  grupo_concessao_id: number;
  tx_status_delecao: string;
  tx_uf: string | null;
}

export interface ConcessaoCombo {
  id: number;
  nome: string;
  cnpj_concessao: string;
}