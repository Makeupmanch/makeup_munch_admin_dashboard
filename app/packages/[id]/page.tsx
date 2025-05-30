import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { PackageDetails } from "@/components/package-details"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface PackageDetailsPageProps {
  params: {
    id: string
  }
}

export default function PackageDetailsPage({ params }: PackageDetailsPageProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Package Details" text="View and manage package information">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/packages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href={`/packages/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Package
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Package Information</CardTitle>
          <CardDescription>Detailed information about the package</CardDescription>
        </CardHeader>
        <CardContent>
          <PackageDetails id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
