import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { FeedbackList } from "@/components/feedback-list"

export default function FeedbackPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="App Feedback" text="View and manage user feedback about the app">
        <Button className="bg-pink-600 hover:bg-pink-700">Export Feedback</Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Feedback</CardTitle>
          <CardDescription>View and manage all app feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <FeedbackList />
        </CardContent>
      </Card>
    </div>
  )
}
