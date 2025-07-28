import api from "@/api/axios";
import type { AddOnGroup } from "@/types/produtos/addOonGroup";
import { useMutation } from "@tanstack/react-query";




export const useCreateGroupAddOn = () => {
  const createGroupAddOn = async (data: Omit<AddOnGroup, 'id'>[]) => {
    // Requisições paralelas com retorno do response.data
    const addOns = await Promise.all(
      data.map(async (addOn) => {
        const response = await api.post('/grupo-complementos', addOn);
        return response.data; // <- isso é essencial
      })
    );

    return addOns; // retorna um array com todos os grupos criados
  };

  return useMutation({
    mutationFn: createGroupAddOn,
  });
};
