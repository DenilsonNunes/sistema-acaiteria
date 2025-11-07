import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
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
import { useFetchCustomersByNameOrSurname } from "@/hooks/customers/useCustomers"
import { useCartStore } from "@/stores/useCartStore"
import { usePedidoStore } from "@/stores/usePedidoStore"
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL"
import { ChevronRight, UserCheck, UserPen, X } from "lucide-react"
import { useEffect, useState } from "react"
import { pedidoEmEdicao } from "@/utils/pedidoUtils"
















export function IdentificarCliente() {

  const [inputSearch, setInputSearch] = useState('');
  const [searchName, setSearchName] = useState('');
  const [open, setOpen] = useState(false)



  const {identificarClienteCart, cart, removerClienteCart} = useCartStore();
  const {identificarClientePedido, idPedidoEmEdicao, removerClientePedido, orderEdit} = usePedidoStore();

  

  const { data: clientes = [] } = useFetchCustomersByNameOrSurname(searchName);
  


  useEffect(() => {

    // Função para buscar nomes
    const fetchUsers = () => {
      setSearchName(inputSearch);
    };

    // Debounce para evitar chamadas frequentes
    const timeoutId = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timeoutId);

  }, [inputSearch]);




  return (
    <Sheet open={open} onOpenChange={setOpen}>

      
      {pedidoEmEdicao() ? (
        <>
          {/* Se já tem cliente → mostra campo + botão editar */}
          {orderEdit.idCliente ? (
            <div className="flex items-end gap-2">

              <div className="grid w-full">
                <Label className="text-lg">Cliente</Label>
                <div className="relative w-full">
                  <Input
                    readOnly
                    value={orderEdit?.nomeCliente || ""}
                    placeholder="Cliente não selecionado"
                    className="pr-8 cursor-pointer"
                  />

                  {orderEdit?.nomeCliente && (
                    <button
                      type="button"
                      onClick={removerClientePedido}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <SheetTrigger asChild>
                <Button
                  className="bg-fuchsia-600 hover:bg-fuchsia-500"
                  size="icon"
                >
                  <UserPen style={{ width: "22px", height: "22px" }} />
                </Button>
              </SheetTrigger>
            </div>
          ) : (
            /* Se não tem cliente → mostra o botão principal */
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="w-full flex justify-between text-lg px-2 rounded bg-blue-500 hover:bg-blue-600"
              >
                <div className="flex items-center gap-2">
                  <UserCheck style={{ width: "24px", height: "24px" }} />
                  Identificar cliente
                </div>
                <ChevronRight style={{ width: "30px", height: "30px" }} />
              </Button>
            </SheetTrigger>
          )}
        </>

      ) : (

        <>
          {/* Se já tem cliente → mostra campo + botão editar */}
          {cart.idCliente ? (
            <div className="flex items-end gap-2">

              <div className="grid w-full">
                <Label className="text-lg">Cliente</Label>
                <div className="relative w-full">
                  <Input
                    readOnly
                    value={cart?.nomeCliente || ""}
                    placeholder="Cliente não selecionado"
                    className="pr-8 cursor-pointer"
                  />

                  {cart?.nomeCliente && (
                    <button
                      type="button"
                      onClick={removerClienteCart}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <SheetTrigger asChild>
                <Button
                  className="bg-fuchsia-600 hover:bg-fuchsia-500"
                  size="icon"
                >
                  <UserPen style={{ width: "22px", height: "22px" }} />
                </Button>
              </SheetTrigger>
            </div>
          ) : (
            /* Se não tem cliente → mostra o botão principal */
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="w-full flex justify-between text-lg px-2 rounded bg-blue-500 hover:bg-blue-600"
              >
                <div className="flex items-center gap-2">
                  <UserCheck style={{ width: "24px", height: "24px" }} />
                  Identificar cliente
                </div>
                <ChevronRight style={{ width: "30px", height: "30px" }} />
              </Button>
            </SheetTrigger>
          )}
        </>

      )}


      <SheetContent
        side="bottom"
        className="h-[100vh] md:h-auto md:max-w-md"
      >

        <SheetHeader>
          <SheetTitle>Pesquisar Cliente</SheetTitle>
          <SheetDescription>
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-2 px-4">

          <Input placeholder="Pesquise pelo cliente ou apelido"
            value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value)
            }}
          />

          <div className="max-h-100 overflow-y-auto">

            {clientes.length > 0 && (
              clientes.map((item, index) => (
                <Label 
                  key={index}
                  className="
                    hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 mb-2 
                    has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50
                  " 
                >
                  <Checkbox
                    checked={
                      idPedidoEmEdicao
                        ? orderEdit.idCliente === item.id
                        : cart.idCliente === item.id
                    }
                    onCheckedChange={(checked) => {
                      if (checked) {

                        if(idPedidoEmEdicao){

                          identificarClientePedido({ id: item.id, nome: item.nome });

                        } else {

                          identificarClienteCart({ id: item.id, nome: item.nome });

                        }

                        setOpen(false)
                      } else {
                        
                        if(idPedidoEmEdicao){
                          removerClientePedido();
                        } else {
                          removerClienteCart();
                        }

                      }
                    }}
                    className="
                    data-[state=checked]:border-blue-600 
                    data-[state=checked]:bg-blue-600 
                    data-[state=checked]:text-white 
                    "
                  />

                  <div className="grid">
                    
                    <div className=" flex items-center gap-1.5 font-normal">

                      <p className="text-sm leading-none font-medium">
                        {item.nome} -
                      </p>

                      <p className="text-muted-foreground text-sm">
                        {item.apelido}
                      </p>

                    </div>

                    <div className="font-normal">
                      <p className="text-muted-foreground text-sm">{item.endereco}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <p>Fone:</p>
                      <p className="text-muted-foreground text-sm font-normal">{item.fone}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <p>Limite Crédito:</p>
                      <p className="text-muted-foreground text-sm font-normal">{formatarMoedaBRL(item.limiteCredito)}</p>
                    </div>

                  </div>


                </Label>
              ))
            )}

            {clientes.length === 0 && searchName.length !== 0 && (
              <>
                <p className="text-center font-normal text-muted-foreground mt-10">Nenhumn resultado encontrado para "{searchName}"</p>
              </>
            )}

          </div>


        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  )
}
