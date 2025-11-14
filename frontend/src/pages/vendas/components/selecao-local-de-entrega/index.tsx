import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/stores/useCartStore"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import { ChevronRight, UserCheck} from "lucide-react"
import { useState } from "react"
import { useFetchAllDeliveryFee } from "@/hooks/configuracoes/taxas-de-entrega/useTaxasDeEntrega"













export function SelecaoLocalDeEntrega() {

  const [open, setOpen] = useState(false);
  const {incluirLocalEntrega, removerLocalEntrega, cart } = useCartStore();


  const {data: deliveryFee} = useFetchAllDeliveryFee();
  
 



  return (

    <Sheet open={open} onOpenChange={setOpen}>
      
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="w-full flex justify-between text-lg px-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          <div className="flex items-center gap-2">
            <UserCheck style={{ width: "24px", height: "24px" }} />
            Selecionar local de entrega
          </div>
          <ChevronRight style={{ width: "30px", height: "30px" }} />
        </Button>
      </SheetTrigger>


      <SheetContent
        side="bottom"
        className="h-160 md:h-auto md:max-w-md"
      >

        <SheetHeader>
          <SheetTitle>Pesquisar Locais de entrega</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-2 px-4">


          <div className="max-h-110 overflow-y-auto">

            {deliveryFee && deliveryFee.map((fees, index) => (
              <Label 
                key={index}
                className="
                  hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 mb-2 
                  has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50
                " 
              >
                <Checkbox
                  checked={
                    cart.localEntrega?.id === fees.id
                  }

                  onCheckedChange={(checked) => {
                    if(checked){

                      incluirLocalEntrega({
                        id: fees.id,
                        bairroRegiao: fees.bairroRegiao,
                        valor: Number(fees.valor)
                      })

                      setOpen(false)

                    } else {

                      removerLocalEntrega();
                      
                    }

                  }}

                  className="
                  data-[state=checked]:border-blue-600 
                  data-[state=checked]:bg-blue-600 
                  data-[state=checked]:text-white 
                  "
                />

                <div className="grid gap-2">
                  
                  <div className=" flex items-center gap-1.5 font-normal">

                    <p className="text-muted-foreground text-sm">
                      Bairro/Região:                    
                    </p>

                    <p className="text-sm leading-none font-medium">
                      {fees.bairroRegiao}
                    </p>

                  </div>

                  <div className=" flex items-center gap-1.5 font-normal">

                    <p className="text-muted-foreground text-sm">
                      Valor:                   
                    </p>

                    <p className="text-sm leading-none font-medium">
                      {formatarMoedaBRL(fees.valor)}
                    </p>

                  </div>

                </div>

              </Label>

            ))}


          </div>


        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button>Fechar</Button>
          </SheetClose>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  )
}
