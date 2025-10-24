// components/DeleteButton.tsx
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';


type ViewButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: number; // tamanho opcional do ícone
  tooltip?: boolean;
};

export function ViewButton({ size = 18, tooltip = false,  ...props}: ViewButtonProps) {


  if(tooltip){

    return (

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>


            <Button
              variant="ghost"
              size="icon"
              className="
                bg-transparent text-gray-500
                hover:bg-gray-200 hover:text-gray-500
                rounded-full shadow-none 
                aspect-square
                cursor-pointer
              "
              {...props}
            >
              <Eye style={{ width: `${size}px`, height:`${size}px`, flexShrink: 0 }}/>
            </Button>

          </TooltipTrigger>
          <TooltipContent>
            <p>Visualizar cliente</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    );

  } else {

    return (
      <Button
        variant="ghost"
        size="icon"
        className="
          bg-transparent text-gray-500
          hover:bg-gray-200 hover:text-gray-500
          rounded-full shadow-none 
          aspect-square
        "
        {...props}
      >
        <Eye style={{ width: `${size}px`, height:`${size}px`, flexShrink: 0 }}/>
      </Button>
    );
  }


}
