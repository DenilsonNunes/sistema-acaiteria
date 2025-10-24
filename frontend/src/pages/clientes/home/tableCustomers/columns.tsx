"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"

import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import { formatDateTime } from "@/utils/formateDateAndTime"
import type { Customer } from "@/types/customer/customer"
import DeleteCustomerDialog from "../../components/delete-customer-dialog"
import ViewCustomerDialog from "../../components/view-customer-dialog"



import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import EditCustomerDialog from "../../components/edit-customer-dialog"


export const columns: ColumnDef<Customer>[] = [
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
  accessorKey: "nome",
  header: ({ column }) => (
    <div className="flex justify-center">
      <Button 
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  ),
  cell: ({ row }) => (
    <div className="text-left">
      {row.getValue("nome")}
    </div>
  ),
  meta: {
    label: "Nome", // <- nome amigável para dropdown de colunas
  }
  },

  {
    accessorKey: "apelido",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button 
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apelido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue("apelido")}
      </div>
    ),
    meta: {
      label: "Apelido", // <- nome amigável para dropdown de colunas
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
    accessorKey: "limiteCredito",
    header: ({column}) => <div className="text-center"
    >
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Limite de crédito
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>,
    cell: ({ row }) => {

      const limiteCredido = formatarMoedaBRL(row.getValue("limiteCredito"))

      return (
        <div className="text-center">{limiteCredido}</div>
      )

    },
    meta: {
      label: "Limite de crédito", // <- nome amigável para dropdown de colunas
    }
  },

  {
    accessorKey: "endereco",
    header: ({column}) => <div className="text-center"
    >
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Endereço
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("endereco")}</div>
      )

    },
    meta: {
      label: "Endereço", // <- nome amigável para dropdown de colunas
    }
  },
  {
    accessorKey: "data_criacao",
    header: ({column, table}) => {

      const todasDatasCriacao = table
      .getRowModel()
      .rows
      .map(row => String(row.getValue("data_criacao"))); 

      return (
        <>
        
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data de criação
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button className="p-1" variant="ghost">:</Button>

            </PopoverTrigger>
            <PopoverContent className="max-w-50 max-h-80 overflow-y-auto">
              <div className="grid gap-4 mb-10">
                {todasDatasCriacao.map((data, index) => (

                  <div key={index} className="flex items-center gap-2">
                    <Checkbox id="terms" />
                    <p>{formatDateTime(data)}</p>
                  </div>

                ))}
              </div>
              <div className="fixed bottom-0 p-2 left-0 w-full flex justify-between bg-white">
                <Button className="w-20 h-6 rounded-full bg-gray-500 hover:bg-gray-600">Limpar</Button>
                <Button className="w-25 h-6 rounded-full bg-fuchsia-700 hover:bg-fuchsia-600">Aplicar filtros</Button>
              </div>
            </PopoverContent>
          </Popover>
        
        </>
      )
    
    },

    cell: ({ row }) => {

      const date = row.getValue("data_criacao");

      return (
        <div className="text-center">{formatDateTime(date as string)}</div>
      )

    },
    meta: {
      label: "Data de criação", // <- nome amigável para dropdown de colunas
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
          <DeleteCustomerDialog customer={customer}/>
          <EditCustomerDialog customer={customer}/>
          <ViewCustomerDialog customer={customer}/>
        </div>
      )
      
    },
  },


]

