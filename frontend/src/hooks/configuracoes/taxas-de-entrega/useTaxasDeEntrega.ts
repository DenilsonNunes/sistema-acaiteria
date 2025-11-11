import api from "@/api/axios";
import type { TaxasDeEntrega } from "@/types/configuracoes/taxas-de-entrega/taxasDeEntrega";
import { useQuery } from "@tanstack/react-query";

export const useFetchAllDeliveryFee = () => {
  return useQuery<TaxasDeEntrega[]>({
    queryKey: ["deliveryFee"],
    queryFn: async () => {
      const response = await api.get("/configuracoes/taxas-de-entrega")
      return response.data;
    },
  });
};
