"use client"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { PackageList } from "@/components/package-list"
import { useRouter } from "next/navigation"


export default function PackagesPage() {
    const router = useRouter()
  
      
    const handleAddPackage = () => {
      router.push("/packages/add")
    }
  

     
  

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Makeup Packages" text="Manage makeup packages and services">
        <Button className="bg-pink-600 hover:bg-pink-700"  onClick={handleAddPackage}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
          <CardDescription>View and manage all makeup packages</CardDescription>
        </CardHeader>
        <CardContent>
          <PackageList />
        </CardContent>
      </Card>
    </div>
  )
}
