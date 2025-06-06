import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

import { CircleAlert, CircleCheck, PackagePlus  } from "lucide-react"
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from "@radix-ui/react-select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/api/axios"
import LoadingSpinner from "@/components/loading-spinner"




const createProductSchema = z.object({
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


type CreateProductSchema = z.infer<typeof createProductSchema>


const CreateProductDialog = () => {

   const queryClient = useQueryClient();


  const {control, register, handleSubmit, formState: {errors}, reset} = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      status:  true
    }
  })

  
  const createProduct = async (data: CreateProductSchema) => {
    const response = await api.post('/produtos', data)
    return response.data
  }

  const { mutate, isPending, isSuccess, isError, reset: mutateReset } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Força o React Query a buscar novamente os produtos
      queryClient.invalidateQueries({ queryKey: ['products'] })
      reset()
    },
    onError: () => {
      reset()
    },
  })

  
  const handleCreateProduct = (data: CreateProductSchema) => {
    mutate(data)
  }


  const dataFake = [
    {id: 1 , descricao: 'Açai'},
    {id: 2 , descricao: 'Sorvete'},
    {id: 3 , descricao: 'MilkShake'},
    {id: 4 , descricao: 'Adicional'},
  ]


  return (

    <div className="mx-4 mt-2">
      <Dialog onOpenChange={(open)=>{
          if (!open) {
            reset() // reseta o formulario
            mutateReset() // resetar o mutate
          }
      }}>

        <DialogTrigger asChild>

          <Button variant="outline" className="cursor-pointer">
            <PackagePlus />
            Criar Produto
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
                <DialogTitle>Criar Produto</DialogTitle>
                {/*              
                  <DialogDescription>
                  teste
                  </DialogDescription>                            
                  */}
              </DialogHeader>

              <form onSubmit={handleSubmit(handleCreateProduct)}>
        
                <div className="grid gap-4">

                  <div className="grid">
                    <Label className="mb-3">Descrição</Label>
                    <Input placeholder="Ex: Copo 400ml" {...register('descricao')}/>
                    {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
                  </div>
                  
                  <div className="grid">
                    <Label className="mb-3">Valor</Label>
                    <Input type="text" placeholder="Ex: 25,00" {...register('preco')}/>
                    {errors.preco && <span className="text-red-500 text-sm">{errors.preco.message}</span>}
                  </div>

                  <div className="grid gap-3 mb-4">
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          value={field.value ? "ativo" : "inativo"}
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

                  <Controller
                    name="idCategoria"
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <div>
                        <Label className="mb-3">Categoria</Label>
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
              <h1 className="font-medium text-gray-500">Produto criado com sucesso</h1>
            </div>
            
          }

          {isError && 

            <div className="flex flex-col items-center mt-4  gap-4">
              <CircleAlert color="orange" size={96}/>
              <h1 className="font-medium">Erro ao criar o produto</h1>
            </div>
            
          }
          
        </DialogContent>


      </Dialog>
    </div>

  )
}

export default CreateProductDialog

/*
           
*/