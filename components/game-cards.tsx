"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Card {
  id: number
  suit: string
  value: number
  image: string
}

interface GameCardsProps {
  cards: Card[]
  onCardPlay: (cardId: number) => void
  isMyTurn: boolean
}

export function GameCards({ cards, onCardPlay, isMyTurn }: GameCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="flex items-end justify-center -space-x-6 mt-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ y: 100, opacity: 0, rotateY: 180 }}
          animate={{
            y: 0,
            opacity: 1,
            rotateY: 0,
            translateY: hoveredCard === card.id && isMyTurn ? -20 : 0,
          }}
          transition={{
            delay: index * 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          whileHover={{
            translateY: isMyTurn ? -20 : 0,
            scale: isMyTurn ? 1.05 : 1,
            zIndex: 10,
          }}
          className={`relative w-20 h-32 cursor-pointer ${isMyTurn ? "" : "opacity-80 cursor-not-allowed"}`}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => isMyTurn && onCardPlay(card.id)}
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            src={card.image || "/placeholder.svg"}
            alt={`${card.value} de ${card.suit}`}
            className="w-full h-full object-contain rounded-md shadow-md"
          />

          {/* Glow effect when it's your turn and card is hovered */}
          {isMyTurn && hoveredCard === card.id && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 rounded-md bg-primary/20 shadow-[0_0_15px_rgba(255,255,255,0.5)] pointer-events-none"
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
