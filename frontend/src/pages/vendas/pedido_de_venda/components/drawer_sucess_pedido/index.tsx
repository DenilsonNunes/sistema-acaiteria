import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { CircleCheckBig, Plus, ScrollText } from "lucide-react"
import { useNavigate } from "react-router-dom"





interface DrawerSucessPedidoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  message?: string
  redirectTo?: string
}




export default function DrawerSucessPedido({ open, onOpenChange, message = "Pedido realizado com sucesso!" }: DrawerSucessPedidoProps) {

  const navigate = useNavigate();



  return (

      <Drawer 
        open={open} onOpenChange={onOpenChange}                
      >

        <DrawerContent className='px-4'>

          <div className="mx-auto w-full max-w-sm">
                        
            <DrawerHeader className='p-0 my-4'>
              <DrawerTitle className='flex items-center justify-center gap-2 text-lg mb-2 text-green-600'>
                <CircleCheckBig />
                {message}
              </DrawerTitle>
              <div className='flex flex-col items-start'>
                <p className='text-gray-700'><strong>Pedido Nº:</strong> {25}</p>
                <p className='text-gray-700'>
                  <strong>Cliente: </strong>
                  Denilson Nunes
                </p>
                <p className='text-gray-700'>
                  <strong>Total: </strong>
                  R$ 27,00
                </p>
              </div>
            </DrawerHeader>
            <DrawerFooter className='p-0 mb-4'>
              <Button
                className='rounded text-lg bg-fuchsia-600 hover:bg-fuchsia-500 w-full'
                onClick={() => { 
                  navigate('/vendas/pedidos')  
                }}
              >
                <ScrollText style={{ width: "22px", height: "22px", flexShrink: 0 }}/>
                Ir para os pedidos
              </Button>
              <Button
                className='rounded text-lg bg-green-500 hover:bg-green-600 w-full'
                onClick={() => { 
                  navigate('/vendas/pedido-de-venda')  
                }}
              >
                <Plus strokeWidth={3}  style={{ width: "22px", height: "22px", flexShrink: 0 }}/>
                Novo pedido
              </Button>
            </DrawerFooter>             

        
          </div>

        </DrawerContent>

      </Drawer>    
  )
}

