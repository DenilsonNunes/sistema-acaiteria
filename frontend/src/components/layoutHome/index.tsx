import { AppSidebar } from "@/components/sidebar/app-sidebar"


import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import { useCartStore } from "@/stores/useCartStore"
import { usePedidoStore } from "@/stores/usePedidoStore"
import { ShoppingCart } from "lucide-react"

import { Link, Outlet, useLocation } from "react-router-dom"




const LayoutHome = () => {

  const {cart} = useCartStore();
  const { idPedidoEmEdicao } = usePedidoStore();

  const location = useLocation();
  const pathnameCart = location.pathname.includes('vendas/carrinho')
  const pathnameEditOrder = location.pathname.includes('vendas/pedidos') && location.pathname.includes('/editar')




  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 border-b">
            
            <div className="w-full flex items-center justify-between px-4 mr-2">



              <div className="flex items-center">
                <SidebarTrigger className="-ml-1"/>
              </div>

              {pathnameCart && cart?.itens?.length ? (
                <p className="text-2xl font-medium text-gray-800 text-center w-full">
                  {pathnameCart ?  "Resumo do pedido" : "Pedido atual"}
                </p>
              ) : (
                <></>
              )}

              {/*Se tiver em edição, mostrar o id do pedido */}
              {pathnameEditOrder &&  (

                <div className="w-full flex justify-center items-center">
                  <p className="font-medium text-2xl">Pedido #{idPedidoEmEdicao}</p>
                </div>

              )}



              {!idPedidoEmEdicao && (
                
                <Link className="relative" to='/vendas/carrinho'>

                  <ShoppingCart size={24}/>

                  { cart?.itens?.length > 0 && (
                      <span className="absolute -right-4 -top-3 bg-fuchsia-600 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
                        {cart.itens.length}
                      </span>
                    ) 
                  }
                </Link>

              )}


            </div>
          </header>


          <div className="p-4">

            <Outlet/> 

          </div>


        </SidebarInset>
      </SidebarProvider>
      

    </>
  )
}

export default LayoutHome