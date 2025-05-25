import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { AddPackageForm } from "@/components/add-package-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddPackagePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Add New Package" text="Create a new makeup package">
        <Button variant="outline" size="icon" asChild>
          <Link href="/packages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Package Information</CardTitle>
          <CardDescription>Fill in the details to create a new makeup package</CardDescription>
        </CardHeader>
        <CardContent>
          <AddPackageForm />
        </CardContent>
      </Card>
    </div>
  )
}
