"use client"

import { useState } from "react"
import { Coins, Plus, ArrowDownToLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

export function UserBalance() {
  const { toast } = useToast()
  const [balance, setBalance] = useState(30)

  const handleAddBalance = () => {
    toast({
      title: "Cargar saldo",
      description: "Se ha abierto el formulario para cargar saldo",
    })
  }

  const handleWithdraw = () => {
    toast({
      title: "Retirar saldo",
      description: "Se ha abierto el formulario para retirar saldo",
    })
  }

  return (
    <div className="flex items-center gap-2">
      <div className="bg-card border border-border rounded-md px-3 py-1.5 flex items-center gap-2">
        <Coins className="h-4 w-4 text-yellow-500" />
        <span className="font-medium">{balance}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleAddBalance}>
            <Plus className="h-4 w-4 mr-2" />
            <span>Cargar saldo</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleWithdraw}>
            <ArrowDownToLine className="h-4 w-4 mr-2" />
            <span>Retirar saldo</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
