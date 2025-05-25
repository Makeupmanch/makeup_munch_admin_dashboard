import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { AddArtistForm } from "@/components/add-artist-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddArtistPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Add New Artist" text="Create a new makeup artist profile">
        <Button variant="outline" size="icon" asChild>
          <Link href="/artists">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Artist Information</CardTitle>
          <CardDescription>Fill in the details to create a new makeup artist profile</CardDescription>
        </CardHeader>
        <CardContent>
          <AddArtistForm />
        </CardContent>
      </Card>
    </div>
  )
}
