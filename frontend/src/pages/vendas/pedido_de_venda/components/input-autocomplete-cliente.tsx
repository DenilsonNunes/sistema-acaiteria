import { useEffect, useState } from "react";
import { useFetchCustomersByNameOrSurname } from "@/hooks/customers/useCustomers";
import { User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePedidoStore } from "@/stores/usePedidoStore";







type Props = {
  erro: string | null;
  onChange: (value: string) => void;
  limparErro: () => void; // nova prop para limpar erro
};





export function InputAutoCompleteCliente({ onChange, limparErro, erro }: Props) {

  const [inputSearch, setInputSearch] = useState('');
  const [searchName, setSearchName] = useState('');
  const [habilitarBusca, setHabilitarBusca] = useState(true);


  const { data: clientes = [] } = useFetchCustomersByNameOrSurname(searchName, habilitarBusca);
  const { identificarCliente, removerCliente, pedidoEmEdicao, cart } = usePedidoStore();







  useEffect(() => {

    if(pedidoEmEdicao && cart.idCliente !== 1) {
      setInputSearch(cart?.nomeCliente)

    }

  }, [pedidoEmEdicao, cart]);






  useEffect(() => {

    // Função para buscar nomes
    const fetchUsers = () => {
      setSearchName(inputSearch);
    };

    // Debounce para evitar chamadas frequentes
    const timeoutId = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timeoutId);

  }, [inputSearch]);



  return (

    <div className="grid gap-1">
      {/* Aqui é o contêiner relativo para o autocomplete funcionar corretamente */}
      <div className="relative">

        <div className="relative w-full">
          {/* Ícone à esquerda */}
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />

          {/* Input com padding à esquerda */}
          <Input
            placeholder="Pesquise pelo nome ou apelido"
            className={`pl-10 pr-10 ${erro && "border border-red-500" } `}
            value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value)
              onChange(e.target.value)
              limparErro();
            }}
          />

          {/* Botão "X" à direita */}
          {inputSearch && (
            <button
              type="button"
              onClick={() => {
                setInputSearch("");
                removerCliente();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-900"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {clientes.length > 0  && (

          <div className="absolute z-20 w-full bg-white border mt-1 rounded shadow max-h-40 overflow-y-auto">
           
            {clientes.length > 0 && searchName && (
              clientes.map((item) => (
                <div
                  key={item.id}
                  className="w-full text-left px-2 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    
                    setInputSearch(item.nome);
                    setSearchName('');
                    setHabilitarBusca(false); // bloqueia nova busca
                    identificarCliente({ id: item.id, nome: item.nome });
                  }}
                >
                  {item.nome} - <span className="text-sm text-gray-600">{item.apelido}</span>
                </div>
              ))
            )}

          </div>
        )}

      </div>
    </div>

  );
}
