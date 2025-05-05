"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for alerts
const initialAlerts = [
  {
    id: 1,
    type: "high-withdrawal",
    title: "Retiro de alto monto",
    description: "Usuario juan123 solicitó un retiro de $600,000",
    time: "Hace 5 minutos",
    severity: "high",
  },
  {
    id: 2,
    type: "admin-activity",
    title: "Múltiples cargas",
    description: "Admin1 realizó 15 cargas en menos de 10 minutos",
    time: "Hace 30 minutos",
    severity: "medium",
  },
  {
    id: 3,
    type: "winning-streak",
    title: "Jugador con muchas victorias",
    description: "Usuario pedro456 ganó 8 partidas consecutivas",
    time: "Hace 1 hora",
    severity: "medium",
  },
  {
    id: 4,
    type: "quick-withdrawal",
    title: "Retiro inmediato tras carga",
    description: "Usuario ana789 cargó $50,000 y solicitó retiro de $45,000 en menos de 10 minutos",
    time: "Hace 2 horas",
    severity: "high",
  },
]

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(initialAlerts)

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const markAsReviewed = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  if (alerts.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Alertas del Sistema
        </CardTitle>
        <CardDescription>Alertas automáticas que requieren revisión.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start justify-between gap-4 rounded-lg border p-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{alert.title}</h4>
                  <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                    {alert.severity === "high" ? "Alta" : "Media"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => markAsReviewed(alert.id)}
                  title="Marcar como revisada"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => dismissAlert(alert.id)} title="Descartar">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
