import { AppSidebar } from "@/components/sidebar/app-sidebar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePedidoStore } from "@/stores/usePedidoStore"
import { ShoppingCart } from "lucide-react"

import { Link, Outlet, useLocation } from "react-router-dom"




const LayoutHome = () => {

  const {cart, pedidoEmEdicao} =usePedidoStore();

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((rota) => rota); // Divide a rota e remove entradas vazias



  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 border-b">
            
            <div className="w-full flex items-center justify-between px-4 mr-2">
              <div className="flex items-center">
                
                <SidebarTrigger className="-ml-1"/>

                <Breadcrumb className="hidden sm:block">
                  <BreadcrumbList>
                    {/* Item "Home" fixo */}
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/home">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    
                    {/* Itens dinâmicos baseados na rota */}
                    {pathnames.map((rota, index) => {

                      const isLast = index === pathnames.length - 1;
                      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                      const displayName = rota.charAt(0).toUpperCase() + rota.slice(1);


                      return (
                        <div key={index} className="flex items-center gap-2"> 
                          {displayName !== 'Home' && 
                            <>                  
                              <BreadcrumbSeparator />
                              <BreadcrumbItem>
                                {isLast ? (
                                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                                ) : (
                                  <BreadcrumbLink asChild >
                                    <Link to={to}>{displayName}</Link>
                                  </BreadcrumbLink>
                                )}
                              </BreadcrumbItem>                    
                            </>                                        
                          }
                        </div>
                      );

                    })}

                  </BreadcrumbList>
                </Breadcrumb>

              </div>

              {!pedidoEmEdicao && (
                
                <Link className="relative" to='/vendas/carrinho'>

                  <ShoppingCart size={24}/>

                  { cart.itens.length > 0 && (
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