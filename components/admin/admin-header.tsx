"use client"

import { useState } from "react"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function AdminHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Retiro de alto monto",
      description: "Usuario juan123 solicitó un retiro de $600,000",
      time: "Hace 5 minutos",
      read: false,
    },
    {
      id: 2,
      title: "Múltiples cargas",
      description: "Admin1 realizó 15 cargas en menos de 10 minutos",
      time: "Hace 30 minutos",
      read: false,
    },
    {
      id: 3,
      title: "Jugador con muchas victorias",
      description: "Usuario pedro456 ganó 8 partidas consecutivas",
      time: "Hace 1 hora",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <header className="h-16 border-b bg-card flex items-center px-6">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notificaciones</span>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                  Marcar todas como leídas
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground">No hay notificaciones</div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start p-3 ${notification.read ? "" : "bg-accent/50"}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground">{notification.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
