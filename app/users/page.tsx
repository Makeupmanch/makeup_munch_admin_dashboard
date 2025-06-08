
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { UserList } from "@/components/user-list"

export default function UsersPage() {
  return (
    <div className="w-full space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Users" text="Manage customer accounts">
        <Button className="bg-pink-600 hover:bg-pink-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage all customer accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <UserList />
        </CardContent>
      </Card>
    </div>
  )
}
