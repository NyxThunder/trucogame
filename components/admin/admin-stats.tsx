"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, ArrowDownToLine, DollarSign } from "lucide-react"

export function AdminStats() {
  // This would normally be fetched from an API
  const stats = {
    activeUsers: 1243,
    pendingDeposits: 15,
    pendingWithdrawals: 8,
    dailyCommission: 12500,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">+5% desde la semana pasada</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cargas Pendientes</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingDeposits}</div>
          <p className="text-xs text-muted-foreground">{stats.pendingDeposits > 10 ? "Requiere atención" : "Normal"}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Retiros Pendientes</CardTitle>
          <ArrowDownToLine className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingWithdrawals}</div>
          <p className="text-xs text-muted-foreground">
            {stats.pendingWithdrawals > 10 ? "Requiere atención" : "Normal"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Comisión Diaria</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.dailyCommission.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+12% desde ayer</p>
        </CardContent>
      </Card>
    </div>
  )
}
