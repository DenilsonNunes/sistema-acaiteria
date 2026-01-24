"use client"

import { useState } from "react"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnMeta,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"






import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ChevronDown } from "lucide-react"
import type { Product } from "@/types/produtos/product"
import LoadingSpinner from "@/components/loading-spinner"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { DeleteButton } from "@/components/button/delete-button"
import { FilterButton } from "@/components/button/filter-button"
import { Label } from "@/components/ui/label"




interface CustomColumnMeta<TData, TValue> {
  label?: string;
}

// Atualize a interface DataTableProps
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  isError?: boolean;
} 

export function DataTableCompanies<TData, TValue>({columns, data, isLoading, isError}: DataTableProps<TData, TValue>) {


  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedRows = table.getSelectedRowModel().rows;


  return (


    <div className="w-full">

      <div className="flex gap-4 mb-4">

        <Input
          placeholder="Pesquise pela empresa"
          value={
            (table.getColumn("xNome")?.getFilterValue() as string)
          }
          onChange={(event) => {
            const value = event.target.value;
            table.getColumn("xNome")?.setFilterValue(value);
          }}
          className="max-w-sm"
        />

      
        <Sheet>
          <SheetTrigger asChild>
            <FilterButton/>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                
              </SheetDescription>
            </SheetHeader>

            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-name">Local consumo</Label>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="sheet-demo-username">Username</Label>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </div>
            </div>


            <SheetFooter>
              <Button type="submit">Aplicar</Button>
              <SheetClose asChild>
                <Button variant="outline">Fechar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

      </div>
    



      <div className="rounded-md border">

        <div className="flex justify-between m-2">

          
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              {selectedRows.length > 1 && (
                <div className="flex items-center gap-2">
                  <p>Ações em lote:</p>

                  <DeleteButton
                    disabled={selectedRows.length === 0}
                    onClick={() => {
                      const selectedIds = table.getSelectedRowModel().rows.map(
                        (row) => (row.original as Product).id
                      );
                      // Aqui você pode chamar sua função de delete
                    }}                                                        
                  />
                </div>
              )}
            </div>

            {/* Personalizar colunas */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Personalizar colunas <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {(column.columnDef.meta as CustomColumnMeta<TData, TValue> | undefined)?.label ?? column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

          </div>


        </div>


        <Table>
          <TableHeader className="border-t">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          
          <TableBody>

            {isLoading ? (

              <TableRow>
                <TableCell colSpan={columns.length} className="p-8">
                  <div className="flex justify-center items-center w-full">
                    <LoadingSpinner size={120} />
                  </div>
                </TableCell>
              </TableRow>

            ) : isError ? (

              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500 font-medium"
                >
                  Houve um erro ao buscar os produtos, tente novamente mais tarde!
                </TableCell>
              </TableRow>

            ) : table.getRowModel().rows.length > 0 ? (

              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))

            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center font-medium text-red-500"
                >
                  Nenhum resultado
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>


      </div>


      <div className="flex items-center justify-end space-x-2 py-4">

        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de {" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>

        <div className="space-x-2">

          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext  href="#" />
              </PaginationItem>

            </PaginationContent>
          </Pagination>

        </div>

      </div>

      <div>

      </div>

    </div>
  )
}



