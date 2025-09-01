import type { Cart } from "@/types/sales/cart/cart";
import { PedidoLocalConsumo, PedidoStatus, type CreateSalesOrder } from "@/types/sales/sales_order/salesOrder";


export const buildPedidoFromCart = (
  cart: Cart, 
  observacao?: string
): CreateSalesOrder => {

  const itensPedido = cart.itens.map((item) => ({
    idProduto: item.id,
    precoUnitario: item.precoUnitario,
    quantidade: item.quantidade,
    complementos: item.complementos?.map((add) => ({
      idComplemento: add.id,
      precoUnitario: add.precoUnitario,
      quantidade: add.quantidade,
    })),
  }));


  return {
    idCliente: cart.idCliente,
    nomeCliente: cart.nomeCliente,
    valorTotal: cart.valorTotalCart,
    status: PedidoStatus.AGUARDANDO_PRODUCAO,
    localConsumo: cart.localConsumo as PedidoLocalConsumo,
    observacao,
    itensPedido,
  };
};
