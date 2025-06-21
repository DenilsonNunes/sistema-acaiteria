import Products from "@/pages/produtos";
import HomeCategory from "@/pages/produtos/categorias";

export const produtosRoutes = [
  { path: '/produtos', element: <Products /> },
  { path: '/produtos/categorias', element: <HomeCategory /> },
]