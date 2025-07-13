import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


interface TooltipCustomProps {
  message: string;
  children: React.ReactNode; // Adiciona a prop `children` para renderizar o conteúdo do trigger
}

const TooltipCustom = ({ message, children }: TooltipCustomProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipCustom