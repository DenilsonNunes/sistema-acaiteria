import { columns } from "./columns"
import { DataTableCompanies } from "./data-table"
import { useFetchAllCompanies } from "@/hooks/configuracoes/empresas/useCompany";





const TableCompanies = () => {



  const {data, isLoading, isError} = useFetchAllCompanies();


  return (
    <div>
      <DataTableCompanies 
        columns={columns} 
        data={data || []} 
        isLoading={isLoading} 
        isError={isError} 
      />
    </div>
  )
}

export default TableCompanies



