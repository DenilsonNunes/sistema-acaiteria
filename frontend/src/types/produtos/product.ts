type Category = {
  id: number;
  descricao: string;
};

export type Product = {

  id: number;
  idCategoria: number;
  descricao: string;
  preco: string; // ou `number`, se você quiser tratar o valor como numérico
  status: boolean;
  categoria: Category;
  qtdAcompanhamentos: number;

  data_criacao: string;
  data_alteracao: string;

};
