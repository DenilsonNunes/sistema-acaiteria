
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowBigDown, ArrowBigUp, Banknote, CreditCard, DollarSign, Import, Inbox, Trash2 } from "lucide-react"



const invoices = [
  {
    codigo: "INV001",
    descricao: "Açai 700ml",
    quantidade: "1",
    valorUnit: "18,00",
    valorTotal: "18,00",
  },
  {
    codigo: "INV001",
    descricao: "Açai 700ml",
    quantidade: "1",
    valorUnit: "18,00",
    valorTotal: "18,00",
  },
  {
    codigo: "INV001",
    descricao: "Açai 700ml",
    quantidade: "1",
    valorUnit: "18,00",
    valorTotal: "18,00",
  },
  {
    codigo: "INV001",
    descricao: "Açai 700ml",
    quantidade: "1",
    valorUnit: "18,00",
    valorTotal: "18,00",
  },
  {
    codigo: "INV001",
    descricao: "Açai 700ml",
    quantidade: "1",
    valorUnit: "18,00",
    valorTotal: "18,00",
  },
  {
    codigo: "INV001",
    descricao: "Açai 700ml",
    quantidade: "1",
    valorUnit: "18,00",
    valorTotal: "18,00",
  },
 
]





const FrenteDeCaixa = () => {



  return (

    <section className="grid">

      <div className="flex gap-2">

        <div className="w-full lg:w-[60%]">

          <p className="text-center mb-4 text-4xl text-green-500 font-bold">CAIXA LIVRE</p>

          <div className="w-full border rounded p-2 bg-gray-100 mb-2">
            <div className="flex gap-2">
              <p className="font-medium">Cliente:</p>
              <p>Denilson Nunes Barauna</p>
            </div>

            <div className="flex gap-2">
              <p className="font-medium">Nº Pedido:</p>
              <p>#59687</p>
            </div>

          </div>

          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead className="w-full">Descrição</TableHead>
                <TableHead className="w-[100px]">Quantidade</TableHead>
                <TableHead className="text-right">Vlr Unit</TableHead>
                <TableHead className="text-right">Vlr Total</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.codigo}>
                  <TableCell className="font-medium">{invoice.codigo}</TableCell>
                  <TableCell>{invoice.descricao}</TableCell>
                  <TableCell className="text-center">{invoice.quantidade}</TableCell>
                  <TableCell className="text-right">{invoice.valorUnit}</TableCell>
                  <TableCell className="text-right">{invoice.valorTotal}</TableCell>

                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="hover:not">
                <TableCell colSpan={5}>

                  <div className="flex">

                    <div className="w-full flex flex-col items-center border-r-2">
                      <p>SubTotal</p>
                      <span>125,00</span>
                    </div>

                    <div className="w-full flex flex-col items-center border-r-2">
                      <p>Descontos</p>
                      <span>0,00</span>

                    </div>

                    <div className="w-full flex flex-col items-center">
                      <p>Total</p>
                      <span>125,00</span>
                    </div>

                  </div>

                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

        </div>
        
        <div className="flex flex-col gap-2 w-full lg:w-[40%]">

          
          <div className="w-full border rounded mb-2">

            <div className="flex p-2 bg-gray-100 h-10">
              <p>Valores</p>
            </div>

            <div className="grid gap-2 m-4">

              <div className="flex gap-2 h-12">

                <Input className="h-full !text-2xl"/>

                <div className="w-60 flex justify-center gap-2 px-2 items-center border rounded bg-white">
                  <Banknote/>
                  <p>Dinheiro</p>
                </div>

                <Button variant='destructive' className="h-full">
                  <Trash2/>            
                </Button>

              </div>

              <div className="flex gap-2 h-12">

                <Input className="h-full !text-2xl"/>

                <div className="w-60 flex justify-center gap-2 px-2 items-center border rounded bg-white">
                  <CreditCard/>
                  <p>Cartão Crédito</p>
                </div>

                <Button variant='destructive' className="h-full">
                  <Trash2/>            
                </Button>

              </div>

            </div>

            <div className="p-2 bg-gray-100">
              <p className="text-2xl">Total Pago:</p>
              <p className="text-2xl">Restante:</p>
            </div>


          </div>


          <div className="w-full border rounded p-2 bg-gray-100">

            <p>Formas de pagamento</p>

            <div className="flex flex-col gap-2 mt-2">


              <div className="flex w-full gap-2">

                <div className="w-full flex flex-col items-center p-2 border rounded bg-white">
                  <Banknote/>
                  <p>Dinheiro</p>
                </div>

                <div className="w-full flex flex-col items-center p-2 border rounded bg-white">
                  <img src="/images/pix.svg" alt="Pix" className="w-6 h-6" />
                  <p>Pix</p>
                </div>


              </div>


              <div className="flex w-full gap-2">

                <div className="w-full flex flex-col items-center p-2 border rounded bg-white">
                  <Banknote/>
                  <p>Cartão Débito</p>
                </div>

                <div className="w-full flex flex-col items-center p-2 border rounded bg-white">
                  <CreditCard/>
                  <p>Cartão Crédito</p>
                </div>

              </div>


            </div>

          </div>

          <div className="w-full flex gap-2">
            <Button
              variant="destructive"
              className="w-1/2 h-15 text-lg rounded-xs"
            >
              Cancelar
            </Button>

            <Button
              className="w-1/2 bg-green-500 hover:bg-green-400 h-15 text-lg rounded-xs"
            >
              Finalizar Recebimento
            </Button>
          </div>


        </div>

      </div>

      {/* Footer ações */}
      <div className="flex items-center h-14 justify-between fixed bottom-0 left-0 right-0 px-4 bg-gray-300 border-t z-50">
        
        <div className="flex gap-2 ml-8">

          <Button 
            variant='secondary'
          >
            <Import />
            Importar pedido
          </Button>

          <Button 
            className="bg-green-500 hover:bg-green-600"
          >
            <div className="flex">
              <ArrowBigDown />
              <DollarSign/>
            </div>
            Suprimento
          </Button>

          <Button 
            className="bg-red-500 hover:bg-red-600"
          >
            <div className="flex">
              <ArrowBigUp />
              <DollarSign/>
            </div>
            Sangria
          </Button>

        </div>


        <div className="flex items-center gap-4">

          <Button 
            variant='secondary'
          >
            <Inbox/>
            Fechar caixa
          </Button>

          <div className="flex gap-4">
            <p> <strong>Operador:</strong> Denilson</p>
            <p> <strong>Caixa:</strong> Teste</p>      
          </div>

        </div>


      </div>

    </section>
  )
}

export default FrenteDeCaixa


