import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Separator } from "@/components/ui/separator"

import { toast } from "sonner"
import Loading from "@/components/loading"
import { useState } from "react"
import { DeleteButton } from "@/components/button/delete-button"
import axios from "axios"
import type { HttpError } from "@/types/api/api"
import { useDeleteCustomer } from "@/hooks/customers/useCustomers"
import type { TaxasDeEntrega } from "@/types/configuracoes/taxas-de-entrega/taxasDeEntrega"
import { useDeleteDeliveryFee } from "@/hooks/configuracoes/taxas-de-entrega/useTaxasDeEntrega"
import { useQueryClient } from "@tanstack/react-query"







const DeleteDeliveryFeeDialog = ({ deliveryFee }: { deliveryFee: TaxasDeEntrega }) => {

  const [open, setOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);


  const {mutateAsync: deleteDeliveryFee, reset: mutateReset} = useDeleteDeliveryFee();

  const queryClient = useQueryClient();



  const handleDeleteDeliveryFee = async () => {

    setShowLoading(true);

    try {


      setTimeout(async ()=> {

        const response = await deleteDeliveryFee(deliveryFee.id);

        setOpen(false);
        setShowLoading(false);

        toast.success('Exclusão realizada', {
          description: response.message, 
          richColors: true,
          closeButton: true,
          duration: 3000,
          position: "top-right"
        })


        queryClient.invalidateQueries({ queryKey: ["deliveryFee"] });

      }, 1300)

      mutateReset();


    } catch (error) {

      setShowLoading(false);
      setOpen(false);

      if (axios.isAxiosError<HttpError>(error)) {
        const mensagem = Array.isArray(error.response?.data?.message)
          ? error.response?.data?.message.join(", ")
          : error.response?.data?.message;

        toast.error("Erro", {
          description: mensagem || "Erro ao processar a requisição.",
          richColors: true,
          closeButton: true,
          duration: 4000,
          position: "top-right",
        });
      }

    }

  }


  if(showLoading){
    return(
      <Loading/>
    )
  }


  
  return (

    <Dialog 
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          mutateReset(); // resetar mutate
        }
      }}
    >

      <DialogTrigger asChild>

        <DeleteButton size={25} /> 

      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] lg:max-w-2xl">

        <DialogHeader className="mb-4">

          <DialogTitle className="text-center text-2xl">
            Confirmação
          </DialogTitle>
          
          <DialogDescription className="text-md text-center text-black">
            {deliveryFee.id} - {deliveryFee.bairroRegiao}
          </DialogDescription>                            

        </DialogHeader>

        <p className="text-center text-gray-500">Tem certeza que deseja excluir a taxa de entrega? Essa ação não poderá ser desfeita.</p>
   
        <Separator/>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant='destructive' onClick={handleDeleteDeliveryFee}>Sim, excluir</Button>
        </DialogFooter>

      </DialogContent>


    </Dialog>
 

  )
}

export default DeleteDeliveryFeeDialog

/*
           
*/