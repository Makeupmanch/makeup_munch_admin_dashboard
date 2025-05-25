import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SystemHealthProps {
  extended?: boolean
}

export function SystemHealth({ extended = false }: SystemHealthProps) {
  const metrics = [
    {
      name: "CPU Usage",
      value: 32,
      status: "Healthy",
      color: "bg-green-500",
    },
    {
      name: "Memory Usage",
      value: 64,
      status: "Normal",
      color: "bg-yellow-500",
    },
    {
      name: "Database Load",
      value: 28,
      status: "Healthy",
      color: "bg-green-500",
    },
    {
      name: "API Response Time",
      value: 15,
      status: "Excellent",
      color: "bg-green-500",
    },
    {
      name: "Storage Usage",
      value: 72,
      status: "Warning",
      color: "bg-yellow-500",
    },
  ]

  const extendedMetrics = [
    {
      name: "Network Throughput",
      value: 45,
      status: "Normal",
      color: "bg-green-500",
    },
    {
      name: "Cache Hit Rate",
      value: 88,
      status: "Excellent",
      color: "bg-green-500",
    },
    {
      name: "Background Jobs",
      value: 22,
      status: "Healthy",
      color: "bg-green-500",
    },
  ]

  const allMetrics = extended ? [...metrics, ...extendedMetrics] : metrics

  return (
    <div className="space-y-4">
      {allMetrics.map((metric) => (
        <div key={metric.name} className="flex items-center">
          <div className="w-40">
            <p className="text-sm font-medium">{metric.name}</p>
            <p className="text-xs text-muted-foreground">{metric.status}</p>
          </div>
          <div className="flex-1 px-4">
            <Progress value={metric.value} className="h-2" indicatorClassName={metric.color} />
          </div>
          <div className="w-10 text-right text-sm font-medium">{metric.value}%</div>
        </div>
      ))}

      {extended && (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">Uptime (30 days)</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">245ms</div>
                <p className="text-xs text-muted-foreground">Avg. Response Time</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Critical Errors (24h)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
