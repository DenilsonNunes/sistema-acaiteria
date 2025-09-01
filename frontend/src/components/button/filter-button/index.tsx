
import { Funnel } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';


type FilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: number; // tamanho opcional do ícone
};

export function FilterButton({ size = 18,  ...props}: FilterButtonProps) {
  return (
    <button className="cursor-pointer px-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      {...props}
    >
      <Funnel size={size}/>
    </button>
  );
}
