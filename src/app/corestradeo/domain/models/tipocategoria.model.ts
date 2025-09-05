export interface TipoCategoria {
  id: number;
  descricao: string;
  data_cadastro: string;     // ISO
  usuario_cadastro: number;
  data_atualizacao: string;  // ISO
  usuario_atualizacao: number;
  status_delecao: number;    // 0=ativo, 1=inativo (ajuste se seu backend usar outro significado)
}
