// import type React from "react"
// import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AdminSidebar } from "@/components/admin-sidebar"
// import { Toaster } from "@/components/ui/toaster"
// import "./globals.css"

// const inter = Inter({ subsets: ["latin"] })

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <title>MakeupMunch Admin</title>
//         <meta name="description" content="MakeupMunch Admin Panel" />
//       </head>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//           <SidebarProvider>
//             <div className="flex min-h-screen">
//               <AdminSidebar />
//               <main className="flex-1 overflow-x-hidden">{children}</main>
//             </div>
//             <Toaster />
//           </SidebarProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }

// export const metadata = {
//       generator: 'v0.dev'
//     };


"use client"
import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { usePathname } from "next/navigation"
import QueryProvider from "@/components/QueryProvider"


const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const pathname = usePathname()


    const hideSidebarRoutes = ["/login", "/register"]
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname)


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>MakeupMunch Admin</title>
         <meta name="description" content="MakeupMunch Admin Panel" />
  <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
         <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div className="flex min-h-screen">
              {/* <AdminSidebar />
               */}
                 {!shouldHideSidebar && <AdminSidebar />}
              <main className="flex-1 w-full overflow-x-hidden">{children}</main>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}