import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


const statusColors: Record<string, string> = {
  "1": "bg-yellow-500 border-4 border-yellow-100",  // Aguardando Produção
  "2": "bg-blue-500 border-4 border-blue-100",    // Em Produção
  "3": "bg-green-500 border-4 border-green-100",   // Concluído Produção
  "4": "bg-orange-500 border-4 border-orange-100",  // Aguardando retirada
  "5": "bg-violet-500 border-4 border-violet-100",    // Para entrega
  "6": "bg-emerald-600 ", // Concluído
  "7": "bg-red-500 border-4 border-red-100",     // Cancelado
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      className={cn(
        "p-0 h-4 w-4 rounded-full",
        statusColors[status] ?? "bg-gray-400" // fallback
      )}
    />
  )
}