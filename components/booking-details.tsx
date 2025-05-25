"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, MapPin, Phone, Mail, User, Package, CreditCard, FileText } from "lucide-react"

interface BookingDetailsProps {
  id: string
}

export function BookingDetails({ id }: BookingDetailsProps) {
  const [booking, setBooking] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch booking details
    setTimeout(() => {
      setBooking({
        id: "B-1001",
        customer: {
          name: "Sophia Anderson",
          email: "sophia@example.com",
          phone: "+91 9876543210",
          avatar: "/placeholder.svg?height=64&width=64",
        },
        artist: {
          name: "Priya Sharma",
          email: "priya@example.com",
          phone: "+91 9876543211",
          avatar: "/placeholder.svg?height=64&width=64",
          rating: 4.8,
        },
        package: {
          name: "Bridal Makeup",
          description: "Complete bridal makeup with hairstyling and draping",
          duration: "4 hours",
        },
        date: "2023-06-23",
        time: "10:00 AM",
        status: "Confirmed",
        amount: "₹12,500",
        location: "123 Main Street, Bandra West, Mumbai, Maharashtra 400050",
        notes: "Customer requested natural look with emphasis on eyes. Venue has good lighting.",
        paymentStatus: "Paid",
        paymentMethod: "UPI",
        transactionId: "TXN123456789",
        createdAt: "2023-06-20T14:30:00",
        updatedAt: "2023-06-21T10:15:00",
      })
      setIsLoading(false)
    }, 1000)
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  if (!booking) {
    return <div>Booking not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={booking.customer.avatar || "/placeholder.svg"} alt={booking.customer.name} />
                <AvatarFallback>{booking.customer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{booking.customer.name}</h3>
                <p className="text-sm text-muted-foreground">Customer</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{booking.customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{booking.customer.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Artist Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={booking.artist.avatar || "/placeholder.svg"} alt={booking.artist.name} />
                <AvatarFallback>{booking.artist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{booking.artist.name}</h3>
                <p className="text-sm text-muted-foreground">Makeup Artist</p>
                <div className="flex items-center gap-1">
                  <span className="text-sm">⭐ {booking.artist.rating}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{booking.artist.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{booking.artist.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Package</h4>
              <p className="text-sm font-medium">{booking.package.name}</p>
              <p className="text-sm text-muted-foreground">{booking.package.description}</p>
              <p className="text-sm text-muted-foreground">Duration: {booking.package.duration}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Status & Amount</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Status:</span>
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
                </div>
                <p className="text-sm">
                  <span className="font-medium">Amount:</span> {booking.amount}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(booking.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{booking.time}</span>
              </div>
            </div>
            <div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{booking.location}</span>
              </div>
            </div>
          </div>

          {booking.notes && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-medium">Notes</h4>
                </div>
                <p className="text-sm text-muted-foreground">{booking.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-medium mb-1">Payment Status</h4>
              <Badge variant="success" className="bg-green-500 hover:bg-green-600">
                {booking.paymentStatus}
              </Badge>
            </div>
            <div>
              <h4 className="font-medium mb-1">Payment Method</h4>
              <p className="text-sm">{booking.paymentMethod}</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Transaction ID</h4>
              <p className="text-sm font-mono">{booking.transactionId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Booking Created</p>
                <p className="text-xs text-muted-foreground">{new Date(booking.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-xs text-muted-foreground">{new Date(booking.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
