
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Banknote, CreditCard } from "lucide-react"



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
    <section className="flex gap-2">

      <div className="w-full lg:w-[60%]">
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
            <TableRow>
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

        <div className="w-full border rounded shadow p-2 bg-gray-100">
          <div className="flex gap-2">
            <p className="font-medium">Cliente:</p>
            <p>Denilson Nunes Barauna</p>
          </div>

          <div className="flex gap-2">
            <p className="font-medium">Nº Pedido:</p>
            <p>#59687</p>
          </div>

        </div>

        <div className="w-full border rounded shadow p-2 bg-gray-100">
          <p>Formas de pagamento</p>

          <div>
            <p>Total Pago:</p>
            <p>Restante:</p>

          </div>

          <div className="flex w-full gap-2">

            <div className="w-full flex flex-col items-center p-2 border rounded bg-white">
              <CreditCard/>
              <p>Cartão</p>
            </div>

            <div className="w-full flex flex-col items-center p-2 border rounded bg-white">
              <Banknote/>
              <p>Dinheiro</p>
            </div>

            <div className="w-full flex flex-col items-center p-2 border rounded bg-white">
              <CreditCard/>
              <p>Pix</p>
            </div>


          </div>

        </div>

        <div className="w-full flex gap-4">
          <Button variant='destructive' className="h-15 text-lg rounded-xs">Cancelar</Button>
          <Button className="bg-green-500 hover:bg-green-400 h-15 text-lg rounded-xs">Finalizar Recebimento</Button>
        </div>

      </div>

      <div className="flex items-center h-12 justify-between fixed bottom-0 left-0 right-0 px-4 bg-gray-300 border-t z-50">
        <p className="font-medium">Operador: Denilson</p>      

      </div>



    </section>
  )
}

export default FrenteDeCaixa


