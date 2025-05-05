"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Search, Filter, Download } from "lucide-react"
import { PendingDepositsTable } from "@/components/admin/pending-deposits-table"
import { CompletedDepositsTable } from "@/components/admin/completed-deposits-table"
import { DateRangePicker } from "@/components/admin/date-range-picker"

export default function CargasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Cargas</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Cargas</CardTitle>
          <CardDescription>Administra las solicitudes de carga de saldo de los usuarios.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">
                Buscar
              </Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="search"
                  placeholder="Buscar por usuario, código o monto..."
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

          <Tabs defaultValue="pending">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="completed">Completadas</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <PendingDepositsTable searchQuery={searchQuery} dateRange={dateRange} />
            </TabsContent>
            <TabsContent value="completed">
              <CompletedDepositsTable searchQuery={searchQuery} dateRange={dateRange} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
