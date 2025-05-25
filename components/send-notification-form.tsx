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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
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

export function SendNotificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
      recipientType: "all",
      recipients: [],
    },
  })

  const recipientType = form.watch("recipientType")
  const selectedRecipients = form.watch("recipients") || []

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Notification sent successfully",
        description: values.scheduledDate
          ? `Your notification has been scheduled for ${format(values.scheduledDate, "PPP")}.`
          : "Your notification has been sent to the selected recipients.",
      })
      router.push("/notifications")
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter notification title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter notification message" className="min-h-[120px]" {...field} />
              </FormControl>
              <FormDescription>Keep the message clear and concise for better engagement.</FormDescription>
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
