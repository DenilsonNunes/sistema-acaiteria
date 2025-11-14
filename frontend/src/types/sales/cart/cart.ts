export interface ComplementoItemCart {
  id: number;
  idGrupoComplementos: number;
  nomeComplemento: string;
  quantidade: number;
  precoUnitario: number;
}

export interface ItemCart {
  id: number;
  uuid: string;
  nomeProduto: string;
  imagemUrl?: string;
  precoUnitario: number;
  quantidade: number;
  observacaoItem?: string;
  complementos?: ComplementoItemCart[];
};


export interface Cart {

  idCliente?: number;
  nomeCliente?: string;
  observacao?:string;
  localConsumo: number;
  
  valorSubTotalCart?: number;
  valorTotalCart?: number;

  itens: ItemCart[]
  localEntrega?: LocalEntrega;

};


export interface LocalEntrega {
  id: number;
  bairroRegiao: string;
  valor: number;
};