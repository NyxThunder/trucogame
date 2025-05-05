"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface ReportChartsProps {
  dateRange: { from: Date | undefined; to: Date | undefined }
}

// Mock data for charts
const dailyData = [
  { date: "01/05", deposits: 425000, withdrawals: 315000, commission: 24337 },
  { date: "02/05", deposits: 410000, withdrawals: 290000, commission: 24667 },
  { date: "03/05", deposits: 435000, withdrawals: 305000, commission: 25170 },
  { date: "04/05", deposits: 420000, withdrawals: 310000, commission: 25660 },
  { date: "05/05", deposits: 450000, withdrawals: 325000, commission: 26725 },
]

const userActivityData = [
  { date: "01/05", activeUsers: 1165, newUsers: 40, totalGames: 3245 },
  { date: "02/05", activeUsers: 1180, newUsers: 35, totalGames: 3289 },
  { date: "03/05", activeUsers: 1195, newUsers: 42, totalGames: 3356 },
  { date: "04/05", activeUsers: 1210, newUsers: 38, totalGames: 3421 },
  { date: "05/05", activeUsers: 1243, newUsers: 45, totalGames: 3567 },
]

export function ReportCharts({ dateRange }: ReportChartsProps) {
  return (
    <Tabs defaultValue="financial">
      <TabsList className="mb-4">
        <TabsTrigger value="financial">Financiero</TabsTrigger>
        <TabsTrigger value="users">Usuarios</TabsTrigger>
      </TabsList>

      <TabsContent value="financial">
        <Card>
          <CardHeader>
            <CardTitle>Resumen Financiero</CardTitle>
            <CardDescription>Cargas, retiros y comisiones en los últimos días</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={dailyData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  labelFormatter={(label) => `Fecha: ${label}`}
                />
                <Legend />
                <Bar dataKey="deposits" name="Cargas" fill="#4ade80" radius={[4, 4, 0, 0]} />
                <Bar dataKey="withdrawals" name="Retiros" fill="#f87171" radius={[4, 4, 0, 0]} />
                <Bar dataKey="commission" name="Comisión" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="users">
        <Card>
          <CardHeader>
            <CardTitle>Actividad de Usuarios</CardTitle>
            <CardDescription>Usuarios activos, nuevos y partidas jugadas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={userActivityData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} yAxisId="left" />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  yAxisId="right"
                  orientation="right"
                />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="activeUsers"
                  name="Usuarios Activos"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line yAxisId="left" type="monotone" dataKey="newUsers" name="Nuevos Usuarios" stroke="#82ca9d" />
                <Line yAxisId="right" type="monotone" dataKey="totalGames" name="Partidas Jugadas" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
