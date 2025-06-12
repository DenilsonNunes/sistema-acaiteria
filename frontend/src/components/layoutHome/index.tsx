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
import { Plus, ReceiptText } from "lucide-react"

import { Link, Outlet, useLocation } from "react-router-dom"




const LayoutHome = () => {

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((rota) => rota); // Divide a rota e remove entradas vazias



  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 border-b">
            <div className="flex items-center gap-2 px-4">
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
          </header>

          <Outlet/>
          
        </SidebarInset>
      </SidebarProvider>
      
      {/*Nav ações */}
      <nav className="sm:hidden flex items-center h-18 justify-between fixed bottom-0 left-0 right-0 px-4 bg-gray-300 shadow border-t z-50">

        <div className="flex flex-col items-center">
          <button>
            <ReceiptText size={28}/>
          </button>
          <p className="font-medium">Home</p>
        </div>

        <div className="flex flex-col items-center">
          <Link to='/vendas/pedido-de-venda'>
            <button className="rounded-full h-14 w-14 flex items-center justify-center bg-fuchsia-700 shadow-lg shadow-fuchsia-300 text-white transform -translate-y-4">
              <Plus size={32} />
            </button>   
          </Link>
          <p className="transform -translate-y-3.5 font-medium">Criar Pedido</p>
        </div>

        <div className="flex flex-col items-center">
          <button>
            <ReceiptText size={28}/>
          </button>
          <p className="font-medium">Pedidos</p>
        </div>


      </nav>

    </>
  )
}

export default LayoutHome