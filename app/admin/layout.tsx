"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminSidebar } from "@/components/admin/sidebar"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isOnboarding = pathname === "/admin/onboarding"

  if (isOnboarding) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="flex min-h-screen flex-col bg-background">
          <main className="flex-1">{children}</main>
          <ScrollToTop />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen">
        <AdminSidebar />
        {/* ✅ Cambiado: lg:ml-64 → lg:ml-60 (240px) */}
        <div className="flex-1 w-full lg:ml-60">
          <main className="overflow-auto bg-background min-h-screen w-full">
            {children}
          </main>
        </div>
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}