import type { PedidoLocalConsumo, PedidoStatus } from "../sales_order/salesOrder"


export interface Orders {
  id: number,
  idCliente: number,
  nomeCliente: string,
  observacao: string | null,
  valorTotal: string,
  cliente: Cliente,
  status: PedidoStatus,
  localConsumo: PedidoLocalConsumo,


  data_criacao: string,
  data_alteracao: string
}


interface Cliente {
  nome: string,
  apelido: string,
}
