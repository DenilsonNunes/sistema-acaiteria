import ConfiguracoesEmpresas from "@/pages/configuracoes/empresas";
import TaxasDeEntrega from "@/pages/configuracoes/taxas-de-entrega";



export const configuracoesRoutes = [
  { path: '/configuracoes/taxas-de-entrega', element: <TaxasDeEntrega /> },
  { path: '/configuracoes/empresas', element: <ConfiguracoesEmpresas /> },

]