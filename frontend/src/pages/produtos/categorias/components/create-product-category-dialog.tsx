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
import { CircleAlert, CircleCheck, ImagePlus, Minus, Plus, } from "lucide-react"

import api from "@/api/axios"
import { useCategories } from "@/hooks/useCategories"
import type { Category } from "@/types/produtos/category"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState, type ChangeEvent } from "react"
import { Textarea } from "@/components/ui/textarea"



const createProductSchema = z.object({
  nomeProduto: z.string().nonempty({message: 'O nome do produto não pode ser vazio'}).max(80, {message: 'Não poder ser maior que 80 caracteres.'}),
  descricao: z.string().max(1000, {message: 'Não poder ser maior que 1000 caracteres.'}),
  preco: z
    .string()
    .refine((val) => /^[0-9]+([,\.][0-9]+)?$/.test(val), {message: "Digite apenas números e vírgula para decimais"})
    .transform((val) => Number(val.replace(",", ".")))
    .pipe(z.number().positive({ message: "O preço deve ser maior que zero" })),
  status: z.boolean(),
  idCategoria: z.coerce.number({ invalid_type_error: "Selecione uma categoria" }),

})

const createGrupoComplementosSchema = z.object({
  nomeGrupoComplementos: z.string().nonempty({message: 'O nome do grupo não pode ser vazio'}).max(40, {message: 'Não poder ser maior que 40 caracteres.'}),
  obrigatorio: z.boolean(),
  qtdMax: z.number(),
  qtdMin: z.number()
})



type CreateProductSchema = z.infer<typeof createProductSchema>


const fullSchema = createProductSchema.merge(createGrupoComplementosSchema)





