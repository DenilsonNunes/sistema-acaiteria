import { useFetchCustomer } from "@/hooks/customers/useCustomers";
import { columns } from "./columns"
import { DataTableCustomer } from "./data-table"
import { useState } from "react";





const TableCustomer = () => {


  const [limit, setLimit] = useState("10")

  const {data, isLoading, isError} = useFetchCustomer(Number(limit));


  return (
    <div>
      <DataTableCustomer 
        columns={columns} 
        data={data || []} 
        isLoading={isLoading} 
        isError={isError} 
        limitPerPage={limit}
        onChangeLimitPerPage={setLimit} // passa o setter
      />
    </div>
  )
}

export default TableCustomer



