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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, MoreHorizontal, Search, Trash2, UserX } from "lucide-react"

const admins = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@makeupmunch.in",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Super Admin",
    status: "Active",
    lastActive: "2023-06-23T10:23:45",
  },
  {
    id: 2,
    name: "Anita Desai",
    email: "anita@makeupmunch.in",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Admin",
    status: "Active",
    lastActive: "2023-06-23T09:45:12",
  },
  {
    id: 3,
    name: "Vikram Singh",
    email: "vikram@makeupmunch.in",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Admin",
    status: "Active",
    lastActive: "2023-06-23T08:30:00",
  },
  {
    id: 4,
    name: "Deepa Patel",
    email: "deepa@makeupmunch.in",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Admin",
    status: "Inactive",
    lastActive: "2023-06-20T15:10:30",
  },
  {
    id: 5,
    name: "Sanjay Kumar",
    email: "sanjay@makeupmunch.in",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Admin",
    status: "Active",
    lastActive: "2023-06-22T14:25:00",
  },
]

export function AdminList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([])

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedAdmins.length === filteredAdmins.length) {
      setSelectedAdmins([])
    } else {
      setSelectedAdmins(filteredAdmins.map((admin) => admin.id))
    }
  }

  const toggleSelectAdmin = (id: number) => {
    if (selectedAdmins.includes(id)) {
      setSelectedAdmins(selectedAdmins.filter((adminId) => adminId !== id))
    } else {
      setSelectedAdmins([...selectedAdmins, id])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search admins..."
              className="pl-8 w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedAdmins.length > 0 && (
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <UserX className="h-4 w-4" />
              <span>Deactivate</span>
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
                  checked={selectedAdmins.length === filteredAdmins.length && filteredAdmins.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Admin</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedAdmins.includes(admin.id)}
                    onCheckedChange={() => toggleSelectAdmin(admin.id)}
                    aria-label={`Select ${admin.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={admin.avatar || "/placeholder.svg"} alt={admin.name} />
                      <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{admin.name}</span>
                      <span className="text-xs text-muted-foreground">{admin.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={admin.role === "Super Admin" ? "border-pink-500 text-pink-500" : ""}
                  >
                    {admin.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={admin.status === "Active" ? "default" : "secondary"}
                    className={admin.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {admin.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(admin.lastActive).toLocaleString()}</TableCell>
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
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserX className="mr-2 h-4 w-4" />
                        <span>{admin.status === "Active" ? "Deactivate" : "Activate"}</span>
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
