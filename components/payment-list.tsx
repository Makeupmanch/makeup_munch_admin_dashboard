"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, Download, Eye, MoreHorizontal, RefreshCcw, Search, Trash2 } from "lucide-react"

const payments = [
  {
    id: "P-1001",
    customer: {
      name: "Sophia Anderson",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    bookingId: "B-1001",
    package: "Bridal Makeup",
    date: "2023-06-23T10:23:45",
    amount: "₹12,500",
    status: "Completed",
    paymentMethod: "Credit Card",
  },
  {
    id: "P-1002",
    customer: {
      name: "Emma Johnson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    bookingId: "B-1002",
    package: "Party Makeup",
    date: "2023-06-24T09:45:12",
    amount: "₹5,000",
    status: "Pending",
    paymentMethod: "UPI",
  },
  {
    id: "P-1003",
    customer: {
      name: "Olivia Williams",
      email: "olivia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    bookingId: "B-1003",
    package: "Engagement Makeup",
    date: "2023-06-25T08:30:00",
    amount: "₹8,000",
    status: "Completed",
    paymentMethod: "Net Banking",
  },
  {
    id: "P-1004",
    customer: {
      name: "Ava Brown",
      email: "ava@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    bookingId: "B-1004",
    package: "Pre-Wedding Shoot",
    date: "2023-06-26T07:15:30",
    amount: "₹15,000",
    status: "Failed",
    paymentMethod: "Credit Card",
  },
  {
    id: "P-1005",
    customer: {
      name: "Isabella Jones",
      email: "isabella@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    bookingId: "B-1005",
    package: "HD Makeup",
    date: "2023-06-27T16:45:00",
    amount: "₹3,500",
    status: "Refunded",
    paymentMethod: "UPI",
  },
  {
    id: "P-1006",
    customer: {
      name: "Mia Garcia",
      email: "mia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    bookingId: "B-1006",
    package: "Party Makeup",
    date: "2023-06-28T14:20:00",
    amount: "₹4,500",
    status: "Completed",
    paymentMethod: "Wallet",
  },
]

export function PaymentList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.package.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([])
    } else {
      setSelectedPayments(filteredPayments.map((payment) => payment.id))
    }
  }

  const toggleSelectPayment = (id: string) => {
    if (selectedPayments.includes(id)) {
      setSelectedPayments(selectedPayments.filter((paymentId) => paymentId !== id))
    } else {
      setSelectedPayments([...selectedPayments, id])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search payments..."
              className="pl-8 w-full sm:w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedPayments.length > 0 && (
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-4 w-4" />
              <span>Export Selected</span>
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Booking ID</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPayments.includes(payment.id)}
                    onCheckedChange={() => toggleSelectPayment(payment.id)}
                    aria-label={`Select ${payment.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={payment.customer.avatar || "/placeholder.svg"} alt={payment.customer.name} />
                      <AvatarFallback>{payment.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{payment.customer.name}</span>
                      <span className="text-xs text-muted-foreground">{payment.customer.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{payment.bookingId}</TableCell>
                <TableCell>{payment.package}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleString()}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span>{payment.paymentMethod}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      payment.status === "Completed"
                        ? "default"
                        : payment.status === "Pending"
                          ? "outline"
                          : payment.status === "Failed"
                            ? "destructive"
                            : "secondary"
                    }
                    className={
                      payment.status === "Completed"
                        ? "bg-green-500 hover:bg-green-600"
                        : payment.status === "Refunded"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : ""
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download Receipt</span>
                      </DropdownMenuItem>
                      {payment.status === "Pending" && (
                        <DropdownMenuItem>
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          <span>Retry Payment</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
