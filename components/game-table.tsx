"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface GameTableProps {
  children: React.ReactNode
}

export function GameTable({ children }: GameTableProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="relative flex-1 flex items-center justify-center min-h-[500px]">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/backgrounds/table-bg.png')] bg-cover bg-center opacity-30"></div>

      {/* Table */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: loaded ? 1 : 0.8, opacity: loaded ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-[90%] max-w-3xl aspect-[16/9] rounded-[50%] bg-gradient-to-b from-amber-800 to-amber-950 shadow-xl"
      >
        {/* Table texture overlay */}
        <div className="absolute inset-0 rounded-[50%] bg-[url('/textures/wood-texture.png')] bg-cover mix-blend-overlay opacity-40"></div>

        {/* Table inner shadow */}
        <div className="absolute inset-0 rounded-[50%] shadow-inner"></div>

        {children}
      </motion.div>
    </div>
  )
}
