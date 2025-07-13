import api from "@/api/axios";
import type { CreateCategorySchema } from "@/schemas/products/categories";
import type { Category } from "@/types/produtos/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



//Busca as categorias dos produtos
export const useCategories = () => {

  const queryClient = useQueryClient();

  // Busca as categorias
  const fetchCategories = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categorias');
      return response.data;
    },
  });

  // Cria uma categoria
  const createCategory = useMutation({
    mutationFn: async (data: CreateCategorySchema) => {
      const response = await api.post('/categorias', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    }
  });


  return {
    fetchCategories,
    createCategory,
  }

 
}

