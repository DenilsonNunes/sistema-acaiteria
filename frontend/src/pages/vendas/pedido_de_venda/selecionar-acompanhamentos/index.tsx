
import { Textarea } from '@/components/ui/textarea';
import fotoAcai from '../../../../assets/acai.jpeg'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import { ArrowLeft, ChevronRight} from "lucide-react";
import { useContext, useRef, useState } from 'react';
import {  useNavigate, useParams } from "react-router-dom";
import { PedidoVendaContext } from '@/contexts/PedidoContext';
import api from '@/api/axios';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/types/produtos/product';
import LoadingSpinner from '@/components/loading-spinner';






const adicionais = [
  'Banana',
  'Granola',
  'Amendoin',
  'Paçoca',
  'Cofete',
  'Floco de arroz',
  'Leite condensado',
  'Gotas de chocolate'
]







const SelecionarAcompanhamentos = () => {
   const { id } = useParams()

  const navigate = useNavigate()
  const [accordionValue, setAccordionValue] = useState<string | undefined>("item-1")
  const itemRef = useRef<HTMLDivElement>(null)


  const { adicionarItem } = useContext(PedidoVendaContext)





  const { data: product, isLoading, isError } = useQuery<Product>({

    queryKey: ['product'],
    queryFn: async () => {

      const response = await api.get(`/produtos/${id}`);
      return response.data;

    },

  });




  /*
  
  
    useEffect(()=>{
  
      if(5 >= 4) {
  
        // Rola até o item 2 após o estado atualizar
        setTimeout(() => {
          //Fecha o item 1 e abre o item 2
          setAccordionValue("item-2")
  
          itemRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 200) // Delay pequeno para garantir que o DOM foi atualizado
  
      }
  
  
    },[count])
  
  
  */


  if(isLoading) {
    return (
      <div className='w-full max-w-5xl flex items-center justify-center'>
        <LoadingSpinner size={100}/>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='w-full max-w-5xl flex items-center justify-center'>
        <p className='text-2xl'>Erro ao buscar o produto!</p>
        <p></p>
      </div>
    )
  }

  if(!product) {
    return (
      <div className='w-full max-w-5xl flex items-center justify-center'>
        <p className='text-2xl'>Nenhum produto encontrado!</p>
      </div>
    )
  }

  

  return (


    <section className="flex px-2 w-full h-screen">

      <div className="w-full max-w-5xl">

        <div className="relative">
          <img src={fotoAcai} alt="Copo açaí" className="w-full h-40 object-cover rounded" />

          <button
            onClick={() => navigate('/vendas/pedido-de-venda')}
            className="md:hidden absolute top-2 left-2 rounded-full h-12 w-12 flex items-center justify-center bg-white shadow-lg shadow-black/80 text-black"
          >
            <ArrowLeft size={26} />
          </button>
        </div>

        <div className='my-4'>
          <p className='text-2xl font-medium'>{product.descricao}</p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full "
          value={accordionValue}
          onValueChange={setAccordionValue}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center py-1 px-4 bg-fuchsia-700 hover:no-underline rounded-none text-white">
              <div className="flex flex-col">
                <p className="font-medium text-white text-2xl">{product.qtdAcompanhamentos} Acompanhamentos grátis</p>
                <p className="text-white">Escolha entre 1 a {product.qtdAcompanhamentos} itens</p>
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 text-balance py-4">

              {adicionais.map((item, index) => (

                <div key={index} className='flex items-center justify-between border-b-2'>

                  <div className='flex items-center gap-2'>
                    <div className='w-22 h-20 flex items-center justify-center border mb-1'>
                      FOTO
                    </div>
                    <p className='text-lg'>{item}</p> 
                  </div>


                  <div className="flex items-center gap-4 mr-4">

    
                    <>                      
                      <button 
                        className="w-8 h-8 p-0 text-4xl text-fuchsia-700 cursor-pointer flex items-center justify-center"
                        
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">5</span>                    
                    </>                    
        

                    <button 
                      className="w-8 h-8 p-0 text-3xl font-bold text-fuchsia-700 cursor-pointer flex items-center justify-center"
                      
                    >
                      +
                    </button>
                  </div>

                </div>


              ))}


            </AccordionContent>
            
          </AccordionItem>

          <AccordionItem value="item-2" ref={itemRef}>
            <AccordionTrigger className="flex items-center py-1 px-4 bg-fuchsia-700 hover:no-underline rounded-none text-white">
              <div className="flex flex-col">
                <p className="font-medium text-white text-2xl">Adicionais especiais</p>
                <p className="text-white">Escolha entre 1 a 4 itens</p>
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Our flagship product combines cutting-edge technology with sleek
                design. Built with premium materials, it offers unparalleled
                performance and reliability.
              </p>
              <p>
                Key features include advanced processing capabilities, and an
                intuitive user interface designed for both beginners and experts.
              </p>
            </AccordionContent>

          </AccordionItem>


          <div className='mt-1'>
            <div className='h-15 bg-gray-300 flex items-center mb-1'>
              <p className='ml-4 text-lg font-medium'>Observação</p>
            </div>
            <Textarea placeholder="Ex: Banana cortar em fatias grossas." />
          </div>

        </Accordion>

        <button 
          className='w-full md:ml-12 h-15 flex justify-between items-center bg-green-500 pl-4 cursor-pointer fixed bottom-0 left-0 right-0 px-4'
          onClick={()=> navigate('/vendas/carrinho')}
        >
          <p className='text-2xl font-medium'>Avançar</p>
          <div className='flex items-center'>
            <p className='text-lg font-bold'>R$ 20,00</p>
            <ChevronRight size={50}/>
          </div>
        </button>


      </div>

    </section>




  )
}

export default SelecionarAcompanhamentos



