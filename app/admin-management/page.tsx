import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { AdminList } from "@/components/admin-list"

export default function AdminManagementPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Admin Management" text="Create and manage admin accounts">
        <Button className="bg-pink-600 hover:bg-pink-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Admin Accounts</CardTitle>
          <CardDescription>View and manage all admin accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminList />
        </CardContent>
      </Card>
    </div>
  )
}
