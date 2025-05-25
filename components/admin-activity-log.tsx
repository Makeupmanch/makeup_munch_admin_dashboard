import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const activities = [
  {
    id: "ACT-1001",
    admin: {
      name: "Rahul Sharma",
      email: "rahul@makeupmunch.in",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Updated artist profile",
    target: "Priya Sharma",
    timestamp: "2023-06-23T10:23:45",
    ip: "192.168.1.1",
    status: "Success",
  },
  {
    id: "ACT-1002",
    admin: {
      name: "Anita Desai",
      email: "anita@makeupmunch.in",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Created new package",
    target: "Bridal Deluxe Package",
    timestamp: "2023-06-23T09:45:12",
    ip: "192.168.1.2",
    status: "Success",
  },
  {
    id: "ACT-1003",
    admin: {
      name: "Vikram Singh",
      email: "vikram@makeupmunch.in",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Approved artist application",
    target: "Meera Singh",
    timestamp: "2023-06-23T08:30:00",
    ip: "192.168.1.3",
    status: "Success",
  },
  {
    id: "ACT-1004",
    admin: {
      name: "Deepa Patel",
      email: "deepa@makeupmunch.in",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Failed login attempt",
    target: "System",
    timestamp: "2023-06-23T07:15:30",
    ip: "192.168.1.4",
    status: "Failed",
  },
  {
    id: "ACT-1005",
    admin: {
      name: "Rahul Sharma",
      email: "rahul@makeupmunch.in",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    action: "Updated commission rates",
    target: "System Settings",
    timestamp: "2023-06-22T16:45:00",
    ip: "192.168.1.1",
    status: "Success",
  },
]

interface AdminActivityLogProps {
  extended?: boolean
}

export function AdminActivityLog({ extended = false }: AdminActivityLogProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Admin</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Target</TableHead>
          <TableHead>Time</TableHead>
          {extended && <TableHead>IP Address</TableHead>}
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.admin.avatar || "/placeholder.svg"} alt={activity.admin.name} />
                  <AvatarFallback>{activity.admin.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{activity.admin.name}</span>
                  <span className="text-xs text-muted-foreground">{activity.admin.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{activity.action}</TableCell>
            <TableCell>{activity.target}</TableCell>
            <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell>
            {extended && <TableCell>{activity.ip}</TableCell>}
            <TableCell>
              <Badge
                variant={activity.status === "Success" ? "default" : "destructive"}
                className={activity.status === "Success" ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {activity.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
