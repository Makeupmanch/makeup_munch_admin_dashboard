"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export function SettingsTabs() {
  const [commissionRate, setCommissionRate] = useState("15")
  const [taxRate, setTaxRate] = useState("18")
  const [bookingCancellationTime, setBookingCancellationTime] = useState("24")
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [enableSMS, setEnableSMS] = useState(false)
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(true)
  const [enablePushNotifications, setEnablePushNotifications] = useState(true)
  const [paymentGateway, setPaymentGateway] = useState("razorpay")
  const [currency, setCurrency] = useState("inr")
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="payments">Payments</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your general application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">Application Name</Label>
              <Input id="app-name" defaultValue="MakeupMunch" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input id="contact-email" type="email" defaultValue="contact@makeupmunch.in" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-phone">Support Phone Number</Label>
              <Input id="support-phone" type="tel" defaultValue="+91 9876543210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea id="address" defaultValue="123 Main Street, Mumbai, Maharashtra, India" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-cancellation">Booking Cancellation Time (Hours)</Label>
              <Input
                id="booking-cancellation"
                type="number"
                value={bookingCancellationTime}
                onChange={(e) => setBookingCancellationTime(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Users can cancel bookings without penalty up to this many hours before the appointment.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <p className="text-xs text-muted-foreground">
                  When enabled, the app will display a maintenance message to all users.
                </p>
              </div>
              <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto bg-pink-600 hover:bg-pink-700">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="payments" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
            <CardDescription>Configure payment gateways and commission rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment-gateway">Default Payment Gateway</Label>
              <Select value={paymentGateway} onValueChange={setPaymentGateway}>
                <SelectTrigger id="payment-gateway">
                  <SelectValue placeholder="Select payment gateway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                  <SelectItem value="paytm">Paytm</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                  <SelectItem value="eur">Euro (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="commission-rate">Artist Commission Rate (%)</Label>
              <Input
                id="commission-rate"
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Percentage of booking amount that will be charged as platform commission.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
              <p className="text-xs text-muted-foreground">Tax percentage to be applied on bookings.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto bg-pink-600 hover:bg-pink-700">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how notifications are sent to users and artists</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-notifications">Enable Notifications</Label>
                <p className="text-xs text-muted-foreground">Master switch for all notifications in the application.</p>
              </div>
              <Switch
                id="enable-notifications"
                checked={enableNotifications}
                onCheckedChange={setEnableNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-sms">SMS Notifications</Label>
                <p className="text-xs text-muted-foreground">Send SMS notifications for important updates.</p>
              </div>
              <Switch
                id="enable-sms"
                checked={enableSMS}
                onCheckedChange={setEnableSMS}
                disabled={!enableNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-email">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Send email notifications for bookings and updates.</p>
              </div>
              <Switch
                id="enable-email"
                checked={enableEmailNotifications}
                onCheckedChange={setEnableEmailNotifications}
                disabled={!enableNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-push">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Send push notifications to mobile devices.</p>
              </div>
              <Switch
                id="enable-push"
                checked={enablePushNotifications}
                onCheckedChange={setEnablePushNotifications}
                disabled={!enableNotifications}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto bg-pink-600 hover:bg-pink-700">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="appearance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize the look and feel of your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex gap-2">
                <Input id="primary-color" type="color" defaultValue="#e91e63" className="w-16 h-10" />
                <Input defaultValue="#e91e63" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex gap-2">
                <Input id="secondary-color" type="color" defaultValue="#9c27b0" className="w-16 h-10" />
                <Input defaultValue="#9c27b0" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo-upload">Logo</Label>
              <Input id="logo-upload" type="file" />
              <p className="text-xs text-muted-foreground">Recommended size: 200x200px. Max file size: 2MB.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="favicon-upload">Favicon</Label>
              <Input id="favicon-upload" type="file" />
              <p className="text-xs text-muted-foreground">Recommended size: 32x32px. Max file size: 1MB.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto bg-pink-600 hover:bg-pink-700">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="advanced" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>Configure advanced application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
              <Input id="cache-duration" type="number" defaultValue="60" />
              <p className="text-xs text-muted-foreground">How long to cache data in the application.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-level">Log Level</Label>
              <Select defaultValue="info">
                <SelectTrigger id="log-level">
                  <SelectValue placeholder="Select log level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="warn">Warning</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex gap-2">
                <Input id="api-key" type="password" defaultValue="sk_test_12345678901234567890" className="flex-1" />
                <Button variant="outline">Regenerate</Button>
              </div>
              <p className="text-xs text-muted-foreground">API key for external integrations. Keep this secure.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Database Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="backup-frequency">
                  <SelectValue placeholder="Select backup frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto bg-pink-600 hover:bg-pink-700">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
