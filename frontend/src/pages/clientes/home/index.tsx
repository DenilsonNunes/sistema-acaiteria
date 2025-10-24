import {Plus} from "lucide-react"


import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"
import TablePedidos from "./tableCustomers/table"



import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/loading-spinner"
import { toast } from "sonner"

import { usePedidoStore } from "@/stores/usePedidoStore"
import { useDeleteSalesOrder, useFetchAllOrders } from "@/hooks/sales/useOrders"

import { AxiosError } from "axios"
import TableCustomer from "./tableCustomers/table"
import CreateCustomerDialog from "../components/create-customer-dialog"
import Loading from "@/components/loading"



















const HomeClientes = () => {

  const navigate = useNavigate();
  const location = useLocation()
  const [status, setStatus] = useState("all")


  const { data: orders, isLoading, isError } = useFetchAllOrders(
      status && status !== "all" ? { status } : undefined
  );
  const {
    mutateAsync: deleteOrder, 
    isPending: isPendingDeleteOrder, 
    isError: isErrorDeleleteOrder
  } = useDeleteSalesOrder();


  const { carregarPedidoExistente } = usePedidoStore();

  const [openModalDelteOrder, setOpenModalDelteOrder] = useState(false);
  const [openDrawerSuccess, setOpenDrawerSuccess] = useState(false);

  const [pedidoSelecionado, setPedidoSelecionado] = useState<number | null>(null);
  




  useEffect(() => {
    if (location.state?.openDrawerSuccess) {
      setOpenDrawerSuccess(true)
      // limpa o state da URL pra não abrir de novo caso recarregue
      window.history.replaceState({}, document.title)
      localStorage.removeItem('')
    }
  }, [location.state])



  const handleDeleteOrder = async () => {

    if (!pedidoSelecionado) return;

    try {

      const response = await deleteOrder(pedidoSelecionado);

      toast.success('Deletar pedido', {
        description: `${response.message}`,
        richColors: true,
        closeButton: true,
        duration: 4000,
        position: "top-right"
      })

        
      setOpenModalDelteOrder(false);
      setPedidoSelecionado(null);


      // usar o id para redirecionar, abrir modal, etc.
    } catch (error) {

        if(error instanceof AxiosError) {
  
          if(error?.message === 'Network Error') {

              toast.error('Erro', {
                description: `Erro de rede. Verifique sua conexão e tente novamente mais tarde`,
                richColors: true,
                closeButton: true,
                duration: 4000,
                position: "top-right"
              })
          }
  
          if(error.response?.data.message) {
  
            const message = error.response.data.message;

              toast.error('Erro', {
                description: `${message}`,
                richColors: true,
                closeButton: true,
                duration: 4000,
                position: "top-right"
              })
  
          }
        
        }

    }

  };








  if(isLoading || isPendingDeleteOrder){
    return (
      <LoadingSpinner fullScreen={true} size={120}/>
    )
  }


  if(isError) {
    return (
      <div>Tente novamente mais tarde</div>
    )
  }

  if(isErrorDeleleteOrder) {
    return (
      <div>Tente novamente mais tarde</div>
    )
  }







  return (


    <section>


      <div className="flex justify-between mb-4">
        
        <p className="font-medium text-2xl">Clientes</p>

        <CreateCustomerDialog/>

      </div>


      {/* Tabela pedidos DESKTOP */}
      <div className="hidden sm:block">
        <TableCustomer/>
      </div>


    </section>
  )
}

export default HomeClientes


