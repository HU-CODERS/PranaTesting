"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpen,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Menu,
  X,
  House,
  MoreHorizontal,
  ArrowBigLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UsuarioSidebarProps {
  isCollapsed: boolean
  toggleSidebar: () => void
}

export default function UsuarioSidebar({ isCollapsed, toggleSidebar }: UsuarioSidebarProps) {
  const pathname = usePathname()
  const [username, setUsername] = useState("Usuario")
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  // Cerrar el menú "Más" cuando cambia la ruta
  useEffect(() => {
    setIsMoreMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("isLogged")
    localStorage.removeItem("userRole")
    window.location.href = "/"
  }

  interface NavItem {
    title: string
    icon: React.ComponentType<any>
    href: string
    section: string
    disabled?: boolean
  }

  const navItems: NavItem[] = [
    {
      title: "Asistí al espacio",
      icon: MapPin,
      href: "/usuario/asisti-al-espacio",
      section: "principal",
    },
    {
      title: "Abonos",
      icon: ShoppingBag,
      href: "/usuario/tienda",
      section: "principal",
    },
    {
      title: "Mis reservas",
      icon: Heart,
      href: "/usuario/mis-reservas",
      section: "principal",
    },
    {
      title: "Volver al Inicio",
      icon: House,
      href: "/",
      section: "principal",
    },
  ]

  // Opciones principales para el bottom bar
  const mainBottomNavItems = [
    { href: "/usuario/asisti-al-espacio", icon: MapPin, label: "Inscribite" },
    { href: "/usuario/tienda", icon: ShoppingBag, label: "Abona" },
    { href: "/usuario/mis-reservas", icon: Heart, label: "Tus Reservas" },
  ]

  // Componente para los items del bottom bar
  interface BottomNavItemProps {
    href: string
    icon: React.ComponentType<any>
    label: string
    isActive?: boolean
  }

  const BottomNavItem = ({ href, icon: Icon, label, isActive }: BottomNavItemProps) => {
    return (
      <Link
        href={href}
        className={cn(
          "flex flex-col items-center justify-center py-2 px-3 text-xs font-medium transition-colors",
          isActive ? "text-[#305891]" : "text-gray-600 hover:text-[#305891]"
        )}
      >
        <Icon className={cn("h-6 w-6 mb-1", isActive && "stroke-2")} />
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Sidebar Desktop */}
      <aside
        className={cn(
          "hidden md:flex h-full flex-col border-r border-gray-200 bg-white",
          isCollapsed ? "w-[70px]" : "w-[256px]"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-gray-200 px-4",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && (
            <div className="flex items-center">
              <span className="text-xl font-bold text-[#305891]">Prana OM</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
            aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto py-4">
          <div className="mb-6 px-4 text-xs font-semibold uppercase text-gray-500">
            {!isCollapsed && "Principal"}
          </div>
          <nav className="space-y-1 px-2">
            {navItems
              .filter((item) => item.section === "principal")
              .map((item) =>
                item.disabled ? (
                  <div
                    key={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href ? "bg-[#305891] text-white" : "text-gray-700 hover:bg-gray-100",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                )
              )}
          </nav>

          <div className="mt-6 px-4 text-xs font-semibold uppercase text-gray-500">
            {/* Configuración si se necesita en el futuro */}
          </div>
          <nav className="space-y-1 px-2">
            {navItems
              .filter((item) => item.section === "configuracion")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    pathname === item.href ? "bg-[#305891] text-white" : "text-gray-700 hover:bg-gray-100",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              ))}
          </nav>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50",
                isCollapsed && "justify-center px-2"
              )}
            >
              <LogOut className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-3")} />
              {!isCollapsed && <span>Cerrar sesión</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile & Tablet Bottom Bar */}
      <div className="md:hidden">
        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
            {mainBottomNavItems.map((item) => (
              <BottomNavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={pathname === item.href}
              />
            ))}
            
            {/* Botón "Más" */}
            <button
              onClick={() => setIsMoreMenuOpen(true)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 text-xs font-medium transition-colors",
                "text-gray-600 hover:text-[#305891]"
              )}
            >
              <MoreHorizontal className="h-6 w-6 mb-1" />
              <span>Más</span>
            </button>
          </div>
        </nav>

        {/* Overlay del menú "Más" */}
        <div
          className={cn(
            "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
            isMoreMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMoreMenuOpen(false)}
        />

        {/* Menú "Más" - Drawer desde abajo */}
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 max-h-[80vh] overflow-y-auto",
            isMoreMenuOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          {/* Header del drawer */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
            <button
              onClick={() => setIsMoreMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contenido del drawer */}
          <div className="px-2 py-4">
            {/* Volver al inicio */}
            <div className="space-y-1 mb-4">
              <Link
                href="/"
                className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMoreMenuOpen(false)}
              >
                <House className="h-5 w-5 mr-3" />
                <span className="font-medium">Volver al Inicio</span>
              </Link>
            </div>
                        <div className="space-y-1 mb-4">
              <Link
                href="/"
                className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMoreMenuOpen(false)}
              >
                <ArrowBigLeft className="h-5 w-5 mr-3" />
                <span className="font-medium">Cerrar Sesion</span>
              </Link>
            </div>

            {/* Separador */}
            <div className="my-4 border-t border-gray-200" />

            {/* Cerrar sesión */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>

          {/* Espaciador para el bottom bar */}
          <div className="h-4" />
        </div>
      </div>
    </>
  )
}