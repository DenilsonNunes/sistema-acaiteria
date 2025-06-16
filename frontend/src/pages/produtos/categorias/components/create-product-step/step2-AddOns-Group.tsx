import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm, useFormContext } from "react-hook-form"
import type { FullCreateProducSchema } from "./schema"






const StepAddOnsGroup = () => {


  const [openformAddOns,  setOpenformAddOns] = useState(false)
  const [temComplementos, setTemComplementos] = useState("");
  

    const { register, setValue, trigger, watch, formState: { errors } } = useFormContext<FullCreateProducSchema>();
  
  

  // monitora grupo complementos
  const obrigatorio = watch("grupoComplementos.obrigatorio")
  const nomeGrupoComplementos = watch("grupoComplementos.nomeGrupoComplementos")
  const qtdMin = watch("grupoComplementos.qtdMin")
  const qtdMax = watch("grupoComplementos.qtdMax")



  const alterarValor = (campo: "qtdMin" | "qtdMax", valor: number) => {

    setValue(`grupoComplementos.${campo}`, Math.max(0, valor), { shouldValidate: true })

  }


  useEffect(() => {

    if (obrigatorio && qtdMin < 1) {
      
      setValue("grupoComplementos.qtdMin", 1, { shouldValidate: true })
      setValue("grupoComplementos.qtdMax", 1, { shouldValidate: true })

    } else if (!obrigatorio){

      setValue("grupoComplementos.qtdMin", 0, { shouldValidate: true })

    }
    
  }, [obrigatorio, qtdMin, setValue])







  return (


    <>
      {openformAddOns ? (
        <div className="grid gap-8">
      
          <div className="grid w-full">

            <Label className="mb-2">Nome do grupo de complementos</Label>
            <Input placeholder="Nome" {...register('grupoComplementos.nomeGrupoComplementos')}/>
            <div className={`flex items-center  ${errors.grupoComplementos?.nomeGrupoComplementos ? 'justify-between' : 'justify-end'}`}>
              {errors.grupoComplementos?.nomeGrupoComplementos && <span className="text-red-500 text-sm">{errors.grupoComplementos?.nomeGrupoComplementos?.message}</span>}
              <p className="text-xs  text-gray-500 ">{nomeGrupoComplementos?.length ? nomeGrupoComplementos?.length : 0}/40 caracteres</p>
            </div>
    
          </div>


          <div className="grid gap-3">

            <Label>Obrigatório ?</Label>
            <RadioGroup
              className="flex gap-2"
              value={watch("grupoComplementos.obrigatorio") ? "ob" : "op"}
              onValueChange={(value) => setValue("grupoComplementos.obrigatorio", value === "ob")}
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
              {errors.grupoComplementos?.qtdMin && <span className="text-sm text-red-500">{errors.grupoComplementos.qtdMin.message}</span>}
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
                {errors.grupoComplementos?.qtdMax && <span className="text-sm text-red-500">{errors.grupoComplementos.qtdMax.message}</span>}
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
    
    </>
  )
  
}

export default StepAddOnsGroup
