import { createBrowserRouter } from "react-router-dom";


import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Products from "./pages/produtos";
import Login from "./pages/login";
import LayoutHome from "./components/layoutHome";
import Teste from "./pages/teste";


const routes = createBrowserRouter([

  {
    element: <LayoutHome/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/produtos',
        element: <Products/>
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


