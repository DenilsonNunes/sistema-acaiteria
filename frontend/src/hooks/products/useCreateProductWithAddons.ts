import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCreateAddOns } from "./useCreateAddOns";
import { useCreateGroupAddOn } from "./useCreateGroupAddOn";
import { useCreateProduct } from "./useCreateProduct";
import type { CreateProductStepSchema } from "@/pages/produtos/produtos/create-product-step/schema";



export const useCreateProductWithAddons = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: createGroupAddOn } = useCreateGroupAddOn();
  const { mutateAsync: createAddOns } = useCreateAddOns();

  return useMutation({

    mutationFn: async (data: CreateProductStepSchema) => {

      console.log(data);
      //throw new Error('Execução parada (dd)');


      // Salva o produto primeiro
      const productResponse = await createProduct({
        nomeProduto: data.nomeProduto,
        idCategoria: data.idCategoria,
        preco: data.preco,
        status: data.status,
        descricao: data.descricao,
        imagem: data.imagem
      });

      const productId = productResponse.id; //API retorna o ID do produto

      // 2. Se tem grupos de complementos
      if (data.gruposComplementos && data.gruposComplementos.length > 0) {

        // Prepara os grupos com idProduto
        const gruposResponse = data.gruposComplementos.map((grupo) => ({
          nomeGrupoComplementos: grupo.nomeGrupoComplementos,
          obrigatorio: grupo.obrigatorio,
          qtdMaxComplemento: grupo.qtdMaxComplemento,
          qtdMinComplemento: grupo.qtdMinComplemento,
          idProduto: productId
        }));

        // Cria todos os grupos de uma vez e recebe array com os grupos criados (com seus IDs)
        const gruposCriados = await createGroupAddOn(gruposResponse);

        // Para cada grupo criado, cria seus complementos associados
        for (let i = 0; i < gruposCriados.length; i++) {

          const grupoCriado = gruposCriados[i];
          const grupoOriginal = data.gruposComplementos[i];

          if (grupoOriginal.complementos && grupoOriginal.complementos.length > 0) {
            
            const complementos = grupoOriginal.complementos.map((complemento) => ({
              ...complemento,
              idGrupoComplementos: grupoCriado.id,
              descricao: complemento.descricao || ""
            }));

            await createAddOns(complementos);
          }
        }
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