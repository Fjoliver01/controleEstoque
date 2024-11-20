export interface Produto {
  id?: string | null;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  estoque: number;
}
