import Vendas from "@/pages/vendas/home";
import Carrinho from "@/pages/vendas/carrinho";
import PedidoDeVenda from "@/pages/vendas/pedido_de_venda";
import SelecionarAcompanhamentos from "@/pages/vendas/pedido_de_venda/selecionar-acompanhamentos";
import Pedidos from "@/pages/vendas/pedidos";



export const vendasRoutes = [
  { path: '/vendas/home', element: <Vendas /> },
  { path: '/vendas/pedidos', element: <Pedidos /> },
  { path: '/vendas/pedido-de-venda', element: <PedidoDeVenda /> },
  {
    path: '/vendas/pedido-de-venda/produto/:id',
    element: <SelecionarAcompanhamentos />,
  },
  { path: '/vendas/carrinho', element: <Carrinho /> },
]