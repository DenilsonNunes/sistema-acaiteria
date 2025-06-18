
type Category = {
  id: number;
  descricao: string;
};

export type Product = {

  id: number;
  idCategoria: number;
  idGrupoComplementos: number;

  nomeProduto: string;
  descricao: string;
  preco: string; // ou `number`, se você quiser tratar o valor como numérico
  status: boolean;
  categoria: Category;
  imagemUrl: string;

  data_criacao: string;
  data_alteracao: string;

};
