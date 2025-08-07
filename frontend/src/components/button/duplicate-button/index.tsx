import { Copy } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';


type DeleteButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DuplicateButton(props: DeleteButtonProps) {
  return (
    <button className="cursor-pointer p-1.5  text-blue-600 hover:bg-blue-100 rounded-full"
      {...props}
    >
      <Copy size={18} />
    </button>
  )
                         
}
