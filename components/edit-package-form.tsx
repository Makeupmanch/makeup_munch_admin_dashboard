"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { usePutData } from "@/services/queryHooks/usePutData"
import { useGetData } from "@/services/queryHooks/useGetData"
import { AlertCircle, Loader2, Plus, X } from "lucide-react"

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

// Default cities that are always available
const defaultCities = [
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
}

export function EditPackageForm({ id }: EditPackageFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Get initial data from URL params
  const [initialData, setInitialData] = useState<any>(null)
  const [shouldFetchData, setShouldFetchData] = useState(true)

  // Dynamic services and cities state - start with package services only
  const [availableServices, setAvailableServices] = useState<{ id: string; label: string; isNew?: boolean }[]>([])
  const [availableCities, setAvailableCities] = useState(defaultCities)

  // Dialog states
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false)
  const [isCityDialogOpen, setIsCityDialogOpen] = useState(false)
  const [newServiceName, setNewServiceName] = useState("")
  const [newCityName, setNewCityName] = useState("")

  // Get data from URL params
  useEffect(() => {
    const dataParam = searchParams.get("data")
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam))
        setInitialData(decodedData)
        setShouldFetchData(false)
      } catch (error) {
        console.error("Error parsing package data:", error)
      }
    }
  }, [searchParams])

  // API hooks
  const {
    data: packageData,
    isLoading: isLoadingPackage,
    isError: isLoadError,
    error: loadError,
  } = useGetData(`getPackage-${id}`, `/admin/packages/${id}`, { enabled: shouldFetchData })

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

  // Create services from package data
  const createServicesFromPackageData = (packageServices: string[]) => {
    return packageServices.map((serviceName, index) => ({
      id: serviceName.toLowerCase().replace(/\s+/g, "_"),
      label: serviceName,
      isNew: false, // These are existing services from the package
    }))
  }

  // Add new service locally (no API call)
  const handleAddService = () => {
    if (!newServiceName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a service name",
        variant: "destructive",
      })
      return
    }

    const serviceId = newServiceName.toLowerCase().replace(/\s+/g, "_")

    // Check if service already exists
    if (availableServices.some((s) => s.id === serviceId || s.label.toLowerCase() === newServiceName.toLowerCase())) {
      toast({
        title: "Error",
        description: "This service already exists",
        variant: "destructive",
      })
      return
    }

    const newService = {
      id: serviceId,
      label: newServiceName.trim(),
      isNew: true,
    }

    // Add to local state only
    setAvailableServices((prev) => [...prev, newService])

    toast({
      title: "Service added",
      description: `${newServiceName} has been added. Select it to include in the package.`,
    })

    setNewServiceName("")
    setIsServiceDialogOpen(false)
  }

  // Add new city locally (no API call)
  const handleAddCity = () => {
    if (!newCityName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive",
      })
      return
    }

    const cityId = newCityName.toLowerCase().replace(/\s+/g, "_")

    // Check if city already exists
    if (availableCities.some((c) => c.id === cityId || c.label.toLowerCase() === newCityName.toLowerCase())) {
      toast({
        title: "Error",
        description: "This city already exists",
        variant: "destructive",
      })
      return
    }

    const newCity = {
      id: cityId,
      label: newCityName.trim(),
      isNew: true,
    }

    // Add to local state only
    setAvailableCities((prev) => [...prev, newCity])

    toast({
      title: "City added",
      description: `${newCityName} has been added. Select it to include in the package.`,
    })

    setNewCityName("")
    setIsCityDialogOpen(false)
  }

  // Remove service (only new ones)
  const handleRemoveService = (serviceId: string) => {
    const service = availableServices.find((s) => s.id === serviceId)

    if (!service?.isNew) {
      toast({
        title: "Cannot remove",
        description: "Package services cannot be removed, only new services can be removed",
        variant: "destructive",
      })
      return
    }

    setAvailableServices((prev) => prev.filter((s) => s.id !== serviceId))

    // Also remove from form if selected
    const currentServices = form.getValues("services")
    if (currentServices.includes(serviceId)) {
      form.setValue(
        "services",
        currentServices.filter((s) => s !== serviceId),
      )
    }
  }

  // Remove city (only new ones)
  const handleRemoveCity = (cityId: string) => {
    const city = availableCities.find((c) => c.id === cityId)

    if (!city?.isNew) {
      toast({
        title: "Cannot remove",
        description: "Default cities cannot be removed, only new cities can be removed",
        variant: "destructive",
      })
      return
    }

    setAvailableCities((prev) => prev.filter((c) => c.id !== cityId))

    // Also remove from form if selected
    const currentCities = form.getValues("cities")
    if (currentCities.includes(cityId)) {
      form.setValue(
        "cities",
        currentCities.filter((c) => c !== cityId),
      )
    }
  }

  // Populate form when package data is available
  useEffect(() => {
    const dataToUse = initialData || packageData?.data

    if (dataToUse) {
      // Create services from package data only
      if (dataToUse.services && dataToUse.services.length > 0) {
        const packageServices = createServicesFromPackageData(dataToUse.services)
        setAvailableServices(packageServices)

        // Set selected services to all package services
        const serviceIds = packageServices.map((s) => s.id)

        form.reset({
          name: dataToUse.name || "",
          category: dataToUse.category || "bridal",
          price: dataToUse.price?.toString() || "",
          description: dataToUse.description || "",
          duration: dataToUse.duration?.toString() || "4",
          services: serviceIds,
          cities: dataToUse.cities || ["mumbai"],
          featured: dataToUse.featured || false,
          active: dataToUse.active !== undefined ? dataToUse.active : true,
        })
      } else {
        // No services in package, start with empty
        setAvailableServices([])
        form.reset({
          name: dataToUse.name || "",
          category: dataToUse.category || "bridal",
          price: dataToUse.price?.toString() || "",
          description: dataToUse.description || "",
          duration: dataToUse.duration?.toString() || "4",
          services: [],
          cities: dataToUse.cities || ["mumbai"],
          featured: dataToUse.featured || false,
          active: dataToUse.active !== undefined ? dataToUse.active : true,
        })
      }
    }
  }, [initialData, packageData, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Transform services back to API format (use labels)
    const transformedServices = values.services.map((serviceId) => {
      const service = availableServices.find((s) => s.id === serviceId)
      return service ? service.label : serviceId
    })

    // Transform cities back to API format (use labels)
    const transformedCities = values.cities.map((cityId) => {
      const city = availableCities.find((c) => c.id === cityId)
      return city ? city.label : cityId
    })

    const updateData = {
      ...values,
      price: Number.parseFloat(values.price),
      duration: Number.parseInt(values.duration),
      services: transformedServices,
      cities: transformedCities,
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

  // Loading state
  if (shouldFetchData && isLoadingPackage) {
    return (
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
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

  // Error state
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Package Services</h3>
              <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                    <DialogDescription>
                      Create a new service option. It will be available for selection in this package.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="serviceName" className="text-sm font-medium">
                        Service Name
                      </label>
                      <Input
                        id="serviceName"
                        placeholder="Enter service name"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddService()
                          }
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddService}>Add Service</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {availableServices.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No services available. Add a new service to get started.</p>
              </div>
            ) : (
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
                          <div className="flex items-center gap-2 flex-1">
                            <FormLabel className="font-normal flex-1">
                              {item.label}
                              {item.isNew && <span className="text-xs text-blue-500 ml-1">(New)</span>}
                            </FormLabel>
                            {item.isNew && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveService(item.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            )}
            <FormMessage>{form.formState.errors.services?.message}</FormMessage>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Available Cities</h3>
              <Dialog open={isCityDialogOpen} onOpenChange={setIsCityDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add City
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New City</DialogTitle>
                    <DialogDescription>
                      Add a new city where services are available. It will be available for selection in this package.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cityName" className="text-sm font-medium">
                        City Name
                      </label>
                      <Input
                        id="cityName"
                        placeholder="Enter city name"
                        value={newCityName}
                        onChange={(e) => setNewCityName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddCity()
                          }
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCityDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCity}>Add City</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {availableCities.map((city) => (
                <FormField
                  key={city.id}
                  control={form.control}
                  name="cities"
                  render={({ field }) => {
                    const isCustomCity = !defaultCities.some((c) => c.id === city.id)
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
                        <div className="flex items-center gap-2 flex-1">
                          <FormLabel className="font-normal flex-1">
                            {city.label}
                            {isCustomCity && <span className="text-xs text-blue-500 ml-1">(New)</span>}
                          </FormLabel>
                          {isCustomCity && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveCity(city.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
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
