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
import { Switch } from "@/components/ui/switch"

import {  Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


import { createCustomerSchema, type CreateCustomerSchema } from "../schemas/customer.schema"
import { Plus, UserRoundPlus } from "lucide-react"
import  { CurrencyInput } from "@/components/inputs/input-value"
import { InputPhone } from "@/components/inputs/input-phone"
import { useCreateCustomer } from "@/hooks/customers/useCustomers"
import { toast } from "sonner"
import Loading from "@/components/loading"
import { useEffect, useState } from "react"
import axios from "axios"
import type { HttpError } from "@/types/api/api"







const CreateCustomerDialog = () => {

  const [open, setOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);


  const {mutateAsync: createCustomer, reset: mutateReset, isError, isPending, isSuccess} = useCreateCustomer();


  const {register, handleSubmit, formState: {errors}, reset, watch, setValue, control} = useForm({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      status:  true,
      limiteCredito: 0
    },
    mode: 'onChange'
  })
  
  const nome = watch('nome');
  const apelido = watch('apelido');
  const status = watch('status');
 









  

  
  const handleCreateCustomer = async (data: CreateCustomerSchema) => {

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
          className="hidden sm:flex items-center gap-2 cursor-pointer bg-fuchsia-700 hover:bg-fuchsia-600"
        >
          <Plus size={24} strokeWidth={3}/>
          Novo cliente
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] lg:max-w-4xl">

        <DialogHeader className="mb-4">

          <DialogTitle className="flex items-center gap-2 text-gray-500">
            <UserRoundPlus />
            Novo Cliente
          </DialogTitle>
          
          <DialogDescription></DialogDescription>                            

        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateCustomer)}>
  
          <div className="grid gap-6">

            <div className="flex items-start gap-4">

              {/*Nome*/}
              <div className="grid w-full">

                <Label className="mb-2">Nome</Label>
                <Input placeholder="Ex: João" {...register('nome')}/>
                <div className={`flex items-center  ${errors.nome ? 'justify-between' : 'justify-end'}`}>
                  {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                  <p className="text-xs  text-gray-500 ">{nome?.length ? nome?.length : 0}/120 caracteres</p>
                </div>
        
              </div>

              <div className="grid w-full">
                <Label className="mb-2">Apelido</Label>
                <Input placeholder="Ex: Joãozinho" {...register('apelido')}/>
                <div className={`flex items-center  ${errors.apelido ? 'justify-between' : 'justify-end'}`}>
                  {errors.apelido && <span className="text-red-500 text-sm">{errors.apelido?.message}</span>}
                  <p className="text-xs  text-gray-500 ">{apelido?.length ? apelido?.length : 0}/80 caracteres</p>
                </div>

              </div>
                
            </div>

            <div className="flex gap-4">

              <div className="grid w-50">
                <Label className="mb-2">Fone</Label>
                <Controller
                  name="fone"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputPhone
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="(99) 9999-9999"
                      />
                    </>
                  )}
                />
              </div>

              <div className="grid w-60">
                <Label className="mb-2">Data de nascimento</Label>
                <Input type="date"  {...register('data_nascimento')}/>
              </div>

              {/*Endereco*/}
              <div className="grid w-full">
                <Label className="mb-2">Endereço</Label>
                <Input placeholder="Ex: rua das flores numero 5" {...register('endereco')}/>
                <div className={`flex items-center  ${errors.endereco ? 'justify-between' : 'justify-end'}`}>
                  {errors.endereco && <span className="text-red-500 text-sm">{errors.endereco?.message}</span>}
                </div>

              </div>

            </div>

            <div className="flex gap-6">

              <div className="grid">
                <Label className="mb-2">Limite de crédito</Label>

                <Controller
                  name="limiteCredito"
                  control={control}
                  render={({ field }) => (
                    <>
                      <CurrencyInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Digite o limite"
                      />
                      {errors.limiteCredito && (
                        <span className="text-red-500 text-sm">{errors.limiteCredito.message}</span>
                      )}
                    </>
                  )}
                />

              </div>

              <div className="grid">

                <Label>Status</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                    checked={status}
                    onCheckedChange={(checked) => setValue("status", checked)}
                  />
                  <Label className={status ? 'text-green-600' : 'text-red-600'}>{status ? "Ativo" : "Inativo"}</Label>
                </div>

              </div>


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

export default CreateCustomerDialog

/*
           
*/