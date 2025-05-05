"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter } from "lucide-react"
import { AdjustmentsHistoryTable } from "@/components/admin/adjustments-history-table"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AjustesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [formData, setFormData] = useState({
    username: "",
    amount: "",
    reason: "",
    type: "add",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.username || !formData.amount || !formData.reason) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      })
      return
    }

    // Process form
    toast({
      title: "Ajuste realizado",
      description: `Se ha ${formData.type === "add" ? "agregado" : "restado"} ${formData.amount} fichas a ${formData.username}`,
    })

    // Reset form
    setFormData({
      username: "",
      amount: "",
      reason: "",
      type: "add",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Ajuste de Fichas</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Realizar Ajuste</CardTitle>
            <CardDescription>Ajusta manualmente el saldo de un usuario.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <Input
                  id="username"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Monto</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Cantidad de fichas"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Agregar</SelectItem>
                      <SelectItem value="subtract">Restar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo</Label>
                <Textarea
                  id="reason"
                  placeholder="Motivo del ajuste"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full">
                Realizar Ajuste
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Ajustes</CardTitle>
            <CardDescription>Visualiza los ajustes realizados por los administradores.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por usuario o admin..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <AdjustmentsHistoryTable searchQuery={searchQuery} dateRange={dateRange} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
