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
  CookingPot
} from "lucide-react"


import { Routines } from "@/components/sidebar/nav-routines"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { Companies } from "@/components/sidebar/companies"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "DBARAUNA",
    email: "açai@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
  companies: [
    {
      name: "Açaiteria Tropical",
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
      title: "Vendas",
      url: "#",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Vendas",
          url: "/vendas",
        },
        {
          title: "Pedido de venda",
          url: "/vendas/pedido-de-venda",
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
          title: "Genesis",
          url: "#",
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
          url: "/categorias",
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
          url: "/monitor-de-preparo",
        },
      ],
    },

  ],
  projects: [
    {
      name: "Implementação futura...",
      url: "#",
      icon: Frame,
    },
    {
      name: "Implementação futura...",
      url: "#",
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
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
