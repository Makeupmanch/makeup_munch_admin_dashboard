"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, MapPin, Phone, Mail, User, Star, Activity } from "lucide-react"
import { useGetData } from "@/services/queryHooks/useGetData"

interface ArtistProfileProps {
  id: string
}

export function ArtistProfile({ id }: ArtistProfileProps) {
  const [artist, setArtist] = useState<any>(null)
   const [isLoading, setIsLoading] = useState(true)


    const { data:response , isLoadings, isError, error } = useGetData(`artist_${id}`, `admin/getArtistDetailsForAdmin/${id}`)


  const artistData = response?.data

  useEffect(() => {

    console.log(artistData)
    // Simulate API call to fetch artist details
    setTimeout(() => {
      
      setArtist({
        id: "A-1001",
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "+91 9876543210",
        avatar: "/placeholder.svg?height=128&width=128",
        location: "Mumbai, Maharashtra",
        joinedDate: "2023-01-15T10:23:45",
        lastActive: "2023-06-25T14:30:00",
        status: "Active",
        featured: true,
        category: "Bridal Makeup",
        experience: 8,
        basePrice: "₹25,000",
        rating: 4.8,
        totalReviews: 156,
        totalBookings: 89,
        totalEarnings: "₹2,25,000",
        bio: "Priya is a professional makeup artist with over 8 years of experience specializing in bridal makeup. She has worked with numerous celebrities and has been featured in top wedding magazines. Her unique style combines traditional techniques with modern trends to create stunning looks for every bride.",
        services: [
          "Bridal Makeup",
          "Party Makeup",
          "Engagement Makeup",
          "Pre-Wedding Shoot",
          "HD Makeup",
          "Airbrush Makeup",
        ],
        recentBookings: [
          {
            id: "B-1001",
            customer: "Sophia Anderson",
            package: "Bridal Makeup",
            date: "2023-06-23",
            status: "Completed",
            amount: "₹25,000",
          },
          {
            id: "B-1002",
            customer: "Emma Johnson",
            package: "Party Makeup",
            date: "2023-06-20",
            status: "Completed",
            amount: "₹8,000",
          },
          {
            id: "B-1003",
            customer: "Olivia Williams",
            package: "Engagement Makeup",
            date: "2023-06-18",
            status: "Completed",
            amount: "₹12,000",
          },
        ],
        portfolio: [
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
          "/placeholder.svg?height=200&width=200",
        ],
      })
      setIsLoading(false)
    }, 1000)
  }, [id])

  if (isLoadings) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  if (!artist) {
    return <div>Artist not found</div>
  }
  if (isLoadings) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  if (isError || !artist) {
    return <div className="text-red-500">Failed to load artist data: {error?.message || "Unknown error"}</div>
  }
 
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={artistData.profile_img || "/placeholder.svg"} alt={artistData.username} />
              <AvatarFallback className="text-2xl">{artistData.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle>{artistData.username}</CardTitle>
            <CardDescription>{artistData.businessName}</CardDescription>
            <div className="flex items-center justify-center gap-2">
              <Badge
                variant={artistData.Status === "approved" ? "default" : "secondary"}
                className={
                  artistData.Status === "approved" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                }
              >
                {artistData.Status}
              </Badge>
              {artistData.providedByUs && <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{artistData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{artistData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{artistData.city}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(artistData.joinedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span>Last active {new Date(artistData.lastActive).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{artist.experience} years experience</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Performance Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-1">
                  <Star className="h-5 w-5" />
                  {artist.rating}
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
                <div className="text-xs text-muted-foreground">{artist.totalReviews} reviews</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{artist.totalBookings}</div>
                <div className="text-sm text-muted-foreground">Total Bookings</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{artist.totalEarnings}</div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{artist.basePrice}</div>
                <div className="text-sm text-muted-foreground">Base Price</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{artist.bio}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {artist.services.map((service: string, index: number) => (
              <Badge key={index} variant="outline" className="text-sm">
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artist.recentBookings.map((booking: any) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.package}</TableCell>
                  <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={booking.status === "Completed" ? "success" : "default"}
                      className={booking.status === "Completed" ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
          <CardDescription>Recent work samples</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {artist.portfolio.map((image: string, index: number) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden border">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
