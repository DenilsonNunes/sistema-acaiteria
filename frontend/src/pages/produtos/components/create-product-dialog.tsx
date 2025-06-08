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
import { Switch } from "@/components/ui/switch"




const createProductSchema = z.object({

  descricao: z.string().nonempty({message: 'A descrição não pode ser vazia'}).max(120, {message: 'Não poder ser maior que 120 caracteres.'}),
  preco: z
    .string()
    .refine((val) => /^[0-9]+([,\.][0-9]+)?$/.test(val), {message: "Digite apenas números e vírgula para decimais"})
    .transform((val) => Number(val.replace(",", ".")))
    .pipe(z.number().positive({ message: "O preço deve ser maior que zero" })),
  status: z.boolean(),
  idCategoria: z.coerce.number({ invalid_type_error: "Selecione uma categoria" }),

})


type CreateProductSchema = z.infer<typeof createProductSchema>


const CreateProductDialog = () => {

   const queryClient = useQueryClient();


  const {register, handleSubmit, formState: {errors}, reset, watch, setValue, trigger} = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      status:  true
    }
  })
    // monitora o status do produto
  const status = watch("status")
  // monitor a categoria selecionada
  const categoriaSelecionada = watch("idCategoria")
  


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



        <DialogContent className="sm:max-w-[425px] lg:max-w-2xl">

          {isPending && 
            <div className="flex items-center justify-center">
              <LoadingSpinner size={100}/>
            </div>
          }

          {!isPending && !isSuccess && !isError &&
            <>
              <DialogHeader className="mb-4">

                <DialogTitle>Criar Produto</DialogTitle>
                
                <Separator  className="h-[1px] w-full bg-gray-300 mt-4"/>
                
                <DialogDescription></DialogDescription>                            
      
              </DialogHeader>

              <form onSubmit={handleSubmit(handleCreateProduct)}>
        
                <div className="grid gap-4">

                  <div className="grid gap-3">
                    <Label>Descrição</Label>
                    <Input placeholder="Ex: Copo 400ml" {...register('descricao')}/>
                    {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
                  </div>

                  <div className="grid gap-4 items-start lg:flex lg:gap-4">

                    <div className="grid gap-2">
                      <Label>Valor</Label>
                      <div className="relative w-full max-w-32">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                        <Input type="text" placeholder="0,00" className="pl-10" {...register('preco')}/>
                      </div>
                      {errors.preco && <span className="text-red-500 text-sm">{errors.preco.message}</span>}
                    </div>

                      <div className='grid gap-2'>

                        <Label>Categoria</Label>
                        <Select
                          value={categoriaSelecionada?.toString() ?? ""}
                          onValueChange={(val) => {
                            console.log('Mudando o valor', val)
                            setValue("idCategoria", Number(val))
                            trigger("idCategoria")
                          }}
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
                  

                  <div className="grid gap-3">

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