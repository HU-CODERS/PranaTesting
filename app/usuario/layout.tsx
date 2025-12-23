"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import UsuarioSidebar from "@/components/usuario/sidebar"
import { ScrollToTop } from "@/components/scroll-to-top"
import ChatbotFlotante from "@/components/usuario/chatBotBubble"

interface UsuarioLayoutProps {
  children: React.ReactNode;
}

export default function UsuarioLayout({ children }: UsuarioLayoutProps) {
  const pathname = usePathname()
  const isOnboarding = pathname === "/usuario/onboarding"
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [isClient, setIsClient] = useState<boolean>(false)

  // Asegurar hidratación del cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Recuperar el estado del sidebar del localStorage al cargar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem("userSidebarCollapsed")
      if (savedState !== null) {
        setIsCollapsed(savedState === "true")
      }
    }
  }, [])

  const toggleSidebar = (): void => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem("userSidebarCollapsed", String(newState))
    }
  }

  // Evitar hidratación incorrecta
  if (!isClient) {
    return null
  }

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
        {/* Música de fondo */}
        <audio src="/audio/panel.mp3" autoPlay loop style={{ display: "none" }} />
        {/* Layout Desktop: Sidebar fija a la izquierda */}
        <div className="hidden md:block">
          <div
            className={`sticky top-0 h-screen ${
              isCollapsed ? "w-[70px]" : "w-[256px]"
            } transition-all duration-300 ease-in-out flex-shrink-0`}
          >
            <UsuarioSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 overflow-x-hidden">
          {/* Layout Mobile: Sidebar flotante (incluida en el componente UsuarioSidebar) */}
          <div className="md:hidden">
            <UsuarioSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          </div>
          
          {/* Main content con padding apropiado para mobile y desktop */}
          <main className="p-4 md:p-6 bg-background min-h-screen pb-20 md:pb-6">
            {children}
          </main>
          <ChatbotFlotante />
        </div>
        
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}