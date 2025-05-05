"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// Mock data for the chart
const data = [
  { name: "1 May", comision: 4000 },
  { name: "2 May", comision: 3000 },
  { name: "3 May", comision: 5000 },
  { name: "4 May", comision: 8000 },
  { name: "5 May", comision: 6000 },
  { name: "6 May", comision: 9000 },
  { name: "7 May", comision: 7000 },
  { name: "8 May", comision: 10000 },
  { name: "9 May", comision: 8000 },
  { name: "10 May", comision: 12000 },
  { name: "11 May", comision: 9000 },
  { name: "12 May", comision: 11000 },
  { name: "13 May", comision: 14000 },
  { name: "14 May", comision: 12500 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value}`, "Comisión"]}
          labelFormatter={(label) => `Fecha: ${label}`}
        />
        <Bar dataKey="comision" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
