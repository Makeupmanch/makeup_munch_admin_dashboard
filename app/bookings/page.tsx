import { Import, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { BookingList } from "@/components/booking-list"
 
export default function BookingsPage() {
 

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Bookings" text="Manage customer bookings">
        {/* <Button className="bg-pink-600 hover:bg-pink-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Booking
        </Button> */}
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>View and manage all customer bookings</CardDescription>
        </CardHeader>
        <CardContent>
          <BookingList />
        </CardContent>
      </Card>
    </div>
  )
}
