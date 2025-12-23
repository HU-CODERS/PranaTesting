"use client"

import type React from "react"

import { ProfesorSidebar } from "@/components/profesor/sidebar"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/contexts/sidebar-context"

export default function ProfesorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  // Verificar si estamos en la página de onboarding
  const isOnboarding = pathname === "/profesor/onboarding"

  useEffect(() => {
    // Marcar que estamos en el cliente para evitar hidratación
    setIsClient(true)
    
    // Solo inicializar el sidebar si no estamos en onboarding
    if (!isOnboarding && typeof window !== 'undefined') {
      // Inicializar desde localStorage
      const savedState = localStorage.getItem("sidebarCollapsed")
      if (savedState) {
        setIsCollapsed(savedState === "true")
      }

      // Escuchar eventos de cambio en el sidebar
      const handleSidebarToggle = (event: CustomEvent) => {
        setIsCollapsed(event.detail.isCollapsed)
      }

      window.addEventListener("sidebarToggle", handleSidebarToggle as EventListener)

      return () => {
        window.removeEventListener("sidebarToggle", handleSidebarToggle as EventListener)
      }
    }
  }, [isOnboarding])

  // Si estamos en onboarding, renderizar sin sidebar
  if (isOnboarding) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#F9F7F5]">
        <ProfesorSidebar />
        
        {/* Contenedor principal responsivo */}
        <main 
          className={cn(
            "transition-all duration-300 min-h-screen",
            // Estilos para móvil (por defecto) - ajustamos a las nuevas alturas
            "pt-[4.5rem] pb-[5.5rem] px-4",
            // Estilos para desktop/tablet (md y superiores)
            "md:pt-6 md:pb-6",
            // Margen izquierdo dinámico solo en desktop
            isClient && isCollapsed ? "md:ml-[70px] md:px-6" : "md:ml-64 md:px-4"
          )}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}