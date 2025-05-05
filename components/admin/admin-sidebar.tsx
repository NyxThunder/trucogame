"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  CreditCard,
  ArrowDownToLine,
  Settings,
  BarChart3,
  Users,
  MessageSquare,
  Coins,
  ChevronLeft,
  LogOut,
} from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin",
      active: pathname === "/admin",
      role: "all",
    },
    {
      label: "Cargas",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/admin/cargas",
      active: pathname === "/admin/cargas",
      role: "all",
    },
    {
      label: "Retiros",
      icon: <ArrowDownToLine className="h-5 w-5" />,
      href: "/admin/retiros",
      active: pathname === "/admin/retiros",
      role: "all",
    },
    {
      label: "Ajuste de Fichas",
      icon: <Coins className="h-5 w-5" />,
      href: "/admin/ajustes",
      active: pathname === "/admin/ajustes",
      role: "all",
    },
    {
      label: "Reportes",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin/reportes",
      active: pathname === "/admin/reportes",
      role: "all",
    },
    {
      label: "Fichas por Admin",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/fichas",
      active: pathname === "/admin/fichas",
      role: "superadmin",
    },
    {
      label: "Moderación",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/moderacion",
      active: pathname === "/admin/moderacion",
      role: "superadmin",
    },
    {
      label: "Configuración",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/configuracion",
      active: pathname === "/admin/configuracion",
      role: "superadmin",
    },
  ]

  return (
    <div
      className={cn(
        "relative h-screen border-r bg-card flex flex-col transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && <span className="font-bold text-lg">Admin Panel</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("absolute -right-4 top-6 bg-background border rounded-full", collapsed && "rotate-180")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                route.active
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              {route.icon}
              {!collapsed && <span className="ml-3">{route.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Cerrar Sesión</span>}
        </Button>
      </div>
    </div>
  )
}
