import Products from "@/pages/produtos";
import HomeCategory from "@/pages/produtos/categorias";
import ProductFormStep from "@/pages/produtos/produtos/create-product-step";


export const produtosRoutes = [
  { path: '/produtos', element: <Products /> },
  { path: '/produtos/categorias', element: <HomeCategory /> },
  { path: '/produtos/categorias/:categoryId/create-step', element: <ProductFormStep/> },
]