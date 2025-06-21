import Vendas from "@/pages/vendas";
import Carrinho from "@/pages/vendas/carrinho";
import PedidoDeVenda from "@/pages/vendas/pedido_de_venda";
import SelecionarAcompanhamentos from "@/pages/vendas/pedido_de_venda/selecionar-acompanhamentos";



export const vendasRoutes = [
  { path: '/vendas', element: <Vendas /> },
  { path: '/vendas/pedido-de-venda', element: <PedidoDeVenda /> },
  {
    path: '/vendas/pedido-de-venda/produto/:id',
    element: <SelecionarAcompanhamentos />,
  },
  { path: '/vendas/carrinho', element: <Carrinho /> },
]