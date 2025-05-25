"use client"

import { useState } from "react"
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
import { Bell, Edit, MoreHorizontal, Search, Send, Trash2 } from "lucide-react"

const notifications = [
  {
    id: "N-1001",
    title: "New Booking Offer",
    message: "Get 20% off on your next bridal makeup booking!",
    type: "Promotional",
    target: "All Users",
    sentDate: "2023-06-23T10:23:45",
    status: "Sent",
    openRate: "68%",
  },
  {
    id: "N-1002",
    title: "Artist Application Approved",
    message: "Congratulations! Your artist application has been approved.",
    type: "System",
    target: "Specific Artist",
    sentDate: "2023-06-24T09:45:12",
    status: "Sent",
    openRate: "100%",
  },
  {
    id: "N-1003",
    title: "New Feature Announcement",
    message: "We've added new features to our app! Check them out now.",
    type: "Announcement",
    target: "All Users & Artists",
    sentDate: "2023-06-25T08:30:00",
    status: "Scheduled",
    openRate: "N/A",
  },
  {
    id: "N-1004",
    title: "Booking Confirmation",
    message: "Your booking for HD Makeup on June 30th has been confirmed.",
    type: "Transactional",
    target: "Specific User",
    sentDate: "2023-06-26T07:15:30",
    status: "Sent",
    openRate: "100%",
  },
  {
    id: "N-1005",
    title: "Payment Reminder",
    message: "Reminder: Your payment for the booking B-1005 is due tomorrow.",
    type: "Transactional",
    target: "Specific User",
    sentDate: "2023-06-27T16:45:00",
    status: "Sent",
    openRate: "75%",
  },
  {
    id: "N-1006",
    title: "Weekend Special Offer",
    message: "Book any makeup service this weekend and get a free touch-up kit!",
    type: "Promotional",
    target: "All Users",
    sentDate: "2023-06-28T14:20:00",
    status: "Draft",
    openRate: "N/A",
  },
]

export function NotificationList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  const filteredNotifications = notifications.filter(
    (notification) =>
      (notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.target.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (typeFilter === "all" || notification.type.toLowerCase() === typeFilter.toLowerCase()) &&
      (statusFilter === "all" || notification.status.toLowerCase() === statusFilter.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((notification) => notification.id))
    }
  }

  const toggleSelectNotification = (id: string) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter((notificationId) => notificationId !== id))
    } else {
      setSelectedNotifications([...selectedNotifications, id])
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
              placeholder="Search notifications..."
              className="pl-8 w-full sm:w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="transactional">Transactional</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedNotifications.length > 0 && (
            <>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Send className="h-4 w-4" />
                <span>Send Selected</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Trash2 className="h-4 w-4" />
                <span>Delete Selected</span>
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
                  checked={
                    selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Sent Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Open Rate</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedNotifications.includes(notification.id)}
                    onCheckedChange={() => toggleSelectNotification(notification.id)}
                    aria-label={`Select ${notification.id}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-pink-500" />
                    <span className="font-medium">{notification.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate" title={notification.message}>
                    {notification.message}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      notification.type === "Promotional"
                        ? "border-pink-500 text-pink-500"
                        : notification.type === "System"
                          ? "border-blue-500 text-blue-500"
                          : notification.type === "Announcement"
                            ? "border-purple-500 text-purple-500"
                            : "border-green-500 text-green-500"
                    }
                  >
                    {notification.type}
                  </Badge>
                </TableCell>
                <TableCell>{notification.target}</TableCell>
                <TableCell>
                  {notification.status === "Scheduled" || notification.status === "Draft"
                    ? "N/A"
                    : new Date(notification.sentDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      notification.status === "Sent"
                        ? "default"
                        : notification.status === "Scheduled"
                          ? "outline"
                          : "secondary"
                    }
                    className={
                      notification.status === "Sent"
                        ? "bg-green-500 hover:bg-green-600"
                        : notification.status === "Scheduled"
                          ? "border-yellow-500 text-yellow-500"
                          : ""
                    }
                  >
                    {notification.status}
                  </Badge>
                </TableCell>
                <TableCell>{notification.openRate}</TableCell>
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
                      {(notification.status === "Draft" || notification.status === "Scheduled") && (
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                      )}
                      {notification.status === "Draft" && (
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          <span>Send Now</span>
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
