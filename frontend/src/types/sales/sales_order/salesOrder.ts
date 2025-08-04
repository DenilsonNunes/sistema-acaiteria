


interface Complementos {
  idComplemento: number,
  precoUnitario: number,
  quantidade: number
}


export interface ItemPedidoVenda {
  idProduto: number,
  precoUnitario: number,
  quantidade: number
  complementos?: Complementos[]
}


export type CreateSalesOrder = {
  idCliente?: number | null;
  nomeCliente?: string;
  valorTotal: number,
  observacao?: string,
  itensPedido: ItemPedidoVenda[]
}



