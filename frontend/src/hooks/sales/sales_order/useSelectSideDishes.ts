import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import type { Product } from "@/types/produtos/product";





export const useSelectSideDishes = (id?: number | string) => {

  const fetchAddOnGroup = useQuery<Product>({
    queryKey: ['Dados'],
    enabled: !!id, // impede requisição se `id` for undefined
    queryFn: async () => {
      const { data } = await api.get(`/produtos/${id}/grupo-complementos`);
      return data;
    },
  });

  return {
    ...fetchAddOnGroup,
  };
};