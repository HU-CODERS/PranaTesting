"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { DollarSign, Settings, LogOut, Home, BarChart2, Calendar, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface SidebarLinkProps {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  isActive?: boolean
  isCollapsed?: boolean
  isMobile?: boolean
  onClick?: () => void
}

const SidebarLink = ({ href, icon: Icon, children, isActive, isCollapsed, isMobile, onClick }: SidebarLinkProps) => {
  const linkContent = (
    <>
      <Icon className={cn(
        "h-5 w-5", 
        isCollapsed && !isMobile ? "mr-0" : isMobile ? "mx-auto" : "mr-3"
      )} />
      {!isCollapsed && !isMobile && <span>{children}</span>}
      {isMobile && (
        <span className="text-xs mt-1 text-center leading-tight">{children}</span>
      )}
    </>
  )

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex transition-colors",
        // Desktop/Tablet styles
        !isMobile && "items-center px-6 py-3 text-gray-600 hover:bg-[#F6F4F1] hover:text-[#305891]",
        !isMobile && isActive && "text-[#305891] bg-[#F6F4F1]",
        !isMobile && isCollapsed && "justify-center px-3",
        // Mobile styles
        isMobile && "flex-col items-center justify-center py-2 px-1 text-gray-600 hover:text-[#305891] min-h-[60px]",
        isMobile && isActive && "text-[#305891]",
      )}
    >
      {linkContent}
    </Link>
  )
}

export function ProfesorSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Asegurar que el componente se hidrate correctamente
  useEffect(() => {
    setIsClient(true)
    // Cargar el estado guardado solo después de la hidratación
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    
    // Solo acceder a localStorage si estamos en el cliente
    if (typeof window !== 'undefined') {
      localStorage.setItem("sidebarCollapsed", String(newState))
      
      // Emitir un evento personalizado para que el layout pueda reaccionar
      const event = new CustomEvent("sidebarToggle", { detail: { isCollapsed: newState } })
      window.dispatchEvent(event)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    // Solo acceder a localStorage si estamos en el cliente
    if (typeof window !== 'undefined') {
      // Limpiar datos de sesión
      localStorage.removeItem("isLogged")
      localStorage.removeItem("userRole")

      // Redirigir a la página principal
      window.location.href = "/"
    }
  }

  const navigationItems = [
    {
      href: "/profesor/dashboard",
      icon: Home,
      label: "Dashboard",
      isActive: pathname === "/profesor/dashboard"
    },
    {
      href: "/profesor/semana-clases",
      icon: Calendar,
      label: "Mis Clases",
      isActive: pathname === "/profesor/semana-clases"
    },
    {
      href: "/profesor/pagos",
      icon: DollarSign,
      label: "Mis Pagos",
      isActive: pathname === "/profesor/pagos"
    },
    {
      href: "/profesor/configuracion",
      icon: Settings,
      label: "Mi Perfil",
      isActive: pathname === "/profesor/configuracion"
    }
  ]

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <div
        className={cn(
          "bg-white shadow-md h-screen flex flex-col fixed left-0 top-0 z-30 transition-all duration-300 hidden md:flex",
          isCollapsed ? "w-[70px]" : "w-64",
        )}
      >
        <div className={cn("p-6", isCollapsed && "p-4")}>
          {isCollapsed ? (
            <div className="flex justify-center">
              <h1 className="text-xl font-bold text-[#305891]">PO</h1>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-[#305891]">Prana OM</h1>
              <p className="text-sm text-gray-500">Panel de Profesor</p>
            </>
          )}
        </div>

        {/* Solo mostrar el botón toggle después de la hidratación */}
        {isClient && (
          <button
            onClick={toggleSidebar}
            className="absolute right-0 top-6 transform translate-x-1/2 bg-white rounded-full p-1.5 border border-gray-200 shadow-sm text-gray-500 hover:text-[#305891]"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}

        <nav className="flex-1 overflow-y-auto">
          {!isCollapsed && <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Principal</div>}
          
          {navigationItems.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              isActive={item.isActive}
              isCollapsed={isCollapsed}
            >
              {item.label}
            </SidebarLink>
          ))}

          {!isCollapsed && (
            <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase">Configuración</div>
          )}
          
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center px-6 py-3 text-gray-600 hover:bg-[#F6F4F1] hover:text-[#305891] w-full text-left transition-colors",
              isCollapsed && "justify-center px-3",
            )}
          >
            <LogOut className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
            {!isCollapsed && <span>Cerrar sesión</span>}
          </button>
        </nav>
      </div>

      {/* Mobile Header with Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-40 px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <div>
          <h1 className="text-lg font-bold text-[#305891]">Prana OM</h1>
          <p className="text-xs text-gray-500">Panel de Profesor</p>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-gray-600 hover:text-[#305891] transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={closeMobileMenu}>
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#305891]">Menú</h2>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-600 hover:text-[#305891] transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <SidebarLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  isActive={item.isActive}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </SidebarLink>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-[#305891] w-full text-left transition-colors rounded-lg hover:bg-[#F6F4F1]"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Cerrar sesión</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-pb">
        <div className="grid grid-cols-4 h-20 py-2">
          {navigationItems.map((item) => (
            <SidebarLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              isActive={item.isActive}
              isMobile={true}
            >
              {item.label}
            </SidebarLink>
          ))}
        </div>
      </div>

    </>
  )
}

// Hook personalizado para manejar el espaciado del layout
export function useProfesorLayout() {
  return {
    // Clases para el contenedor principal del layout
    getLayoutClasses: () => cn(
      // Desktop: margen izquierdo para el sidebar
      "md:ml-64",
      // Mobile: padding top para header y bottom para bottom bar
      "pt-16 pb-16 md:pt-0 md:pb-0"
    ),
    
    // Clases específicas para el contenido principal
    getContentClasses: () => cn(
      // Asegurar que el contenido no se superponga
      "min-h-screen md:min-h-auto",
      // Espaciado adicional en mobile si es necesario
      "px-4 py-4 md:px-6 md:py-6"
    )
  }
}
