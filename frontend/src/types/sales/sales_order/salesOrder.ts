
export const PedidoStatus = {
  AGUARDANDO_PRODUCAO: 1,
  EM_PRODUCAO: 2,
  CONCLUIDO_PRODUCAO: 3,
  AGUARDANDO_RETIRADA: 4,
  PARA_ENTREGA: 5,
  CONCLUIDO: 6,
  CANCELADO: 7,
} as const;

export type PedidoStatus = typeof PedidoStatus[keyof typeof PedidoStatus];

export const PedidoLocalConsumo = {
  ESTABELECIMENTO: 1,
  ENTREGA: 2,
  RETIRAR: 3

} as const;


export type PedidoLocalConsumo = typeof PedidoLocalConsumo[keyof typeof PedidoLocalConsumo];



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

  status: PedidoStatus;
  localConsumo: PedidoLocalConsumo;

  observacao?: string,
  itensPedido: ItemPedidoVenda[]
}

export type UpdateSalesOrder = CreateSalesOrder;

