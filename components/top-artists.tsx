import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface TopArtistsProps {
  extended?: boolean
}

const artists = [
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    bookings: 48,
    revenue: "₹120,000",
    progress: 92,
  },
  {
    name: "Neha Patel",
    email: "neha@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    bookings: 36,
    revenue: "₹95,000",
    progress: 78,
  },
  {
    name: "Anjali Gupta",
    email: "anjali@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    bookings: 32,
    revenue: "₹82,000",
    progress: 65,
  },
  {
    name: "Meera Singh",
    email: "meera@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    bookings: 28,
    revenue: "₹70,000",
    progress: 58,
  },
  {
    name: "Ritu Desai",
    email: "ritu@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    bookings: 24,
    revenue: "₹60,000",
    progress: 45,
  },
]

export function TopArtists({ extended = false }: TopArtistsProps) {
  const displayArtists = extended ? artists : artists.slice(0, 5)

  return (
    <div className="space-y-4">
      {displayArtists.map((artist) => (
        <div key={artist.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={artist.avatar || "/placeholder.svg"} alt={artist.name} />
            <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{artist.name}</p>
            <p className="text-sm text-muted-foreground">{artist.email}</p>
          </div>
          <div className="ml-auto text-sm font-medium">{artist.bookings} bookings</div>
          <div className="ml-4 text-sm font-medium">{artist.revenue}</div>
          <div className="ml-4 w-24">
            <Progress value={artist.progress} className="h-2" indicatorClassName="bg-pink-600" />
          </div>
        </div>
      ))}
    </div>
  )
}
