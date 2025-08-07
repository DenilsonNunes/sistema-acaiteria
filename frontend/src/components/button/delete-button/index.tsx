// components/DeleteButton.tsx
import { Trash2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';


type DeleteButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DeleteButton(props: DeleteButtonProps) {
  return (
    <button
      className="cursor-pointer p-1.5 text-red-600 hover:bg-red-100 rounded-full"
      {...props}
    >
      <Trash2 size={18} />
    </button>
  );
}
