import api from "@/api/axios";
import type { CreateSalesOrder } from "@/types/sales/sales_order/salesOrder";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


















//Busca as categorias dos produtos
export const useSales = () => {

  const queryClient = useQueryClient();



  const fetchOrders = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await api.get('/pedidos');
      return response.data;
    },
  });




  // Cria um pedido de venda
  const createSalesOrder = useMutation({
    mutationFn: async (data: CreateSalesOrder) => {

      const response = await api.post('/pedidos', data);
      return response.data;

    },

  });


  return {
    fetchOrders,
    createSalesOrder,
  }

 
}

