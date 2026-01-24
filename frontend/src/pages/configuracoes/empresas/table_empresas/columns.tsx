"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"


import { formatDateTime } from "@/utils/formateDateAndTime"


import type { Companies } from "@/types/companies/companies"


export const columns: ColumnDef<Companies>[] = [
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
    accessorKey: "cod_empresa",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button 
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cod. Empresa
            <ArrowUpDown />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("cod_empresa")}</div>
  },

  {
  accessorKey: "cpf_cnpj",
  header: ({ column }) => (
    <div className="flex justify-center">
      <Button 
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CNPJ
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  ),
  cell: ({ row }) => (
    <div className="text-left">
      {row.getValue("cpf_cnpj")}
    </div>
  ),
  meta: {
    label: "CPFCNPJ", // <- nome amigável para dropdown de colunas
  }
  },

  {
    accessorKey: "xNome",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button 
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Razão Social
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue("xNome")}
      </div>
    ),
    meta: {
      label: "Razão Social", // <- nome amigável para dropdown de colunas
    }
  },

  {
    accessorKey: "fone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fone
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("fone")}</div>
    },
  },

  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (

        <div className="flex w-full justify-center">
          <>
            {status ? (
              <Badge className=" bg-green-100 text-green-500 px-1.5 rounded leading-tight">
                Ativo
              </Badge>
            ) : (
              <Badge className=" bg-red-100 text-red-500 px-1.5 rounded leading-tight">
                Inativo
              </Badge>
            )}
          </>
  
        </div>
      )
    }
  },

  {
    accessorKey: "dh_criacao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de criação
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("dh_criacao");
      return (
        <div className="text-center">{formatDateTime(date as string)}</div>
      )
    },
    meta: {
      label: "Data de criação"
    }
  },



  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Ações</div>,
    cell: ({row}) => {
      const customer = row.original;
      return (
        <div className="flex items-center justify-center gap-1">

        </div>
      )
      
    },
  },


]

