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
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  price: z.string().min(1, { message: "Please enter the price." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  duration: z.string().min(1, { message: "Please enter the duration." }),
  inclusions: z.array(z.string()).min(1, { message: "Please add at least one inclusion." }),
  cities: z.array(z.string()).min(1, { message: "Please select at least one city." }),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
})

const inclusions = [
  { id: "makeup", label: "Makeup Application" },
  { id: "hairstyling", label: "Hairstyling" },
  { id: "draping", label: "Saree/Outfit Draping" },
  { id: "jewelry", label: "Jewelry Setting" },
  { id: "touchup", label: "Touch-up Kit" },
  { id: "trial", label: "Pre-event Trial" },
  { id: "assistant", label: "Makeup Assistant" },
  { id: "travel", label: "Travel Included" },
]

const cities = [
  { id: "mumbai", label: "Mumbai" },
  { id: "delhi", label: "Delhi" },
  { id: "bangalore", label: "Bangalore" },
  { id: "chennai", label: "Chennai" },
  { id: "hyderabad", label: "Hyderabad" },
  { id: "kolkata", label: "Kolkata" },
  { id: "pune", label: "Pune" },
]

export function AddPackageForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      description: "",
      duration: "",
      inclusions: [],
      cities: [],
      featured: false,
      active: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Package created successfully",
        description: `${values.name} has been added to your packages.`,
      })
      router.push("/packages")
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter package name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bridal">Bridal</SelectItem>
                    <SelectItem value="party">Party</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="prewedding">Pre-Wedding</SelectItem>
                    <SelectItem value="hd">HD</SelectItem>
                    <SelectItem value="airbrush">Airbrush</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter package description" className="min-h-[120px]" {...field} />
              </FormControl>
              <FormDescription>Describe what's included in the package and any special features.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div>
            <h3 className="mb-4 text-sm font-medium">Package Inclusions</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {inclusions.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="inclusions"
                  render={({ field }) => {
                    return (
                      <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item.label}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage>{form.formState.errors.inclusions?.message}</FormMessage>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Available Cities</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {cities.map((city) => (
                <FormField
                  key={city.id}
                  control={form.control}
                  name="cities"
                  render={({ field }) => {
                    return (
                      <FormItem key={city.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(city.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, city.id])
                                : field.onChange(field.value?.filter((value) => value !== city.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{city.label}</FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage>{form.formState.errors.cities?.message}</FormMessage>
          </div>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured Package</FormLabel>
                  <FormDescription>
                    Featured packages appear on the homepage and get priority in search results.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>Inactive packages won't appear in search results or be bookable.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.push("/packages")}>
            Cancel
          </Button>
          <Button type="submit" className="bg-pink-600 hover:bg-pink-700" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Package"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
