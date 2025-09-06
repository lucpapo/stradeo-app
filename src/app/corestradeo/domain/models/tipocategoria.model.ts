export interface TipoCategoria {
  id: number;
  descricao: string;
  data_cadastro: string  | null;     // ISO
  usuario_cadastro: number | null;
  data_atualizacao: string | null;  // ISO
  usuario_atualizacao: number| null;
  status_delecao: number;    // 0=ativo, 1=inativo (ajuste se seu backend usar outro significado)
}
