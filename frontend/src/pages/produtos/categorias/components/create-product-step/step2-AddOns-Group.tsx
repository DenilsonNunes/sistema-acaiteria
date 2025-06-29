import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm, useFormContext } from "react-hook-form"
import type { FullCreateProducSchema } from "./schema"






const StepAddOnsGroup = () => {


  const { register, setValue, trigger, watch, formState: { errors } } = useFormContext<FullCreateProducSchema>();
  
  
  // monitora grupo complementos
  const obrigatorio = watch("grupoComplementos.obrigatorio")
  const nomeGrupoComplementos = watch("grupoComplementos.nomeGrupoComplementos")
  const qtdMinComplemento = watch("grupoComplementos.qtdMinComplemento")
  const qtdMaxComplemento = watch("grupoComplementos.qtdMaxComplemento")



  const alterarValor = (campo: "qtdMinComplemento" | "qtdMaxComplemento", valor: number) => {

    setValue(`grupoComplementos.${campo}`, Math.max(0, valor), { shouldValidate: true })

  }


  useEffect(() => {

    if (obrigatorio && qtdMinComplemento < 1) {

      setValue("grupoComplementos.qtdMinComplemento", 1, { shouldValidate: true })
      setValue("grupoComplementos.qtdMaxComplemento", 1, { shouldValidate: true })

    } else if (!obrigatorio){

      setValue("grupoComplementos.qtdMinComplemento", 0, { shouldValidate: true })

    }
    
  }, [obrigatorio, qtdMinComplemento, setValue])


  return (

    <div className="w-full grid gap-8">
  
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

      <div className="grid gap-10">

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
              onClick={() => alterarValor("qtdMinComplemento", qtdMinComplemento - 1)}
              className="font-bold cursor-pointer"
            >
              <Minus size={16} />
            </button>

            <span>{qtdMinComplemento}</span>

            <button
              type="button"
              onClick={() => alterarValor("qtdMinComplemento", qtdMinComplemento + 1)}
              className="font-bold cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>
          {errors.grupoComplementos?.qtdMinComplemento && <span className="text-sm text-red-500">{errors.grupoComplementos.qtdMinComplemento.message}</span>}
          </div>

          <div className="grid gap-1">
            <Label>Máximo</Label>
            <div className="w-25 px-2 flex items-center justify-between gap-4 border border-gray-300-500 rounded-lg">
              <button
                type="button"
                onClick={() => alterarValor("qtdMaxComplemento", qtdMaxComplemento - 1)}
                className="font-bold cursor-pointer"
              >
                <Minus size={16} />
              </button>

              <span>{qtdMaxComplemento}</span>

              <button
                type="button"
                onClick={() => alterarValor("qtdMaxComplemento", qtdMaxComplemento + 1)}
                className="font-bold cursor-pointer"
              >
                <Plus size={16} />
              </button>
            </div>
            {errors.grupoComplementos?.qtdMaxComplemento && <span className="text-sm text-red-500">{errors.grupoComplementos.qtdMaxComplemento.message}</span>}
          </div>

        </div>


      </div>  

    </div> 
  
  )
  
}

export default StepAddOnsGroup
