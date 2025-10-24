import Vendas from "@/pages/vendas/home";
import Carrinho from "@/pages/vendas/carrinho";
import Pedidos from "@/pages/vendas/pedidos";
import EditOrder from "@/pages/vendas/pedidos/Edit";
import Pdv from "@/pages/vendas/pdv";
import SelecaoAcompanhamentos from "@/pages/vendas/components/selecao-acompanhamentos";



export const vendasRoutes = [
  { path: '/vendas/home', element: <Vendas /> },
  { path: '/vendas/pedidos', element: <Pedidos /> },
  { path: '/vendas/pedidos/:idPedido/editar', element: <EditOrder /> },
  { path: '/vendas/pdv', element: <Pdv /> },
  {
    path: '/vendas/pdv/produto/:id/selecao-acompanhamentos',
    element: <SelecaoAcompanhamentos />,
  },
  { path: '/vendas/carrinho', element: <Carrinho /> },
]