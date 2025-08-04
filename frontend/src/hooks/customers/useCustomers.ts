import api from "@/api/axios";
import type { Customer } from "@/types/customer/customer";
import type { CreateSalesOrder } from "@/types/sales/sales_order/salesOrder";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";







export function useFetchCustomersByNameOrSurname(term: string) {
  return useQuery<Customer[]>({
    queryKey: ['customers', term],
    queryFn: async () => {
      const response = await api.get(`/clientes/search?term=${encodeURIComponent(term)}`);
      return response.data;
    },
    enabled: !!term,
      refetchOnWindowFocus: false,
  });
}
    



//Busca as categorias dos produtos
export const useCustomers = () => {

  const queryClient = useQueryClient();

 

  
  const fetchCustomers = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const response = await api.get('/clientes');
      return response.data;
    },
  });





  // Cria cliente
  const createCustomer = useMutation({
    mutationFn: async (data: CreateSalesOrder) => {

      const response = await api.post('/clientes', data);
      return response.data;

    },
    onSuccess: (data) => {

    toast.success('Pedido criado com sucesso!', {
      description: `Nº do pedido: `,
      richColors: true,
      duration: 5000,
      position: 'top-right',
    });

    queryClient.invalidateQueries({ queryKey: ['customers'] });
      
    }
  });


  return {
    fetchCustomers,
    createCustomer,
    fetchCustomersByIdOrSurname
  }

 
}

