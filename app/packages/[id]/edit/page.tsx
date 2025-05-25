import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { EditPackageForm } from "@/components/edit-package-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditPackagePageProps {
  params: {
    id: string
  }
}

export default function EditPackagePage({ params }: EditPackagePageProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Edit Package" text="Modify package details and settings">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/packages/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Package Information</CardTitle>
          <CardDescription>Update package details and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <EditPackageForm id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
