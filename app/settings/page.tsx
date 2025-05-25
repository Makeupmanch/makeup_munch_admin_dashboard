import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsTabs } from "@/components/settings-tabs"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Settings" text="Manage your account and application settings">
        <Button className="bg-pink-600 hover:bg-pink-700">Save Changes</Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Configure your application settings</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsTabs />
        </CardContent>
      </Card>
    </div>
  )
}
