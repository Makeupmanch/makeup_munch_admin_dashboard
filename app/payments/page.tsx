import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { PaymentList } from "@/components/payment-list"

export default function PaymentsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Payments" text="Manage payments and transactions">
        {/* <Button className="bg-pink-600 hover:bg-pink-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Payment
        </Button> */}
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
          <CardDescription>View and manage all payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <PaymentList />
        </CardContent>
      </Card>
    </div>
  )
}
