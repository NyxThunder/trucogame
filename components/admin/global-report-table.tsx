"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface GlobalReportTableProps {
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for global report
const globalReportData = [
  {
    date: "2025-05-05",
    activeUsers: 1243,
    newUsers: 45,
    totalGames: 3567,
    totalBets: 534500,
    commission: 26725,
    deposits: 450000,
    withdrawals: 325000,
    netBalance: 125000,
  },
  {
    date: "2025-05-04",
    activeUsers: 1210,
    newUsers: 38,
    totalGames: 3421,
    totalBets: 513200,
    commission: 25660,
    deposits: 420000,
    withdrawals: 310000,
    netBalance: 110000,
  },
  {
    date: "2025-05-03",
    activeUsers: 1195,
    newUsers: 42,
    totalGames: 3356,
    totalBets: 503400,
    commission: 25170,
    deposits: 435000,
    withdrawals: 305000,
    netBalance: 130000,
  },
  {
    date: "2025-05-02",
    activeUsers: 1180,
    newUsers: 35,
    totalGames: 3289,
    totalBets: 493350,
    commission: 24667,
    deposits: 410000,
    withdrawals: 290000,
    netBalance: 120000,
  },
  {
    date: "2025-05-01",
    activeUsers: 1165,
    newUsers: 40,
    totalGames: 3245,
    totalBets: 486750,
    commission: 24337,
    deposits: 425000,
    withdrawals: 315000,
    netBalance: 110000,
  },
]

export function GlobalReportTable({ dateRange }: GlobalReportTableProps) {
  // Filter data based on date range
  const filteredData = globalReportData.filter((item) => {
    const itemDate = new Date(item.date)
    return (!dateRange.from || itemDate >= dateRange.from) && (!dateRange.to || itemDate <= dateRange.to)
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Usuarios Activos</TableHead>
            <TableHead>Nuevos Usuarios</TableHead>
            <TableHead>Total Partidas</TableHead>
            <TableHead>Total Apostado</TableHead>
            <TableHead>Comisión</TableHead>
            <TableHead>Cargas</TableHead>
            <TableHead>Retiros</TableHead>
            <TableHead>Balance Neto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                No hay datos para el rango de fechas seleccionado
              </TableCell>
            </TableRow>
          ) : (
            filteredData.map((item) => (
              <TableRow key={item.date}>
                <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                <TableCell>{item.activeUsers}</TableCell>
                <TableCell>{item.newUsers}</TableCell>
                <TableCell>{item.totalGames}</TableCell>
                <TableCell>${item.totalBets.toLocaleString()}</TableCell>
                <TableCell>${item.commission.toLocaleString()}</TableCell>
                <TableCell>${item.deposits.toLocaleString()}</TableCell>
                <TableCell>${item.withdrawals.toLocaleString()}</TableCell>
                <TableCell>${item.netBalance.toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
