import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import TableCompanies from "./table_empresas/table"

const ConfiguracoesEmpresas = () => {



  return (





    <section className="w-full max-w-6xl">


      <div className="flex justify-between mb-8">
        <p className="font-medium text-2xl">Empresas</p>

        <Button
            className="flex items-center gap-2 cursor-pointer bg-fuchsia-700 hover:bg-fuchsia-600"
          >
            <Plus size={24} strokeWidth={3}/>
            Cadatrar nova empresa
        </Button>
        
      </div>

      <TableCompanies/>


    </section>
  )
}

export default ConfiguracoesEmpresas