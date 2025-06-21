import api from "@/api/axios";
import type { Category } from "@/types/produtos/category";
import { useQuery } from "@tanstack/react-query";



//Busca as categorias dos produtos
export const useCategories = () => {

  return useQuery<Category[]>({

    queryKey: ['categories'],
    queryFn: async () => {

      const response = await api.get('/categorias');
      return response.data;
      
    },
  });

}

