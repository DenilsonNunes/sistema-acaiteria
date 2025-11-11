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


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import {  Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { createDeliveryFeeSchema, type CreateDeliveryFeeSchema } from "../schemas/delivery-fee.schema"
import { Plus, UserRoundPlus } from "lucide-react"
import  { CurrencyInput } from "@/components/inputs/input-value"
import { useCreateCustomer } from "@/hooks/customers/useCustomers"
import { toast } from "sonner"
import Loading from "@/components/loading"
import { useState } from "react"
import axios from "axios"
import type { HttpError } from "@/types/api/api"







const CreateDeliveryFeeDialog = () => {

  const [open, setOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);


  const {mutateAsync: createCustomer, reset: mutateReset, isError, isPending, isSuccess} = useCreateCustomer();


  const {register, handleSubmit, formState: {errors}, reset, watch, setValue, control} = useForm({
    resolver: zodResolver(createDeliveryFeeSchema),
    defaultValues: {
      valor: 0
    },
    mode: 'onChange'
  })
  
  const bairroRegiao = watch('bairroRegiao');

 









  

  
  const handleCreateDeliveryFee = async (data: CreateDeliveryFeeSchema) => {

    setShowLoading(true);


    //throw new Error()


    try {

      const response = await createCustomer(data);

      setTimeout(()=> {

        setOpen(false);
        setShowLoading(false);

        toast.success('Cadastro de cliente', {
          description: response.message, 
          richColors: true,
          closeButton: true,
          duration: 4000,
          position: "top-right"
        })


      }, 1000)


    } catch (error) {

      setShowLoading(false);
      setOpen(false);

      if (axios.isAxiosError<HttpError>(error)) {
        const mensagem = Array.isArray(error.response?.data?.message)
          ? error.response?.data?.message.join(", ")
          : error.response?.data?.message;

        toast.error("Erro", {
          description: mensagem || "Houve um erro ao criar o cliente",
          richColors: true,
          closeButton: true,
          duration: 4000,
          position: "top-right",
        });
      }

    }

  }



  if(showLoading){
    return(
      <Loading/>
    )
  }


  
  return (

    <Dialog 
      open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) {
            reset();       // resetar formulário
            mutateReset(); // resetar mutate
          }
        }}
    >

      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2 cursor-pointer bg-fuchsia-700 hover:bg-fuchsia-600"
        >
          <Plus size={24} strokeWidth={3}/>
          Cadastrar nova taxa
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[200px] lg:max-w-2xl">

        <DialogHeader className="mb-4">

          <DialogTitle className="flex items-center gap-2 text-gray-500">
            Nova taxa de entrega
          </DialogTitle>
          
          <DialogDescription></DialogDescription>                            

        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateDeliveryFee)}>

          <div className="grid gap-4">

            {/*Nome*/}
            <div className="grid w-full">

              <Label className="mb-2">Bairro/Região</Label>
              <Input placeholder="Ex: nova esperança" {...register('bairroRegiao')}/>
              <div className={`flex items-center  ${errors.bairroRegiao ? 'justify-between' : 'justify-end'}`}>
                {errors.bairroRegiao && <span className="text-red-500 text-sm">{errors.bairroRegiao?.message}</span>}
                <p className="text-xs  text-gray-500 ">{bairroRegiao?.length ? bairroRegiao?.length : 0}/80 caracteres</p>
              </div>
      
            </div>

            <div className="grid">
              <Label className="mb-2">Valor</Label>

              <Controller
                name="valor"
                control={control}
                render={({ field }) => (
                  <>
                    <CurrencyInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Digite o limite"
                    />
                    {errors.valor && (
                      <span className="text-red-500 text-sm">{errors.valor.message}</span>
                    )}
                  </>
                )}
              />

            </div>
              
          </div>


          <Separator className="my-6"/>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
  
        </form>

      </DialogContent>


    </Dialog>
 

  )
}

export default CreateDeliveryFeeDialog

/*
           
*/