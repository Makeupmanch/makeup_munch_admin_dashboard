"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, ChevronDown, ChevronUp, Download } from "lucide-react"

interface EarningsTableProps {
  filterBy?: "service" | "location" | "artist"
}

const serviceData = [
  {
    id: 1,
    name: "Bridal Makeup",
    bookings: 45,
    revenue: "₹562,500",
    commission: "₹84,375",
    payout: "₹478,125",
    growth: "+12%",
  },
  {
    id: 2,
    name: "Party Makeup",
    bookings: 120,
    revenue: "₹600,000",
    commission: "₹90,000",
    payout: "₹510,000",
    growth: "+18%",
  },
  {
    id: 3,
    name: "Engagement Makeup",
    bookings: 65,
    revenue: "₹520,000",
    commission: "₹78,000",
    payout: "₹442,000",
    growth: "+8%",
  },
  {
    id: 4,
    name: "Pre-Wedding Shoot",
    bookings: 38,
    revenue: "₹570,000",
    commission: "₹85,500",
    payout: "₹484,500",
    growth: "+15%",
  },
  {
    id: 5,
    name: "HD Makeup",
    bookings: 95,
    revenue: "₹332,500",
    commission: "₹49,875",
    payout: "₹282,625",
    growth: "+22%",
  },
]

const locationData = [
  {
    id: 1,
    name: "Mumbai",
    bookings: 120,
    revenue: "₹960,000",
    commission: "₹144,000",
    payout: "₹816,000",
    growth: "+15%",
  },
  {
    id: 2,
    name: "Delhi",
    bookings: 95,
    revenue: "₹760,000",
    commission: "₹114,000",
    payout: "₹646,000",
    growth: "+12%",
  },
  {
    id: 3,
    name: "Bangalore",
    bookings: 85,
    revenue: "₹680,000",
    commission: "₹102,000",
    payout: "₹578,000",
    growth: "+18%",
  },
  {
    id: 4,
    name: "Chennai",
    bookings: 65,
    revenue: "₹520,000",
    commission: "₹78,000",
    payout: "₹442,000",
    growth: "+10%",
  },
  {
    id: 5,
    name: "Hyderabad",
    bookings: 55,
    revenue: "₹440,000",
    commission: "₹66,000",
    payout: "₹374,000",
    growth: "+8%",
  },
]

const artistData = [
  {
    id: 1,
    name: "Priya Sharma",
    bookings: 48,
    revenue: "₹384,000",
    commission: "₹57,600",
    payout: "₹326,400",
    growth: "+22%",
  },
  {
    id: 2,
    name: "Neha Patel",
    bookings: 36,
    revenue: "₹288,000",
    commission: "₹43,200",
    payout: "₹244,800",
    growth: "+18%",
  },
  {
    id: 3,
    name: "Anjali Gupta",
    bookings: 32,
    revenue: "₹256,000",
    commission: "₹38,400",
    payout: "₹217,600",
    growth: "+15%",
  },
  {
    id: 4,
    name: "Meera Singh",
    bookings: 28,
    revenue: "₹224,000",
    commission: "₹33,600",
    payout: "₹190,400",
    growth: "+12%",
  },
  {
    id: 5,
    name: "Ritu Desai",
    bookings: 24,
    revenue: "₹192,000",
    commission: "₹28,800",
    payout: "₹163,200",
    growth: "+10%",
  },
]

const defaultData = [
  {
    id: 1,
    date: "Jan 2023",
    bookings: 120,
    revenue: "₹960,000",
    commission: "₹144,000",
    payout: "₹816,000",
    growth: "+15%",
  },
  {
    id: 2,
    date: "Feb 2023",
    bookings: 135,
    revenue: "₹1,080,000",
    commission: "₹162,000",
    payout: "₹918,000",
    growth: "+12%",
  },
  {
    id: 3,
    date: "Mar 2023",
    bookings: 150,
    revenue: "₹1,200,000",
    commission: "₹180,000",
    payout: "₹1,020,000",
    growth: "+11%",
  },
  {
    id: 4,
    date: "Apr 2023",
    bookings: 142,
    revenue: "₹1,136,000",
    commission: "₹170,400",
    payout: "₹965,600",
    growth: "-5%",
  },
  {
    id: 5,
    date: "May 2023",
    bookings: 160,
    revenue: "₹1,280,000",
    commission: "₹192,000",
    payout: "₹1,088,000",
    growth: "+13%",
  },
]

export function EarningsTable({ filterBy }: EarningsTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  let data = defaultData
  let firstColumnName = "Date"

  if (filterBy === "service") {
    data = serviceData
    firstColumnName = "Service"
  } else if (filterBy === "location") {
    data = locationData
    firstColumnName = "Location"
  } else if (filterBy === "artist") {
    data = artistData
    firstColumnName = "Artist"
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
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("bookings")}>
                  Bookings
                  {sortColumn === "bookings" ? (
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
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("revenue")}>
                  Revenue
                  {sortColumn === "revenue" ? (
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
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("commission")}>
                  Commission
                  {sortColumn === "commission" ? (
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
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => handleSort("payout")}>
                  Payout
                  {sortColumn === "payout" ? (
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
                <TableCell>{item.bookings}</TableCell>
                <TableCell>{item.revenue}</TableCell>
                <TableCell>{item.commission}</TableCell>
                <TableCell>{item.payout}</TableCell>
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
