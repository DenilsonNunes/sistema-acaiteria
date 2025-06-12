import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns"
import { DataTableProducts } from "./data-table"
import api from "@/api/axios";





const TableProducts =() => {

  const { data, isLoading, isError } = useQuery({

    queryKey: ['products'],
    queryFn: async () => {

      const response = await api.get('/produtos');
      return response.data;

    },
  });


  return (
    <div className="mx-4">
      <DataTableProducts columns={columns} data={data || []} isLoading={isLoading} isError={isError} />
    </div>
  )
}

export default TableProducts



