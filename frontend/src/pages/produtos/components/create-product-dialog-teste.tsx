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
import { CircleAlert, CircleCheck, PackagePlus, Upload  } from "lucide-react"

import api from "@/api/axios"
import { useCategories } from "@/hooks/categories/useCategories"
import { useState, type ChangeEvent } from "react"
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


type CreateProductSchema = z.infer<typeof createProductSchema>







const CreateProductTeste = () => {

  const [fileImage, setFileImage] = useState<File | null>(null)

  const queryClient = useQueryClient();

  const {fetchCategories} = useCategories();
  const {data: categories} = fetchCategories;




  const {register, handleSubmit, formState: {errors}, reset, watch, setValue, trigger} = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      status:  true,
    },
    mode: 'onChange'
  })
  // Monitora as propriedades
  const status = watch("status")
  const categoriaSelecionada = watch("idCategoria")
  const nomeProduto = watch('nomeProduto')
  const descricao = watch('descricao')





  // Criação de produtos
  const createProduct = async (data: CreateProductSchema) => {

    const formData = new FormData();

    // Campos do produto
    formData.append("nomeProduto", data.nomeProduto);
    formData.append("descricao", data.descricao);
    formData.append("preco", data.preco.toString());
    formData.append("status", String(data.status));
    formData.append("idCategoria", data.idCategoria.toString());

    // Adiciona imagem se existir
    if (fileImage) {
      formData.append('file', fileImage); // O nome 'file' deve bater com o backend
    }

    const response = await api.post('/produtos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  };

  
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
          }
      }}>

        <DialogTrigger asChild>

          <Button variant="outline" className="cursor-pointer">
            <PackagePlus />
            Criar Produto
          </Button>

        </DialogTrigger>



        <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">

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

                  <div className="flex items-start gap-2">

                    {/* IMAGEM */}
                    <div className="grid">

                      <Label className="mb-2">Imagem</Label>
                      <div className="flex gap-2 items-center">

                        {/* Wrapper para input invisível e label estilizado */}
                        <label
                          htmlFor="fileInput"
                          className="border w-24 h-20 rounded-lg flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition"
                        >
                          <Upload size={30} />
                        </label>

                        <input
                          id="fileInput"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />

                        {/* Preview da imagem, se houver */}
                        <div className="flex items-center justify-center border w-24 h-20 rounded-lg overflow-hidden bg-gray-100">
                          {fileImage ? (
                            <img
                              src={URL.createObjectURL(fileImage)}
                              alt="Preview"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-sm text-gray-500">Foto</span>
                          )}
                        </div>
                        
                      </div>

                    </div>



                    {/*Nome do produto */}
                    <div className="grid w-full">

                      <Label className="mb-2">Nome do produto</Label>
                      <Input placeholder="Ex: Copo 400ml" {...register('nomeProduto')}/>
                      <div className={`flex items-center  ${errors.nomeProduto ? 'justify-between' : 'justify-end'}`}>
                        {errors.nomeProduto && <span className="text-red-500 text-sm">{errors.nomeProduto.message}</span>}
                        <p className="text-xs  text-gray-500 ">{nomeProduto?.length ? nomeProduto?.length : 0}/1000 caracteres</p>
                      </div>
              
                    </div>

                  </div>

                  {/*Descrição do produto */}
                  <div className="grid">
                    <Label className="mb-2">Descrição</Label>
                    <Textarea placeholder="Informe a descrição" {...register('descricao')}/>
                    <div className={`flex items-center  ${errors.descricao ? 'justify-between' : 'justify-end'}`}>
                      {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao?.message}</span>}
                      <p className="text-xs  text-gray-500 ">{descricao?.length ? descricao?.length : 0}/80 caracteres</p>
                    </div>

                  </div>


                  {/* Valor/Categoria */}
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
                          {categories && categories.map((category) => (
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

export default CreateProductTeste

/*
           
*/