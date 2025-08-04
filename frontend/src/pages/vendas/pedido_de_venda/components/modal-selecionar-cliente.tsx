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
import { User} from "lucide-react"
import { useEffect, useState } from "react"
import { useFetchCustomersByIdOrSurname } from "@/hooks/customers/useCustomers"











export function ModalSelecionarCliente() {






  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecionar Cliente</DialogTitle>
          <DialogDescription />
        </DialogHeader>


        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button className="bg-green-500">Salvar Pedido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}


