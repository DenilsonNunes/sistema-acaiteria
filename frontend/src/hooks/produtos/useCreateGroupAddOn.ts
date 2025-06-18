import api from "@/api/axios";
import type { FullCreateProducSchema } from "@/pages/produtos/categorias/components/create-product-step/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query"



  export const useCreateGroupAddOn = () => {

    const queryClient = useQueryClient()



  
    const createGroupAddOn = async (data: FullCreateProducSchema) => {

      console.log('Como chegou produtos', data.produto)

      const formData = new FormData();

      // Campos do produto
      formData.append("nomeProduto", data.produto.nomeProduto);
      formData.append("descricao", data.produto.descricao);
      formData.append("preco", data.produto.preco.toString());
      formData.append("status", String(data.produto.status));
      formData.append("idCategoria", data.produto.idCategoria.toString());

      // Adiciona imagem se existir
      if (data.produto.imagem) {
        formData.append('file', data.produto.imagem); // O nome 'file' deve bater com o backend
      }

      const response = await api.post('/produtos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
      
    };







    return useMutation({

      mutationFn: createGroupAddOn,
      onSuccess: () => {

        queryClient.invalidateQueries({ queryKey: [''] })
        
      },

    })


  }