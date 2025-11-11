import api from "@/api/axios";
import type { Orders } from "@/types/sales/orders/orders";
import type { CreateSalesOrder, UpdateSalesOrder } from "@/types/sales/sales_order/salesOrder";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";








// Hook para listar pedidos (com ou sem filtros)
export const useFetchAllOrders = (filters?: { status?: string }) => {
  return useQuery<Orders[]>({
    queryKey: ["orders", filters], // chave muda se o filtro mudar
    queryFn: async () => {
      const response = await api.get("/pedidos", {
        params: filters, // envia os filtros como query params
      });
      return response.data;
    },
  });
};


// Hook para buscar pedido por ID
export const useFetchOrderById = (id: number) => {

  return useQuery<Orders>({
    queryKey: ["orders", id],
    queryFn: async () => {
      const response = await api.get(`/pedidos/${id}`);
      return response.data;
    },
    enabled: !!id,
    retry: false,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: undefined, // 🚨 evita mostrar dados antigos
  });

};




export const useCreateOrder = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSalesOrder) => {
      const response = await api.post("/pedidos", data);
      return response.data;
    },
    onSuccess: () => {
      // invalida cache para atualizar lista de pedidos
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};


// Deleta um pedido de venda
export const useDeleteSalesOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/pedidos/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // invalida cache da lista de pedidos
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Editar pedido
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ idPedido, data }: { idPedido: number; data: UpdateSalesOrder }) => {
      const response = await api.patch(`/pedidos/${idPedido}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};



export const useChangeKitchenOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ idOrder, status }: { idOrder: number; status: number }) => {
      const response = await api.patch(`/pedidos/${idOrder}/status-pedido-cozinha`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};




