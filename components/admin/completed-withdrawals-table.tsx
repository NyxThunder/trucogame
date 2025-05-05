"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CompletedWithdrawalsTableProps {
  searchQuery: string
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for completed withdrawals
const completedWithdrawals = [
  {
    id: "WIT-101",
    user: "carlos123",
    amount: 3000,
    alias: "carlos.lopez.mp",
    bank: "Mercado Pago",
    date: "2025-05-04T10:30:00",
    status: "approved",
    approvedBy: "admin1",
    approvedAt: "2025-05-04T11:15:00",
    transactionId: "MP-123456789",
  },
  {
    id: "WIT-102",
    user: "laura456",
    amount: 7500,
    alias: "laura.garcia.bna",
    bank: "Banco Nación",
    date: "2025-05-04T12:45:00",
    status: "approved",
    approvedBy: "admin2",
    approvedAt: "2025-05-04T13:30:00",
    transactionId: "BNA-987654321",
  },
  {
    id: "WIT-103",
    user: "roberto789",
    amount: 12000,
    alias: "roberto.fernandez.mp",
    bank: "Mercado Pago",
    date: "2025-05-04T14:20:00",
    status: "rejected",
    approvedBy: "admin1",
    approvedAt: "2025-05-04T15:00:00",
    rejectionReason: "Alias inválido o inexistente",
  },
  {
    id: "WIT-104",
    user: "sofia456",
    amount: 5000,
    alias: "sofia.martinez.bna",
    bank: "Banco Nación",
    date: "2025-05-04T16:10:00",
    status: "approved",
    approvedBy: "admin2",
    approvedAt: "2025-05-04T16:45:00",
    transactionId: "BNA-456789123",
  },
  {
    id: "WIT-105",
    user: "martin789",
    amount: 8000,
    alias: "martin.gonzalez.bbva",
    bank: "Banco BBVA",
    date: "2025-05-04T17:30:00",
    status: "rejected",
    approvedBy: "admin1",
    approvedAt: "2025-05-04T18:15:00",
    rejectionReason: "Usuario con retiro pendiente",
  },
]

export function CompletedWithdrawalsTable({ searchQuery, dateRange }: CompletedWithdrawalsTableProps) {
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<(typeof completedWithdrawals)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const viewDetails = (withdrawal: (typeof completedWithdrawals)[0]) => {
    setSelectedWithdrawal(withdrawal)
    setDetailsOpen(true)
  }

  // Filter withdrawals based on search query and date range
  const filteredWithdrawals = completedWithdrawals.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.amount.toString().includes(searchQuery) ||
      withdrawal.approvedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (withdrawal.transactionId && withdrawal.transactionId.toLowerCase().includes(searchQuery.toLowerCase()))

    const withdrawalDate = new Date(withdrawal.date)
    const matchesDateRange =
      (!dateRange.from || withdrawalDate >= dateRange.from) && (!dateRange.to || withdrawalDate <= dateRange.to)

    return matchesSearch && matchesDateRange
  })

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead>Banco</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Procesado por</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWithdrawals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                  No hay retiros completados que coincidan con los criterios de búsqueda
                </TableCell>
              </TableRow>
            ) : (
              filteredWithdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell>{withdrawal.id}</TableCell>
                  <TableCell>{withdrawal.user}</TableCell>
                  <TableCell>${withdrawal.amount.toLocaleString()}</TableCell>
                  <TableCell>{withdrawal.alias}</TableCell>
                  <TableCell>{withdrawal.bank}</TableCell>
                  <TableCell>{new Date(withdrawal.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={withdrawal.status === "approved" ? "success" : "destructive"}>
                      {withdrawal.status === "approved" ? "Aprobado" : "Rechazado"}
                    </Badge>
                  </TableCell>
                  <TableCell>{withdrawal.approvedBy}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" onClick={() => viewDetails(withdrawal)} title="Ver detalles">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Retiro</DialogTitle>
            <DialogDescription>Información completa de la solicitud de retiro</DialogDescription>
          </DialogHeader>
          {selectedWithdrawal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">ID</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Usuario</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Monto</p>
                  <p className="text-sm text-muted-foreground">${selectedWithdrawal.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Alias</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.alias}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Banco</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.bank}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Fecha</p>
                  <p className="text-sm text-muted-foreground">{new Date(selectedWithdrawal.date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Estado</p>
                  <p className="text-sm text-muted-foreground">
                    <Badge variant={selectedWithdrawal.status === "approved" ? "success" : "destructive"}>
                      {selectedWithdrawal.status === "approved" ? "Aprobado" : "Rechazado"}
                    </Badge>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Procesado por</p>
                  <p className="text-sm text-muted-foreground">{selectedWithdrawal.approvedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Fecha de procesamiento</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedWithdrawal.approvedAt).toLocaleString()}
                  </p>
                </div>
                {selectedWithdrawal.status === "approved" && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium">ID de Transacción</p>
                    <p className="text-sm text-muted-foreground">{selectedWithdrawal.transactionId}</p>
                  </div>
                )}
                {selectedWithdrawal.status === "rejected" && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium">Motivo de rechazo</p>
                    <p className="text-sm text-muted-foreground">{selectedWithdrawal.rejectionReason}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
