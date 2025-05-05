import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { RecentActivity } from "@/components/admin/recent-activity"
import { AdminStats } from "@/components/admin/admin-stats"
import { AdminStatsSkeleton } from "@/components/admin/admin-stats-skeleton"
import { AlertsPanel } from "@/components/admin/alerts-panel"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <Suspense fallback={<AdminStatsSkeleton />}>
        <AdminStats />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
            <CardDescription>Comisiones y actividad de los últimos 30 días.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones realizadas en el sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>

      <AlertsPanel />
    </div>
  )
}