const CreateProductCategoryDialog = ({category}: {category: Category}) => {

  const [fileImage, setFileImage] = useState<File | null>(null)
  const [temComplementos, setTemComplementos] = useState("");
  const [openformAddOns,  setOpenformAddOns] = useState(false)
  
  const queryClient = useQueryClient();

  const {data: dataCategories} = useCategories();



  const {register, handleSubmit, formState: {errors}, reset, watch, setValue, trigger} = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      status:  true,
      idCategoria: category.id,
      qtdMin: 0,
      qtdMax: 0,
    },
    mode: 'onChange'
  })
  // monitora produtos
  const status = watch("status")
  const categoriaSelecionada = watch("idCategoria")
  const descricao = watch('descricao')
  const nomeProduto = watch('nomeProduto')

  // monitora grupo complementos
  const obrigatorio = watch("obrigatorio")
  const nomeGrupoComplementos = watch("nomeGrupoComplementos")
  const qtdMin = watch("qtdMin")
  const qtdMax = watch("qtdMax")

  const alterarValor = (campo: "qtdMin" | "qtdMax", valor: number) => {
    setValue(campo, Math.max(0, valor), { shouldValidate: true })
  }



  useEffect(() => {
    if (obrigatorio && qtdMin < 1) {
      setValue("qtdMin", 1, { shouldValidate: true })
    }
  }, [obrigatorio, qtdMin, setValue])





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


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileImage(file);
      }
    };

  

  return (

    <div className="mx-4 mt-2">
      <Dialog onOpenChange={(open)=>{
          if (!open) {
            reset() // reseta o formulario
            mutateReset() // resetar o mutate
            setTemComplementos('')
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

                  <Tabs defaultValue="detalhes" className="w-full">

                    <TabsList>
                      <TabsTrigger value="detalhes">Detalhes Produto</TabsTrigger>
                      <TabsTrigger value="grupoComplementos">Grupo Complementos</TabsTrigger>
                      <TabsTrigger value="complementos">Complementos</TabsTrigger>
                    </TabsList>

                    <TabsContent value="detalhes" className="w-full p-4 border border-gray-300 rounded-lg mb-4">
         
                      <div className="grid gap-2">

                        <div className="flex items-start gap-2">
                          
                          {/* IMAGEM */}
                          <div className="grid">

                            <Label className="mb-2">Imagem</Label>
                            <div className="flex gap-2 items-center">

                              {/* Wrapper para input invisível e label estilizado */}
                              <label
                                htmlFor="fileInput"
                                className={`${!fileImage && 'border-2 border-dotted border-gray-400'} w-24 h-20 rounded-lg flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition`}
                              >
                                {fileImage ? (
                                  <img
                                    src={URL.createObjectURL(fileImage)}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <ImagePlus size={30} />
                                )}
                                                                
                              </label>

                              <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                              
                            </div>

                          </div>


                          <div className="grid w-full">

                            <Label className="mb-2">Nome do produto</Label>
                            <Input placeholder="Ex: Copo 400ml" {...register('nomeProduto')}/>
                            <div className={`flex items-center  ${errors.nomeProduto ? 'justify-between' : 'justify-end'}`}>
                              {errors.nomeProduto && <span className="text-red-500 text-sm">{errors.nomeProduto.message}</span>}
                              <p className="text-xs  text-gray-500 ">{nomeProduto?.length ? nomeProduto?.length : 0}/80 caracteres</p>
                            </div>
                    
                          </div>

                        </div>
                        
                        <div className="grid">
                          <Label className="mb-2">Descrição</Label>
                          <Textarea placeholder="Informe a descrição" {...register('descricao')}/>
                          <div className={`flex items-center  ${errors.descricao ? 'justify-between' : 'justify-end'}`}>
                            {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao?.message}</span>}
                            <p className="text-xs  text-gray-500 ">{descricao?.length ? descricao?.length : 0}/1000 caracteres</p>
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

                    <TabsContent value="grupoComplementos" className="w-full p-4 border border-gray-300 rounded-lg mb-4">

                      {openformAddOns ? (
                        <div className="grid gap-8">
                      
                          <div className="grid w-full">

                            <Label className="mb-2">Nome do grupo de complementos</Label>
                            <Input placeholder="Nome" {...register('nomeGrupoComplementos')}/>
                            <div className={`flex items-center  ${errors.nomeGrupoComplementos ? 'justify-between' : 'justify-end'}`}>
                              {errors.nomeGrupoComplementos && <span className="text-red-500 text-sm">{errors.nomeGrupoComplementos?.message}</span>}
                              <p className="text-xs  text-gray-500 ">{nomeGrupoComplementos?.length ? nomeGrupoComplementos?.length : 0}/40 caracteres</p>
                            </div>
                    
                          </div>


                          <div className="grid gap-3">

                            <Label>Obrigatório ?</Label>
                            <RadioGroup
                              className="flex gap-2"
                              value={watch("obrigatorio") ? "ob" : "op"}
                              onValueChange={(value) => setValue("obrigatorio", value === "ob")}
                            >
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="op" id="op" />
                                <Label htmlFor="op">Opcional</Label>
                              </div>

                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="ob" id="ob" />
                                <Label htmlFor="ob">Obrigatório</Label>
                              </div>
                            </RadioGroup>

                          </div>

                          <div className="grid gap-4">

                            <div>
                              <Label>Quantidade</Label>
                              <p className="text-gray-600">Indique quantos itens podem ser selecionados</p>
                            </div>


                            <div className="flex gap-4">

                              <div className="grid gap-1">

                              <Label>Mínimo</Label>
                              <div className="w-25 px-2 flex items-center justify-between gap-4 border border-gray-300-500 rounded-lg">
                                <button
                                  type="button"
                                  onClick={() => alterarValor("qtdMin", qtdMin - 1)}
                                  className="font-bold cursor-pointer"
                                >
                                  <Minus size={16} />
                                </button>

                                <span>{qtdMin}</span>

                                <button
                                  type="button"
                                  onClick={() => alterarValor("qtdMin", qtdMin + 1)}
                                  className="font-bold cursor-pointer"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              {errors.qtdMin && <span className="text-sm text-red-500">{errors.qtdMin.message}</span>}
                              </div>

                              <div className="grid gap-1">
                                <Label>Máximo</Label>
                                <div className="w-25 px-2 flex items-center justify-between gap-4 border border-gray-300-500 rounded-lg">
                                  <button
                                    type="button"
                                    onClick={() => alterarValor("qtdMax", qtdMax - 1)}
                                    className="font-bold cursor-pointer"
                                  >
                                    <Minus size={16} />
                                  </button>

                                  <span>{qtdMax}</span>

                                  <button
                                    type="button"
                                    onClick={() => alterarValor("qtdMax", qtdMax + 1)}
                                    className="font-bold cursor-pointer"
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                                {errors.qtdMax && <span className="text-sm text-red-500">{errors.qtdMax.message}</span>}
                              </div>

                            </div>


                          </div>                    
                        </div>            
                      ) : (
                        <div className="flex items-center justify-between">

                          <div className="flex flex-col">

                            <p>Este item complementos?</p>
                            
                            <RadioGroup defaultValue="nao" className="flex gap-2" onValueChange={(value)=> setTemComplementos(value)}>

                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="nao"/>
                                <Label htmlFor="r3">Não</Label>
                              </div>

                              <div className="flex items-center gap-3">
                                <RadioGroupItem value="sim" />
                                <Label htmlFor="r2">Sim</Label>
                              </div>

                            </RadioGroup>

                          </div>


                          {temComplementos === 'sim' && (
                            <button 
                              className="bg-green-500 hover:bg-green-400 text-white py-1 px-2 rounded cursor-pointer"
                              onClick={()=>setOpenformAddOns(true)}
                            >
                              + Criar grupo de complementos
                            </button>
                          )}

                        </div>

                      )}

                    </TabsContent>

                    <TabsContent value="complementos" className="w-full p-4 border border-gray-300 rounded-lg mb-4">
            
                      <div className="grid gap-2">

                        <div className="flex items-start gap-8">
                          
                          {/* IMAGEM */}
                          <div className="grid">

                            <Label className="mb-2">Imagem</Label>
                            <div className="flex gap-2 items-center">

                              {/* Wrapper para input invisível e label estilizado */}
                              <label
                                htmlFor="fileInput"
                                className={`${!fileImage && 'border-2 border-dotted border-gray-400'} w-24 h-20 rounded-lg flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition`}
                              >
                                {fileImage ? (
                                  <img
                                    src={URL.createObjectURL(fileImage)}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                  />
                                ) : (
                                  <ImagePlus size={30} />
                                )}
                                                                
                              </label>

                              <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                              
                            </div>

                          </div>

                          <div className="w-full grid gap-4">

                            <div className="grid">

                              <Label className="mb-2">Nome do complemento</Label>
                              <Input placeholder="Nome" {...register('nomeProduto')}/>
                              <div className={`flex items-center  ${errors.nomeProduto ? 'justify-between' : 'justify-end'}`}>
                                {errors.nomeProduto && <span className="text-red-500 text-sm">{errors.nomeProduto.message}</span>}
                                <p className="text-xs  text-gray-500 ">{nomeProduto?.length ? nomeProduto?.length : 0}/80 caracteres</p>
                              </div>
                      
                            </div>

                            <div className="grid gap-2">
                
                              <Label>Descrição</Label>
                              <Textarea placeholder="Informe a descrição" {...register('descricao')}/>
                              <div className={`flex items-center  ${errors.descricao ? 'justify-between' : 'justify-end'}`}>
                                {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao?.message}</span>}
                                <p className="text-xs  text-gray-500 ">{descricao?.length ? descricao?.length : 0}/200 caracteres</p>
                              </div>

                            </div>

                          </div>


                        </div>

                        <div className="flex items-start gap-4">

                          <div className="grid">

                            <div className="grid">
                              <Label className="mb-2">Valor</Label>
                              <div className="relative w-full max-w-32">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
                                <Input type="text" placeholder="0,00" className="pl-10" {...register('preco')}/>
                              </div>
                              {errors.preco && <span className="text-red-500 text-sm">{errors.preco.message}</span>}
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
                              <Label className={status ? 'text-green-600' : 'text-red-600'}>{status ? "Ativado" : "Pausar"}</Label>
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