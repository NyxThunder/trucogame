"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, ChevronRight, Users } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@/components/ui/avatar"

// Mock data for weekly ranking
const MOCK_RANKING = [
  { position: 4, player: "matias3134", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", points: 152 },
  { position: 5, player: "leandro7981", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", points: 137 },
  { position: 6, player: "oriana175", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", points: 137 },
]

export function WeeklyRanking() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <h3 className="font-bold text-lg">Ranking Semanal</h3>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary flex items-center hover:underline"
        >
          Ver completo
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Trophy className="h-10 w-10 text-yellow-500" />
          <div>
            <p className="text-sm text-muted-foreground">¿Podés ganarle a nuestros</p>
            <p className="font-bold">campeones?</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {MOCK_RANKING.map((player) => (
            <motion.div
              key={player.position}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: player.position * 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                {player.position}
              </div>
              <Avatar className="h-6 w-6">
                <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.player} />
                <AvatarFallback>{player.player[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm flex-1 truncate">{player.player}</span>
              <span className="text-sm font-medium flex items-center">
                <Trophy className="h-3 w-3 text-yellow-500 mr-1" />
                {player.points}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Top Jugadores
              </h4>

              {/* More ranking data would go here */}
              <p className="text-sm text-muted-foreground">Cargando más jugadores...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
