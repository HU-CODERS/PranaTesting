"use client"

import { useState, useEffect } from "react"
import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  BookOpen,
  Calendar,
  LogOut,
  User,
  Users,
  X,
  HelpCircle,
  Package,
  MoreHorizontal,
  ClipboardList,
  Sidebar,
  TimerIcon,
  Videotape,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarLinkProps {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

const SidebarLink = ({ href, icon: Icon, children, isActive, onClick }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex items-center px-3 py-2.5 mx-2 rounded-lg transition-all duration-300 group",
        isActive
          ? "bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white shadow-md shadow-[#5862f0]/30"
          : "text-gray-600 hover:bg-gradient-to-r hover:from-[#5862f0]/10 hover:to-[#7d86ff]/10 hover:text-[#5862f0]",
      )}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
      )}
      <Icon className={cn("h-5 w-5 mr-2.5 relative z-10", isActive && "drop-shadow-sm")} />
      <span className="relative z-10 font-medium text-sm">{children}</span>
      {isActive && (
        <div className="ml-auto relative z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>
      )}
    </Link>
  )
}

interface BottomNavItemProps {
  href: string
  icon: React.ElementType
  label: string
  isActive?: boolean
  onClick?: () => void
}

const BottomNavItem = ({ href, icon: Icon, label, isActive, onClick }: BottomNavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-3 text-xs font-medium transition-colors",
        isActive ? "text-[#5862f0]" : "text-gray-600 hover:text-[#5862f0]"
      )}
      onClick={onClick}
    >
      <Icon className={cn("h-6 w-6 mb-1", isActive && "fill-current")} />
      <span>{label}</span>
    </Link>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)

  useEffect(() => {
    setIsMoreMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("isLogged")
    localStorage.removeItem("userRole")
    window.location.href = "/"
  }

  const mainNavItems = [
    { href: "/admin/dashboard", icon: ClipboardList, label: "Registros" },
    { href: "/admin/semana-clases", icon: Calendar, label: "Clases" },
    { href: "/admin/profesores", icon: Users, label: "Profesores" },
    { href: "/admin/mi-perfil", icon: User, label: "Perfil" },
  ]

  const secondaryNavItems = [
    { href: "/admin/estudiantes", icon: User, label: "Estudiantes" },
    { href: "/admin/workshops", icon: BookOpen, label: "Workshops" },
    { href: "/admin/membresias", icon: Package, label: "Membresías" },
    { href: "/admin/schedule", icon: TimerIcon, label: "Horarios" },
    { href: "/admin/ondemand", icon: Videotape, label: "On Demand" },
    { href: "/admin/faq", icon: HelpCircle, label: "FAQ" },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="h-screen w-60 bg-gradient-to-b from-white via-gray-50 to-white shadow-xl flex-col hidden lg:flex border-r border-gray-200 fixed top-0 left-0 z-40">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#5862f0] to-[#656ef1]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 flex items-center justify-center">
              <Image src="/logos/logo-3.png" alt="Logo" width={36} height={36} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Prana OM</h1>
              <p className="text-xs text-white/80">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto py-4 px-1">
          <div className="px-3 mb-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Principal</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <div className="space-y-0.5 mb-3">
            <SidebarLink
              href="/admin/dashboard"
              icon={ClipboardList}
              isActive={pathname === "/admin/dashboard"}
            >
              Registros
            </SidebarLink>
            <SidebarLink
              href="/admin/profesores"
              icon={Users}
              isActive={pathname === "/admin/profesores"}
            >
              Profesores
            </SidebarLink>
            <SidebarLink
              href="/admin/estudiantes"
              icon={User}
              isActive={pathname === "/admin/estudiantes"}
            >
              Estudiantes
            </SidebarLink>
            <SidebarLink
              href="/admin/semana-clases"
              icon={Calendar}
              isActive={pathname === "/admin/semana-clases"}
            >
              Semana de Clases
            </SidebarLink>
          </div>

          <div className="px-3 my-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Gestión</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <div className="space-y-0.5 mb-3">
            <SidebarLink
              href="/admin/workshops"
              icon={BookOpen}
              isActive={pathname === "/admin/workshops"}
            >
              Workshops
            </SidebarLink>
            <SidebarLink
              href="/admin/ondemand"
              icon={Videotape}
              isActive={pathname === "/admin/ondemand"}
            >
              On Demand
            </SidebarLink>
            <SidebarLink
              href="/admin/membresias"
              icon={Package}
              isActive={pathname === "/admin/membresias"}
            >
              Membresías
            </SidebarLink>
            <SidebarLink
              href="/admin/schedule"
              icon={TimerIcon}
              isActive={pathname === "/admin/schedule"}
            >
              Horarios
            </SidebarLink>
            <SidebarLink
              href="/admin/faq"
              icon={HelpCircle}
              isActive={pathname === "/admin/faq"}
            >
              FAQ
            </SidebarLink>
          </div>

          <div className="px-3 my-3 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Personal</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          </div>

          <div className="space-y-0.5">
            <SidebarLink
              href="/admin/mi-perfil"
              icon={User}
              isActive={pathname === "/admin/mi-perfil"}
            >
              Mi Perfil
            </SidebarLink>
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300 group"
          >
            <LogOut className="h-5 w-5 mr-2.5 group-hover:rotate-12 transition-transform" />
            <span className="font-medium text-sm">Cerrar sesión</span>
          </button>
        </div>
      </aside >

      {/* Mobile Bottom Bar */}
      < div className="lg:hidden" >
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
          <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
            {mainNavItems.map((item) => (
              <BottomNavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={pathname === item.href}
              />
            ))}

            <button
              onClick={() => setIsMoreMenuOpen(true)}
              className="flex flex-col items-center justify-center py-2 px-3 text-xs font-medium text-gray-600 hover:text-[#5862f0] transition-colors"
            >
              <MoreHorizontal className="h-6 w-6 mb-1" />
              <span>Más</span>
            </button>
          </div>
        </nav>

        <div
          className={cn(
            "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
            isMoreMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMoreMenuOpen(false)}
        />

        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 max-h-[80vh] overflow-y-auto",
            isMoreMenuOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
            <button
              onClick={() => setIsMoreMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="px-2 py-4">
            <div className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-[#F6F4F1] text-[#5862f0]"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setIsMoreMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            <div className="my-4 border-t border-gray-200" />

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Cerrar sesión</span>
            </button>
          </div>

          <div className="h-4" />
        </div>
      </div >
    </>
  )
}