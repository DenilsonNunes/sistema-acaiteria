
import { useState } from "react";
import fotoAcai from '../../../assets/acai.jpeg'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowLeft} from "lucide-react";
import { Link } from "react-router-dom";













const AcompanhamentosDialog = () => {





  return (


    <section className="flex px-2 w-full bg-gray-100">

      <div className="w-full max-w-5xl">

        <div className="mb-4">
          <img src={fotoAcai}  alt="Copo açai" className="w-full h-40 object-cover rounded"/>
            <Link to='/vendas/pedido-de-venda'>
              <button 
                className="rounded-full h-12 w-12 flex items-center justify-center bg-white shadow-lg shadow-black/80 text-black transform -translate-y-38 translate-x-2"            
              >
                <ArrowLeft size={26} />
              </button>   
            </Link>
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

export default AcompanhamentosDialog


/*


const AcompanhamentosDialog = ({ open, onOpenChange } : { open: boolean; onOpenChange: (open: boolean) => void }) => {





  return (

    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent className="sm:max-w-[425px] lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Acompanhamentos</DialogTitle>

          <DialogDescription>
    
          </DialogDescription>

        </DialogHeader>
          <div>

            <div className="mb-4">
              <img src={fotoAcai}  alt="Copo açai" className="w-full h-40 object-cover rounded"/>
              <p className="text-lg font-medium">Copo 400ML</p>
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

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" className="font-medium">Cancelar</Button>
          </DialogClose>
          <Button type="submit" className="bg-green-500 hover:bg-green-400 font-medium">Salvar</Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>

  )
}

export default AcompanhamentosDialog




*/