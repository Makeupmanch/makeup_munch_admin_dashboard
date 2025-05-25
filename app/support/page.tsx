import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { SupportTicketList } from "@/components/support-ticket-list"

export default function SupportPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Support Tickets" text="Manage customer and artist support tickets">
        <Button className="bg-pink-600 hover:bg-pink-700">Export Tickets</Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Support Tickets</CardTitle>
          <CardDescription>View and manage all support tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <SupportTicketList />
        </CardContent>
      </Card>
    </div>
  )
}
