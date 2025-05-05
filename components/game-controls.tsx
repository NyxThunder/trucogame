"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface GameControlsProps {
  onAction: (action: string) => void
  isMyTurn: boolean
}

export function GameControls({ onAction, isMyTurn }: GameControlsProps) {
  const actions = [
    { id: "envido", label: "ENVIDO", color: "bg-blue-600 hover:bg-blue-700" },
    { id: "truco", label: "TRUCO", color: "bg-red-600 hover:bg-red-700" },
    { id: "quiero", label: "QUIERO", color: "bg-green-600 hover:bg-green-700" },
    { id: "no-quiero", label: "NO QUIERO", color: "bg-rose-600 hover:bg-rose-700" },
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex justify-center gap-2 p-4"
    >
      {actions.map((action) => (
        <motion.div
          key={action.id}
          whileHover={{ scale: isMyTurn ? 1.05 : 1 }}
          whileTap={{ scale: isMyTurn ? 0.95 : 1 }}
        >
          <Button
            onClick={() => isMyTurn && onAction(action.label)}
            className={`${action.color} text-white font-medium ${!isMyTurn ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!isMyTurn}
          >
            {action.label}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
