"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { CheckCircle, Edit, Eye, MoreHorizontal, Search, Star, Trash2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useGetData } from "@/services/queryHooks/useGetData"
import { ShieldCheck } from "lucide-react"


export function ArtistList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedArtists, setSelectedArtists] = useState<number[]>([]);

  const { data, isError, isLoading, error } = useGetData("getAllUsers", "admin/getAllArtistsForAdmin");

  const apiArtists = Array.isArray(data?.data) ? data.data : [];

  const filteredArtists = apiArtists.filter((artist) =>
    (artist?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist?.specialties.join(", ").toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist?.city.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === "all" || artist?.Status.toLowerCase() === statusFilter.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedArtists.length === filteredArtists.length) {
      setSelectedArtists([])
    } else {
      setSelectedArtists(filteredArtists.map((artist) => artist.id))
    }
  }

  const toggleSelectArtist = (id: number) => {
    if (selectedArtists.includes(id)) {
      setSelectedArtists(selectedArtists.filter((artistId) => artistId !== id))
    } else {
      setSelectedArtists([...selectedArtists, id])
    }
  }


  const router = useRouter()

  const handleViewProfile = (id: number) => {
    router.push(`/artists/${id}`)
  }

  const handleEditArtist = (id: number) => {
    router.push(`/artists/${id}/edit`)
  }

  console.log("data", data);


  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search artists..."
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
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedArtists.length > 0 && (
            <>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Approve</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <XCircle className="h-4 w-4" />
                <span>Reject</span>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox
                  checked={selectedArtists.length === filteredArtists.length && filteredArtists.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtists.map((artist) => (
              <TableRow key={artist?._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedArtists.includes(artist?._id)}
                    onCheckedChange={() => toggleSelectArtist(artist?._id)}
                    aria-label={`Select ${artist?.username}`}
                  />
                </TableCell>
                {/* <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={artist?.profile_img || "/placeholder.svg"} alt={artist?.username} />
                      <AvatarFallback>{artist?.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{artist?.username}</span>
                        {artist.featured && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{artist?.email}</span>
                    </div>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={artist?.profile_img || "/placeholder.svg"} alt={artist?.username} />
                      <AvatarFallback>{artist?.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium flex items-center gap-1">
                          {artist?.username}
                          {artist?.providedByUs && (
                            <span title="Hub Provided">
                              <ShieldCheck className="text-green-500 h-4 w-4" />
                            </span>
                          )}
                        </span>

                        {artist?.featured && (
                          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{artist?.email}</span>
                    </div>
                  </div>
                </TableCell>                <TableCell>{artist?.specialties[0]}</TableCell>
                <TableCell>{artist?.city}</TableCell>
                {/* <Star className="mr-1 h-4 w-4 text-yellow-500" /> */}
                {/* <TableCell>
                  <div className="flex items-center">
                  
                    <span>{artist?.joinedDate}</span>
                  </div>
                </TableCell> */}

                <TableCell>
                  <div className="flex items-center">
                    <span>{new Date(artist?.joinedDate).toLocaleString()}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      artist?.Status === "approved" ? "default" : artist?.Status === "Pending" ? "outline" : "destructive"
                    }
                    className={
                      artist?.Status === "approved"
                        ? "bg-green-500 hover:bg-green-600"
                        : artist?.Status === "Pending"
                          ? "border-yellow-500 text-yellow-500"
                          : ""
                    }
                  >
                    {artist?.Status}
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
                      <DropdownMenuItem onClick={() => handleViewProfile(artist?._id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem >
                      <DropdownMenuItem onClick={() => handleEditArtist(artist?._id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      {artist.status !== "Approved" && (
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          <span>Approve</span>
                        </DropdownMenuItem>
                      )}
                      {artist.status !== "Rejected" && (
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" />
                          <span>Reject</span>
                        </DropdownMenuItem>
                      )}
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
