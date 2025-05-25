"use client"

import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    newUsers: 320,
    activeUsers: 2800,
    churnedUsers: 120,
  },
  {
    name: "Feb",
    newUsers: 350,
    activeUsers: 3000,
    churnedUsers: 150,
  },
  {
    name: "Mar",
    newUsers: 420,
    activeUsers: 3200,
    churnedUsers: 220,
  },
  {
    name: "Apr",
    newUsers: 380,
    activeUsers: 3300,
    churnedUsers: 280,
  },
  {
    name: "May",
    newUsers: 450,
    activeUsers: 3450,
    churnedUsers: 300,
  },
  {
    name: "Jun",
    newUsers: 520,
    activeUsers: 3600,
    churnedUsers: 370,
  },
  {
    name: "Jul",
    newUsers: 480,
    activeUsers: 3700,
    churnedUsers: 380,
  },
  {
    name: "Aug",
    newUsers: 510,
    activeUsers: 3800,
    churnedUsers: 410,
  },
  {
    name: "Sep",
    newUsers: 530,
    activeUsers: 3900,
    churnedUsers: 430,
  },
  {
    name: "Oct",
    newUsers: 550,
    activeUsers: 4000,
    churnedUsers: 450,
  },
  {
    name: "Nov",
    newUsers: 580,
    activeUsers: 4100,
    churnedUsers: 480,
  },
  {
    name: "Dec",
    newUsers: 600,
    activeUsers: 4200,
    churnedUsers: 500,
  },
]

export function UserGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
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
                      <span className="text-[0.70rem] uppercase text-muted-foreground">New Users</span>
                      <span className="font-bold">{payload[0].value.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Active Users</span>
                      <span className="font-bold">{payload[1].value.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Churned Users</span>
                      <span className="font-bold">{payload[2].value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="newUsers" name="New Users" stroke="#e91e63" strokeWidth={2} />
        <Line type="monotone" dataKey="activeUsers" name="Active Users" stroke="#2196f3" strokeWidth={2} />
        <Line type="monotone" dataKey="churnedUsers" name="Churned Users" stroke="#ff9800" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
