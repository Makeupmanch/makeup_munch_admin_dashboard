import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { UserProfile } from "@/components/user-profile"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface UserProfilePageProps {
  params: {
    id: string
  }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="User Profile" text="View and manage user information">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/users">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href={`/users/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Detailed information about the user</CardDescription>
        </CardHeader>
        <CardContent>
          <UserProfile id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
