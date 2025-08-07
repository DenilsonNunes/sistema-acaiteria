import type { Cart } from "@/types/sales/cart/cart";
import { LocalConsumo, PedidoStatus, type CreateSalesOrder } from "@/types/sales/sales_order/salesOrder";


export const buildPedidoFromCart = (
  cart: Cart[], 
  valorTotalCart: number,  
  idCliente: number | null, 
  nomeCliente: string,
  localConsumo: LocalConsumo,
  observacao?: string
): CreateSalesOrder => {

  const itensPedido = cart.map((item) => ({
    idProduto: item.id,
    //idCliente: 1,
    precoUnitario: item.preco,
    quantidade: item.quantidade,

    complementos: item.complementos.length > 0
      ? item.complementos.map((add) => ({
          idComplemento: add.id,
          precoUnitario: add.preco,
          quantidade: add.quantidade,
        }))
      : undefined,
  }));


  return {
    idCliente: idCliente,
    nomeCliente: nomeCliente,
    valorTotal: valorTotalCart,
    status: PedidoStatus.AGUARDANDO_PRODUCAO,
    localConsumo: localConsumo,
    observacao,
    itensPedido,
  };
};
