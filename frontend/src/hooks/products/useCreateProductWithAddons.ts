import api from "@/api/axios";
import type { FullCreateProducSchema } from "@/pages/produtos/categorias/components/create-product-step/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCreateAddOns } from "./useCreateAddOns";
import { useCreateGroupAddOn } from "./useCreateGroupAddOn";
import { useCreateProduct } from "./useCreateProduct";



export const useCreateProductWithAddons = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: createGroupAddOn } = useCreateGroupAddOn();
  const { mutateAsync: createAddOns } = useCreateAddOns();

  return useMutation({

    mutationFn: async (data: FullCreateProducSchema) => {


      console.log('Chegou os dados para criar', data);

      // Salva o produto primeiro
      const productResponse = await createProduct(data.produto);
      const productId = productResponse.id; // Supõe que a API retorna o ID do produto


      // Se tem complementos, salva grupo e complementos
      if (data.grupoComplementos && data.complementos) {

        // Salva o grupo de complementos, associando ao produto
        const groupResponse = await createGroupAddOn({
          ...data.grupoComplementos,
          idProduto: productId
        });
        const groupId = groupResponse.id; 

        
        // Salva os complementos, associando ao grupo
        const complementosWithGrupoId = data.complementos.map(complemento => ({
          ...complemento,
          idGrupoComplementos: groupId,
        }));

        await createAddOns(complementosWithGrupoId);
        
      }

      return { productId };
    },
    onSuccess: () => {
      // // Invalida as queries relevantes para atualizar a UI
      // queryClient.invalidateQueries({ queryKey: ['products'] });
      // queryClient.invalidateQueries({ queryKey: ['groupAddOns'] });
      // queryClient.invalidateQueries({ queryKey: ['addOns'] });
    },
    onError: (error) => {
      console.error('Erro ao criar produto com complementos:', error);
    },
  });
};