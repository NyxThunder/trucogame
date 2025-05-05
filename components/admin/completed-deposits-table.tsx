"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CompletedDepositsTableProps {
  searchQuery: string
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for completed deposits
const completedDeposits = [
  {
    id: "DEP-101",
    user: "carlos123",
    code: "TRC-4321",
    amount: 3000,
    bank: "Banco Nación",
    date: "2025-05-04T10:30:00",
    status: "approved",
    approvedBy: "admin1",
    approvedAt: "2025-05-04T11:15:00",
  },
  {
    id: "DEP-102",
    user: "laura456",
    code: "TRC-8765",
    amount: 7500,
    bank: "Banco Provincia",
    date: "2025-05-04T12:45:00",
    status: "approved",
    approvedBy: "admin2",
    approvedAt: "2025-05-04T13:30:00",
  },
  {
    id: "DEP-103",
    user: "roberto789",
    code: "TRC-2109",
    amount: 12000,
    bank: "Banco Galicia",
    date: "2025-05-04T14:20:00",
    status: "rejected",
    approvedBy: "admin1",
    approvedAt: "2025-05-04T15:00:00",
    rejectionReason: "Comprobante no coincide con el monto declarado",
  },
  {
    id: "DEP-104",
    user: "sofia456",
    code: "TRC-6543",
    amount: 5000,
    bank: "Banco Santander",
    date: "2025-05-04T16:10:00",
    status: "approved",
    approvedBy: "admin2",
    approvedAt: "2025-05-04T16:45:00",
  },
  {
    id: "DEP-105",
    user: "martin789",
    code: "TRC-0987",
    amount: 8000,
    bank: "Banco BBVA",
    date: "2025-05-04T17:30:00",
    status: "rejected",
    approvedBy: "admin1",
    approvedAt: "2025-05-04T18:15:00",
    rejectionReason: "Transferencia no recibida",
  },
]

export function CompletedDepositsTable({ searchQuery, dateRange }: CompletedDepositsTableProps) {
  const [selectedDeposit, setSelectedDeposit] = useState<(typeof completedDeposits)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const viewDetails = (deposit: (typeof completedDeposits)[0]) => {
    setSelectedDeposit(deposit)
    setDetailsOpen(true)
  }

  // Filter deposits based on search query and date range
  const filteredDeposits = completedDeposits.filter((deposit) => {
    const matchesSearch =
      deposit.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.amount.toString().includes(searchQuery) ||
      deposit.approvedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const depositDate = new Date(deposit.date)
    const matchesDateRange =
      (!dateRange.from || depositDate >= dateRange.from) && (!dateRange.to || depositDate <= dateRange.to)

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
              <TableHead>Código</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Banco</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Procesado por</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeposits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                  No hay cargas completadas que coincidan con los criterios de búsqueda
                </TableCell>
              </TableRow>
            ) : (
              filteredDeposits.map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell>{deposit.id}</TableCell>
                  <TableCell>{deposit.user}</TableCell>
                  <TableCell>{deposit.code}</TableCell>
                  <TableCell>${deposit.amount.toLocaleString()}</TableCell>
                  <TableCell>{deposit.bank}</TableCell>
                  <TableCell>{new Date(deposit.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={deposit.status === "approved" ? "success" : "destructive"}>
                      {deposit.status === "approved" ? "Aprobada" : "Rechazada"}
                    </Badge>
                  </TableCell>
                  <TableCell>{deposit.approvedBy}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" onClick={() => viewDetails(deposit)} title="Ver detalles">
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
            <DialogTitle>Detalles de la Carga</DialogTitle>
            <DialogDescription>Información completa de la solicitud de carga</DialogDescription>
          </DialogHeader>
          {selectedDeposit && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">ID</p>
                  <p className="text-sm text-muted-foreground">{selectedDeposit.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Usuario</p>
                  <p className="text-sm text-muted-foreground">{selectedDeposit.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Código</p>
                  <p className="text-sm text-muted-foreground">{selectedDeposit.code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Monto</p>
                  <p className="text-sm text-muted-foreground">${selectedDeposit.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Banco</p>
                  <p className="text-sm text-muted-foreground">{selectedDeposit.bank}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Fecha</p>
                  <p className="text-sm text-muted-foreground">{new Date(selectedDeposit.date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Estado</p>
                  <p className="text-sm text-muted-foreground">
                    <Badge variant={selectedDeposit.status === "approved" ? "success" : "destructive"}>
                      {selectedDeposit.status === "approved" ? "Aprobada" : "Rechazada"}
                    </Badge>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Procesado por</p>
                  <p className="text-sm text-muted-foreground">{selectedDeposit.approvedBy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Fecha de procesamiento</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedDeposit.approvedAt).toLocaleString()}
                  </p>
                </div>
                {selectedDeposit.status === "rejected" && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium">Motivo de rechazo</p>
                    <p className="text-sm text-muted-foreground">{selectedDeposit.rejectionReason}</p>
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
