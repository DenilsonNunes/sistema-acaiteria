"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"





type Category = {
  id: number;
  descricao: string;
};

type Product = {
  id: number;
  idCategoria: number;
  descricao: string;
  preco: string; // ou `number`, se você quiser tratar o valor como numérico
  status: boolean;
  data_criacao: string; // ISO 8601 date string
  data_alteracao: string;
  categoria: Category;
};


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
    accessorKey: "categoria",
    header: () => <div className="text-right">Categoria</div>,
    cell: ({ row }) => {
      const categoria = row.original.categoria?.descricao ?? '-'
      return <div className="text-right">{categoria}</div>
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
            <Button  variant="outline" className=" cursor-pointer bg-orange-400 hover:bg-orange-300" >
              <SquarePen/>
            </Button>

          <Button  variant="destructive" className="cursor-pointer hover:bg-red-500">
            <Trash2/>
          </Button>
  
        </div>
      )
    },
  },


]

