"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface PlayerReportTableProps {
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for player report
const playerReportData = [
  {
    user: "juan123",
    gamesPlayed: 156,
    gamesWon: 87,
    winRate: 55.8,
    totalBets: 23400,
    totalWinnings: 25600,
    netProfit: 2200,
    deposits: 15000,
    withdrawals: 12000,
    currentBalance: 5200,
  },
  {
    user: "maria456",
    gamesPlayed: 203,
    gamesWon: 98,
    winRate: 48.3,
    totalBets: 30450,
    totalWinnings: 28900,
    netProfit: -1550,
    deposits: 20000,
    withdrawals: 15000,
    currentBalance: 3450,
  },
  {
    user: "pedro789",
    gamesPlayed: 134,
    gamesWon: 72,
    winRate: 53.7,
    totalBets: 20100,
    totalWinnings: 22300,
    netProfit: 2200,
    deposits: 10000,
    withdrawals: 8000,
    currentBalance: 4200,
  },
  {
    user: "ana456",
    gamesPlayed: 178,
    gamesWon: 95,
    winRate: 53.4,
    totalBets: 26700,
    totalWinnings: 29400,
    netProfit: 2700,
    deposits: 15000,
    withdrawals: 12000,
    currentBalance: 5700,
  },
  {
    user: "luis789",
    gamesPlayed: 221,
    gamesWon: 103,
    winRate: 46.6,
    totalBets: 33150,
    totalWinnings: 30800,
    netProfit: -2350,
    deposits: 25000,
    withdrawals: 20000,
    currentBalance: 2650,
  },
]

export function PlayerReportTable({ dateRange }: PlayerReportTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter data based on search query
  const filteredData = playerReportData.filter((player) =>
    player.user.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por usuario..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Partidas</TableHead>
              <TableHead>Ganadas</TableHead>
              <TableHead>% Victoria</TableHead>
              <TableHead>Total Apostado</TableHead>
              <TableHead>Total Ganado</TableHead>
              <TableHead>Ganancia Neta</TableHead>
              <TableHead>Cargas</TableHead>
              <TableHead>Retiros</TableHead>
              <TableHead>Balance Actual</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4 text-muted-foreground">
                  No hay jugadores que coincidan con la búsqueda
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((player) => (
                <TableRow key={player.user}>
                  <TableCell>{player.user}</TableCell>
                  <TableCell>{player.gamesPlayed}</TableCell>
                  <TableCell>{player.gamesWon}</TableCell>
                  <TableCell>{player.winRate}%</TableCell>
                  <TableCell>${player.totalBets.toLocaleString()}</TableCell>
                  <TableCell>${player.totalWinnings.toLocaleString()}</TableCell>
                  <TableCell
                    className={player.netProfit >= 0 ? "text-green-500 font-medium" : "text-red-500 font-medium"}
                  >
                    {player.netProfit >= 0 ? "+" : ""}${player.netProfit.toLocaleString()}
                  </TableCell>
                  <TableCell>${player.deposits.toLocaleString()}</TableCell>
                  <TableCell>${player.withdrawals.toLocaleString()}</TableCell>
                  <TableCell>${player.currentBalance.toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
