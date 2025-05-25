import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { SendEmailForm } from "@/components/send-email-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SendEmailPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Send Email" text="Send emails to users and artists">
        <Button variant="outline" size="icon" asChild>
          <Link href="/notifications">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Email Details</CardTitle>
          <CardDescription>Create and send a new email</CardDescription>
        </CardHeader>
        <CardContent>
          <SendEmailForm />
        </CardContent>
      </Card>
    </div>
  )
}
