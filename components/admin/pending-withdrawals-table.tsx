"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PendingWithdrawalsTableProps {
  searchQuery: string
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for pending withdrawals
const initialWithdrawals = [
  {
    id: "WIT-001",
    user: "juan123",
    amount: 5000,
    alias: "juan.perez.mp",
    bank: "Mercado Pago",
    date: "2025-05-05T10:30:00",
    status: "pending",
  },
  {
    id: "WIT-002",
    user: "maria456",
    amount: 10000,
    alias: "maria.gomez.bna",
    bank: "Banco Nación",
    date: "2025-05-05T11:15:00",
    status: "pending",
  },
  {
    id: "WIT-003",
    user: "pedro789",
    amount: 2500,
    alias: "pedro.rodriguez.mp",
    bank: "Mercado Pago",
    date: "2025-05-05T12:00:00",
    status: "pending",
  },
  {
    id: "WIT-004",
    user: "ana456",
    amount: 7500,
    alias: "ana.martinez.bna",
    bank: "Banco Nación",
    date: "2025-05-05T13:30:00",
    status: "pending",
  },
  {
    id: "WIT-005",
    user: "luis789",
    amount: 15000,
    alias: "luis.sanchez.bbva",
    bank: "Banco BBVA",
    date: "2025-05-05T14:45:00",
    status: "pending",
  },
]

export function PendingWithdrawalsTable({ searchQuery, dateRange }: PendingWithdrawalsTableProps) {
  const { toast } = useToast()
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals)
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<(typeof initialWithdrawals)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  const approveWithdrawal = (id: string) => {
    setWithdrawals(withdrawals.filter((withdrawal) => withdrawal.id !== id))
    toast({
      title: "Retiro aprobado",
      description: `El retiro ${id} ha sido aprobado correctamente`,
    })
  }

  const rejectWithdrawal = (id: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Debe proporcionar un motivo para rechazar el retiro",
        variant: "destructive",
      })
      return
    }

    setWithdrawals(withdrawals.filter((withdrawal) => withdrawal.id !== id))
    toast({
      title: "Retiro rechazado",
      description: `El retiro ${id} ha sido rechazado`,
    })
    setRejectionReason("")
  }

  const viewDetails = (withdrawal: (typeof initialWithdrawals)[0]) => {
    setSelectedWithdrawal(withdrawal)
    setDetailsOpen(true)
  }

  // Filter withdrawals based on search query and date range
  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.amount.toString().includes(searchQuery)

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
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWithdrawals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  No hay retiros pendientes
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
                    <Badge variant="outline">Pendiente</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => viewDetails(withdrawal)}
                        title="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => approveWithdrawal(withdrawal.id)}
                        className="text-green-500"
                        title="Aprobar"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => viewDetails(withdrawal)}
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
              </div>

              <div className="pt-4 border-t">
                <div className="space-y-2 mb-4">
                  <Label htmlFor="rejectionReason">Motivo de rechazo (opcional)</Label>
                  <Input
                    id="rejectionReason"
                    placeholder="Ingrese el motivo del rechazo"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      approveWithdrawal(selectedWithdrawal.id)
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
                      rejectWithdrawal(selectedWithdrawal.id)
                      if (rejectionReason.trim()) {
                        setDetailsOpen(false)
                      }
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
