"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Flame, Shield, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Mock data for game tables
const MOCK_TABLES = [
  { id: 1, player: "uriel1357", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", bet: 15, maxPlayers: 2, currentPlayers: 1 },
  { id: 2, player: "Fulanito_823", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", bet: 15, maxPlayers: 2, currentPlayers: 1 },
  { id: 3, player: "lucas12116", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", bet: 15, maxPlayers: 2, currentPlayers: 1 },
  { id: 4, player: "javier5220", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", bet: 30, maxPlayers: 4, currentPlayers: 3 },
  { id: 5, player: "LaMurallaDelO", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", bet: 30, maxPlayers: 2, currentPlayers: 1 },
  { id: 6, player: "leo4477", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", bet: 30, maxPlayers: 2, currentPlayers: 1 },
  { id: 7, player: "matias15252", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", bet: 30, maxPlayers: 2, currentPlayers: 1 },
  { id: 8, player: "juan28281", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2", bet: 30, maxPlayers: 2, currentPlayers: 1 },
]

export function GameTables() {
  const router = useRouter()
  const [tables, setTables] = useState(MOCK_TABLES)

  const handleJoinTable = (tableId: number) => {
    router.push(`/game/${tableId}`)
  }

  const handleCreateTable = () => {
    // In a real app, this would create a new table via API
    const newTable = {
      id: tables.length + 1,
      player: "You",
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2",
      bet: 15,
      maxPlayers: 2,
      currentPlayers: 1,
    }

    setTables([...tables, newTable])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
        <Card
          className="flex flex-col items-center justify-center h-full min-h-[200px] border-dashed cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={handleCreateTable}
        >
          <Plus className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="font-medium text-lg">CREAR MESA</p>
        </Card>
      </motion.div>

      {tables.map((table) => (
        <motion.div
          key={table.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-full"
        >
          <Card className="overflow-hidden h-full">
            <div className="p-4 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=256&h=256&facepad=2"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border border-background"></div>
                </div>
                <div className="flex-1 truncate">
                  <p className="font-medium truncate">{table.player}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>
                      {table.currentPlayers}/{table.maxPlayers}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <Button className="w-full mb-3" onClick={() => handleJoinTable(table.id)}>
                  JUGAR
                </Button>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span>{table.bet}</span>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Flame className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
