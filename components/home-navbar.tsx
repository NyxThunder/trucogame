"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, MessageSquare, Grid3X3, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface HomeNavbarProps {
  currentRoom: string
}

export function HomeNavbar({ currentRoom }: HomeNavbarProps) {
  const [activeTab, setActiveTab] = useState("mesas")

  const tabs = [
    { id: "mesas", label: "Mesas", icon: <Grid3X3 className="h-4 w-4" />, count: 31 },
    { id: "chat", label: "Chat", icon: <MessageSquare className="h-4 w-4" />, count: 503 },
    { id: "campeonatos", label: "Campeonatos", icon: <Trophy className="h-4 w-4" />, count: 9 },
    { id: "ranking", label: "Ranking", icon: <Trophy className="h-4 w-4" /> },
    { id: "salas", label: "Salas", icon: <Home className="h-4 w-4" />, count: 3 },
  ]

  return (
    <div className="bg-card border-y border-border sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <nav className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count && (
                <Badge variant="secondary" className="h-5 min-w-5 flex items-center justify-center p-0 text-xs">
                  {tab.count}
                </Badge>
              )}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
