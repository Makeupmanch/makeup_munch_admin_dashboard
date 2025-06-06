"use client"
import { CalendarDays, CreditCard, Search, User, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard-header";
import { RecentBookings } from "@/components/recent-bookings";
import { TopArtists } from "@/components/top-artists";
import { RecentUsers } from "@/components/recent-users";
import { useGetData } from "@/services/queryHooks/useGetData";
import { useEffect, useState } from "react";

type PackageBookingStats = {
  totalPackageBookings: number;
  packageBookingsLastMonth: number;
  packageBookingsTwoMonthsAgo: number;
};

type ServiceBookingStats = {
  totalServiceBookings: number;
  serviceBookingsLastMonth: number;
  serviceBookingsTwoMonthsAgo: number;
};

type UserStats = {
  totalArtists: number;
  totalCustomers: number;
  artistsLastMonth: number;
  customersLastMonth: number;
};


export default function DashboardPage() {
  const [packageBookings, setPackageBookings] = useState<PackageBookingStats | null>(null);
  const [serviceBookings, setServiceBookings] = useState<ServiceBookingStats | null>(null);
  const [users, setUsers] = useState<UserStats | null>(null);



  const { data, isLoading, isError, error } = useGetData(
    "getAllUsers",
    "admin/getOverviewStats"
  );

  useEffect(() => {

    console.log("Data fetched:", data); // For debugging
    if (data?.data) {
      setPackageBookings(data.data.packageBookings);
      setServiceBookings(data.data.serviceBookings);
      setUsers(data.data.users);
    }
  }, [data]);



  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader heading="Dashboard" text="Overview of your business" />

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Bookings
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{packageBookings?.totalServiceBookings}</div>
                <p className="text-xs text-muted-foreground">
                  +180 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Artists
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users?.totalArtists}</div>
                <p className="text-xs text-muted-foreground">
                  +{users?.artistsLastMonth} from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Customers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users?.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  +{users?.customersLastMonth} since last month
                   
                </p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Transactions
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">
                  +58 from yesterday
                </p>
              </CardContent>
            </Card> */}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  You have 12 bookings this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentBookings />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Makeup Artists</CardTitle>
                <CardDescription>
                  Top performing artists this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopArtists />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recently Joined Users</CardTitle>
              <CardDescription>
                New users who joined in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentUsers />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>Detailed view of all bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentBookings extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="artists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Artists</CardTitle>
              <CardDescription>
                Detailed view of all makeup artists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TopArtists extended />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Detailed view of all users</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentUsers extended />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
