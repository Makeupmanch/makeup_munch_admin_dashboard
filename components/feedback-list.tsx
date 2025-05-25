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
import { CheckCircle, Eye, MoreHorizontal, Search, Star, ThumbsUp, Trash2 } from "lucide-react"

const feedback = [
  {
    id: "F-1001",
    user: {
      name: "Sophia Anderson",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Customer",
    },
    feedback: "The app is very user-friendly and easy to navigate. I love the booking process!",
    category: "User Interface",
    rating: 5,
    submittedAt: "2023-06-23T10:23:45",
    status: "Reviewed",
    actionTaken: "Acknowledged",
  },
  {
    id: "F-1002",
    user: {
      name: "Emma Johnson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Customer",
    },
    feedback: "The payment process is a bit confusing. It took me several attempts to complete my payment.",
    category: "Payment",
    rating: 3,
    submittedAt: "2023-06-24T09:45:12",
    status: "Pending",
    actionTaken: "None",
  },
  {
    id: "F-1003",
    user: {
      name: "Priya Sharma",
      email: "priya@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Artist",
    },
    feedback: "The artist dashboard is great, but I would love to have more analytics about my bookings.",
    category: "Artist Dashboard",
    rating: 4,
    submittedAt: "2023-06-25T08:30:00",
    status: "Reviewed",
    actionTaken: "Added to Roadmap",
  },
  {
    id: "F-1004",
    user: {
      name: "Olivia Williams",
      email: "olivia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Customer",
    },
    feedback: "The app crashes sometimes when I try to upload multiple photos for my booking.",
    category: "Technical",
    rating: 2,
    submittedAt: "2023-06-26T07:15:30",
    status: "Pending",
    actionTaken: "None",
  },
  {
    id: "F-1005",
    user: {
      name: "Neha Patel",
      email: "neha@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Artist",
    },
    feedback: "I love the commission structure, but it would be helpful to have more detailed reports.",
    category: "Payments & Reports",
    rating: 4,
    submittedAt: "2023-06-27T16:45:00",
    status: "Reviewed",
    actionTaken: "Under Consideration",
  },
  {
    id: "F-1006",
    user: {
      name: "Mia Garcia",
      email: "mia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      type: "Customer",
    },
    feedback: "The notification system is great! I always know when there's an update on my booking.",
    category: "Notifications",
    rating: 5,
    submittedAt: "2023-06-28T14:20:00",
    status: "Pending",
    actionTaken: "None",
  },
]

export function FeedbackList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([])

  const filteredFeedback = feedback.filter(
    (item) =>
      (item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase()) &&
      (statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedFeedback.length === filteredFeedback.length) {
      setSelectedFeedback([])
    } else {
      setSelectedFeedback(filteredFeedback.map((item) => item.id))
    }
  }

  const toggleSelectFeedback = (id: string) => {
    if (selectedFeedback.includes(id)) {
      setSelectedFeedback(selectedFeedback.filter((feedbackId) => feedbackId !== id))
    } else {
      setSelectedFeedback([...selectedFeedback, id])
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
              placeholder="Search feedback..."
              className="pl-8 w-full sm:w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="user interface">User Interface</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="artist dashboard">Artist Dashboard</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
              <SelectItem value="payments & reports">Payments & Reports</SelectItem>
              <SelectItem value="notifications">Notifications</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedFeedback.length > 0 && (
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Mark as Reviewed</span>
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
                  checked={selectedFeedback.length === filteredFeedback.length && filteredFeedback.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Action Taken</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedback.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedFeedback.includes(item.id)}
                    onCheckedChange={() => toggleSelectFeedback(item.id)}
                    aria-label={`Select ${item.id}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                      <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.user.name}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">{item.user.email}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.user.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate" title={item.feedback}>
                    {item.feedback}
                  </div>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>{new Date(item.submittedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "Reviewed" ? "default" : "outline"}
                    className={
                      item.status === "Reviewed"
                        ? "bg-green-500 hover:bg-green-600"
                        : "border-yellow-500 text-yellow-500"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                {/* <TableCell>
                  {item.actionTaken === "None" ? (
                    <span className="text-muted-foreground">None</span>
                  ) : (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      {item.actionTaken}
                    </Badge>
                  )}
                </TableCell> */}
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
                      {item.status === "Pending" && (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Mark as Reviewed</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        <span>Set Action Taken</span>
                      </DropdownMenuItem>
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
