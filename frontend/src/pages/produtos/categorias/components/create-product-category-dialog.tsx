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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import { z } from 'zod'
import {  useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import LoadingSpinner from "@/components/loading-spinner"
import { CircleAlert, CircleCheck, Minus, Plus, Upload  } from "lucide-react"

import api from "@/api/axios"
import { useCategories } from "@/hooks/useCategories"
import type { Category } from "@/types/produtos/category"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



const createProductSchema = z.object({

  descricao: z.string().nonempty({message: 'A descrição não pode ser vazia'}).max(120, {message: 'Não poder ser maior que 120 caracteres.'}),
  preco: z
    .string()
    .refine((val) => /^[0-9]+([,\.][0-9]+)?$/.test(val), {message: "Digite apenas números e vírgula para decimais"})
    .transform((val) => Number(val.replace(",", ".")))
    .pipe(z.number().positive({ message: "O preço deve ser maior que zero" })),
  status: z.boolean(),
  qtdAcompanhamentos: z.coerce.number().int().min(0, { message: 'Não pode ser negativo' }).max(10, { message: 'O máximo é 10' }),
  idCategoria: z.coerce.number({ invalid_type_error: "Selecione uma categoria" }),

})


type CreateProductSchema = z.infer<typeof createProductSchema>







const CreateProductCategoryDialog = ({category}: {category: Category}) => {


  const queryClient = useQueryClient();

  const {data: dataCategories} = useCategories();



  const {register, handleSubmit, formState: {errors}, reset, watch, setValue, trigger} = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      status:  true,
      idCategoria: category.id,
      qtdAcompanhamentos: 0
    }
  })
  // monitora o status do produto
  const status = watch("status")
  // monitor a categoria selecionada
  const categoriaSelecionada = watch("idCategoria")

  const descricao = watch('descricao')





  // Criação de produtos
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



  
  return (

    <div className="mx-4 mt-2">
      <Dialog onOpenChange={(open)=>{
          if (!open) {
            reset() // reseta o formulario
            mutateReset() // resetar o mutate
          }
      }}>

        <DialogTrigger asChild>

            <button 
              className="bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded font-medium cursor-pointer"
            >
              + Adicionar item
            </button>

        </DialogTrigger>



        <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">

          {isPending && 
            <div className="flex items-center justify-center">
              <LoadingSpinner size={100}/>
            </div>
          }

          {!isPending && !isSuccess && !isError &&
            <>
              <DialogHeader>

                <DialogTitle>Criar Produto</DialogTitle>
                
                <Separator  className="h-[1px] w-full bg-gray-300 mt-4"/>
                
                <DialogDescription></DialogDescription>                            
      
              </DialogHeader>

              <form onSubmit={handleSubmit(handleCreateProduct)}>

                <div className="flex w-full">

                  <Tabs defaultValue="account" className="w-full">

                    <TabsList>
                      <TabsTrigger value="account">Detalhes</TabsTrigger>
                      <TabsTrigger value="password">Complementos</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="w-full p-2 border border-gray-300 rounded-lg mb-4">
         
                      <div className="grid gap-4">

                        <div className="flex items-start gap-2">

                          <div className="grid">
              
                            <Label className="mb-2">Imagem</Label>

                            <div className="flex gap-2">

                              <button 
                                className="border w-24 h-20 rounded-lg flex items-center justify-center cursor-pointer"
                              >
                                <div className="absolute cursor-pointer">
                                  <Upload size={30} />
                                </div>    
                                <div className="cursor-pointer">
                                  <input className="opacity-0 cursor-pointer" type="file" accept="image/*"/>
                                </div>

                              </button>

                              <div className="flex items-center justify-center border w-24 h-20 rounded-lg ">
                                Foto
                              </div>

                            </div>

                          </div>



                          <div className="grid w-full">

                            <Label className="mb-2">Descrição</Label>
                            <Input placeholder="Ex: Copo 400ml" {...register('descricao')}/>
                            <div className={`flex items-center  ${errors.descricao ? 'justify-between' : 'justify-end'}`}>
                              {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
                              <p className="text-xs  text-gray-500 ">{descricao?.length ? descricao?.length : 0}/140 caracteres</p>
                            </div>
                    
                          </div>

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
                                setValue("idCategoria", Number(val))
                                trigger("idCategoria")
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                {dataCategories && dataCategories.map((category) => (
                                  <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.descricao}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.idCategoria && <p className="text-sm text-red-500">{errors.idCategoria.message}</p>}

                          </div>

                          {categoriaSelecionada === 1 && (

                            <div className='grid gap-2'>

                              <Label>Qtd Acompanhamentos</Label>
                              <Input type="number" placeholder="1" min={0} max={10} {...register('qtdAcompanhamentos')}/>
                              {errors.qtdAcompanhamentos && <span className="text-red-500 text-sm">{errors.qtdAcompanhamentos.message}</span>}

                            </div>
                            
                          )}



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

                    </TabsContent>

                    <TabsContent value="password" className="w-full p-2 border border-gray-300 rounded-lg mb-4">

                      <div>
                        <p>Este item tem complementos?</p>

                          <RadioGroup defaultValue="comfortable" className="gap-2">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="comfortable" id="r2" />
                              <Label htmlFor="r2">Sim</Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="compact" id="r3" />
                              <Label htmlFor="r3">Não</Label>
                            </div>
                          </RadioGroup>

                      </div>

                      <button 
                        className="bg-green-500 hover:bg-green-400 text-white py-1 px-2 rounded cursor-pointer"
                      >
                        + Criar grupo de complementos
                      </button>

                        <div className="grid gap-3">

                          <Label>Obrigatório ?</Label>

                          <RadioGroup defaultValue="comfortable" className="gap-2">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="comfortable" id="r2" />
                              <Label htmlFor="r2">Opcional</Label>
                            </div>
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="compact" id="r3" />
                              <Label htmlFor="r3">Obrigatório</Label>
                            </div>
                          </RadioGroup>

                        </div>

                        <div className="">

                          <Label>Quantidade</Label>
                          <p>Indique quantos itens podem ser selecionados</p>

                          <div className="flex gap-4">
                            <div className="grid gap-1">
                              <Label>Máximo</Label>
                              <div className="w-25 px-2 flex items-center justify-between gap-4 border border-gray-300-500 rounded-lg">

                                <button className="font-bold cursor-pointer">
                                  <Minus size={16}/>
                                </button>

                                <span>0</span>

                                <button className="font-bold cursor-pointer">                                 
                                  <Plus size={16}/>
                                </button>

                              </div>
                            </div>

                            <div className="grid gap-1">
                              <Label>Minimo</Label>
                              <div className="w-25 px-2 flex items-center justify-between gap-4 border border-gray-300-500 rounded-lg">

                                <button className="font-bold cursor-pointer">
                                  <Minus size={16}/>
                                </button>

                                <span>0</span>

                                <button className="font-bold cursor-pointer">                                 
                                  <Plus size={16}/>
                                </button>

                              </div>
                            </div>
                          </div>


                        </div>

                    </TabsContent>

                  </Tabs>
                </div>

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

export default CreateProductCategoryDialog

/*
           
*/