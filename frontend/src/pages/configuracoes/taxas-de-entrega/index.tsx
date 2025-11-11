import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import CreateDeliveryFeeDialog from "./components/create-delivery-fee-dialog";
import { EditButton } from "@/components/button/edit-button";
import { DeleteButton } from "@/components/button/delete-button";
import { useFetchAllDeliveryFee } from "@/hooks/configuracoes/taxas-de-entrega/useTaxasDeEntrega";
import { formatarMoedaBRL } from "@/utils/formataMoedaBRL";

interface DeliveryRate {
  id: number;
  region: string;
  fee: number;
}

const deliveryRates: DeliveryRate[] = [
  { id: 1, region: "Centro", fee: 10 },
  { id: 2, region: "Zona Norte", fee: 15 },
  { id: 3, region: "Zona Sul", fee: 20 },
];

export default function TaxasDeEntrega() {



  const {data: deliveryFee} = useFetchAllDeliveryFee();
  









  return (

    <section className="w-full max-w-3xl">

      <div className="flex justify-between mb-8">
        <p className="font-medium text-2xl">Taxas de entrega</p>
        <CreateDeliveryFeeDialog/>
      </div>


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
            {deliveryRates.map((rate) => (
              <TableRow key={rate.id} className="hover:bg-gray-50">
                <TableCell>{rate.region}</TableCell>
                <TableCell className="text-right">R$ {rate.fee},00</TableCell>
                <TableCell className="flex justify-center gap-2">

                  <EditButton/>

                  <DeleteButton/>

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
              <DeleteButton size={25}/>

              <EditButton size={25}/>

            </div>
            
          </div>
        ))}
      </div>

  


    </section>
  );
}

