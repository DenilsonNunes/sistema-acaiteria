


type Complementos = {
  idComplemento: number,
  precoUnitario: number,
  quantidade: number
}


type ItensPedidoVenda = {
  idProduto: number,
  precoUnitario: number,
  quantidade: number
  complementos?: Complementos[]
}


export type CreateSalesOrder = {
  idCliente: number,
  idUsuario: number,
  valorTotal: number,
  observacao?: string,
  itensPedido: ItensPedidoVenda[]
}