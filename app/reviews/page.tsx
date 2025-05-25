import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { ReviewList } from "@/components/review-list"

export default function ReviewsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Reviews & Ratings" text="Manage customer reviews and ratings">
        <Button className="bg-pink-600 hover:bg-pink-700">Export Reviews</Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>View and moderate customer reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewList />
        </CardContent>
      </Card>
    </div>
  )
}
