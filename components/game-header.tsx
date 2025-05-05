"use client"

import { X, Home, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

interface GameHeaderProps {
  gameId: string
  points: { player: number; opponent: number }
  currentBet: number
  onExit: () => void
}

export function GameHeader({ gameId, points, currentBet, onExit }: GameHeaderProps) {
  return (
    <div className="bg-card border-b border-border p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onExit}>
          <Home className="h-5 w-5" />
        </Button>

        <div>
          <h2 className="font-medium">Mesa #{gameId}</h2>
          <p className="text-xs text-muted-foreground">Apuesta: {currentBet} fichas</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-lg font-bold">
        <span className="text-green-500">{points.player}</span>
        <span className="text-muted-foreground">-</span>
        <span className="text-red-500">{points.opponent}</span>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="destructive" size="icon" onClick={onExit}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
