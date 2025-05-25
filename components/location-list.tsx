"use client"

import { useState } from "react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, MapPin, MoreHorizontal, Search, Trash2 } from "lucide-react"

const locations = [
  {
    id: 1,
    name: "Mumbai",
    state: "Maharashtra",
    artists: 45,
    bookings: 230,
    status: "Active",
    areas: ["Andheri", "Bandra", "Juhu", "Powai", "Worli"],
  },
  {
    id: 2,
    name: "Delhi",
    state: "Delhi",
    artists: 38,
    bookings: 185,
    status: "Active",
    areas: ["Connaught Place", "Hauz Khas", "Janakpuri", "Lajpat Nagar", "Rohini"],
  },
  {
    id: 3,
    name: "Bangalore",
    state: "Karnataka",
    artists: 32,
    bookings: 160,
    status: "Active",
    areas: ["Indiranagar", "Koramangala", "Whitefield", "Jayanagar", "HSR Layout"],
  },
  {
    id: 4,
    name: "Chennai",
    state: "Tamil Nadu",
    artists: 28,
    bookings: 140,
    status: "Active",
    areas: ["Adyar", "Anna Nagar", "T. Nagar", "Velachery", "Mylapore"],
  },
  {
    id: 5,
    name: "Hyderabad",
    state: "Telangana",
    artists: 25,
    bookings: 125,
    status: "Active",
    areas: ["Banjara Hills", "Gachibowli", "Hitech City", "Jubilee Hills", "Secunderabad"],
  },
  {
    id: 6,
    name: "Kolkata",
    state: "West Bengal",
    artists: 20,
    bookings: 100,
    status: "Inactive",
    areas: ["Park Street", "Salt Lake", "New Town", "Ballygunge", "Howrah"],
  },
  {
    id: 7,
    name: "Pune",
    state: "Maharashtra",
    artists: 18,
    bookings: 90,
    status: "Active",
    areas: ["Koregaon Park", "Viman Nagar", "Kothrud", "Hinjewadi", "Baner"],
  },
]

export function LocationList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocations, setSelectedLocations] = useState<number[]>([])

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.state.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectAll = () => {
    if (selectedLocations.length === filteredLocations.length) {
      setSelectedLocations([])
    } else {
      setSelectedLocations(filteredLocations.map((location) => location.id))
    }
  }

  const toggleSelectLocation = (id: number) => {
    if (selectedLocations.includes(id)) {
      setSelectedLocations(selectedLocations.filter((locationId) => locationId !== id))
    } else {
      setSelectedLocations([...selectedLocations, id])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search locations..."
              className="pl-8 w-full sm:w-[250px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedLocations.length > 0 && (
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
                  checked={selectedLocations.length === filteredLocations.length && filteredLocations.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Areas</TableHead>
              <TableHead>Artists</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLocations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedLocations.includes(location.id)}
                    onCheckedChange={() => toggleSelectLocation(location.id)}
                    aria-label={`Select ${location.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-pink-500" />
                    <span className="font-medium">{location.name}</span>
                  </div>
                </TableCell>
                <TableCell>{location.state}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {location.areas.slice(0, 3).map((area) => (
                      <Badge key={area} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                    {location.areas.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{location.areas.length - 3} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{location.artists}</TableCell>
                <TableCell>{location.bookings}</TableCell>
                <TableCell>
                  <Badge
                    variant={location.status === "Active" ? "default" : "secondary"}
                    className={location.status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {location.status}
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
                      <DropdownMenuItem>
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
