import api from "@/api/axios";
import type { CreateDeliveryFeeSchema, UpdateDeliveryFeeSchema } from "@/pages/configuracoes/taxas-de-entrega/schemas/delivery-fee.schema";
import type { Companies } from "@/types/companies/companies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchAllCompanies = () => {
  return useQuery<Companies[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await api.get("/configuracoes/empresas")
      return response.data;
    },
  });
};


// Deletar taxa de entrega
export const useDeleteCompany = () => {


  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/configuracoes/empresas/${id}`);
      return response.data;
    },
  });

  
};


export const useCreateCompany = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDeliveryFeeSchema) => {
      const response = await api.post("/configuracoes/empresas", data);
      return response.data;
    },
    onSuccess: () => {
      // invalida cache para atualizar lista de taxas de entrega
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });


  
};


export const useUpdateDeliveryFee = (id: number) => {

  return useMutation({
    mutationFn: async (data: UpdateDeliveryFeeSchema) => {
      const response = await api.patch(`/configuracoes/empresas/${id}`, data);
      return response.data;
    },
  });
  
};
