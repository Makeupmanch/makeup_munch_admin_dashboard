// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Edit, Eye, MoreHorizontal, Search, Trash2 } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useGetData } from "@/services/queryHooks/useGetData"


// export function PackageList() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [selectedPackages, setSelectedPackages] = useState<number[]>([])
//   const [maxPriceFilter, setMaxPriceFilter] = useState("")
//   const [selectedServices, setSelectedServices] = useState<string[]>([])

//   const { data, isLoading, isError, error } = useGetData(
//     'getAllPackagesForAdmin',
//     '/admin/getAllPackagesForAdmin'
//   );




//   const transformedPackages = (data?.data || []).map((item: any, index: number) => ({
//     id: index + 1,
//     name: item.name,
//     price: `₹${item.price}`,
//     category: "N/A",
//     city: "N/A",
//     status: "Active",
//     featured: false,
//     image: "/placeholder.svg?height=80&width=80", // or item.image if exists
//     services: item.services || []

//   }))

//   const allServices = Array.from(
//     new Set(
//       (data?.data || []).flatMap((item: any) => item.services || [])
//     )
//   )


//   const filteredPackages = transformedPackages.filter((pkg) => {
//     const matchesSearch =
//       pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       pkg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       pkg.city.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" || pkg.status.toLowerCase() === statusFilter.toLowerCase();

//     const numericPrice = parseFloat(pkg.price.replace(/[^\d.]/g, ""));
//     const matchesMaxPrice =
//       !maxPriceFilter || numericPrice <= parseFloat(maxPriceFilter);

//     const matchesServices = selectedServices.every((s) => pkg.services.includes(s));

//     return matchesSearch && matchesStatus && matchesMaxPrice && matchesServices;
//   });




//   const toggleSelectAll = () => {
//     if (selectedPackages.length === filteredPackages.length) {
//       setSelectedPackages([])
//     } else {
//       setSelectedPackages(filteredPackages.map((pkg) => pkg.id))
//     }
//   }

//   const toggleSelectPackage = (id: number) => {
//     if (selectedPackages.includes(id)) {
//       setSelectedPackages(selectedPackages.filter((pkgId) => pkgId !== id))
//     } else {
//       setSelectedPackages([...selectedPackages, id])
//     }
//   }

//   const router = useRouter()

//   const handleViewPackage = (id: number) => {
//     router.push(`/packages/${id}`)
//   }

//   const handleEditPackage = (id: number) => {
//     router.push(`/packages/${id}/edit`)
//   }



//   {
//     selectedServices.length > 0 && (
//       <div className="flex flex-wrap gap-2">
//         {selectedServices.map((service) => (
//           <Badge key={service} variant="secondary">
//             {service}
//           </Badge>
//         ))}
//       </div>
//     )
//   }


//   {
//     filteredPackages.length === 0 && (
//       <TableRow>
//         <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
//           No packages found matching selected filters and services.
//         </TableCell>
//       </TableRow>
//     )
//   }


//   return (
//     <div className="space-y-4">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//           <div className="relative">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search packages..."
//               className="pl-8 w-full sm:w-[250px] md:w-[300px]"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full sm:w-[180px]">
//               <SelectValue placeholder="Filter by status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Statuses</SelectItem>
//               <SelectItem value="active">Active</SelectItem>
//               <SelectItem value="inactive">Inactive</SelectItem>
//             </SelectContent>
//           </Select>

//           <div className="relative">
//             <Input
//               type="number"
//               placeholder="Max price"
//               className="w-full sm:w-[150px]"
//               value={maxPriceFilter}
//               onChange={(e) => setMaxPriceFilter(e.target.value)}
//             />
//           </div>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="w-full sm:w-[200px]">
//                 {selectedServices.length > 0 ? selectedServices.join(", ") : "Filter by services"}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="max-h-64 overflow-auto">
//               {allServices.map((service) => (
//                 <DropdownMenuItem
//                   key={service}
//                   onClick={() => {
//                     if (selectedServices.includes(service)) {
//                       setSelectedServices(selectedServices.filter((s) => s !== service))
//                     } else {
//                       setSelectedServices([...selectedServices, service])
//                     }
//                   }}
//                 >
//                   <Checkbox
//                     className="mr-2"
//                     checked={selectedServices.includes(service)}
//                   />
//                   {service}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <Button variant="ghost" size="sm" onClick={() => {
//             setSearchQuery("");
//             setStatusFilter("all");
//             setMaxPriceFilter("");
//           }}>
//             Reset Filters
//           </Button>

