"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Ban, Flag, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ChatMessagesTableProps {
  searchQuery: string
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    user: "juan123",
    message: "Hola a todos, ¿alguien para jugar?",
    room: "El Firulete",
    date: "2025-05-05T10:30:00",
    flagged: false,
  },
  {
    id: 2,
    user: "maria456",
    message: "Buen juego, gracias por la partida",
    room: "El Firulete",
    date: "2025-05-05T11:15:00",
    flagged: false,
  },
  {
    id: 3,
    user: "pedro789",
    message: "Esto es una estafa, me robaron fichas",
    room: "La Esquina",
    date: "2025-05-05T12:00:00",
    flagged: true,
  },
  {
    id: 4,
    user: "ana456",
    message: "¿Alguien sabe cómo retirar?",
    room: "La Esquina",
    date: "2025-05-05T13:30:00",
    flagged: false,
  },
  {
    id: 5,
    user: "luis789",
    message: "Vamos a jugar un torneo, ¿quién se suma?",
    room: "El Firulete",
    date: "2025-05-05T14:45:00",
    flagged: false,
  },
]

export function ChatMessagesTable({ searchQuery, dateRange }: ChatMessagesTableProps) {
  const { toast } = useToast()
  const [messages, setMessages] = useState(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<(typeof initialMessages)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const flagMessage = (id: number) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, flagged: !message.flagged } : message)))
    toast({
      title: "Mensaje marcado",
      description: `El mensaje ha sido ${messages.find((m) => m.id === id)?.flagged ? "desmarcado" : "marcado"} para revisión`,
    })
  }

  const banUser = (user: string) => {
    toast({
      title: "Usuario sancionado",
      description: `El usuario ${user} ha sido sancionado temporalmente`,
    })
  }

  const viewDetails = (message: (typeof initialMessages)[0]) => {
    setSelectedMessage(message)
    setDetailsOpen(true)
  }

  // Filter messages based on search query and date range
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.room.toLowerCase().includes(searchQuery.toLowerCase())

    const messageDate = new Date(message.date)
    const matchesDateRange =
      (!dateRange.from || messageDate >= dateRange.from) && (!dateRange.to || messageDate <= dateRange.to)

    return matchesSearch && matchesDateRange
  })

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Mensaje</TableHead>
              <TableHead>Sala</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No hay mensajes que coincidan con los criterios de búsqueda
                </TableCell>
              </TableRow>
            ) : (
              filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>#{message.id}</TableCell>
                  <TableCell>{message.user}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={message.message}>
                    {message.message}
                  </TableCell>
                  <TableCell>{message.room}</TableCell>
                  <TableCell>{new Date(message.date).toLocaleString()}</TableCell>
                  <TableCell>{message.flagged && <Badge variant="destructive">Marcado</Badge>}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => viewDetails(message)} title="Ver detalles">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => flagMessage(message.id)}
                        className={message.flagged ? "text-destructive" : ""}
                        title={message.flagged ? "Desmarcar" : "Marcar"}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => banUser(message.user)}
                        className="text-destructive"
                        title="Sancionar usuario"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Mensaje</DialogTitle>
            <DialogDescription>Información completa del mensaje</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">ID</p>
                  <p className="text-sm text-muted-foreground">#{selectedMessage.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Usuario</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Sala</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage.room}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Fecha</p>
                  <p className="text-sm text-muted-foreground">{new Date(selectedMessage.date).toLocaleString()}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Mensaje</p>
                  <p className="text-sm text-muted-foreground">{selectedMessage.message}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Estado</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMessage.flagged ? (
                      <Badge variant="destructive">Marcado para revisión</Badge>
                    ) : (
                      <Badge variant="outline">Normal</Badge>
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium">Acciones</p>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => {
                      flagMessage(selectedMessage.id)
                      setDetailsOpen(false)
                    }}
                    className="flex-1"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {selectedMessage.flagged ? "Desmarcar" : "Marcar"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      banUser(selectedMessage.user)
                      setDetailsOpen(false)
                    }}
                    className="flex-1"
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Sancionar Usuario
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
