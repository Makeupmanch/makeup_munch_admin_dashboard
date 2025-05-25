import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { LocationList } from "@/components/location-list"

export default function LocationsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Locations" text="Manage service areas and cities">
        <Button className="bg-pink-600 hover:bg-pink-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Locations</CardTitle>
          <CardDescription>View and manage all service areas</CardDescription>
        </CardHeader>
        <CardContent>
          <LocationList />
        </CardContent>
      </Card>
    </div>
  )
}
