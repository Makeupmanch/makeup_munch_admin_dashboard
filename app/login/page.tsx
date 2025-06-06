"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Eye, EyeOff, Fingerprint, Lock, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useGetData } from "@/services/queryHooks/useGetData"
import Cookies from "js-cookie"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsLoading(false)
  //     console.log("Email:", email, "Password:", password) // For debugging
  //     if (email === "admin@makeupmunch.in" && password === "password") {
  //     console.log("Login successful");

  //        Cookies.set('authUser', 'true', { expires: 1 }) 

  //       // Simulate successful login
  //       toast({
  //         title: "Login successful",
  //         description: "Welcome back to MakeupMunch Admin",
  //       })
  //       router.push("/dashboard")
  //     } else {

  //       console.log("Login failed");
  //       toast({
  //         variant: "destructive",
  //         title: "Login failed",
  //         description: "Invalid email or password. Please try again.",
  //       })
  //     }
  //   }, 1500)
  // }

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  // Simulate fake API delay
  await new Promise((res) => setTimeout(res, 1500))

  if (email === "admin@makeupmunch.in" && password === "password") {
    Cookies.set('authUser', 'true', { expires: 1 })

    toast({
      title: "Login successful",
      description: "Welcome back to MakeupMunch Admin",
    })

    router.push("/dashboard")
  } else {
    toast({
      variant: "destructive",
      title: "Login failed",
      description: "Invalid email or password. Please try again.",
    })
  }

  setIsLoading(false)
}

  const {
    data: UsersData,
    isLoading: UsersLoading,
    isError: UsersisError,
    error: UsersError,
    // refetch: fetchLocation
  } = useGetData(
    "getAllUsers",
    `/getAllUsers`,
  );


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white p-2 shadow-md">
            <Image
              src="/placeholder.svg?height=80&width=80"
              width={80}
              height={80}
              alt="MakeupMunch Logo"
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-pink-600">MakeupMunch</h1>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>

        <Card className="border-none shadow-lg">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="2fa">2FA</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Enter your credentials to access the admin panel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@makeupmunch.in"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-pink-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me for 30 days
                    </Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="2fa">
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Enter your email and the authentication code from your app</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-2fa">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email-2fa" type="email" placeholder="admin@makeupmunch.in" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Authentication Code</Label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="code" type="text" placeholder="123456" className="pl-10" maxLength={6} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-pink-600 hover:bg-pink-700">Verify</Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          By logging in, you agree to our{" "}
          <Link href="#" className="text-pink-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-pink-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
