import api from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query"




type CreateAddOns = {

  nomeComplemento: string;
  descricao?: string;
  status: boolean;
  preco: number;
  idGrupoComplementos?: number | undefined;
  imagem?: File | null;

}



  export const useCreateAddOns = () => {

    const queryClient = useQueryClient()

    // Criação dos complementos
    const createAddOns = async (data: CreateAddOns[]) => {

    // Faz uma requisição para cada complemento
    const responses = await Promise.all(

      data.map(async (complemento) => {
        const formData = new FormData();
        formData.append('nomeComplemento', complemento.nomeComplemento);
        formData.append('descricao', complemento.descricao || '');
        formData.append('preco', complemento.preco?.toString() || '0');
        formData.append('status', String(complemento.status));
        formData.append('idGrupoComplementos', String(complemento.idGrupoComplementos)); // Mapeia grupoId para idGrupoComplementos

        if (complemento.imagem) {
          formData.append('file', complemento.imagem);
        }

        const response = await api.post('/complementos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data;
      })
    );

    return responses; // Retorna a lista de respostas

      
    };







    return useMutation({

      mutationFn: createAddOns,
      onSuccess: () => {
        // Força o React Query a buscar novamente os produtos
        queryClient.invalidateQueries({ queryKey: [''] })
      },

    })


  }