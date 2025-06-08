"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, MapPin, Phone, Mail, Star, Activity } from "lucide-react"
import { useGetData } from "@/services/queryHooks/useGetData"

interface UserProfileProps {
  id: string
}

export function UserProfile({ id }: UserProfileProps) {
  // const [user, setUser] = useState<any>(null)
  // const [isDataLoading, setIsLoading] = useState(true)



  const { data, isLoading, isError, error } = useGetData(
    `user_${id}`,
    `admin/getUserDetailsForAdmin/${id}`
  );



  const user = data?.data



  // useEffect(() => {
  //   // Simulate API call to fetch user details
  //   setTimeout(() => {
  //     setUser({
  //       id: "U-1001",
  //       name: "Sophia Anderson",
  //       email: "sophia@example.com",
  //       phone: "+91 9876543210",
  //       avatar: "/placeholder.svg?height=128&width=128",
  //       location: "Mumbai, Maharashtra",
  //       joinedDate: "2023-06-23T10:23:45",
  //       lastActive: "2023-06-25T14:30:00",
  //       status: "Active",
  //       type: "Customer",
  //       totalBookings: 5,
  //       totalSpent: "₹45,000",
  //       averageRating: 4.8,
  //       bookings: [
  //         {
  //           id: "B-1001",
  //           artist: "Priya Sharma",
  //           package: "Bridal Makeup",
  //           date: "2023-06-23",
  //           status: "Completed",
  //           amount: "₹12,500",
  //         },
  //         {
  //           id: "B-1002",
  //           artist: "Neha Patel",
  //           package: "Party Makeup",
  //           date: "2023-06-15",
  //           status: "Completed",
  //           amount: "₹5,000",
  //         },
  //         {
  //           id: "B-1003",
  //           artist: "Anjali Gupta",
  //           package: "Engagement Makeup",
  //           date: "2023-06-10",
  //           status: "Completed",
  //           amount: "₹8,000",
  //         },
  //       ],
  //       preferences: {
  //         notifications: true,
  //         emailUpdates: true,
  //         smsUpdates: false,
  //         preferredLocation: "Mumbai",
  //         preferredTimeSlot: "Morning",
  //       },
  //     })
  //     setIsLoading(false)
  //   }, 1000)
  // }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  if (!user) {
    return <div>User not found</div>
  }


  if (isError || !user) {
    return (
      <div className="text-red-500">
        Failed to load user data: {error?.message || "Unknown error"}
      </div>
    )
  }


  const fullName = user.username || "N/A"
  const location = user.addresses?.[0]
    ? `${user.addresses[0].city}, ${user.addresses[0].state}`
    : "Location not available"



  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              {user.profile_img && user.profile_img.trim() !== "" ? (
                <AvatarImage src={user.profile_img} alt={fullName} />
              ) : (
                <AvatarFallback className="text-5xl">{fullName.charAt(0).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>

            <CardTitle>{fullName}</CardTitle>
            <CardDescription>
              {(user.role || "User") + (user.gender ? ` • ${user.gender}` : " • N/A")}
            </CardDescription>            {/* <Badge
              variant={user.isLogin === "Active" ? "default" : "secondary"}
              className={user.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
            >
              {user.status}
            </Badge> */}

            <Badge
              className={
                user.isLogin === "Active"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }
            >
              {user.isLogin}
            </Badge>

          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{location}</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-3 text-muted-foreground" />
                <span>Last active {new Date(user.lastLoginAt).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-pink-600">{user.bookingCount}</div>
                <div className="text-sm text-muted-foreground">Total Bookings</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{user.totalSpent}</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                  <Star className="h-5 w-5" />
                  {user.averageRating}
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking history</CardDescription>
        </CardHeader>
        <CardContent>
          {user.bookings.length === 0 ? (
            <div className="text-muted-foreground text-sm">No bookings found</div>
          ) : (<Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user.bookings.map((booking: any) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>{booking.artist}</TableCell>
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
          )}
        </CardContent>
      </Card>

      {/* <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
          <CardDescription>Account settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Notification Settings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Push Notifications</span>
                  <Badge variant={user.preferences.notifications ? "success" : "secondary"}>
                    {user.preferences.notifications ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Email Updates</span>
                  <Badge variant={user.preferences.emailUpdates ? "success" : "secondary"}>
                    {user.preferences.emailUpdates ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>SMS Updates</span>
                  <Badge variant={user.preferences.smsUpdates ? "success" : "secondary"}>
                    {user.preferences.smsUpdates ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Booking Preferences</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Preferred Location</span>
                  <span>{user.preferences.preferredLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Preferred Time Slot</span>
                  <span>{user.preferences.preferredTimeSlot}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
