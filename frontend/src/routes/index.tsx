import { createBrowserRouter } from "react-router-dom";


import Home from "../pages/home";
import NotFound from "../pages/notFound";
import Login from "../pages/login";
import LayoutHome from "../components/layoutHome";


import { PrivateRoute } from "./private-routes";
import { vendasRoutes } from "./rotinas/vendas.routes";
import { produtosRoutes } from "./rotinas/produtos.routes";
import { cozinhaRoutes } from "./rotinas/cozinha.routes";
import { clientesRoutes } from "./rotinas/clientes.routes";
import { financeiroRoutes } from "./rotinas/financeiro.routes";



const routes = createBrowserRouter([
  // Rotas protegidas
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <LayoutHome />,
        children: [
          { path: '/home', element: <Home /> },
          ...vendasRoutes,
          ...financeiroRoutes,
          ...produtosRoutes,
          ...cozinhaRoutes,
          ...clientesRoutes
        ],
      },
    ],
  },
  // Rota pública
  { path: '/auth/login', element: <Login /> },
  { path: '*', element: <NotFound /> },
]);

export { routes };

