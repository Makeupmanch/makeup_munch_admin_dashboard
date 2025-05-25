import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { BookingDetails } from "@/components/booking-details"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface BookingDetailsPageProps {
  params: {
    id: string
  }
}

export default function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Booking Details" text="View and manage booking information">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/bookings">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href={`/bookings/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Booking
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
          <CardDescription>Detailed information about the booking</CardDescription>
        </CardHeader>
        <CardContent>
          <BookingDetails id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
