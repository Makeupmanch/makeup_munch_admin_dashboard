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
import { CheckCircle, Eye, Flag, MoreHorizontal, Search, Star, Trash2, XCircle } from "lucide-react"

const reviews = [
  {
    id: "R-1001",
    customer: {
      name: "Sophia Anderson",
      email: "sophia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    artist: "Priya Sharma",
    package: "Bridal Makeup",
    rating: 5,
    comment: "Absolutely loved my bridal makeup! Priya was professional and made me look stunning on my special day.",
    date: "2023-06-23T10:23:45",
    status: "Approved",
    reported: false,
  },
  {
    id: "R-1002",
    customer: {
      name: "Emma Johnson",
      email: "emma@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    artist: "Neha Patel",
    package: "Party Makeup",
    rating: 4,
    comment: "Great service and makeup. Would recommend Neha for party makeup.",
    date: "2023-06-24T09:45:12",
    status: "Approved",
    reported: false,
  },
  {
    id: "R-1003",
    customer: {
      name: "Olivia Williams",
      email: "olivia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    artist: "Anjali Gupta",
    package: "Engagement Makeup",
    rating: 3,
    comment: "Decent makeup but arrived late. Service could be improved.",
    date: "2023-06-25T08:30:00",
    status: "Pending",
    reported: false,
  },
  {
    id: "R-1004",
    customer: {
      name: "Ava Brown",
      email: "ava@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    artist: "Meera Singh",
    package: "Pre-Wedding Shoot",
    rating: 1,
    comment: "Very disappointed with the service. Makeup was not as promised and washed off quickly.",
    date: "2023-06-26T07:15:30",
    status: "Rejected",
    reported: true,
  },
  {
    id: "R-1005",
    customer: {
      name: "Isabella Jones",
      email: "isabella@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    artist: "Ritu Desai",
    package: "HD Makeup",
    rating: 5,
    comment: "Ritu is amazing! The HD makeup looked flawless in all my photos.",
    date: "2023-06-27T16:45:00",
    status: "Approved",
    reported: false,
  },
  {
    id: "R-1006",
    customer: {
      name: "Mia Garcia",
      email: "mia@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    artist: "Priya Sharma",
    package: "Party Makeup",
    rating: 2,
    comment: "Not worth the money. The makeup artist was rude and unprofessional.",
    date: "2023-06-28T14:20:00",
    status: "Pending",
    reported: true,
  },
]

export function ReviewList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedReviews, setSelectedReviews] = useState<string[]>([])

  const filteredReviews = reviews.filter(
    (review) =>
      (review.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.package.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || review.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (ratingFilter === "all" || review.rating.toString() === ratingFilter),
  )

  const toggleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([])
    } else {
      setSelectedReviews(filteredReviews.map((review) => review.id))
    }
  }

  const toggleSelectReview = (id: string) => {
    if (selectedReviews.includes(id)) {
      setSelectedReviews(selectedReviews.filter((reviewId) => reviewId !== id))
    } else {
      setSelectedReviews([...selectedReviews, id])
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
              placeholder="Search reviews..."
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
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          {selectedReviews.length > 0 && (
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
                  checked={selectedReviews.length === filteredReviews.length && filteredReviews.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedReviews.includes(review.id)}
                    onCheckedChange={() => toggleSelectReview(review.id)}
                    aria-label={`Select ${review.id}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.customer.avatar || "/placeholder.svg"} alt={review.customer.name} />
                      <AvatarFallback>{review.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{review.customer.name}</span>
                      <span className="text-xs text-muted-foreground">{review.customer.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{review.artist}</TableCell>
                <TableCell>{review.package}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate" title={review.comment}>
                    {review.comment}
                  </div>
                </TableCell>
                <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        review.status === "Approved"
                          ? "default"
                          : review.status === "Pending"
                            ? "outline"
                            : "destructive"
                      }
                      className={
                        review.status === "Approved"
                          ? "bg-green-500 hover:bg-green-600"
                          : review.status === "Pending"
                            ? "border-yellow-500 text-yellow-500"
                            : ""
                      }
                    >
                      {review.status}
                    </Badge>
                    {review.reported && (
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        <Flag className="mr-1 h-3 w-3" />
                        Reported
                      </Badge>
                    )}
                  </div>
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
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      {review.status === "Pending" && (
                        <>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Approve</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Reject</span>
                          </DropdownMenuItem>
                        </>
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
