// components/DeleteButton.tsx
import { SquarePen } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';


type DeleteButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function EditButton(props: DeleteButtonProps) {
  return (
    <button className="cursor-pointer p-1.5  text-orange-500 rounded-full hover:bg-orange-100"
      {...props}
    >
      <SquarePen size={18}/>
    </button>
  );
}
