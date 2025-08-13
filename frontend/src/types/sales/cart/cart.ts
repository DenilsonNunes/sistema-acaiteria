export interface ItemComplemento {
  id: number;
  idGrupoComplementos: number;
  nomeComplemento: string;
  quantidade: number;
  preco: number;
}

export interface ItemCart {
  id: number;
  nomeProduto: string;
  imagemUrl?: string;
  preco: number;
  adicionais?: ItemComplemento[];
};

export interface Cart {
  id: number;
  nomeProduto: string;
  idCliente?: number;
  nomeCliente?: string;
  imagemUrl?: string;
  preco: number;
  valorTotal: number;
  precoTotalComplementos: number;
  quantidade: number;
  complementos: ItemComplemento[];
};
