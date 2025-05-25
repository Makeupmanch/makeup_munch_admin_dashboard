"use client"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { NotificationList } from "@/components/notification-list"
import { useRouter } from "next/navigation"

export default function NotificationsPage() {


     const router = useRouter()
    
    const handleSendNotification = () => {
      router.push(`/notifications/send`)
    }
    


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Notifications" text="Manage and send notifications to users and artists">
        <Button className="bg-pink-600 hover:bg-pink-700" onClick={()=>handleSendNotification()}> 
          <PlusCircle className="mr-2 h-4 w-4" />
          Send Notification
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>View and manage all notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <NotificationList />
        </CardContent>
      </Card>
    </div>
  )
}
