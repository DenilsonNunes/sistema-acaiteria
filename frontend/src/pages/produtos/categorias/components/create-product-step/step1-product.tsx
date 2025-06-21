import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useCategories } from "@/hooks/categorias/useCategories"
import { ImagePlus } from "lucide-react"
import { useState, type ChangeEvent } from "react"


import { useFormContext } from "react-hook-form"
import type { FullCreateProducSchema } from "./schema"




const StepProduct = () => {

  const [fileImage, setFileImage] = useState<File | null>(null);
  const {data: dataCategories} = useCategories();



  const { register, setValue, trigger, watch, formState: { errors } } = useFormContext<FullCreateProducSchema>();

  const nomeProduto = watch('produto.nomeProduto');
  const descricao = watch('produto.descricao');
  const categoriaSelecionada = watch('produto.idCategoria');
  const status = watch('produto.status');






  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setValue('produto.imagem', file);
      trigger('produto.imagem');
    }
  };









  return (

    <div className="grid gap-2">

      <div className="flex flex-col-reverse sm:flex-row sm:items-start">


        {/* IMAGEM */}
        <div className="grid mb-2 mr-4">

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
        
        {/*Descrição do produto */}
        <div className="grid w-full">

          <Label className="mb-2">Nome do produto</Label>
          <Input placeholder="Ex: Copo 400ml" {...register('produto.nomeProduto')}/>
          <div className={`flex items-center  ${errors.produto?.nomeProduto ? 'justify-between' : 'justify-end'}`}>
            {errors.produto?.nomeProduto?.message && <span className="text-red-500 text-sm">{errors.produto?.nomeProduto?.message}</span>}
            <p className="text-xs  text-gray-500 ">{nomeProduto?.length ? nomeProduto?.length : 0}/80 caracteres</p>
          </div>
        
        </div>


      </div>
      
      <div className="grid">
        <Label className="mb-2">Descrição</Label>
        <Textarea placeholder="Informe a descrição" {...register('produto.descricao')}/>
        <div className={`flex items-center  ${errors.produto?.descricao ? 'justify-between' : 'justify-end'}`}>
          {errors.produto?.descricao?.message && <span className="text-red-500 text-sm">{errors.produto?.descricao?.message}</span>}
          <p className="text-xs  text-gray-500 ">{descricao?.length ? descricao?.length : 0}/1000 caracteres</p>
        </div>

      </div>


      <div className="grid gap-4 items-start lg:flex lg:gap-4">

        <div className="grid gap-2">
          <Label>Valor</Label>
          <div className="relative w-full max-w-32">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">R$</span>
            <Input type="number" placeholder="0,00" className="pl-10" {...register('produto.preco', { valueAsNumber: true })}/>
          </div>
          {errors.produto?.preco && <span className="text-red-500 text-sm">{errors.produto?.preco?.message}</span>}
        </div>

        <div className='grid gap-2'>

          <Label>Categoria</Label>
          <Select
            value={categoriaSelecionada?.toString() ?? ""}
            onValueChange={(val) => {
              setValue("produto.idCategoria", Number(val))
              trigger("produto.idCategoria")
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
          {errors.produto?.idCategoria && <p className="text-sm text-red-500">{errors.produto.idCategoria.message}</p>}

        </div>

      </div>
      
      <div className="grid gap-3">

        <Label>Status</Label>
        <div className="flex gap-2">
          <Switch
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            checked={status}
            onCheckedChange={(checked) => setValue("produto.status", checked)}
          />
          <Label className={status ? 'text-green-600' : 'text-red-600'}>{status ? "Ativo" : "Inativo"}</Label>
        </div>

      </div>

    </div>

  )

}

export default StepProduct