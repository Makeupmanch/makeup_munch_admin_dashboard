'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { PackageDetails } from "@/components/package-details"
import { ArrowLeft, Edit , AlertCircle } from "lucide-react"
import Link from "next/link"
import { useGetData } from "@/services/queryHooks/useGetData"
import { useRouter } from "next/navigation"
import { useSearchParams } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"


interface PackageDetailsPageProps {
  params: {
    id: string
  }
}

export default function PackageDetailsPage({ params }: PackageDetailsPageProps) {
  const router = useRouter()
const searchParams = useSearchParams()
const fromDetails = searchParams.get("fromDetails") === "true"


const { data, isLoading, isError, error } = useGetData(`packageDetail_${params.id}`, `/admin/packages/${params.id}`)  


    // send edit package screen add as a props 

  //    const handleEditClick = () => {

      
  //   // Pass the package data via router state
  //   router.push(`/packages/${params.id}/edit`, {
  //     state: {
  //       packageData: data?.data,
  //       fromDetails: true,
  //     },
  //   })
  // }


  const handleEditClick = () => {
    // Pass package data via URL params (encoded)
    const packageData = encodeURIComponent(JSON.stringify(data?.data))
    router.push(`/packages/${params.id}/edit?data=${packageData}`)
  }


   if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader heading="Package Details" text="View and manage package information">
          <Button variant="outline" size="icon" asChild>
            <Link href="/packages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </DashboardHeader>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error loading package</h3>
            <p className="text-muted-foreground mb-4 text-center">
              {error?.message || "Failed to load package details. Please try again."}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                Go Back
              </Button>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }


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
