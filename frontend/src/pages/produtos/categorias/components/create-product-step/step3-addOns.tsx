import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus} from "lucide-react"
import { useState, type ChangeEvent } from "react"
import { useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { FullCreateProducSchema } from "./schema"
import { Button } from "@/components/ui/button"














const StepAddOns = () => {

  const [fileImage, setFileImage] = useState<File | null>(null);


  const { register, setValue, trigger, watch, formState: { errors } } = useFormContext<FullCreateProducSchema>();

  // monitora omplementos
  const nomeComplemento = watch("complementos")
  const descricao = watch("complementos.descricao")
  const status = watch("complementos.status")


  

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImage(file);
      setValue('complementos.imagem', file);
      trigger('complementos.imagem');
    }
  };









  return (

    <div className="grid gap-4">


      <div className="grid gap-2 p-4  border border-gray-300 rounded-lg">

        <div className="flex flex-col sm:flex-row sm:items-start">
          
          {/* IMAGEM */}
          <div className="grid mb-4 mr-4">

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


          {/*NOME E DESCRICAO */}
          <div className="w-full grid gap-4">

            <div className="grid">

              <Label className="mb-2">Nome do complemento</Label>
              <Input placeholder="Nome" {...register('complementos.nomeComplemento')}/>
              <div className={`flex items-center  ${errors.complementos?.nomeComplemento? 'justify-between' : 'justify-end'}`}>
                {errors.complementos?.nomeComplemento && <span className="text-red-500 text-sm">{errors.complementos?.nomeComplemento?.message}</span>}
                <p className="text-xs  text-gray-500 ">{nomeComplemento?.length ? nomeComplemento?.length : 0}/80 caracteres</p>
              </div>
      
            </div>

            <div className="grid gap-2">

              <Label>Descrição</Label>
              <Textarea placeholder="Informe a descrição do complemento" {...register('complementos.descricao')}/>
              <div className={`flex items-center  ${errors.complementos?.descricao ? 'justify-between' : 'justify-end'}`}>
                {errors.complementos?.descricao && <span className="text-red-500 text-sm">{errors.complementos?.descricao?.message}</span>}
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
                <Input type="number" placeholder="0,00" className="pl-10" {...register('complementos.preco', { valueAsNumber: true })}/>
              </div>
              {errors.complementos?.preco && <span className="text-red-500 text-sm">{errors.complementos.preco.message}</span>}
            </div>

          </div>

        
          <div className="grid gap-3">

            <Label>Status</Label>
            <div className="flex gap-2">
              <Switch
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                checked={status}
                onCheckedChange={(checked) => setValue("complementos.status", checked)}
              />
              <Label className={status ? 'text-green-600' : 'text-red-600'}>{status ? "Ativado" : "Pausar"}</Label>
            </div>

          </div>

        </div>

      </div>

      <div className="flex justify-end">
        <Button> + Complemento</Button>
      </div>

    </div>



  )
  
}

export default StepAddOns
