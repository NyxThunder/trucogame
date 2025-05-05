"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface AdminTokenHistoryTableProps {
  searchQuery: string
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for admin token history
const adminTokenHistoryData = [
  {
    id: 1,
    admin: "admin1",
    type: "assigned",
    amount: 50000,
    assignedBy: "superadmin",
    user: null,
    date: "2025-05-05T10:30:00",
  },
  {
    id: 2,
    admin: "admin1",
    type: "used",
    amount: 5000,
    assignedBy: null,
    user: "juan123",
    date: "2025-05-05T11:15:00",
  },
  {
    id: 3,
    admin: "admin2",
    type: "assigned",
    amount: 75000,
    assignedBy: "superadmin",
    user: null,
    date: "2025-05-05T12:00:00",
  },
  {
    id: 4,
    admin: "admin2",
    type: "used",
    amount: 10000,
    assignedBy: null,
    user: "maria456",
    date: "2025-05-05T13:30:00",
  },
  {
    id: 5,
    admin: "admin1",
    type: "used",
    amount: 7500,
    assignedBy: null,
    user: "pedro789",
    date: "2025-05-04T14:45:00",
  },
]

export function AdminTokenHistoryTable({ searchQuery, dateRange }: AdminTokenHistoryTableProps) {
  // Filter data based on search query and date range
  const filteredData = adminTokenHistoryData.filter((item) => {
    const matchesSearch =
      item.admin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.user && item.user.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.assignedBy && item.assignedBy.toLowerCase().includes(searchQuery.toLowerCase()))

    const itemDate = new Date(item.date)
    const matchesDateRange =
      (!dateRange.from || itemDate >= dateRange.from) && (!dateRange.to || itemDate <= dateRange.to)

    return matchesSearch && matchesDateRange
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Administrador</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Asignado por</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No hay movimientos que coincidan con los criterios de búsqueda
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>#{item.id}</TableCell>
                <TableCell>{item.admin}</TableCell>
                <TableCell>
                  <Badge variant={item.type === "assigned" ? "success" : "default"}>
                    {item.type === "assigned" ? "Asignación" : "Uso"}
                  </Badge>
                </TableCell>
                <TableCell>${item.amount.toLocaleString()}</TableCell>
                <TableCell>{item.assignedBy || "-"}</TableCell>
                <TableCell>{item.user || "-"}</TableCell>
                <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
