import { useState } from "react";

import fotoAcai from '../../../assets/acai.jpeg'


const Cardapio = () => {

const [categoriaSelecionada, setCategoriaSelecionada] = useState('Açai');

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


    <section className="w-full h-full">

      <div className="bg-gray-200 py-2">
        <ul className="flex ml-2 gap-6 overflow-x-auto scrollbar-hide">
          {categorias.map((item) => (
            <li key={item} 
              className={`cursor-pointer border-b-2 font-medium 
                ${categoriaSelecionada === item ? "border-b-fuchsia-600" : "border-b-transparent"}
                ${categoriaSelecionada === item && "text-fuchsia-600"}
              `}
              onClick={() => setCategoriaSelecionada(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>


      {categoriaSelecionada === 'Açai' && (

        <div className="w-full bg-gray-100 pt-4">
          <p className="text-2xl text-center font-medium ml-4 mb-4">Açai</p>

          <div className="flex items-center justify-between p-2 border-b border-t border-gray-400">
            
            <div>
              <p className="text-lg font-bold">Copo 300ML</p>
              <p>Com 4 acompanhamentos</p>
              <p>3 camadas</p>
              <p className="mt-4 text-lg  font-bold">R$ 13,00</p>
            </div>

            <div>
              <img src={fotoAcai}  alt="Copo açai" className="w-full max-w-32 h-auto object-cover rounded"/>
            </div>

          </div>

          <div className="flex items-center justify-between p-2 border-b  border-gray-400">

            <div>
              <p className="text-lg font-bold">Copo 400ML</p>
              <p>Com 4 acompanhamentos</p>
              <p>3 camadas</p>
              <p className="mt-4 text-lg  font-bold">R$ 17,00</p>
            </div>

            <div>
              <img src={fotoAcai}  alt="Copo açai" className="w-full max-w-32 h-auto object-cover rounded"/>
            </div>

          </div>

          <div className="flex items-center justify-between p-2 border-b border-gray-400">

            <div>
              <p className="text-lg font-bold">Copo 500ML</p>
              <p>Com 4 acompanhamentos</p>
              <p>3 camadas</p>
              <p className="mt-4 text-lg  font-bold">R$ 19,00</p>
            </div>

            <div>
              <img src={fotoAcai}  alt="Copo açai" className="w-full max-w-32 h-auto object-cover rounded"/>
            </div>

          </div>

        </div>

      )}
  

    </section>


  )
}

export default Cardapio