import React from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';






const InputValue = ({value: number}) => {
  return (
    <div className="flex w-fit">
      {/* Prefixo “R$” — fica só decorativo, sem ação */}
      <Button
        type="button"
        variant="outline"
        disabled          // evita clique / foco indesejado
        className="rounded-r-none cursor-default select-none bg-gray-200 px-3"
      >
        R$
      </Button>

      {/* Campo de valor */}
      <Input
        value={value}
        inputMode="decimal"
        placeholder="0,00"
        className="rounded-l-none w-25"  /* width opcional */
      />
    </div>
  )
}

export default InputValue