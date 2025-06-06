import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

import { CircleAlert, CircleCheck, Trash2} from "lucide-react"


import type { Product } from "@/types/product"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/api/axios"

import LoadingSpinner from "@/components/loading-spinner"










const DeleteProductDialog = ({ product } : {product: Product}) => {

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

     const queryClient = useQueryClient();
  


    const deleteProduct = async (id: number) => {

      const response = await api.delete(`/produtos/${id}`,)
      return response.data
  
    }
  
    const { mutate, isPending, isSuccess, isError, reset: mutateReset } = useMutation({
      mutationFn: () => deleteProduct(product.id),
    })
  


  return (

    <>

      <Button variant="destructive" className="w-8 h-8  cursor-pointer hover:bg-red-400" onClick={()=> setOpenDeleteDialog(!openDeleteDialog)}>
        <Trash2/>
      </Button>
 
      <Dialog
          open={openDeleteDialog}
          onOpenChange={(isOpen) => {
            setOpenDeleteDialog(isOpen);
            if (!isOpen) {
              mutateReset(); // reseta o mutate
              queryClient.invalidateQueries({ queryKey: ['products'] })
            }
          }}
        >

          <DialogContent className="sm:max-w-[425px] lg:max-w-2xl">

            {isPending && 
              <div className="flex items-center justify-center">
                <LoadingSpinner size={100}/>
              </div>
            }

            {isSuccess && 

              <div className="flex flex-col items-center mt-4  gap-4">
                <CircleCheck color="green" size={96}/>
                <h1 className="font-medium text-gray-500">Produto deletado com sucesso</h1>
              </div>
              
            }

            {isError && 

              <div className="flex flex-col items-center mt-4  gap-4">
                <CircleAlert color="orange" size={96}/>
                <h1 className="font-medium">Erro ao deletar o produto</h1>
              </div>
              
            }

            {!isPending && !isSuccess && !isError &&
              <>
                <DialogHeader className="mb-4">
                  <DialogTitle className="mb-6">Confirmação de exclusão</DialogTitle>
                 
                  <DialogDescription>
                    Ao excluir o produto <strong>{product.id} - {product.descricao}</strong>, todas as informações associadas a ele serão permanentemente removidas. Deseja continuar?
                  </DialogDescription>                            
              
                </DialogHeader>

                <Separator className="h-[1px] w-full bg-gray-300 my-4"/>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={() => mutate()}>Confirmar</Button>
                  </DialogFooter>
              </>
            
            }

          </DialogContent>

      </Dialog>
    
    </>
  )
}

export default DeleteProductDialog


