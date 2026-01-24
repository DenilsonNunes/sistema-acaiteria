import * as React from "react"
import {
  AudioWaveform,
  UsersRound,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ShoppingCart,
  PackageSearch,
  CookingPot,
  BadgeDollarSign 
} from "lucide-react"


import { Routines } from "@/components/sidebar/nav-routines"
import { NavSettings } from "@/components/sidebar/nav-settings"
import { NavUser } from "@/components/sidebar/nav-user"
import { Companies } from "@/components/sidebar/companies"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// dados
const data = {
  user: {
    name: "DBARAUNA",
    email: "açai@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  companies: [
    {
      name: "Empresa teste",
      logo: GalleryVerticalEnd,
      plan: "Empresa 1",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Financeiro",
      url: "#",
      icon: BadgeDollarSign,
      isActive: true,
      items: [
        {
          title: "Financeiro",
          url: "/financeiro/home",
        },
        {
          title: "Frente de caixa",
          url: "/financeiro/frente-de-caixa",
        },
        {
          title: "Contas a receber",
          url: "/finceiro/contas-a-receber",
        },
        {
          title: "Contas a pagar",
          url: "/finceiro/contas-a-pagar",
        }
      ],
    },
    {
      title: "Vendas",
      url: "#",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Vendas",
          url: "/vendas/home",
        },
        {
          title: "Pedidos",
          url: "/vendas/pedidos",
        },
        {
          title: "PDV (Ponto de venda)",
          url: "/vendas/pdv",
        },
        {
          title: "Histórico de venda",
          url: "#",
        },
        {
          title: "Configurações",
          url: "#",
        },
      ],
    },
    {
      title: "Clientes",
      url: "#",
      icon: UsersRound,
      items: [
        {
          title: "Clientes",
          url: "/clientes/home",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Produtos",
      url: "#",
      icon: PackageSearch,
      items: [
        {
          title: "Produtos",
          url: "/produtos",
        },
        {
          title: "Categorias",
          url: "produtos/categorias",
        },
      ],
    },
    {
      title: "Cozinha",
      url: "#",
      icon: CookingPot,
      items: [
        {
          title: "Monitor de preparo",
          url: "cozinha/monitor-de-preparo",
        },
      ],
    },

  ],
  settings: [
    {
      name: "taxas de entrega",
      url: "configuracoes/taxas-de-entrega",
      icon: Frame,
    },
    {
      name: "Empresas",
      url: "configuracoes/empresas",
      icon: PieChart,
    },
    {
      name: "Implementação futura...",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarHeader>
        <Companies companies={data.companies} />
      </SidebarHeader>

      <SidebarContent>
        <Routines items={data.navMain} />
        <NavSettings settings={data.settings} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
