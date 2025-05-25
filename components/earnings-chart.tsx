"use client"

// import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    name: "Jan",
    revenue: 15000,
    commission: 2250,
    payout: 12750,
  },
  {
    name: "Feb",
    revenue: 18000,
    commission: 2700,
    payout: 15300,
  },
  {
    name: "Mar",
    revenue: 25000,
    commission: 3750,
    payout: 21250,
  },
  {
    name: "Apr",
    revenue: 22000,
    commission: 3300,
    payout: 18700,
  },
  {
    name: "May",
    revenue: 30000,
    commission: 4500,
    payout: 25500,
  },
  {
    name: "Jun",
    revenue: 45000,
    commission: 6750,
    payout: 38250,
  },
  {
    name: "Jul",
    revenue: 42000,
    commission: 6300,
    payout: 35700,
  },
  {
    name: "Aug",
    revenue: 50000,
    commission: 7500,
    payout: 42500,
  },
  {
    name: "Sep",
    revenue: 55000,
    commission: 8250,
    payout: 46750,
  },
  {
    name: "Oct",
    revenue: 48000,
    commission: 7200,
    payout: 40800,
  },
  {
    name: "Nov",
    revenue: 52000,
    commission: 7800,
    payout: 44200,
  },
  {
    name: "Dec",
    revenue: 60000,
    commission: 9000,
    payout: 51000,
  },
]

export function EarningsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
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
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Commission</span>
                      <span className="font-bold">₹{payload[1].value.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Payout</span>
                      <span className="font-bold">₹{payload[2].value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="revenue" name="Total Revenue" fill="#e91e63" />
        <Bar dataKey="commission" name="Platform Commission" fill="#9c27b0" />
        <Bar dataKey="payout" name="Artist Payout" fill="#2196f3" />
      </BarChart>
    </ResponsiveContainer>
  )
}
