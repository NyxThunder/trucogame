"use client"

import { useState, useEffect } from "react"
import { GameTable } from "@/components/game-table"
import { GameChat } from "@/components/game-chat"
import { GameControls } from "@/components/game-controls"
import { GameCards } from "@/components/game-cards"
import { GameHeader } from "@/components/game-header"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function GamePage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const router = useRouter()
  const [gameState, setGameState] = useState({
    myTurn: true,
    myCards: [
      { id: 1, suit: "copa", value: 7, image: "/cards/7-copa.png" },
      { id: 2, suit: "espada", value: 10, image: "/cards/10-espada.png" },
      { id: 3, suit: "oro", value: 10, image: "/cards/10-oro.png" },
    ],
    tableCards: [],
    opponentName: "gui39",
    opponentAvatar: "/avatars/default.png",
    points: { player: 0, opponent: 0 },
    currentBet: 15,
    messages: [{ id: 1, user: "gui39", text: "Real Envido", timestamp: new Date().toISOString() }],
  })

  useEffect(() => {
    // Simulate receiving a game event
    const timer = setTimeout(() => {
      toast({
        title: "¡Envido!",
        description: "Tu oponente ha cantado Envido",
      })
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast])

  const handleCardPlay = (cardId: number) => {
    // Find the card
    const card = gameState.myCards.find((c) => c.id === cardId)
    if (!card) return

    // Remove from hand and add to table
    setGameState((prev) => ({
      ...prev,
      myCards: prev.myCards.filter((c) => c.id !== cardId),
      tableCards: [...prev.tableCards, card],
      myTurn: false,
    }))

    // Simulate opponent's turn after a delay
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        myTurn: true,
      }))
    }, 2000)
  }

  const handleGameAction = (action: string) => {
    toast({
      title: action,
      description: `Has elegido: ${action}`,
    })
  }

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    setGameState((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: prev.messages.length + 1,
          user: "you",
          text: message,
          timestamp: new Date().toISOString(),
        },
      ],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/90 to-background flex flex-col">
      <GameHeader
        gameId={params.id}
        points={gameState.points}
        currentBet={gameState.currentBet}
        onExit={() => router.push("/")}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 relative">
          <GameTable>
            {/* Opponent area */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            >
              <div className="relative">
                <img
                  src={gameState.opponentAvatar || "/placeholder.svg"}
                  alt={gameState.opponentName}
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-background"></div>
              </div>
              <span className="text-sm font-medium mt-1">{gameState.opponentName}</span>

              {/* Opponent's cards (face down) */}
              <div className="mt-3 flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="w-14 h-20 bg-blue-900 rounded-md border border-blue-700 shadow-md transform"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 bg-[url('/cards/back.png')] bg-cover rounded-md"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Center table area for played cards */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2">
              {gameState.tableCards.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ scale: 0.5, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-16 h-24"
                >
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={`${card.value} de ${card.suit}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              ))}
            </div>

            {/* Player area */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <GameCards cards={gameState.myCards} onCardPlay={handleCardPlay} isMyTurn={gameState.myTurn} />
            </div>
          </GameTable>

          <GameControls onAction={handleGameAction} isMyTurn={gameState.myTurn} />
        </div>

        <GameChat messages={gameState.messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