//         </div>
//         <div className="flex items-center gap-2">
//           {selectedPackages.length > 0 && (
//             <Button variant="outline" size="sm" className="h-8 gap-1">
//               <Trash2 className="h-4 w-4" />
//               <span>Delete Selected</span>
//             </Button>
//           )}
//         </div>
//       </div>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[40px]">
//                 <Checkbox
//                   checked={selectedPackages.length === filteredPackages.length && filteredPackages.length > 0}
//                   onCheckedChange={toggleSelectAll}
//                   aria-label="Select all"
//                 />
//               </TableHead>
//               <TableHead>Package</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>City</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredPackages.map((pkg) => (
//               <TableRow key={pkg.id}>
//                 <TableCell>
//                   <Checkbox
//                     checked={selectedPackages.includes(pkg.id)}
//                     onCheckedChange={() => toggleSelectPackage(pkg.id)}
//                     aria-label={`Select ${pkg.name}`}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <div className="h-10 w-10 overflow-hidden rounded-md">
//                       <Image
//                         src={pkg.image || "/placeholder.svg"}
//                         alt={pkg.name}
//                         width={40}
//                         height={40}
//                         className="h-full w-full object-cover"
//                       />
//                     </div>
//                     <div className="flex flex-col">
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm font-medium">{pkg.name}</span>
//                         {pkg.featured && (
//                           <Badge variant="outline" className="border-yellow-500 text-yellow-500">
//                             Featured
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>{pkg.category}</TableCell>
//                 <TableCell>{pkg.city}</TableCell>
//                 <TableCell>{pkg.price}</TableCell>
//                 <TableCell>
//                   <Badge
//                     variant={pkg.status === "Active" ? "default" : "secondary"}
//                     className={pkg.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
//                   >
//                     {pkg.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                         <span className="sr-only">Open menu</span>
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem onClick={() => handleViewPackage(pkg.id)}>
//                         <Eye className="mr-2 h-4 w-4" />
//                         <span>View Details</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => handleEditPackage(pkg.id)}>
//                         <Edit className="mr-2 h-4 w-4" />
//                         <span>Edit</span>
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem className="text-red-600">
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         <span>Delete</span>
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Edit, Eye, MoreHorizontal, Search, Trash2, X, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { useGetData } from "@/services/queryHooks/useGetData"

