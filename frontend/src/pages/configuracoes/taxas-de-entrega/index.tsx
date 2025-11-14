import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CreateDeliveryFeeDialog from "./components/create-delivery-fee-dialog";
import { useFetchAllDeliveryFee } from "@/hooks/configuracoes/taxas-de-entrega/useTaxasDeEntrega";
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL";
import DeleteDeliveryFeeDialog from "./components/delete-delivery-fee-dialog";
import EditDeliveryFeeDialog from "./components/edit-delivery-fee-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function TaxasDeEntrega() {



  const {data: deliveryFee} = useFetchAllDeliveryFee();


  

  return (

    <section className="w-full max-w-3xl">

      <div className="flex justify-between mb-8">
        <p className="font-medium text-2xl">Taxas de entrega</p>
        {deliveryFee?.length !== 0 && (<CreateDeliveryFeeDialog/>) }
      </div>


      {deliveryFee && deliveryFee.length === 0 ? (
        <Card className="max-w-md mx-auto mt-10 text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Nenhuma taxa de entrega cadastrada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col justify-center">

            <p className="text-muted-foreground">
              Você ainda não possui nenhuma taxa cadastrada.
              <br />
              Deseja cadastrar uma nova taxa de entrega?
            </p>

            <CreateDeliveryFeeDialog/>

          </CardContent>
        </Card>
      ) : (
        <>
          {/* --- Desktop Table --- */}
          <div className="hidden md:block overflow-x-auto border rounded-lg">
            <Table className="min-w-[400px]">

              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="first:rounded-tl-lg">Bairro/Região</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="text-center last:rounded-tr-lg">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {deliveryFee && deliveryFee.map((rate, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>{rate.bairroRegiao}</TableCell>
                    <TableCell className="text-right">R$ { formatarMoedaBRL(rate.valor)}</TableCell>

                    <TableCell className="flex justify-center gap-2">
                      <DeleteDeliveryFeeDialog deliveryFee={rate}/>
                      <EditDeliveryFeeDialog deliveryFee={rate}/>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* --- Mobile Card View --- */}
          <div className="md:hidden flex flex-col gap-3">
            {deliveryFee && deliveryFee.map((rate, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-2 mb-2">
                  <span className="font-semibold">Bairro/Região:</span>
                  <span>{rate.bairroRegiao}</span>
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="font-semibold">Valor:</span>
                  <span>R$ { formatarMoedaBRL(rate.valor) }</span>
                </div>

                <div className="flex justify-end gap-2 mt-2">

                  <DeleteDeliveryFeeDialog deliveryFee={rate}/>

                  <EditDeliveryFeeDialog deliveryFee={rate}/>

                </div>
                
              </div>
            ))}
          </div>
        </>
      )}

    </section>
  );
}

