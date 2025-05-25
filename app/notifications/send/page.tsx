import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { SendNotificationForm } from "@/components/send-notification-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SendNotificationPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Send Notification" text="Send push notifications to users and artists">
        <Button variant="outline" size="icon" asChild>
          <Link href="/notifications">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Notification Details</CardTitle>
          <CardDescription>Create and send a new notification</CardDescription>
        </CardHeader>
        <CardContent>
          <SendNotificationForm />
        </CardContent>
      </Card>
    </div>
  )
}
