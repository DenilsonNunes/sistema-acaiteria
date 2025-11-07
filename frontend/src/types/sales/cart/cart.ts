export interface ComplementoItemCart {
  id: number;
  idGrupoComplementos: number;
  nomeComplemento: string;
  quantidade: number;
  precoUnitario: number;
}

export interface ItemCart {
  uuid: string;
  id: number;
  nomeProduto: string;
  imagemUrl?: string;
  precoUnitario: number;
  quantidade: number;
  complementos?: ComplementoItemCart[];
};

export interface Cart {

  idCliente?: number;
  nomeCliente?: string;

  localConsumo: number;

  valorTotalCart: number;
  itens: ItemCart[]

};
