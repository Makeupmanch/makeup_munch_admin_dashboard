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
import { CheckCircle, Eye, MessageSquare, MoreHorizontal, Search, Trash2, UserCog, XCircle } from "lucide-react"

const tickets = [
  {
    id: "T-1001",
    subject: "Payment failed but amount deducted",
    user: {
      name: "Sophia Anderson",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Customer",
    },
    category: "Payment",
    priority: "High",
    status: "Open",
    createdAt: "2023-06-23T10:23:45",
    lastUpdated: "2023-06-23T11:30:00",
    assignedTo: "Rahul Sharma",
  },
  {
    id: "T-1002",
    subject: "Unable to update my profile picture",
    user: {
      name: "Emma Johnson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Customer",
    },
    category: "Account",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2023-06-24T09:45:12",
    lastUpdated: "2023-06-24T14:20:00",
    assignedTo: "Anita Desai",
  },
  {
    id: "T-1003",
    subject: "Need to reschedule my booking",
    user: {
      name: "Olivia Williams",
      email: "olivia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Customer",
    },
    category: "Booking",
    priority: "Medium",
    status: "Open",
    createdAt: "2023-06-25T08:30:00",
    lastUpdated: "2023-06-25T08:30:00",
    assignedTo: "Unassigned",
  },
  {
    id: "T-1004",
    subject: "Commission calculation issue",
    user: {
      name: "Priya Sharma",
      email: "priya@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Artist",
    },
    category: "Payment",
    priority: "High",
    status: "In Progress",
    createdAt: "2023-06-26T07:15:30",
    lastUpdated: "2023-06-26T15:45:00",
    assignedTo: "Vikram Singh",
  },
  {
    id: "T-1005",
    subject: "Customer canceled last minute",
    user: {
      name: "Neha Patel",
      email: "neha@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Artist",
    },
    category: "Dispute",
    priority: "High",
    status: "Open",
    createdAt: "2023-06-27T16:45:00",
    lastUpdated: "2023-06-27T16:45:00",
    assignedTo: "Unassigned",
  },
  {
    id: "T-1006",
    subject: "App keeps crashing on Android",
    user: {
      name: "Mia Garcia",
      email: "mia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Customer",
    },
    category: "Technical",
    priority: "Low",
    status: "Closed",
    createdAt: "2023-06-28T14:20:00",
    lastUpdated: "2023-06-29T09:10:00",
    assignedTo: "Rahul Sharma",
  },
]

export function SupportTicketList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])

  const filteredTickets = tickets.filter(
    (ticket) =>
      (ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || ticket.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (categoryFilter === "all" || ticket.category.toLowerCase() === categoryFilter.toLowerCase()) &&
      (priorityFilter === "all" || ticket.priority.toLowerCase() === priorityFilter.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([])
    } else {
      setSelectedTickets(filteredTickets.map((ticket) => ticket.id))
    }
  }

  const toggleSelectTicket = (id: string) => {
    if (selectedTickets.includes(id)) {
      setSelectedTickets(selectedTickets.filter((ticketId) => ticketId !== id))
    } else {
      setSelectedTickets([...selectedTickets, id])
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
              placeholder="Search tickets..."
              className="pl-8 w-full sm:w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="account">Account</SelectItem>
              <SelectItem value="booking">Booking</SelectItem>
              <SelectItem value="dispute">Dispute</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedTickets.length > 0 && (
            <>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <UserCog className="h-4 w-4" />
                <span>Assign</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Close</span>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedTickets.length === filteredTickets.length && filteredTickets.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTickets.includes(ticket.id)}
                    onCheckedChange={() => toggleSelectTicket(ticket.id)}
                    aria-label={`Select ${ticket.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate" title={ticket.subject}>
                    {ticket.subject}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={ticket.user.avatar || "/placeholder.svg"} alt={ticket.user.name} />
                      <AvatarFallback>{ticket.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{ticket.user.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">{ticket.user.email}</span>
                        <Badge variant="outline" className="text-xs">
                          {ticket.user.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      ticket.priority === "High"
                        ? "border-red-500 text-red-500"
                        : ticket.priority === "Medium"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-green-500 text-green-500"
                    }
                  >
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.status === "Open" ? "default" : ticket.status === "In Progress" ? "outline" : "secondary"
                    }
                    className={
                      ticket.status === "Open"
                        ? "bg-pink-500 hover:bg-pink-600"
                        : ticket.status === "In Progress"
                          ? "border-blue-500 text-blue-500"
                          : ticket.status === "Closed"
                            ? "bg-green-500 hover:bg-green-600"
                            : ""
                    }
                  >
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {ticket.assignedTo === "Unassigned" ? (
                    <Badge variant="outline" className="border-gray-500 text-gray-500">
                      Unassigned
                    </Badge>
                  ) : (
                    ticket.assignedTo
                  )}
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
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Reply</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>Assign</span>
                      </DropdownMenuItem>
                      {ticket.status !== "Closed" && (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Close Ticket</span>
                        </DropdownMenuItem>
                      )}
                      {ticket.status === "Closed" && (
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Reopen Ticket</span>
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
