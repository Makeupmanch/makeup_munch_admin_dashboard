"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    total: 15000,
  },
  {
    name: "Feb",
    total: 18000,
  },
  {
    name: "Mar",
    total: 25000,
  },
  {
    name: "Apr",
    total: 22000,
  },
  {
    name: "May",
    total: 30000,
  },
  {
    name: "Jun",
    total: 45000,
  },
  {
    name: "Jul",
    total: 42000,
  },
  {
    name: "Aug",
    total: 50000,
  },
  {
    name: "Sep",
    total: 55000,
  },
  {
    name: "Oct",
    total: 48000,
  },
  {
    name: "Nov",
    total: 52000,
  },
  {
    name: "Dec",
    total: 60000,
  },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                      <span className="font-bold">₹{payload[0].value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="#e91e63"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "#e91e63", opacity: 0.8 },
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
