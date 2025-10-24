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

import  { CurrencyInput } from "@/components/inputs/input-value"
import { InputPhone } from "@/components/inputs/input-phone"
import { useFetchCustomerById } from "@/hooks/customers/useCustomers"
import { useState } from "react"
import { ViewButton } from "@/components/button/view-button"
import type { Customer } from "@/types/customer/customer"
import { formatDateAAAAMMDD } from "@/utils/formateDateAndTime"








const ViewCustomerDialog = ({customer}: {customer: Customer}) => {

  const [open, setOpen] = useState(false);

  const {data} = useFetchCustomerById(1);


  const { control } = useForm({});
  







  
  return (

    <Dialog 
      open={open}
        onOpenChange={(o) => {
          setOpen(o);
      }}
    >

      <DialogTrigger asChild>
        <ViewButton tooltip={true}/>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] lg:max-w-4xl">

        <DialogHeader className="mb-4">

          <DialogTitle className="flex items-center gap-2 text-gray-500">
           Visualizar Cliente
          </DialogTitle>
          
          <DialogDescription></DialogDescription>                            

        </DialogHeader>


  
        <div className="grid gap-6">

          <div className="flex items-start gap-4">

            {/*Nome*/}
            <div className="grid w-full">
              <Label className="mb-2">Nome</Label>
              <Input className="disabled:opacity-100 disabled:cursor-default" disabled value={customer.nome} /> 
            </div>

            <div className="grid w-full">
              <Label className="mb-2">Apelido</Label>
              <Input className="disabled:opacity-100 disabled:cursor-default"  disabled value={customer.apelido}/>
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
                      disabled
                      value={customer.fone}
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
            </div>

            <div className="grid w-60">
              <Label className="mb-2">Data de nascimento</Label>
              <Input className="disabled:opacity-100 disabled:cursor-default"  disabled type="date" 
              value={ customer.data_nascimento && formatDateAAAAMMDD(customer.data_nascimento)}
              
              />
            </div>

            {/*Endereco*/}
            <div className="grid w-full">
              <Label className="mb-2">Endereço</Label>
              <Input className="disabled:opacity-100 disabled:cursor-default"  disabled value={customer.endereco}/>

            </div>

          </div>

          <div className="flex gap-6">

            <div className="grid">
              <Label className="mb-2">Limite de crédito</Label>

              <Controller
                name="limiteCredido"
                control={control}
                render={({ field }) => (
          
                  <CurrencyInput
                    disabled
                    value={Number(data?.limiteCredito)}
                    onChange={field.onChange}
                  />

                )}
              />

            </div>

            <div className="grid">

              <Label>Status</Label>
              <div className="flex items-center gap-2">
                <Switch
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                  checked={customer.status}
                />
                <Label className={customer.status ? 'text-green-600' : 'text-red-600'}>{customer.status ? "Ativo" : "Inativo"}</Label>
              </div>

            </div>


          </div>

        </div>

        <Separator className="my-2"/>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
  
  

      </DialogContent>


    </Dialog>
 

  )
}

export default ViewCustomerDialog

/*
           
*/