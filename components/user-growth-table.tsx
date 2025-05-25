"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, ChevronDown, ChevronUp, Download } from "lucide-react"

interface UserGrowthTableProps {
  filterBy?: "location" | "source" | "retention"
}

const locationData = [
  {
    id: 1,
    name: "Mumbai",
    newUsers: 150,
    activeUsers: 1200,
    churnedUsers: 80,
    retentionRate: "78%",
    growth: "+12%",
  },
  {
    id: 2,
    name: "Delhi",
    newUsers: 120,
    activeUsers: 980,
    churnedUsers: 65,
    retentionRate: "80%",
    growth: "+10%",
  },
  {
    id: 3,
    name: "Bangalore",
    newUsers: 110,
    activeUsers: 850,
    churnedUsers: 55,
    retentionRate: "82%",
    growth: "+15%",
  },
  {
    id: 4,
    name: "Chennai",
    newUsers: 90,
    activeUsers: 720,
    churnedUsers: 50,
    retentionRate: "75%",
    growth: "+8%",
  },
  {
    id: 5,
    name: "Hyderabad",
    newUsers: 85,
    activeUsers: 680,
    churnedUsers: 45,
    retentionRate: "77%",
    growth: "+9%",
  },
]

const sourceData = [
  {
    id: 1,
    name: "Organic Search",
    newUsers: 220,
    activeUsers: 1800,
    churnedUsers: 120,
    retentionRate: "80%",
    growth: "+15%",
  },
  {
    id: 2,
    name: "Social Media",
    newUsers: 180,
    activeUsers: 1500,
    churnedUsers: 100,
    retentionRate: "75%",
    growth: "+18%",
  },
  {
    id: 3,
    name: "Referrals",
    newUsers: 120,
    activeUsers: 950,
    churnedUsers: 60,
    retentionRate: "85%",
    growth: "+12%",
  },
  {
    id: 4,
    name: "Direct",
    newUsers: 90,
    activeUsers: 720,
    churnedUsers: 50,
    retentionRate: "78%",
    growth: "+8%",
  },
  {
    id: 5,
    name: "Paid Ads",
    newUsers: 85,
    activeUsers: 680,
    churnedUsers: 45,
    retentionRate: "72%",
    growth: "+10%",
  },
]

const retentionData = [
  {
    id: 1,
    name: "1-Day",
    newUsers: 600,
    activeUsers: 540,
    churnedUsers: 60,
    retentionRate: "90%",
    growth: "+2%",
  },
  {
    id: 2,
    name: "7-Day",
    newUsers: 600,
    activeUsers: 480,
    churnedUsers: 120,
    retentionRate: "80%",
    growth: "+3%",
  },
  {
    id: 3,
    name: "30-Day",
    newUsers: 600,
    activeUsers: 420,
    churnedUsers: 180,
    retentionRate: "70%",
    growth: "+5%",
  },
  {
    id: 4,
    name: "60-Day",
    newUsers: 600,
    activeUsers: 360,
    churnedUsers: 240,
    retentionRate: "60%",
    growth: "+4%",
  },
  {
    id: 5,
    name: "90-Day",
    newUsers: 600,
    activeUsers: 300,
    churnedUsers: 300,
    retentionRate: "50%",
    growth: "+1%",
  },
]

const defaultData = [
  {
    id: 1,
    date: "Jan 2023",
    newUsers: 320,
    activeUsers: 2800,
    churnedUsers: 120,
    retentionRate: "78%",
    growth: "+12%",
  },
  {
    id: 2,
    date: "Feb 2023",
    newUsers: 350,
    activeUsers: 3000,
    churnedUsers: 150,
    retentionRate: "80%",
    growth: "+10%",
  },
  {
    id: 3,
    date: "Mar 2023",
    newUsers: 420,
    activeUsers: 3200,
    churnedUsers: 220,
    retentionRate: "82%",
    growth: "+15%",
  },
  {
    id: 4,
    date: "Apr 2023",
    newUsers: 380,
    activeUsers: 3300,
    churnedUsers: 280,
    retentionRate: "75%",
    growth: "-5%",
  },
  {
    id: 5,
    date: "May 2023",
    newUsers: 450,
    activeUsers: 3450,
    churnedUsers: 300,
    retentionRate: "77%",
    growth: "+13%",
  },
]

export function UserGrowthTable({ filterBy }: UserGrowthTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  let data = defaultData
  let firstColumnName = "Date"

  if (filterBy === "location") {
    data = locationData
    firstColumnName = "Location"
  } else if (filterBy === "source") {
    data = sourceData
    firstColumnName = "Source"
  } else if (filterBy === "retention") {
    data = retentionData
    firstColumnName = "Period"
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Input type="search" placeholder={`Search ${filterBy || "dates"}...`} className="w-full sm:w-[250px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by growth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Growth</SelectItem>
              <SelectItem value="positive">Positive Growth</SelectItem>
              <SelectItem value="negative">Negative Growth</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("name")}>
                  {firstColumnName}
                  {sortColumn === "name" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("newUsers")}>
                  New Users
                  {sortColumn === "newUsers" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("activeUsers")}>
                  Active Users
                  {sortColumn === "activeUsers" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("churnedUsers")}>
                  Churned Users
                  {sortColumn === "churnedUsers" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("retentionRate")}>
                  Retention Rate
                  {sortColumn === "retentionRate" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("growth")}>
                  Growth
                  {sortColumn === "growth" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{filterBy ? item.name : item.date}</TableCell>
                <TableCell>{item.newUsers}</TableCell>
                <TableCell>{item.activeUsers}</TableCell>
                <TableCell>{item.churnedUsers}</TableCell>
                <TableCell>{item.retentionRate}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      item.growth.startsWith("+") ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                    }
                  >
                    {item.growth}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
