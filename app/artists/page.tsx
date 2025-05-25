"use client"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { ArtistList } from "@/components/artist-list"
import { useRouter } from "next/navigation"

export default function ArtistsPage() {
  const router = useRouter()

  const handleAddArtist = () => {
    router.push("/artists/add")
  }


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Makeup Artists" text="Manage makeup artists and their profiles">
        <Button className="bg-pink-600 hover:bg-pink-700" onClick={handleAddArtist}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Artist
        </Button>

      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Artists</CardTitle>
          <CardDescription>View and manage all makeup artists</CardDescription>
        </CardHeader>
        <CardContent>
          <ArtistList />
        </CardContent>
      </Card>
    </div>
  )
}
