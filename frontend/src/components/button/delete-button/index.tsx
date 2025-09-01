// components/DeleteButton.tsx
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';


type DeleteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: number; // tamanho opcional do ícone
};

export function DeleteButton({ size = 18, ...props }: DeleteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="
        bg-transparent text-red-600 
        hover:bg-red-100 hover:text-red-600
        rounded-full shadow-none 
        aspect-square
      "
      {...props}
    >
      <Trash2 style={{ width: `${size}px`, height:`${size}px`, flexShrink: 0 }}/>
    </Button>

  );
}