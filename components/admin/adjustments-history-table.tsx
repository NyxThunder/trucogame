"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AdjustmentsHistoryTableProps {
  searchQuery: string
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for adjustments history
const adjustmentsHistory = [
  {
    id: 1,
    admin: "admin1",
    user: "juan123",
    amount: 500,
    type: "add",
    reason: "Compensación por error en el sistema",
    date: "2025-05-05T10:30:00",
  },
  {
    id: 2,
    admin: "superadmin",
    user: "maria456",
    amount: 1000,
    type: "add",
    reason: "Bonificación por primer depósito",
    date: "2025-05-05T11:15:00",
  },
  {
    id: 3,
    admin: "admin2",
    user: "pedro789",
    amount: 300,
    type: "subtract",
    reason: "Corrección de error en carga",
    date: "2025-05-05T12:00:00",
  },
  {
    id: 4,
    admin: "admin1",
    user: "ana456",
    amount: 750,
    type: "add",
    reason: "Compensación por problema técnico",
    date: "2025-05-04T13:30:00",
  },
  {
    id: 5,
    admin: "superadmin",
    user: "luis789",
    amount: 500,
    type: "subtract",
    reason: "Penalización por comportamiento inadecuado",
    date: "2025-05-04T14:45:00",
  },
]

export function AdjustmentsHistoryTable({ searchQuery, dateRange }: AdjustmentsHistoryTableProps) {
  // Filter adjustments based on search query and date range
  const filteredAdjustments = adjustmentsHistory.filter((adjustment) => {
    const matchesSearch =
      adjustment.admin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adjustment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adjustment.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adjustment.amount.toString().includes(searchQuery)

    const adjustmentDate = new Date(adjustment.date)
    const matchesDateRange =
      (!dateRange.from || adjustmentDate >= dateRange.from) && (!dateRange.to || adjustmentDate <= dateRange.to)

    return matchesSearch && matchesDateRange
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Administrador</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAdjustments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No hay ajustes que coincidan con los criterios de búsqueda
              </TableCell>
            </TableRow>
          ) : (
            filteredAdjustments.map((adjustment) => (
              <TableRow key={adjustment.id}>
                <TableCell>#{adjustment.id}</TableCell>
                <TableCell>{adjustment.admin}</TableCell>
                <TableCell>{adjustment.user}</TableCell>
                <TableCell>
                  <Badge variant={adjustment.type === "add" ? "success" : "destructive"}>
                    {adjustment.type === "add" ? "Agregar" : "Restar"}
                  </Badge>
                </TableCell>
                <TableCell>${adjustment.amount.toLocaleString()}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={adjustment.reason}>
                  {adjustment.reason}
                </TableCell>
                <TableCell>{new Date(adjustment.date).toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
