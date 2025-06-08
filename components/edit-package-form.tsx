"use client"

import { useEffect, useState } from "react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { usePutData } from "@/services/queryHooks/usePutData"
import { useGetData } from "@/services/queryHooks/useGetData"
import { AlertCircle, Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  price: z.string().min(1, { message: "Please enter the price." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  duration: z.string().min(1, { message: "Please enter the duration." }),
  services: z.array(z.string()).min(1, { message: "Please add at least one service." }),
  cities: z.array(z.string()).min(1, { message: "Please select at least one city." }),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
})

const availableServices = [
  { id: "makeup", label: "Makeup Application" },
  { id: "hairstyling", label: "Hairstyling" },
  { id: "draping", label: "Saree/Outfit Draping" },
  { id: "jewelry", label: "Jewelry Setting" },
  { id: "touchup", label: "Touch-up Kit" },
  { id: "trial", label: "Pre-event Trial" },
  { id: "assistant", label: "Makeup Assistant" },
  { id: "travel", label: "Travel Included" },
  { id: "airbrush", label: "Celebrity-Style Airbrush Makeup" },
  { id: "skincare", label: "Pre-Bridal Skincare Plan" },
  { id: "nailart", label: "Advanced Nail Art" },
  { id: "bodytreatment", label: "Full Body De-Tan & Glow Treatment" },
  { id: "massage", label: "Relaxing Aromatherapy Massage" },
  { id: "Full_Body_Massage", label: "Full Body Massage (Relaxing)" },
  { id: "aroma_pedicure", label: "Aroma Pedicure" },



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

interface EditPackageFormProps {
  id: string
  initialData?: any // Data passed from details page
}

export function EditPackageForm({ id, initialData }: EditPackageFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [shouldFetchData, setShouldFetchData] = useState(!initialData)

  // Only fetch data if not provided via props
  const {
    data: packageData,
    isLoading: isLoadingPackage,
    isError: isLoadError,
    error: loadError,
  } = useGetData(`getPackage-${id}`, `/admin/packages/${id}`, {
    enabled: shouldFetchData, // Only fetch if we don't have initial data
  })

  // Update package mutation
  const { mutate: updatePackage, isPending: isUpdating } = usePutData(`/admin/packages/${id}`)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      description: "",
      duration: "",
      services: [],
      cities: [],
      featured: false,
      active: true,
    },
  })

  // Transform API services to match our available services
  const transformServicesToIds = (apiServices: string[]) => {
    const serviceMap: { [key: string]: string } = {
      "Celebrity-Style Airbrush Makeup for Main Event": "airbrush",
      "Customized Hair Styling for Multiple Events": "hairstyling",
      "Personalized Pre-Bridal Skincare Plan (6 Sessions)": "skincare",
      "Advanced Nail Art with Gel Extensions": "nailart",
      "Full Body De-Tan & Glow Treatment": "bodytreatment",
      "Relaxing Aromatherapy Full Body Massage": "massage",
      "Assistant for Touch-ups (up to 4 hours)": "assistant",
      "Makeup Application": "makeup",
      "Saree/Outfit Draping": "draping",
      "Jewelry Setting": "jewelry",
      "Touch-up Kit": "touchup",
      "Pre-event Trial": "trial",
      "Travel Included": "travel",
      "Full Body Massage (Relaxing)": "Full_Body_Massage",
      "Aroma Pedicure": "aroma_pedicure"

    }

    return apiServices
      .map((service) => serviceMap[service] || service.toLowerCase().replace(/\s+/g, ""))
      .filter((service) => availableServices.some((s) => s.id === service))
  }

  // Populate form when package data is available
  useEffect(() => {
    const dataToUse = initialData || packageData?.data

    if (dataToUse) {
      // Transform services from API format to form format
      const transformedServices = dataToUse.services ? transformServicesToIds(dataToUse.services) : []

      form.reset({
        name: dataToUse.name || "",
        category: dataToUse.category || "bridal", // Default category
        price: dataToUse.price?.toString() || "",
        description: dataToUse.description || "",
        duration: dataToUse.duration?.toString() || "4", // Default duration
        services: transformedServices,
        cities: dataToUse.cities || ["mumbai"], // Default city
        featured: dataToUse.featured || false,
        active: dataToUse.active !== undefined ? dataToUse.active : true,
      })
    }
  }, [initialData, packageData, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Transform services back to API format
    const transformedServices = values.services.map((serviceId) => {
      const service = availableServices.find((s) => s.id === serviceId)
      return service ? service.label : serviceId
    })

    const updateData = {
      ...values,
      price: Number.parseFloat(values.price),
      duration: Number.parseInt(values.duration),
      services: transformedServices, // Use transformed services
    }

    updatePackage(updateData, {
      onSuccess: (response) => {
        toast({
          title: "Package updated successfully",
          description: `${values.name} has been updated.`,
        })
        router.push(`/packages/${id}`)
      },
      onError: (error: any) => {
        toast({
          title: "Error updating package",
          description: error?.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      },
    })
  }

  // Loading state (only show if we're fetching data and don't have initial data)
  if (shouldFetchData && isLoadingPackage) {
    return (
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state (only show if we're fetching data and there's an error)
  if (shouldFetchData && isLoadError) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Error loading package</h3>
        <p className="text-muted-foreground mb-4">
          {loadError?.message || "Failed to load package data. Please try again."}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
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
                <Select onValueChange={field.onChange} value={field.value}>
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
            <h3 className="mb-4 text-sm font-medium">Package Services</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {availableServices.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="services"
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
            <FormMessage>{form.formState.errors.services?.message}</FormMessage>
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
          <Button variant="outline" type="button" onClick={() => router.push(`/packages/${id}`)} disabled={isUpdating}>
            Cancel
          </Button>
          <Button type="submit" className="bg-pink-600 hover:bg-pink-700" disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
