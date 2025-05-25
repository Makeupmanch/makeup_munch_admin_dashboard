import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const bookings = [
  {
    id: "B-1001",
    customer: {
      name: "Sophia Anderson",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Bridal Makeup",
    date: "2023-06-23",
    time: "10:00 AM",
    status: "Confirmed",
    amount: "₹12,500",
  },
  {
    id: "B-1002",
    customer: {
      name: "Emma Johnson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Party Makeup",
    date: "2023-06-24",
    time: "2:30 PM",
    status: "Pending",
    amount: "₹5,000",
  },
  {
    id: "B-1003",
    customer: {
      name: "Olivia Williams",
      email: "olivia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Engagement Makeup",
    date: "2023-06-25",
    time: "11:00 AM",
    status: "Completed",
    amount: "₹8,000",
  },
  {
    id: "B-1004",
    customer: {
      name: "Ava Brown",
      email: "ava@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "Pre-Wedding Shoot",
    date: "2023-06-26",
    time: "9:00 AM",
    status: "Cancelled",
    amount: "₹15,000",
  },
  {
    id: "B-1005",
    customer: {
      name: "Isabella Jones",
      email: "isabella@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    package: "HD Makeup",
    date: "2023-06-27",
    time: "4:00 PM",
    status: "Confirmed",
    amount: "₹3,500",
  },
]

interface RecentBookingsProps {
  extended?: boolean
}

export function RecentBookings({ extended = false }: RecentBookingsProps) {
  const displayBookings = extended ? bookings : bookings.slice(0, 5)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Booking ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Package</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayBookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell className="font-medium">{booking.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={booking.customer.avatar || "/placeholder.svg"} alt={booking.customer.name} />
                  <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{booking.customer.name}</span>
                  <span className="text-xs text-muted-foreground">{booking.customer.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>{booking.package}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                <span className="text-xs text-muted-foreground">{booking.time}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  booking.status === "Confirmed"
                    ? "default"
                    : booking.status === "Pending"
                      ? "outline"
                      : booking.status === "Completed"
                        ? "success"
                        : "destructive"
                }
                className={
                  booking.status === "Confirmed"
                    ? "bg-pink-500 hover:bg-pink-600"
                    : booking.status === "Completed"
                      ? "bg-green-500 hover:bg-green-600"
                      : ""
                }
              >
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{booking.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
