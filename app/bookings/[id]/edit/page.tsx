import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { EditBookingForm } from "@/components/edit-booking-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditBookingPageProps {
  params: {
    id: string
  }
}

export default function EditBookingPage({ params }: EditBookingPageProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Edit Booking" text="Modify booking details and status">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/bookings/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
          <CardDescription>Update booking details and status</CardDescription>
        </CardHeader>
        <CardContent>
          <EditBookingForm id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
