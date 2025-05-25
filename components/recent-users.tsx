import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
  },
  {
    id: "U-1004",
    name: "Ava Brown",
    email: "ava@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Chennai",
    joinedDate: "2023-06-20T07:15:30",
    status: "Inactive",
    bookings: 0,
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
  },
]

interface RecentUsersProps {
  extended?: boolean
}

export function RecentUsers({ extended = false }: RecentUsersProps) {
  const displayUsers = extended ? users : users.slice(0, 5)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Joined Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Bookings</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{user.location}</TableCell>
            <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
            <TableCell>
              <Badge
                variant={user.status === "Active" ? "default" : "secondary"}
                className={user.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.bookings}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
