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


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { z } from 'zod'
import {  useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import LoadingSpinner from "@/components/loading-spinner"
import { CircleAlert, CircleCheck } from "lucide-react"

import api from "@/api/axios"

import { useCategories } from "@/hooks/useCategories"



const createCategorySchema = z.object({

  descricao: z.string().nonempty({message: 'A descrição não pode ser vazia'}).max(40, {message: 'Não poder ser maior que 40 caracteres.'}),

})


type CreateCategorySchema = z.infer<typeof createCategorySchema>







const CreateCategoryDialog = () => {

  const queryClient = useQueryClient();

  const {data: dataCategories} = useCategories();



  const {register, handleSubmit, formState: {errors}, reset, watch} = useForm({
    resolver: zodResolver(createCategorySchema),
  })

  const descricao = watch('descricao')





  // Criação de produtos
  const createCategory = async (data: CreateCategorySchema) => {
    const response = await api.post('/categorias', data)
    return response.data
  }

  
  const { mutate, isPending, isSuccess, isError, reset: mutateReset } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      // Força o React Query a buscar novamente os produtos
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      reset()
    },
    onError: () => {
      reset()
    },
  })

  
  const handleCreateCategory = (data: CreateCategorySchema) => {
    mutate(data)
  }



  
  return (

    <Dialog onOpenChange={(open)=>{
        if (!open) {
          reset() // reseta o formulario
          mutateReset() // resetar o mutate
        }
    }}>

      <DialogTrigger asChild>

        <Button variant="outline" className="cursor-pointer flex items-center">
          <p className="text-lg">+</p>
          Criar categoria
        </Button>

      </DialogTrigger>



      <DialogContent className="sm:max-w-[425px]">

        {isPending && 
          <div className="flex items-center justify-center">
            <LoadingSpinner size={100}/>
          </div>
        }

        {!isPending && !isSuccess && !isError &&
          <>
            <DialogHeader className="mb-4">

              <DialogTitle>Criar Categoria</DialogTitle>
              
              <Separator  className="h-[1px] w-full bg-gray-300 mt-4"/>
              
              <DialogDescription></DialogDescription>                            
    
            </DialogHeader>

            <form onSubmit={handleSubmit(handleCreateCategory)}>
      
              <div className="grid w-full">

                <Label className="mb-2">Descrição da categoria</Label>
                <Input placeholder="Ex: Lanches / Açai / Sucos" {...register('descricao')}/>
                <div className={`flex items-center  ${errors.descricao ? 'justify-between' : 'justify-end'}`}>
                  {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
                  <p className="text-xs  text-gray-500 ">{descricao?.length ? descricao?.length : 0}/40 caracteres</p>
                </div>
        
              </div>


              <Separator  className="h-[1px] w-full bg-gray-300 my-4"/>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
      
            </form>

          </>
        
        }

        {isSuccess && 

          <div className="flex flex-col items-center mt-4  gap-4">
            <CircleCheck color="green" size={96}/>
            <h1 className="font-medium text-gray-500">Categoria criada com sucesso</h1>
          </div>
          
        }

        {isError && 

          <div className="flex flex-col items-center mt-4  gap-4">
            <CircleAlert color="orange" size={96}/>
            <h1 className="font-medium">Erro ao criar a categoria</h1>
          </div>
          
        }
        
      </DialogContent>


    </Dialog>

  )
}

export default CreateCategoryDialog

/*
           
*/