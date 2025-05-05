"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { GlobalReportTable } from "@/components/admin/global-report-table"
import { PlayerReportTable } from "@/components/admin/player-report-table"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { ReportCharts } from "@/components/admin/report-charts"

export default function ReportesPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reportes y Estadísticas</CardTitle>
          <CardDescription>Visualiza datos sobre la actividad de la plataforma.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-end">
            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          </div>

          <ReportCharts dateRange={dateRange} />

          <Tabs defaultValue="global" className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="player">Por Jugador</TabsTrigger>
            </TabsList>
            <TabsContent value="global">
              <GlobalReportTable dateRange={dateRange} />
            </TabsContent>
            <TabsContent value="player">
              <PlayerReportTable dateRange={dateRange} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
