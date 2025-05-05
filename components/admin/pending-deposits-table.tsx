"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PendingDepositsTableProps {
  searchQuery: string
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for pending deposits
const initialDeposits = [
  {
    id: "DEP-001",
    user: "juan123",
    code: "TRC-1234",
    amount: 5000,
    bank: "Banco Nación",
    date: "2025-05-05T10:30:00",
    status: "pending",
  },
  {
    id: "DEP-002",
    user: "maria456",
    code: "TRC-5678",
    amount: 10000,
    bank: "Banco Provincia",
    date: "2025-05-05T11:15:00",
    status: "pending",
  },
  {
    id: "DEP-003",
    user: "pedro789",
    code: "TRC-9012",
    amount: 2500,
    bank: "Banco Galicia",
    date: "2025-05-05T12:00:00",
    status: "pending",
  },
  {
    id: "DEP-004",
    user: "ana456",
    code: "TRC-3456",
    amount: 7500,
    bank: "Banco Santander",
    date: "2025-05-05T13:30:00",
    status: "pending",
  },
  {
    id: "DEP-005",
    user: "luis789",
    code: "TRC-7890",
    amount: 15000,
    bank: "Banco BBVA",
    date: "2025-05-05T14:45:00",
    status: "pending",
  },
]

export function PendingDepositsTable({ searchQuery, dateRange }: PendingDepositsTableProps) {
  const { toast } = useToast()
  const [deposits, setDeposits] = useState(initialDeposits)
  const [selectedDeposit, setSelectedDeposit] = useState<(typeof initialDeposits)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const approveDeposit = (id: string) => {
    setDeposits(deposits.filter((deposit) => deposit.id !== id))
    toast({
      title: "Carga aprobada",
      description: `La carga ${id} ha sido aprobada correctamente`,
    })
  }

  const rejectDeposit = (id: string) => {
    setDeposits(deposits.filter((deposit) => deposit.id !== id))
    toast({
      title: "Carga rechazada",
      description: `La carga ${id} ha sido rechazada`,
    })
  }

  const viewDetails = (deposit: (typeof initialDeposits)[0]) => {
    setSelectedDeposit(deposit)
    setDetailsOpen(true)
  }

  // Filter deposits based on search query and date range
  const filteredDeposits = deposits.filter((deposit) => {
    const matchesSearch =
      deposit.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deposit.amount.toString().includes(searchQuery)

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
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeposits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  No hay cargas pendientes
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
                    <Badge variant="outline">Pendiente</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => viewDetails(deposit)} title="Ver detalles">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => approveDeposit(deposit.id)}
                        className="text-green-500"
                        title="Aprobar"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => rejectDeposit(deposit.id)}
                        className="text-destructive"
                        title="Rechazar"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
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
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium">Acciones</p>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => {
                      approveDeposit(selectedDeposit.id)
                      setDetailsOpen(false)
                    }}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Aprobar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      rejectDeposit(selectedDeposit.id)
                      setDetailsOpen(false)
                    }}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Rechazar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
