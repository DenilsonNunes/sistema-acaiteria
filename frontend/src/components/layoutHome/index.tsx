import { AppSidebar } from "@/components/home/app-sidebar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"





const LayoutHome = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-10 border-b mb-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1"/>
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className="">
              <BreadcrumbList>

                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/home">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className="hidden md:block" />

                <BreadcrumbItem>
                  <BreadcrumbPage>Produtos</BreadcrumbPage>
                </BreadcrumbItem>

              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <Outlet/>
        
      </SidebarInset>
    </SidebarProvider>
  )
}

export default LayoutHome