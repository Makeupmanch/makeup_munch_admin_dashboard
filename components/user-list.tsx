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
import { Ban, Edit, Eye, MoreHorizontal, Search, Trash2, UserCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useGetData } from "@/services/queryHooks/useGetData"

const users = [
  {
    id: "U-1001",
    name: "Sophia Anderson",
    email: "sophia@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Mumbai",
    joinedDate: "2023-06-23T10:23:45",
    status: "Active",
    bookings: 5,
    lastActive: "2023-06-25T14:30:00",
  },
  {
    id: "U-1002",
    name: "Emma Johnson",
    email: "emma@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Delhi",
    joinedDate: "2023-06-22T09:45:12",
    status: "Active",
    bookings: 2,
    lastActive: "2023-06-24T11:20:00",
  },
  {
    id: "U-1003",
    name: "Olivia Williams",
    email: "olivia@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Bangalore",
    joinedDate: "2023-06-21T08:30:00",
    status: "Active",
    bookings: 3,
    lastActive: "2023-06-25T09:15:00",
  },
  {
    id: "U-1004",
    name: "Ava Brown",
    email: "ava@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Chennai",
    joinedDate: "2023-06-20T07:15:30",
    status: "Blocked",
    bookings: 0,
    lastActive: "2023-06-19T16:45:00",
  },
  {
    id: "U-1005",
    name: "Isabella Jones",
    email: "isabella@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Hyderabad",
    joinedDate: "2023-06-19T16:45:00",
    status: "Active",
    bookings: 1,
    lastActive: "2023-06-24T13:10:00",
  },
  {
    id: "U-1006",
    name: "Mia Garcia",
    email: "mia@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Mumbai",
    joinedDate: "2023-06-18T14:20:00",
    status: "Active",
    bookings: 4,
    lastActive: "2023-06-25T10:30:00",
  },
  {
    id: "U-1007",
    name: "Charlotte Martinez",
    email: "charlotte@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Delhi",
    joinedDate: "2023-06-17T12:10:00",
    status: "Blocked",
    bookings: 0,
    lastActive: "2023-06-16T09:45:00",
  },
]

export function UserList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const { data, isLoading, isError, error } = useGetData(
    "getAllUsers",
    "admin/getAllUsersForAdmin"
  );

  const apiusers = data?.data || [];

  const filteredUsers = apiusers.filter(
    (user: { username: string; email: string; _id: string; status: string; location: string }) =>
      (user?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?._id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (locationFilter === "all" || user.location.toLowerCase() === locationFilter.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user: { id: any }) => user.id))
    }
  }

  const toggleSelectUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }



  const router = useRouter()

  const handleViewUser = (id: string) => {
    router.push(`/users/${id}`)
  }

  const handleEditUser = (id: string) => {
    router.push(`/users/${id}/edit`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedUsers.length > 0 && (
            <>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Ban className="h-4 w-4" />
                <span>Block Selected</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <UserCheck className="h-4 w-4" />
                <span>Activate Selected</span>
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
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user?._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user._id)}
                    onCheckedChange={() => toggleSelectUser(user._id)}
                    aria-label={`Select ${user.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profile_img || "/placeholder.svg"} alt={user?.username} />
                      <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.username}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.city !== "N/A" ? user.city : "—"}</TableCell>
                <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                <TableCell>{"-"}</TableCell>
                <TableCell>{user?.bookingCount}</TableCell>
                <TableCell>
                  <Badge
                    variant={user?.isLogin === "Active" ? "default" : "secondary"}
                    className={
                      user?.isLogin === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {user?.isLogin}
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
                      <DropdownMenuItem onClick={() => handleViewUser(user._id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      {user.status === "Active" ? (
                        <DropdownMenuItem>
                          <Ban className="mr-2 h-4 w-4" />
                          <span>Block</span>
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Activate</span>
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
