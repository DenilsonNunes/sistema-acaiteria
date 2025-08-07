"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Soup } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Badge } from "@/components/ui/badge"

import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import type { Orders } from "@/types/sales/orders/orders"
import { DeleteButton } from "@/components/button/delete-button"
import { EditButton } from "@/components/button/edit-button"
import { DuplicateButton } from "@/components/button/duplicate-button"
import { PedidoStatus } from "@/types/sales/sales_order/salesOrder"
import { formatDateTime } from "@/utils/formateDateTime"




export const columns: ColumnDef<Orders>[] = [
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
            Nº Pedido
            <ArrowUpDown />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("id")}</div>,
    meta: {
      label: "Nº Pedido", // <- nome amigável para dropdown de colunas
    }
  },

  {
    accessorKey: "nomeCliente",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button 
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue("nomeCliente")}
      </div>
    ),
    meta: {
      label: "Cliente", // <- nome amigável para dropdown de colunas
    }
  },

  {
    accessorKey: "observacao",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Observação
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="text-left">
          {row.getValue("observacao")}
        </div>
      )
    }
  },

  {
    accessorKey: "valorTotal",
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
      const preco = row.getValue("valorTotal")
      return <div className="text-center">{formatarMoedaBRL(Number(preco))}</div>
    },
  },

    {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (

        <div className="flex w-48 justify-center">
          <>
            {status === PedidoStatus.AGUARDANDO_PRODUCAO ? (
              <Badge className="w-full bg-blue-100 text-blue-500 px-1.5 rounded leading-tight">
                Aguardando Produção
              </Badge>
            ) : status === PedidoStatus.EM_PRODUCAO ? (
              <Badge className="w-full bg-yellow-100 text-yellow-600 px-1.5 rounded leading-tight">
                Em Produção
              </Badge>
            ) : status === PedidoStatus.CONCLUIDO_PRODUCAO ? (
              <Badge className="w-full bg-green-100 text-green-600 px-1.5 rounded leading-tight">
                Produção Concluída
              </Badge>
            ) :  status === PedidoStatus.PARA_ENTREGA ? (

              <Badge className="w-full bg-violet-200 text-violet-500 px-1.5 rounded leading-tight">
                Para Entrega
              </Badge>
        
            ) : status === PedidoStatus.AGUARDANDO_RETIRADA ? (

              <Badge className="w-full bg-orange-100 text-orange-500 px-1.5 rounded leading-tight">
                Aguardando Retirada
              </Badge>

            ) : status === PedidoStatus.CONCLUIDO ? (

              <Badge className="bg-green-100 text-green-500 px-1.5 rounded leading-tight">
                Concluído / Pagamento recebido
              </Badge>

            ) : status === PedidoStatus.CANCELADO ? (

              <Badge className=" w-full bg-red-100 text-red-500 px-1.5 rounded leading-tight">
                Cancelado
              </Badge>

            ) : (
              <Badge className="bg-gray-100 text-gray-500 px-1.5 rounded leading-tight">
                Outro Status
              </Badge>
            )}
          </>
  
        </div>
      )
    }

  },

  {
    accessorKey: "data_criacao",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data Criação
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const data: string = row.getValue("data_criacao");
      return (
        <div className="text-center">{formatDateTime(data)}</div>
      )

    },
    meta: {
      label: "Data Criação", // <- nome amigável para dropdown de colunas
    }
  },


  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row }) => {

      return (
        <div className="flex items-center justify-center gap-1">
          <DeleteButton />  
          <DuplicateButton/>
          <EditButton />
        </div>
      )
      
    },
  },


]

