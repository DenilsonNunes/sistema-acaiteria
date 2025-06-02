"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"



export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type Product = {
  id: number,
  descricao: string,
  preco: string,
  status: boolean,
  idCategoria: number,
  data_criacao: Date,
  data_alteracao: Date,
}



export const columns: ColumnDef<Product>[] = [
  {
    id: "select",

    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => <div className="text-left">{row.getValue("id")}</div>
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <div className="capitalize">
          {status ? (
            <Badge variant="outline" className="bg-green-100 text-green-500 px-1.5">
              ativo
            </Badge>
          ): (
            <Badge variant="outline" className="bg-red-100 text-red-500 px-1.5">
              inativo
            </Badge>
          )}
        </div>
      )
    }

  },

  {
    accessorKey: "descricao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("descricao")}</div>,
  },

  {
    accessorKey: "preco",
    header: () => <div className="text-center">Valor</div>,
    cell: ({ row }) => {
      const preco = parseFloat(row.getValue("preco"))
      // Format the preco as a dollar preco
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(preco)
      return <div className="text-center font-medium">{formatted}</div>
    },
  },

  {
    accessorKey: "Categoria",
    header: () => <div className="text-right">Categoria</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("Categoria")}25</div>
    },
  },


  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {

      const product = row.original

      return (
        <div className="flex items-center justify-center gap-2">
            <Button size='sm' variant="outline" className="p-0" >
              <SquarePen/>
            </Button>

          <Button size='sm' variant="destructive" className="p-0">
            <Trash2/>
          </Button>
  
        </div>
      )
    },
  },


]

/*
export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",

    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


*/