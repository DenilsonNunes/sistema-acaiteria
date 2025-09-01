import api from "@/api/axios";
import type { Orders } from "@/types/sales/orders/orders";
import type { CreateSalesOrder, UpdateSalesOrder } from "@/types/sales/sales_order/salesOrder";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


















//Busca as categorias dos produtos
export const useSales = () => {

  const queryClient = useQueryClient();


  const fetchOrders = useQuery<Orders[]>({
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

  // Editar um pedido de venda
  const updateSalesOrder = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateSalesOrder }) => {
      const response = await api.patch(`/pedidos/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });


  // Deleta um pedido de venda
  const deleteSalesOrder = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/pedidos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });


  return {
    fetchOrders,
    createSalesOrder,
    deleteSalesOrder,
    updateSalesOrder
  }

 
}

