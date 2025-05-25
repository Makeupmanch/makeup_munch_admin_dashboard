import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { EditArtistForm } from "@/components/edit-artist-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface EditArtistPageProps {
  params: {
    id: string
  }
}

export default function EditArtistPage({ params }: EditArtistPageProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Edit Artist" text="Modify artist profile and settings">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/artists/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Artist Information</CardTitle>
          <CardDescription>Update artist details and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <EditArtistForm id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
