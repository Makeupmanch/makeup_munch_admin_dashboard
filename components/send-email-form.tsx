"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  template: z.string().min(1, { message: "Please select an email template." }),
  content: z.string().min(10, { message: "Email content must be at least 10 characters." }),
  recipientType: z.string().min(1, { message: "Please select recipient type." }),
  recipients: z.array(z.string()).optional(),
  scheduledDate: z.date().optional(),
})

const users = [
  {
    id: "user1",
    name: "Sophia Anderson",
    email: "sophia@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Customer",
  },
  {
    id: "user2",
    name: "Emma Johnson",
    email: "emma@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Customer",
  },
  {
    id: "user3",
    name: "Priya Sharma",
    email: "priya@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Artist",
  },
  {
    id: "user4",
    name: "Neha Patel",
    email: "neha@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Artist",
  },
  {
    id: "user5",
    name: "Olivia Williams",
    email: "olivia@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    type: "Customer",
  },
]

const emailTemplates = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Welcome to MakeupMunch!",
    content:
      "Dear {{name}},\n\nWelcome to MakeupMunch! We're excited to have you join our platform.\n\nWith MakeupMunch, you can easily book professional makeup artists for any occasion. Whether it's for your wedding, engagement, or a party, we've got you covered.\n\nExplore our app to discover talented makeup artists in your area.\n\nBest regards,\nThe MakeupMunch Team",
  },
  {
    id: "booking_confirmation",
    name: "Booking Confirmation",
    subject: "Your Booking is Confirmed",
    content:
      "Dear {{name}},\n\nYour booking with {{artist_name}} for {{service}} on {{date}} at {{time}} has been confirmed.\n\nBooking Details:\n- Service: {{service}}\n- Date: {{date}}\n- Time: {{time}}\n- Location: {{location}}\n- Amount: {{amount}}\n\nIf you need to make any changes to your booking, please contact us at least 24 hours before your appointment.\n\nBest regards,\nThe MakeupMunch Team",
  },
  {
    id: "payment_receipt",
    name: "Payment Receipt",
    subject: "Payment Receipt for Your Booking",
    content:
      "Dear {{name}},\n\nThank you for your payment of {{amount}} for your booking with {{artist_name}}.\n\nPayment Details:\n- Transaction ID: {{transaction_id}}\n- Payment Method: {{payment_method}}\n- Amount: {{amount}}\n- Date: {{date}}\n\nYour booking is now confirmed. We look forward to serving you.\n\nBest regards,\nThe MakeupMunch Team",
  },
  {
    id: "promotional",
    name: "Promotional Offer",
    subject: "Special Offer Just for You!",
    content:
      "Dear {{name}},\n\nWe're excited to offer you a special discount on your next booking!\n\nUse code SPECIAL20 to get 20% off on any makeup service booked through our platform.\n\nThis offer is valid until {{expiry_date}}. Don't miss out on this limited-time offer!\n\nBest regards,\nThe MakeupMunch Team",
  },
  {
    id: "custom",
    name: "Custom Email",
    subject: "",
    content: "",
  },
]

export function SendEmailForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      template: "",
      content: "",
      recipientType: "all",
      recipients: [],
    },
  })

  const recipientType = form.watch("recipientType")
  const selectedRecipients = form.watch("recipients") || []
  const selectedTemplate = form.watch("template")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleTemplateChange = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId)
    if (template && template.id !== "custom") {
      form.setValue("subject", template.subject)
      form.setValue("content", template.content)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Email sent successfully",
        description: values.scheduledDate
          ? `Your email has been scheduled for ${format(values.scheduledDate, "PPP")}.`
          : "Your email has been sent to the selected recipients.",
      })
      router.push("/notifications")
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Template</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  handleTemplateChange(value)
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select email template" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {emailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select a pre-defined template or create a custom email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-1">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Content</FormLabel>
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                  <FormControl>
                    <Textarea placeholder="Enter email content" className="min-h-[300px] font-mono" {...field} />
                  </FormControl>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-md p-4 min-h-[300px] whitespace-pre-line">
                    {field.value || "Email preview will appear here..."}
                  </div>
                </TabsContent>
              </Tabs>
              <FormDescription>
                Use &#123;&#123;name&#125;&#125; to insert the recipient's name and other variables like
                &#123;&#123;date&#125;&#125;, &#123;&#123;time&#125;&#125;, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduledDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Schedule (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : "Schedule for later"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Leave empty to send immediately, or select a date to schedule for later.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="recipientType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Recipients</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">All Users</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="customers" />
                      </FormControl>
                      <FormLabel className="font-normal">All Customers</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="artists" />
                      </FormControl>
                      <FormLabel className="font-normal">All Artists</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="featured_artists" />
                      </FormControl>
                      <FormLabel className="font-normal">Featured Artists</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="specific" />
                      </FormControl>
                      <FormLabel className="font-normal">Specific Users</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {recipientType === "specific" && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="border rounded-md p-4 space-y-4">
                <FormField
                  control={form.control}
                  name="recipients"
                  render={() => (
                    <FormItem>
                      <div className="grid gap-2">
                        {filteredUsers.map((user) => (
                          <FormField
                            key={user.id}
                            control={form.control}
                            name="recipients"
                            render={({ field }) => {
                              return (
                                <FormItem key={user.id} className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(user.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), user.id])
                                          : field.onChange(field.value?.filter((value) => value !== user.id))
                                      }}
                                    />
                                  </FormControl>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-medium">{user.name}</span>
                                      <span className="text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                      {user.type}
                                    </Badge>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {selectedRecipients.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {selectedRecipients.length} recipient{selectedRecipients.length !== 1 ? "s" : ""} selected
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.push("/notifications")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-pink-600 hover:bg-pink-700" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : form.getValues("scheduledDate") ? "Schedule" : "Send Now"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
