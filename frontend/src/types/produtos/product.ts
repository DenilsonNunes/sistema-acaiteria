import type { AddOnGroup } from "./addOonGroup";

type Category = {
  id: number;
  descricao: string;
};

export type Product = {

  id: number;
  idCategoria: number;

  nomeProduto: string;
  descricao: string;
  preco: string; // ou `number`, se você quiser tratar o valor como numérico
  status: boolean;
  categoria: Category;
  imagemUrl: string;

  GrupoComplementos: AddOnGroup[];

  data_criacao: string;
  data_alteracao: string;

};
