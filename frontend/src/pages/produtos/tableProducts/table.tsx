import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns"
import { DataTableDemo } from "./data-table"
import api from "@/api/axios";





const TableProducts =() => {

  const { data } = useQuery({

    queryKey: ['products'],
    queryFn: async () => {

      const response = await api.get('/produtos');
      return response.data;

    },
  });


  return (
    <div className="mx-4">
      <DataTableDemo columns={columns} data={data || []} />
    </div>
  )
}

export default TableProducts



