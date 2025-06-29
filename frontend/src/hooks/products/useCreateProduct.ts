import api from "@/api/axios";
import type { CreateProductSchema, } from "@/pages/produtos/categorias/components/create-product-step/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query"



  export const useCreateProduct = () => {

    const queryClient = useQueryClient()

    // Criação de produtos
    const createProduct = async (data: CreateProductSchema) => {

      const formData = new FormData();

      // Campos do produto
      formData.append("nomeProduto", data.nomeProduto);
      formData.append("descricao", data.descricao);
      formData.append("preco", data.preco.toString());
      formData.append("status", String(data.status));
      formData.append("idCategoria", data.idCategoria.toString());

      // Adiciona imagem se existir
      if (data.imagem) {
        formData.append('file', data.imagem); // O nome 'file' deve bater com o backend
      }

      const response = await api.post('/produtos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;

    };


    return useMutation({

      mutationFn: createProduct,
      onSuccess: () => {
        // Força o React Query a buscar novamente os produtos
        queryClient.invalidateQueries({ queryKey: ['products'] })
      },

    })


  }