import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArtistProfile } from "@/components/artist-profile"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"

interface ArtistProfilePageProps {
  params: {
    id: string
  }
}

export default function ArtistProfilePage({ params }: ArtistProfilePageProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Artist Profile" text="View and manage artist information">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/artists">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700" asChild>
            <Link href={`/artists/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Artist
            </Link>
          </Button>
        </div>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Artist Information</CardTitle>
          <CardDescription>Detailed information about the makeup artist</CardDescription>
        </CardHeader>
        <CardContent>
          <ArtistProfile id={params.id} />
        </CardContent>
      </Card>
    </div>
  )
}
