"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search, Filter, Plus } from "lucide-react"
import { ChatMessagesTable } from "@/components/admin/chat-messages-table"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BannedWordsTable } from "@/components/admin/banned-words-table"
import { useToast } from "@/hooks/use-toast"

export default function ModeracionPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [newBannedWord, setNewBannedWord] = useState("")

  const handleAddBannedWord = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newBannedWord.trim()) {
      toast({
        title: "Error",
        description: "La palabra no puede estar vacía",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Palabra agregada",
      description: `Se ha agregado "${newBannedWord}" a la lista de palabras prohibidas`,
    })

    setNewBannedWord("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Moderación de Chat</h1>
      </div>

      <Tabs defaultValue="messages">
        <TabsList className="mb-4">
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="banned-words">Palabras Prohibidas</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Mensajes Recientes</CardTitle>
              <CardDescription>Visualiza y modera los mensajes enviados en el chat.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar por usuario o contenido..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ChatMessagesTable searchQuery={searchQuery} dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banned-words">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agregar Palabra Prohibida</CardTitle>
                <CardDescription>Agrega palabras a la lista de filtrado automático.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBannedWord} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bannedWord">Palabra</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bannedWord"
                        placeholder="Palabra a prohibir"
                        value={newBannedWord}
                        onChange={(e) => setNewBannedWord(e.target.value)}
                      />
                      <Button type="submit" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Las palabras agregadas serán filtradas automáticamente en todos los chats.</p>
                    <p>Los usuarios que utilicen estas palabras recibirán una advertencia.</p>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Palabras Prohibidas</CardTitle>
                <CardDescription>Administra las palabras que serán filtradas automáticamente.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar palabra..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <BannedWordsTable searchQuery={searchQuery} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
