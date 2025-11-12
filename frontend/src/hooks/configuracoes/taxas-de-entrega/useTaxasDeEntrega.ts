import api from "@/api/axios";
import type { CreateDeliveryFeeSchema, UpdateDeliveryFeeSchema } from "@/pages/configuracoes/taxas-de-entrega/schemas/delivery-fee.schema";
import type { TaxasDeEntrega } from "@/types/configuracoes/taxas-de-entrega/taxasDeEntrega";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchAllDeliveryFee = () => {
  return useQuery<TaxasDeEntrega[]>({
    queryKey: ["deliveryFee"],
    queryFn: async () => {
      const response = await api.get("/configuracoes/taxas-de-entrega")
      return response.data;
    },
  });
};


// Deletar taxa de entrega
export const useDeleteDeliveryFee = () => {


  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/configuracoes/taxas-de-entrega/${id}`);
      return response.data;
    },
  });

  
};


export const useCreateDeliveryFee = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDeliveryFeeSchema) => {
      const response = await api.post("/configuracoes/taxas-de-entrega", data);
      return response.data;
    },
    onSuccess: () => {
      // invalida cache para atualizar lista de taxas de entrega
      queryClient.invalidateQueries({ queryKey: ["deliveryFee"] });
    },
  });


  
};


export const useUpdateDeliveryFee = (id: number) => {

  return useMutation({
    mutationFn: async (data: UpdateDeliveryFeeSchema) => {
      const response = await api.patch(`/configuracoes/taxas-de-entrega/${id}`, data);
      return response.data;
    },
  });
  
};
