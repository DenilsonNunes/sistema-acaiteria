"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"

import type { Product } from "@/types/produtos/product"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"




export const columns: ColumnDef<Omit<Product, 'descricao'>>[] = [
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
        <div className="flex justify-center">
          <Button 
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>
  },

  {
    accessorKey: "",
    header: "Foto",
    cell: ({row}) => {
      const imageUrl = row.original.imagemUrl
      return (
        <div>
          <div className="flex items-center justify-center border w-20 h-16 rounded-lg overflow-hidden bg-gray-100">
            {imageUrl ? (                      
              <img
                src={imageUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />                       
            ):(
              <span className="text-sm text-gray-500">Sem Foto</span>
            )}
          </div>
        </div>
      )
    }

  },

  {
    accessorKey: "nomeProduto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("nomeProduto")}
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
          Valor Total
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const preco = row.getValue("preco")
      return <div className="text-left font-medium">{formatarMoedaBRL(Number(preco))}</div>
    },
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
    accessorKey: "preco",
    // <div className="text-center">Valor</div>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data Criação
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const preco = row.getValue("preco")
      return <div className="text-left font-medium">{formatarMoedaBRL(Number(preco))}</div>
    },
  },


  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {


      return (
        <div className="flex items-center justify-center gap-1">

        </div>
      )
      
    },
  },


]

