"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AdminTokensTableProps {
  searchQuery: string
}

// Mock data for admin tokens
const adminTokensData = [
  {
    admin: "admin1",
    totalAssigned: 100000,
    used: 75000,
    remaining: 25000,
    lastAssigned: "2025-05-04T10:30:00",
  },
  {
    admin: "admin2",
    totalAssigned: 150000,
    used: 120000,
    remaining: 30000,
    lastAssigned: "2025-05-04T11:15:00",
  },
  {
    admin: "admin3",
    totalAssigned: 80000,
    used: 65000,
    remaining: 15000,
    lastAssigned: "2025-05-04T12:00:00",
  },
  {
    admin: "admin4",
    totalAssigned: 120000,
    used: 90000,
    remaining: 30000,
    lastAssigned: "2025-05-04T13:30:00",
  },
  {
    admin: "admin5",
    totalAssigned: 200000,
    used: 180000,
    remaining: 20000,
    lastAssigned: "2025-05-04T14:45:00",
  },
]

export function AdminTokensTable({ searchQuery }: AdminTokensTableProps) {
  // Filter data based on search query
  const filteredData = adminTokensData.filter((admin) => admin.admin.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Administrador</TableHead>
            <TableHead>Total Asignado</TableHead>
            <TableHead>Utilizado</TableHead>
            <TableHead>Restante</TableHead>
            <TableHead>Uso</TableHead>
            <TableHead>Última Asignación</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No hay administradores que coincidan con la búsqueda
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((admin) => {
              const usagePercentage = Math.round((admin.used / admin.totalAssigned) * 100)
              return (
                <TableRow key={admin.admin}>
                  <TableCell className="font-medium">{admin.admin}</TableCell>
                  <TableCell>${admin.totalAssigned.toLocaleString()}</TableCell>
                  <TableCell>${admin.used.toLocaleString()}</TableCell>
                  <TableCell>${admin.remaining.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={usagePercentage} className="h-2" />
                      <span className="text-xs">{usagePercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(admin.lastAssigned).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        admin.remaining < 10000 ? "destructive" : admin.remaining < 30000 ? "warning" : "success"
                      }
                    >
                      {admin.remaining < 10000 ? "Crítico" : admin.remaining < 30000 ? "Bajo" : "Normal"}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
