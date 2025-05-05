"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function ConfiguracionPage() {
  const { toast } = useToast()
  const [generalSettings, setGeneralSettings] = useState({
    commissionPercentage: "5",
    minWithdrawal: "500",
    maxDailyWithdrawals: "2",
    maxWithdrawalAmount: "100000",
    rankingPointsForWin: "3",
    rankingPointsForLoss: "1",
    rankingPointsPerBet: "1000",
  })

  const [bankSettings, setBankSettings] = useState({
    bankName: "Banco Nación",
    accountNumber: "0000123456789",
    cbu: "0110000000000123456789",
    alias: "TRUCO.CLUB.OFICIAL",
    accountHolder: "Truco Club S.A.",
  })

  const [alertSettings, setAlertSettings] = useState({
    highDepositThreshold: "500000",
    highWithdrawalThreshold: "500000",
    suspiciousAdminActions: true,
    excessiveWinnings: true,
    quickWithdrawalAfterDeposit: true,
  })

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Configuración guardada",
      description: "La configuración general ha sido actualizada correctamente",
    })
  }

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Datos bancarios actualizados",
      description: "Los datos bancarios han sido actualizados correctamente",
    })
  }

  const handleSaveAlerts = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Configuración de alertas guardada",
      description: "La configuración de alertas ha sido actualizada correctamente",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configuración del Sistema</h1>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="bank">Datos Bancarios</TabsTrigger>
          <TabsTrigger value="alerts">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los parámetros generales del sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveGeneral} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="commissionPercentage">Comisión por partida (%)</Label>
                    <Input
                      id="commissionPercentage"
                      type="number"
                      value={generalSettings.commissionPercentage}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, commissionPercentage: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minWithdrawal">Retiro mínimo ($)</Label>
                    <Input
                      id="minWithdrawal"
                      type="number"
                      value={generalSettings.minWithdrawal}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, minWithdrawal: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxDailyWithdrawals">Máximo de retiros diarios</Label>
                    <Input
                      id="maxDailyWithdrawals"
                      type="number"
                      value={generalSettings.maxDailyWithdrawals}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, maxDailyWithdrawals: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxWithdrawalAmount">Monto máximo de retiro ($)</Label>
                    <Input
                      id="maxWithdrawalAmount"
                      type="number"
                      value={generalSettings.maxWithdrawalAmount}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, maxWithdrawalAmount: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Configuración del Ranking</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rankingPointsForWin">Puntos por victoria</Label>
                      <Input
                        id="rankingPointsForWin"
                        type="number"
                        value={generalSettings.rankingPointsForWin}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, rankingPointsForWin: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rankingPointsForLoss">Puntos por derrota</Label>
                      <Input
                        id="rankingPointsForLoss"
                        type="number"
                        value={generalSettings.rankingPointsForLoss}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, rankingPointsForLoss: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rankingPointsPerBet">Divisor de puntos por apuesta</Label>
                      <Input
                        id="rankingPointsPerBet"
                        type="number"
                        value={generalSettings.rankingPointsPerBet}
                        onChange={(e) =>
                          setGeneralSettings({ ...generalSettings, rankingPointsPerBet: e.target.value })
                        }
                      />
                      <p className="text-xs text-muted-foreground">Puntos adicionales = Monto apostado / Este valor</p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="mt-4">
                  Guardar Configuración
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle>Datos Bancarios</CardTitle>
              <CardDescription>
                Configura los datos bancarios que se mostrarán a los usuarios para realizar cargas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveBank} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Nombre del Banco</Label>
                  <Input
                    id="bankName"
                    value={bankSettings.bankName}
                    onChange={(e) => setBankSettings({ ...bankSettings, bankName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Número de Cuenta</Label>
                  <Input
                    id="accountNumber"
                    value={bankSettings.accountNumber}
                    onChange={(e) => setBankSettings({ ...bankSettings, accountNumber: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cbu">CBU</Label>
                  <Input
                    id="cbu"
                    value={bankSettings.cbu}
                    onChange={(e) => setBankSettings({ ...bankSettings, cbu: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alias">Alias</Label>
                  <Input
                    id="alias"
                    value={bankSettings.alias}
                    onChange={(e) => setBankSettings({ ...bankSettings, alias: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountHolder">Titular de la Cuenta</Label>
                  <Input
                    id="accountHolder"
                    value={bankSettings.accountHolder}
                    onChange={(e) => setBankSettings({ ...bankSettings, accountHolder: e.target.value })}
                  />
                </div>

                <Button type="submit" className="mt-4">
                  Guardar Datos Bancarios
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Alertas</CardTitle>
              <CardDescription>Configura los umbrales y condiciones para las alertas automáticas.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAlerts} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="highDepositThreshold">Umbral para alertas de carga elevada ($)</Label>
                  <Input
                    id="highDepositThreshold"
                    type="number"
                    value={alertSettings.highDepositThreshold}
                    onChange={(e) => setAlertSettings({ ...alertSettings, highDepositThreshold: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se generará una alerta cuando un usuario solicite cargar un monto mayor a este valor.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highWithdrawalThreshold">Umbral para alertas de retiro elevado ($)</Label>
                  <Input
                    id="highWithdrawalThreshold"
                    type="number"
                    value={alertSettings.highWithdrawalThreshold}
                    onChange={(e) => setAlertSettings({ ...alertSettings, highWithdrawalThreshold: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se generará una alerta cuando un usuario solicite retirar un monto mayor a este valor.
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-2">Tipos de Alertas</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="suspiciousAdminActions">Movimientos inusuales de administradores</Label>
                        <p className="text-xs text-muted-foreground">
                          Alerta cuando un administrador realiza muchas operaciones en poco tiempo.
                        </p>
                      </div>
                      <Switch
                        id="suspiciousAdminActions"
                        checked={alertSettings.suspiciousAdminActions}
                        onCheckedChange={(checked) =>
                          setAlertSettings({ ...alertSettings, suspiciousAdminActions: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="excessiveWinnings">Ganancias excesivas</Label>
                        <p className="text-xs text-muted-foreground">
                          Alerta cuando un jugador gana muchas partidas seguidas o montos elevados.
                        </p>
                      </div>
                      <Switch
                        id="excessiveWinnings"
                        checked={alertSettings.excessiveWinnings}
                        onCheckedChange={(checked) =>
                          setAlertSettings({ ...alertSettings, excessiveWinnings: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="quickWithdrawalAfterDeposit">Retiro inmediato tras carga</Label>
                        <p className="text-xs text-muted-foreground">
                          Alerta cuando un usuario retira poco después de cargar saldo.
                        </p>
                      </div>
                      <Switch
                        id="quickWithdrawalAfterDeposit"
                        checked={alertSettings.quickWithdrawalAfterDeposit}
                        onCheckedChange={(checked) =>
                          setAlertSettings({ ...alertSettings, quickWithdrawalAfterDeposit: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="mt-4">
                  Guardar Configuración de Alertas
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
