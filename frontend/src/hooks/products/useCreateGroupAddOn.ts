import api from "@/api/axios";
import type { CreateGrupoComplementosSchema } from "@/pages/produtos/categorias/components/create-product-step/schema";
import { useMutation } from "@tanstack/react-query";


export const useCreateGroupAddOn = () => {

  // A função agora recebe um array de objetos
  const createGroupAddOn = async (data: CreateGrupoComplementosSchema[]) => {



    // fazer um requisição para cada grupo de complementos
    const addOns = await Promise.all(

      data.map(async (addOn)=> {

        await api.post('/grupo-complementos', addOn);

      })

    )

    return addOns;
    
  };

  return useMutation({
    mutationFn: createGroupAddOn,
  });
};
