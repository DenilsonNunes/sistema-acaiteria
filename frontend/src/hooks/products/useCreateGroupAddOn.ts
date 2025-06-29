import api from "@/api/axios";
import type { CreateGrupoComplementosSchema, FullCreateProducSchema } from "@/pages/produtos/categorias/components/create-product-step/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query"



  export const useCreateGroupAddOn = () => {

    const queryClient = useQueryClient()


    const createGroupAddOn = async (data: CreateGrupoComplementosSchema) => {

      const response = await api.post('/grupo-complementos', data);

      return response.data;
      
    };



    return useMutation({

      mutationFn: createGroupAddOn,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [''] }) // adicionar a chave que atualiza grupo de complementos.
        
      },

    })


  }