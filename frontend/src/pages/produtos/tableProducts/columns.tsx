"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"
import EditProductDialog from "../components/edit-product-dialog"
import DeleteProductDialog from "../components/delete-product-dialog"

import type { Product } from "@/types/product"


import fotoAcai from '../../../../public/acai.jpeg'




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
    //<div className="text-left">ID</div>,
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-left">{row.getValue("id")}</div>
  },

  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
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
    accessorKey: "",
    header: "Foto",
    cell: () => {
      return (
        <div>
          <img src={fotoAcai} alt="Foto açai" className="w-18 h-auto object-cover rounded" />
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
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("descricao")}
        </div>
      )
    }
  },

  {
    accessorKey: "preco",
    // <div className="text-center">Valor</div>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const preco = parseFloat(row.getValue("preco"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(preco)
      return <div className="text-left font-medium">{formatted}</div>
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

      const product = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <EditProductDialog product={product}/>
          <DeleteProductDialog product={product}/>
        </div>
      )
      
    },
  },


]

