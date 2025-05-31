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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"


import { PackagePlus  } from "lucide-react"
import DemoTable from "./tableProducts/table"
import { useQuery } from "@tanstack/react-query"
import api from "@/api/axios"






const Products = () => {


    const { data, error, isLoading } = useQuery({

        queryKey: ['products'],
        queryFn: async () => {
            const response = await api.get('/produtos');

            console.log('Produtos', response.data)

            return response.data[0];
        },
    });


    console.log('O data: ', data)

  return (

    <div className="w-full">



      <Dialog>

        <form>

          <DialogTrigger asChild>

            <Button variant="outline">
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

            <div className="grid gap-4">

              <div className="grid gap-3">
                <Label htmlFor="name-1">Descrição</Label>
                <Input id="name-1" name="name" placeholder="Ex: Copo 400ml" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Valor</Label>
                <Input type="number" id="username-1" name="username" placeholder="Ex: 25,00" />
              </div>

              <div className="grid gap-3 mb-4">

                <Label htmlFor="username-1">Status</Label>
                <RadioGroup defaultValue="ativo" className="flex">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="ativo" id="r1" />
                    <Label htmlFor="r1">Ativo</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="inativo" id="r2" />
                    <Label htmlFor="r2">Inativo</Label>
                  </div>
                </RadioGroup>

              </div>

              <div className="grid gap-3">
                <Label htmlFor="username-1">Categoria</Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>--Selecione--</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Salvar</Button>
            </DialogFooter>

          </DialogContent>

        </form>

      </Dialog>

      
      <DemoTable/>


    </div>
  )
}

export default Products




