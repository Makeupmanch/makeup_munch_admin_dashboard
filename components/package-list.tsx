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
import { Edit, Eye, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

const packages = [
  {
    id: 1,
    name: "Bridal Deluxe Package",
    image: "/placeholder.svg?height=80&width=80",
    category: "Bridal",
    price: "₹25,000",
    city: "Mumbai",
    status: "Active",
    featured: true,
  },
  {
    id: 2,
    name: "Party Makeup",
    image: "/placeholder.svg?height=80&width=80",
    category: "Party",
    price: "₹5,000",
    city: "Delhi",
    status: "Active",
    featured: false,
  },
  {
    id: 3,
    name: "Engagement Special",
    image: "/placeholder.svg?height=80&width=80",
    category: "Engagement",
    price: "₹12,000",
    city: "Bangalore",
    status: "Active",
    featured: true,
  },
  {
    id: 4,
    name: "Pre-Wedding Shoot",
    image: "/placeholder.svg?height=80&width=80",
    category: "Pre-Wedding",
    price: "₹15,000",
    city: "Chennai",
    status: "Inactive",
    featured: false,
  },
  {
    id: 5,
    name: "HD Makeup",
    image: "/placeholder.svg?height=80&width=80",
    category: "HD",
    price: "₹3,500",
    city: "Hyderabad",
    status: "Active",
    featured: false,
  },
]

export function PackageList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPackages, setSelectedPackages] = useState<number[]>([])

  const filteredPackages = packages.filter(
    (pkg) =>
      (pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.city.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || pkg.status.toLowerCase() === statusFilter.toLowerCase()),
  )

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

   const router = useRouter()

const handleViewPackage = (id: number) => {
  router.push(`/packages/${id}`)
}

const handleEditPackage = (id: number) => {
  router.push(`/packages/${id}/edit`)
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedPackages.length > 0 && (
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Trash2 className="h-4 w-4" />
              <span>Delete Selected</span>
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
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
            {filteredPackages.map((pkg) => (
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
                    <div className="h-10 w-10 overflow-hidden rounded-md">
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{pkg.name}</span>
                        {pkg.featured && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{pkg.category}</TableCell>
                <TableCell>{pkg.city}</TableCell>
                <TableCell>{pkg.price}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
