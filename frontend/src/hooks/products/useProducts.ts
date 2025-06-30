import api from "@/api/axios";
import type { Product } from "@/types/produtos/product";
import { useQuery } from "@tanstack/react-query";

//Busca as categorias dos produtos
export const useProducts = () => {

  const queryClient = useQueryClient();

  // Busca as categorias
  const fetchProducts = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/products');
      return response.data;
    },
  });

  // Cria uma categoria
  // const createCategory = useMutation({
  //   mutationFn: async (data: CreateCategorySchema) => {
  //     const response = await api.post('/categorias', data);
  //     return response.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['categories'] })
  //   }
  // });


  return {
    fetchProducts,

  }

 
}
