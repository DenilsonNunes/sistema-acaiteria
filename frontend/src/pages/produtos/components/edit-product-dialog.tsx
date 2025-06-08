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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CircleAlert, CircleCheck, SquarePen } from "lucide-react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import api from '@/api/axios'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import LoadingSpinner from '@/components/loading-spinner'
import { useState } from 'react'
import { DialogDescription } from '@radix-ui/react-dialog'

import type { Product } from '@/types/product'
import { Switch } from '@/components/ui/switch'




const editProductSchema = z.object({

  descricao: z.string().nonempty({message: 'A descrição não pode ser vazia'}).max(120, {message: 'Não poder ser maior que 120 caracteres.'}),
  preco: z
    .string()
    .nonempty({message: 'O valor deve ser preenchido'})
    .refine((val) => /^[0-9]+([,\.][0-9]+)?$/.test(val), {message: "Digite apenas números e vírgula para decimais"})
    .transform((val) => Number(val.replace(",", ".")))
    .pipe(z.number().positive({ message: "O preço deve ser maior que zero" })),
  status: z.boolean(),
  idCategoria: z.coerce.number({ invalid_type_error: "Selecione uma categoria" }),

})



type EditProductSchema = z.infer<typeof editProductSchema>



const EditProductDialog = ({ product } : {product: Product}) => {


  const queryClient = useQueryClient();
  const [openEditDialog, setOpenEditDialog] = useState(false);



  const { register, handleSubmit, formState: {errors}, reset, setValue, watch } = useForm({
    defaultValues: {
      idCategoria: product.idCategoria,
      status: product.status
    },
    resolver: zodResolver(editProductSchema),
  })
  // monitora o status do produto
  const status = watch("status")
  // monitor a categoria selecionada
  const categoriaSelecionada = watch("idCategoria")


  const editProduct = async (data: EditProductSchema) => {
    const response = await api.patch(`/produtos/${product.id}`, data)
    return response.data
  }




  const { mutate, isPending, isSuccess, isError, reset: mutateReset } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      reset()
      // Força o React Query a buscar novamente os produtos
      queryClient.invalidateQueries({ queryKey: ['products'] })
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
              reset({
                idCategoria: product.idCategoria,
                status: product.status,
              });
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
                  
                  <Separator  className="h-[1px] w-full bg-gray-300 mt-4"/>

                  <DialogDescription>
                  </DialogDescription>                            
              
                </DialogHeader>

                <form onSubmit={handleSubmit(handleEditProduct)}>
          
                  <div className="grid gap-4">

                    <div className="flex gap-2 items-start">
                      {/* Campo ID */}
                      <div className="flex flex-col w-24">
                        <Label className="mb-2">ID</Label>
                        <Input value={product.id} className='text-center' disabled />
                      </div>

                      {/* Campo Descrição */}
                      <div className="flex flex-col w-full">
                        <Label className="mb-2">Descrição</Label>
                        <Input defaultValue={product.descricao} {...register('descricao')} />
                        {errors.descricao  && <span className="text-red-500 text-sm mt-1">{errors.descricao.message}</span>}
                      </div>

                    </div>
                    
                    <div className="grid gap-4 items-start lg:flex lg:gap-2">

                      <div className='grid gap-2'>
                        <Label>Valor</Label>
                        <div className="relative w-full max-w-sm">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                          <Input defaultValue={product.preco} type="text" placeholder="0,00" className="pl-10" {...register('preco')}/>
                        </div>
                        {errors.preco && <span className="text-red-500 text-sm">{errors.preco.message}</span>}
                      </div>

                      <div className='grid gap-2'>

                        <Label>Categoria</Label>
                        <Select
                          value={categoriaSelecionada?.toString()}
                          onValueChange={(val) => setValue("idCategoria", Number(val))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {dataFake.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                {category.descricao}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.idCategoria && <p className="text-sm text-red-500">{errors.idCategoria.message}</p>}

                      </div>


                    </div>

                    <div className="grid gap-2">
                      <Label>Status</Label>
                      <div className="flex gap-2">
                        <Switch
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                          checked={status}
                          onCheckedChange={(checked) => setValue("status", checked)}
                        />
                        <Label className={status ? 'text-green-600' : 'text-red-600'}>{status ? "Ativo" : "Inativo"}</Label>
                      </div>

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



/*

                      <Label>Status</Label>
                      <Controller
                        name="status"
                        control={control}
                        defaultValue={product.status} // booleano
                        render={({ field }) => (
                          <RadioGroup
                            className="flex mb-3"
                            value={field.value ? "ativo" : "inativo"} // converte booleano -> string
                            onValueChange={(value) => field.onChange(value === "ativo")} // converte string -> booleano
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="ativo" className='bg-green-400'/>
                              <Label className="text-green-500">Ativo</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="inativo" className='bg-red-400' />
                              <Label className="text-red-500">Inativo</Label>
                            </div>
                          </RadioGroup>
                        )}
                      />


*/