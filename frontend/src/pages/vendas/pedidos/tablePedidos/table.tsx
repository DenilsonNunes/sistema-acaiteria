import { columns } from "./columns"
import { DataTablePedidos } from "./data-table"
import { useSales } from "@/hooks/sales/useSales";





const TablePedidos = () => {

  const { fetchOrders } = useSales();
  const {data, isLoading, isError} = fetchOrders;



  return (
    <div>
      <DataTablePedidos columns={columns} data={data || []} isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default TablePedidos



