
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import fotoAcai from '../../../../public/acai.jpeg'













const Adicionais = () => {

const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const categorias = [
    'Açai', 
    'Sorvetes', 
    'MilkShake',
    'Lanches',
    'Pizzas',
    'Bebidas',
    'Salgados'
  ]



  return (


    <section className="flex p-4 w-full bg-gray-100">

      <div className="w-full max-w-5xl">

        <div className="mb-4">
          <img src={fotoAcai}  alt="Copo açai" className="w-full h-40 object-cover rounded"/>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center py-1 px-4 bg-fuchsia-700 hover:no-underline rounded-none text-white">
              <div className="flex flex-col">
                <p className="font-medium text-white text-lg">4 Acompanhamentos grátis</p>
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

          <AccordionItem value="item-2">
            <AccordionTrigger className="flex items-center py-1 px-4 bg-fuchsia-700 hover:no-underline rounded-none text-white">
              <div className="flex flex-col">
                <p className="font-medium text-white text-lg">Adicionais especiais</p>
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

          <AccordionItem value="item-3">
            <AccordionTrigger className="flex items-center py-1 px-4 bg-fuchsia-700 hover:no-underline rounded-none text-white">
              <div className="flex flex-col">
                <p className="font-medium text-white text-lg">4 Acompanhamentos grátis</p>
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

        </Accordion>

   
      </div>

    </section>


  )
}

export default Adicionais