export function PackageList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPackages, setSelectedPackages] = useState<number[]>([])
  const [maxPriceFilter, setMaxPriceFilter] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const { data, isLoading, isError, error } = useGetData("getAllPackagesForAdmin", "/admin/getAllPackagesForAdmin")

  const transformedPackages = (data?.data || []).map((item: any, index: number) => ({
    id: item._id,
    name: item.name,
    price: `₹${item.price}`,
    category: "N/A",
    city: "N/A",
    status: "Active",
    featured: false,
    image: "/placeholder.svg?height=80&width=80",
    services: item.services || [],
  }))

  const allServices = Array.from(new Set((data?.data || []).flatMap((item: any) => item.services || [])))

  const filteredPackages = transformedPackages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || pkg.status.toLowerCase() === statusFilter.toLowerCase()

    const numericPrice = Number.parseFloat(pkg.price.replace(/[^\d.]/g, ""))
    const matchesMaxPrice = !maxPriceFilter || numericPrice <= Number.parseFloat(maxPriceFilter)

    const matchesServices = selectedServices.length === 0 || selectedServices.every((s) => pkg.services.includes(s))

    return matchesSearch && matchesStatus && matchesMaxPrice && matchesServices
  })

  const toggleSelectAll = () => {
    if (selectedPackages.length === filteredPackages.length) {
      setSelectedPackages([])
    } else {
      setSelectedPackages(filteredPackages.map((pkg) => pkg.id))
    }
  }

  const toggleSelectPackage = (id: number) => {
    if (selectedPackages.includes(id)) {
      setSelectedPackages(selectedPackages.filter((pkgId) => pkgId !== id))
    } else {
      setSelectedPackages([...selectedPackages, id])
    }
  }

  const removeSelectedService = (serviceToRemove: string) => {
    setSelectedServices(selectedServices.filter((service) => service !== serviceToRemove))
  }

  const resetAllFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setMaxPriceFilter("")
    setSelectedServices([])
  }

  const router = useRouter()

  const handleViewPackage = (id: number) => {
    router.push(`/packages/${id}`)
  }

  const handleEditPackage = (id: number) => {
    router.push(`/packages/${id}/edit`)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-10 w-[180px]" />
            <Skeleton className="h-10 w-[150px]" />
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Skeleton className="h-4 w-4" />
                </TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-md" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-red-500 mb-2">Error loading packages</div>
        <p className="text-muted-foreground mb-4">{error?.message || "Something went wrong while fetching packages"}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search packages..."
              className="pl-8 w-full sm:w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select> */}

          <div className="relative">
            <Input
              type="number"
              placeholder="Max price"
              className="w-full sm:w-[150px]"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[200px] justify-start">
                <Filter className="mr-2 h-4 w-4" />
                {selectedServices.length > 0
                  ? `${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""} selected`
                  : "Filter by services"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-64 overflow-auto w-56">
              <DropdownMenuLabel>Select Services</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allServices.map((service) => (
                <DropdownMenuItem
                  key={service}
                  onClick={() => {
                    if (selectedServices.includes(service)) {
                      setSelectedServices(selectedServices.filter((s) => s !== service))
                    } else {
                      setSelectedServices([...selectedServices, service])
                    }
                  }}
                  className="cursor-pointer"
                >
                  <Checkbox className="mr-2" checked={selectedServices.includes(service)} readOnly />
                  {service}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" onClick={resetAllFilters}>
            Reset Filters
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {selectedPackages.length > 0 && (
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Trash2 className="h-4 w-4" />
              <span>Delete Selected ({selectedPackages.length})</span>
            </Button>
          )}
        </div>
      </div>

      {/* Selected Services Display */}
      {selectedServices.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
          <span className="text-sm font-medium text-muted-foreground mr-2">Filtering by services:</span>
          {selectedServices.map((service) => (
            <Badge key={service} variant="secondary" className="gap-1">
              {service}
              <button
                onClick={() => removeSelectedService(service)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Scrollable Table Container */}
      {/* Results Summary */}
      {filteredPackages.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredPackages.length} of {transformedPackages.length} packages
          {selectedPackages.length > 0 && <span className="ml-2">• {selectedPackages.length} selected</span>}
        </div>
      )}
      <div className="rounded-md border">
        <div className="max-h-[600px] overflow-auto">
          <Table >
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedPackages.length === filteredPackages.length && filteredPackages.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-muted-foreground text-lg">No packages found</div>
                      <p className="text-sm text-muted-foreground">
                        {selectedServices.length > 0 || searchQuery || statusFilter !== "all" || maxPriceFilter
                          ? "Try adjusting your filters to see more results"
                          : "No packages are available at the moment"}
                      </p>
                      {(selectedServices.length > 0 || searchQuery || statusFilter !== "all" || maxPriceFilter) && (
                        <Button variant="outline" size="sm" onClick={resetAllFilters} className="mt-2">
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedPackages.includes(pkg.id)}
                        onCheckedChange={() => toggleSelectPackage(pkg.id)}
                        aria-label={`Select ${pkg.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 overflow-hidden rounded-md flex-shrink-0">
                          <Image
                            src={pkg.image || "/placeholder.svg"}
                            alt={pkg.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium truncate">{pkg.name}</span>
                            {pkg.featured && (
                              <Badge variant="outline" className="border-yellow-500 text-yellow-500 flex-shrink-0">
                                Featured
                              </Badge>
                            )}
                          </div>
                          {pkg.services.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pkg.services.slice(0, 2).map((service: string) => (
                                <Badge key={service} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                              {pkg.services.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{pkg.services.length - 2} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{pkg.category}</TableCell>
                    <TableCell>{pkg.city}</TableCell>
                    <TableCell className="font-medium">{pkg.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={pkg.status === "Active" ? "default" : "secondary"}
                        className={pkg.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {pkg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewPackage(pkg.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditPackage(pkg.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>


    </div>
  )
}
