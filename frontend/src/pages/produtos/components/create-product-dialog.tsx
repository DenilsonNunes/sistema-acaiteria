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

import { PackagePlus  } from "lucide-react"
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from "@radix-ui/react-select"




const createProductSchema = z.object({
  descricao: z.string().nonempty({message: 'A descrição não pode ser vazia'}),
  preco: z
    .string()
    .refine((val) => /^[0-9]+([,\.][0-9]+)?$/.test(val), {message: "Digite apenas números e vírgula para decimais"})
    .transform((val) => Number(val.replace(",", ".")))
    .pipe(z.number().positive({ message: "O preço deve ser maior que zero" })),
  status: z.string(),
  categoria: z.preprocess(
    (val) => (val === undefined ? "" : val),
    z.string().nonempty("Selecione uma categoria").transform((val) => Number(val))
  ),
})


type CreateProductSchema = z.infer<typeof createProductSchema>


const CreateProductDialog = () => {

  const {control, register, handleSubmit, formState: {errors} } = useForm({
    resolver: zodResolver(createProductSchema)
  })
  
  const handleCreateProduct = (data: CreateProductSchema) => {
    console.log('data', data)
  }


  const dataFake = [
    {id: 1 , descricao: 'Açai'},
    {id: 2 , descricao: 'Sorvete'},
    {id: 3 , descricao: 'MilkShake'},
    {id: 4 , descricao: 'Adicional'},
  ]


  return (

    <div className="mx-4 mt-2">
      <Dialog>

        <DialogTrigger asChild>

          <Button variant="outline" className="cursor-pointer">
            <PackagePlus />
            Criar Produto
          </Button>

        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">

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

                <Label>Status</Label>
                <RadioGroup className="flex" defaultValue={"ativo"} {...register('status')}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem className="bg-green-500" value="ativo" />
                    <Label>Ativo</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem className="bg-red-500 text-amber-950" value="inativo"/>
                    <Label>Inativo</Label>
                  </div>
                </RadioGroup>

              </div>

              <Controller
                name="categoria"
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
                    {errors.categoria && <span className="text-red-500 text-sm">{errors.categoria.message}</span>}
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
          
        </DialogContent>

      </Dialog>
    </div>

  )
}

export default CreateProductDialog

/*
           
*/