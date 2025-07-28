import api from "@/api/axios";
import type { CreateCategorySchema } from "@/schemas/products/categories";
import type { Category } from "@/types/produtos/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



//Busca as categorias dos produtos
export const useSales = () => {

  const queryClient = useQueryClient();



  // Busca vendas
  const fetchSales = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categorias');
      return response.data;
    },
  });





  // Cria um pedido de venda
  const createSalesOrder = useMutation({
    mutationFn: async (data: CreateCategorySchema) => {
      const response = await api.post('/pedidos', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    }
  });


  return {
    fetchSales,
    createSalesOrder,
  }

 
}

