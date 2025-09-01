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
  itensPedido: ItensPedido[],

  data_criacao: string,
  data_alteracao: string
}


interface Cliente {
  nome: string,
  apelido: string,
}


interface ItensPedido {
  id: number,
  idProduto: number,
  idPedido: number,
  precoUnitario: string,
  produtos: Produtos,
  quantidade: number,
  complementosItem: ComplementosItem[]
}

interface ComplementosItem {
  id: number,
  idComplemento: number,
  idProdutoPedido: number,
  precoUnitario: string,
  quantidade: number,
  complementos: Complementos
}



interface Produtos {
  nomeProduto: string,
  imagemUrl: string
}


interface Complementos {
  idGrupoComplementos: number,
  nomeComplemento: string
}
