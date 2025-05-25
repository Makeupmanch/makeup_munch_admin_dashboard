import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { EditUserForm } from "@/components/edit-user-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditUserPageProps {
  params: {
    id: string
  }
}

export default function EditUserPage({ params }: EditUserPageProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Edit User" text="Modify user information and settings">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/users/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Update user details and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <EditUserForm id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
