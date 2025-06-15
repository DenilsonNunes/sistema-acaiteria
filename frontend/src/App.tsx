import { createBrowserRouter } from "react-router-dom";


import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Products from "./pages/produtos";
import Login from "./pages/login";
import LayoutHome from "./components/layoutHome";
import Teste from "./pages/teste";
import PedidoDeVenda from "./pages/vendas/pedido_de_venda";
import Categorias from "./pages/produtos/categorias";
import Vendas from "./pages/vendas";
import SelecionarAcompanhamentos from "./pages/vendas/pedido_de_venda/selecionar-acompanhamentos";
import MonitorPreparo from "./pages/cozinha/monitor-de-preparo";
import Carrinho from "./pages/vendas/carrinho";


const routes = createBrowserRouter([

  {
    element: <LayoutHome/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      //PRODUTOS
      {
        path: '/produtos',
        element: <Products/>
      },
      {
        path: '/categorias',
        element: <Categorias/>
      },

      //VENDAS
      {
        path: '/vendas',
        element: <Vendas/>
      },
      {
        path: '/vendas/pedido-de-venda',
        element: <PedidoDeVenda/>
      },
      {
        path: '/vendas/pedido-de-venda/produto/:id',
        element: <SelecionarAcompanhamentos/>
      },
      {
        path: '/vendas/carrinho',
        element: <Carrinho/>
      },

      // COZINHA
      {
        path: '/monitor-de-preparo',
        element: <MonitorPreparo/>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/teste',
    element: <Teste/>
  },
  {
    path: '*',
    element: <NotFound/>
  },


])

export {routes}


