import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CircleAlert, CircleCheck, SquarePen } from "lucide-react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'

import api from '@/api/axios'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import LoadingSpinner from '@/components/loading-spinner'
import { useState } from 'react'
import { DialogDescription } from '@radix-ui/react-dialog'

import type { Product } from '@/types/product'




const editProductSchema = z.object({
  descricao: z.string().nonempty({message: 'A descrição não pode ser vazia'}),
  preco: z
    .string()
    .refine((val) => /^[0-9]+([,\.][0-9]+)?$/.test(val), {message: "Digite apenas números e vírgula para decimais"})
    .transform((val) => Number(val.replace(",", ".")))
    .pipe(z.number().positive({ message: "O preço deve ser maior que zero" })),
  status: z.boolean(),
  idCategoria: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Selecione uma categoria").transform((val) => Number(val))
  ),
})



type EditProductSchema = z.infer<typeof editProductSchema>



const EditProductDialog = ({ product } : {product: Product}) => {


  const queryClient = useQueryClient();
  const [openEditDialog, setOpenEditDialog] = useState(false);


  




  const { control, register, handleSubmit, formState: {errors}, reset } = useForm({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      status:  true
    }
  })



  const editProduct = async (data: EditProductSchema) => {
    const response = await api.patch(`/produtos`, data)
    return response.data
  }



  const { mutate, isPending, isSuccess, isError, reset: mutateReset } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      // Força o React Query a buscar novamente os produtos
      queryClient.invalidateQueries({ queryKey: ['products'] })
      reset()
    },
    onError: () => {
      reset()
    },
  })





  const handleEditProduct = (data: EditProductSchema) => {
    mutate(data)
  }



  const dataFake = [
    {id: 1 , descricao: 'Açai'},
    {id: 2 , descricao: 'Sorvete'},
    {id: 3 , descricao: 'MilkShake'},
    {id: 4 , descricao: 'Adicional'},
  ]


  return (
    <>

      <Button variant="outline" className="w-8 h-8  cursor-pointer bg-orange-500 hover:bg-orange-400" onClick={()=> setOpenEditDialog(!openEditDialog)}>
        <SquarePen/>
      </Button>

      <div>
        <Dialog
          open={openEditDialog}
          onOpenChange={(isOpen) => {
            setOpenEditDialog(isOpen);
            if (!isOpen) {
              reset(); // reseta o formulário
              mutateReset(); // reseta o mutate
            }
          }}
        >

          <DialogContent className="sm:max-w-[425px] lg:max-w-2xl">

            {isPending && 
              <div className="flex items-center justify-center">
                <LoadingSpinner size={100}/>
              </div>
            }

            {!isPending && !isSuccess && !isError &&
              <>
                <DialogHeader className="mb-4">
                  <DialogTitle>Editar Produto</DialogTitle>
                 
                  <DialogDescription>
    
                  </DialogDescription>                            
              
                </DialogHeader>

                <form onSubmit={handleSubmit(handleEditProduct)}>
          
                  <div className="grid gap-3">
                    <div className="flex gap-2 items-start">
                      {/* Campo ID */}
                      <div className="flex flex-col w-24">
                        <Label className="mb-2">ID</Label>
                        <Input value={product.id} className='text-center' disabled />
                        <div className="h-[22px]" /> 
                      </div>

                      {/* Campo Descrição */}
                      <div className="flex flex-col w-full">
                        <Label className="mb-2">Descrição</Label>
                        <Input value={product.descricao} {...register('descricao')} />
                        {errors.descricao ? (
                          <span className="text-red-500 text-sm mt-1">{errors.descricao.message}</span>
                        ) : (
                          // Espaço reservado para manter altura
                          <div className="h-[22px]" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid lg:flex gap-2">

                      <div className='grid mb-3'>
                        <Label className="mb-2">Valor</Label>
    
                        <div className="relative w-full max-w-sm">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                          <Input value={product.preco} type="text" placeholder="0,00" className="pl-10" {...register('preco')}/>
                        </div>
                        {errors.preco && <span className="text-red-500 text-sm">{errors.preco.message}</span>}
                      </div>

                    <Controller
                      name="idCategoria"
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <div className='mb-3'>
                          <Label className="mb-2">Categoria</Label>
                          <Select onValueChange={field.onChange} value={field.value ? String(field.value) : undefined}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {dataFake.map((item) => (
                                  <SelectItem key={item.id} value={String(item.id)}>
                                    {item.descricao}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {errors.idCategoria && <span className="text-red-500 text-sm">{errors.idCategoria.message}</span>}
                        </div>
                      )}
                    />


                    </div>

                    <div className="grid gap-3">

                      <Label>Status</Label>
                      <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                          className='flex mb-3'
                            value={product.status ? "ativo" : "inativo"}
                            onValueChange={(value) => field.onChange(value === "ativo")}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ativo" className="bg-green-400"/>
                              <Label className="text-green-500">Ativo</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="inativo" className="bg-red-400"/>
                              <Label className="text-red-500">Inativo</Label>
                            </div>
                          </RadioGroup>
                        )}
                      />
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
                <h1 className="font-medium text-gray-500">Produto alterado com sucesso</h1>
              </div>
              
            }

            {isError && 

              <div className="flex flex-col items-center mt-4  gap-4">
                <CircleAlert color="orange" size={96}/>
                <h1 className="font-medium">Erro ao alterar o produto</h1>
              </div>
              
            }
            
          </DialogContent>

        </Dialog>
      </div>

    
    </>

  )
}

export default EditProductDialog



