"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search, Filter, Download } from "lucide-react"
import { AdminTokensTable } from "@/components/admin/admin-tokens-table"
import { AdminTokenHistoryTable } from "@/components/admin/admin-token-history-table"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { useToast } from "@/hooks/use-toast"

export default function FichasPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [formData, setFormData] = useState({
    adminUsername: "",
    amount: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.adminUsername || !formData.amount) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive",
      })
      return
    }

    // Process form
    toast({
      title: "Fichas asignadas",
      description: `Se han asignado ${formData.amount} fichas a ${formData.adminUsername}`,
    })

    // Reset form
    setFormData({
      adminUsername: "",
      amount: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Fichas por Admin</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Asignar Fichas</CardTitle>
            <CardDescription>
              Asigna fichas a un administrador para que pueda acreditar saldo a los usuarios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminUsername">Administrador</Label>
                <Input
                  id="adminUsername"
                  placeholder="Nombre de usuario del administrador"
                  value={formData.adminUsername}
                  onChange={(e) => setFormData({ ...formData, adminUsername: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Cantidad de Fichas</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Cantidad de fichas a asignar"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>

              <Button type="submit" className="w-full">
                Asignar Fichas
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fichas por Administrador</CardTitle>
            <CardDescription>Visualiza las fichas asignadas y utilizadas por cada administrador.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por administrador..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <AdminTokensTable searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Movimientos de Fichas</CardTitle>
          <CardDescription>Visualiza el historial de asignaciones y usos de fichas por administrador.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por administrador o usuario..."
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

          <AdminTokenHistoryTable searchQuery={searchQuery} dateRange={dateRange} />
        </CardContent>
      </Card>
    </div>
  )
}
