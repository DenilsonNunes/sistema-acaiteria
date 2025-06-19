import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImagePlus, Trash2} from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { FullCreateProducSchema } from "./schema"
import { Button } from "@/components/ui/button"











const StepAddOns = () => {



const { control, register, setValue, watch, formState: { errors } } = useFormContext<FullCreateProducSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'complementos',
  });




  const handleAddComplemento = () => {
    append({
      nomeComplemento: '',
      descricao: '',
      preco: 0,
      status: true,
      imagem: null,
    });
  };


 






  return (

    <div className="w-full max-w-xl grid">

      <div className="flex flex-col gap-4 max-h-96 overflow-y-auto whitespace-nowrap border-b">

        {fields.map((field, index) => {
          
          const nome = `complementos.${index}.nomeComplemento` as const;
          const descricao = `complementos.${index}.descricao` as const;
          const preco = `complementos.${index}.preco` as const;
          const statusPath = `complementos.${index}.status` as const;
          

          const nomeValue = watch(nome);
          const descricaoValue = watch(descricao);
          const status = watch(statusPath);
          const imagem = watch(`complementos.${index}.imagem`);



          return (
            
            <div key={field.id} className="grid gap-2 p-4 border border-gray-300 rounded-lg">

              <div className="flex flex-col sm:flex-row sm:items-start">
                
                {/* IMAGEM */}
                <div className="grid mb-4 mr-4">
                  <Label className="mb-2">Imagem</Label>
                  <div className="flex gap-2 items-center">
                    <label 
                      htmlFor={`fileInput-${index}`} 
                      className={`${!imagem && 'border-2 border-dotted border-gray-400'} w-24 h-20 rounded-lg flex items-center justify-center cursor-pointer relative hover:bg-gray-100 transition`}
                    >

                      {imagem ? (
                        <img
                          src={URL.createObjectURL(imagem)}
                          alt="Preview"
                          className="object-cover w-full h-full rounded-lg"
                        />
                      ) : (
                        <ImagePlus size={30} />
                      )}
                                              
                    </label>

                    <input
                      id={`fileInput-${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue(`complementos.${index}.imagem`, file);
                      }
                    }}
                    />

                  </div>
                </div>

                {/* NOME E DESCRIÇÃO */}
                <div className="w-full grid gap-4">

                  <div className="grid">
                    <Label className="mb-2">Nome do complemento</Label>
                    <Input placeholder="Nome" {...register(nome)} />
                    <div className={`flex items-center ${errors.complementos?.[index]?.nomeComplemento ? 'justify-between' : 'justify-end'}`}>
                      {errors.complementos?.[index]?.nomeComplemento && (
                        <span className="text-red-500 text-sm">{errors.complementos[index]?.nomeComplemento?.message}</span>
                      )}
                      <p className="text-xs text-gray-500">{nomeValue?.length ?? 0}/80 caracteres</p>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Descrição</Label>
                    <Textarea placeholder="Informe a descrição do complemento" {...register(descricao)} />
                    <div className={`flex items-center ${errors.complementos?.[index]?.descricao ? 'justify-between' : 'justify-end'}`}>
                      {errors.complementos?.[index]?.descricao && (
                        <span className="text-red-500 text-sm">{errors.complementos[index]?.descricao?.message}</span>
                      )}
                      <p className="text-xs text-gray-500">{descricaoValue?.length ?? 0}/200 caracteres</p>
                    </div>
                  </div>

                </div>


              </div>

              <div className="flex justify-between">

                <div className="flex items-start gap-4">

                  <div className="grid">

                    <Label className="mb-2">Valor</Label>

                    <div className="w-full max-w-32">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
                          R$
                        </span>
                        <Input
                          type="number"
                          placeholder="0,00"
                          className="pl-10"
                          {...register(preco, { valueAsNumber: true })}
                        />
                      </div>

                      {errors.complementos?.[index]?.preco && (
                        <span className="text-red-500 text-sm mt-1 block">
                          {errors.complementos[index]?.preco?.message}
                        </span>
                      )}

                    </div>

                  </div>

                  <div className="grid gap-3">
                    <Label>Status</Label>
                    <div className="flex gap-2">
                      <Switch
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                        checked={status}
                        onCheckedChange={(checked) => setValue(statusPath, checked)}
                      />
                      <Label className={status ? 'text-green-600' : 'text-red-600'}>{status ? 'Ativado' : 'Pausar'}</Label>
                    </div>
                  </div>

                </div>

                <div className="flex">
                  <button className="text-red-500 cursor-pointer rounded-full" onClick={() => remove(index)}>
                    <Trash2 />
                  </button>
                </div>


              </div>

            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-4">
        <Button type="button" onClick={handleAddComplemento}>+ Complemento</Button>
      </div>

    </div>



  )
  
}

export default StepAddOns
