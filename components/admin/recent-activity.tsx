"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    user: "admin1",
    action: "Aprobó una carga",
    target: "usuario123",
    amount: "$5,000",
    time: "Hace 5 minutos",
  },
  {
    id: 2,
    user: "admin2",
    action: "Rechazó un retiro",
    target: "usuario456",
    amount: "$10,000",
    time: "Hace 15 minutos",
  },
  {
    id: 3,
    user: "superadmin",
    action: "Ajustó el saldo",
    target: "usuario789",
    amount: "+$2,000",
    time: "Hace 30 minutos",
  },
  {
    id: 4,
    user: "admin1",
    action: "Aprobó un retiro",
    target: "usuario234",
    amount: "$3,500",
    time: "Hace 45 minutos",
  },
  {
    id: 5,
    user: "superadmin",
    action: "Asignó fichas",
    target: "admin2",
    amount: "10,000 fichas",
    time: "Hace 1 hora",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivity.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${activity.user}.png`} alt={activity.user} />
            <AvatarFallback>{activity.user[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-bold">{activity.user}</span> {activity.action}{" "}
              <span className="text-muted-foreground">a {activity.target}</span>
            </p>
            <p className="text-sm text-muted-foreground">{activity.amount}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
