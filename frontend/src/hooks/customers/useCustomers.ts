import api from "@/api/axios";
import type { CreateCustomerSchema, UpdateCustomerSchema } from "@/pages/clientes/schemas/customer.schema";
import type { Customer } from "@/types/customer/customer";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";








export function useFetchCustomersByNameOrSurname(term: string, enabled: boolean) {
  return useQuery<Customer[]>({
    queryKey: ['customers', term],
    queryFn: async () => {
      const response = await api.get(`/clientes/search?term=${encodeURIComponent(term)}`);
      return response.data;
    },
    enabled: !!term && enabled,
      refetchOnWindowFocus: false,
  });
}

// Hook para buscar pedido por ID
export const useFetchCustomerById = (id: number) => {

  return useQuery<Customer>({
    queryKey: ["customers", id],
    queryFn: async () => {
      const response = await api.get(`/clientes/${id}`);
      return response.data;
    },
    enabled: !!id, // só executa se o id for válido
  });

};
    
export const useFetchCustomer = (limit: number) => {
  return useQuery<Customer[]>({
    queryKey: ["customers", limit], // refaz a query quando o limit mudar
    queryFn: async () => {
      const response = await api.get("/clientes", {
        params: { limit }, // só envia o limite
      });
      return response.data;
    },
  });
};

export const useCreateCustomer = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCustomerSchema) => {
      const response = await api.post("/clientes", data);
      return response.data;
    },
    onSuccess: () => {
      // invalida cache para atualizar lista de clientes
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });


  
};
export const useUpdateCustomer = (id: number) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateCustomerSchema) => {
      const response = await api.patch(`/clientes${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      // invalida cache para atualizar lista de clientes
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });


  
};

export const useDeleteCustomer = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/clientes/${id}`);
      return response.data;
    },
    onSuccess: () => {
      // invalida cache para atualizar lista de clientes
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  
};
