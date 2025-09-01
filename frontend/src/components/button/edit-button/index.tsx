// components/DeleteButton.tsx
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';


type EditButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: number; // tamanho opcional do ícone
};

export function EditButton({ size = 18,  ...props}: EditButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="
        bg-transparent text-orange-500
        hover:bg-orange-100 hover:text-orange-500
        rounded-full shadow-none 
        aspect-square
      "
      {...props}
    >
      <SquarePen style={{ width: `${size}px`, height:`${size}px`, flexShrink: 0 }}/>
    </Button>
  );
}
