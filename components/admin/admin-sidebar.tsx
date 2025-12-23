"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Users,
  BookOpen,
  DollarSign,
  Settings,
  LogOut,
  Home,
  BarChart2,
  User,
  ChevronDown,
  Calendar,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarLinkProps {
  href: string
  icon: React.ElementType
  children: React.ReactNode
  isActive?: boolean
}

const SidebarLink = ({ href, icon: Icon, children, isActive }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-6 py-3 text-gray-600 hover:bg-[#F6F4F1] hover:text-[#305891] transition-colors",
        isActive && "text-[#305891] bg-[#F6F4F1]",
      )}
    >
      <Icon className="h-5 w-5 mr-3" />
      <span>{children}</span>
    </Link>
  )
}

export function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem("isLogged")
    localStorage.removeItem("userRole")

    // Redirigir a la página principal
    window.location.href = "/"
  }

  return (
    <div className="w-64 bg-white shadow-md h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-[#305891]">Prana OM</h1>
        <p className="text-sm text-gray-500">Panel de Administración</p>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Principal</div>
        <SidebarLink href="/admin/dashboard" icon={Home} isActive={pathname === "/admin/dashboard"}>
          Panel principal
        </SidebarLink>
        <SidebarLink href="/admin/profesores" icon={Users} isActive={pathname === "/admin/profesores"}>
          Profesores
        </SidebarLink>
        <SidebarLink href="/admin/estudiantes" icon={User} isActive={pathname === "/admin/estudiantes"}>
          Estudiantes
        </SidebarLink>
        <SidebarLink href="/admin/semana-clases" icon={Calendar} isActive={pathname === "/admin/semana-clases"}>
          Semana de Clases
        </SidebarLink>
        <SidebarLink href="/admin/workshops" icon={BookOpen} isActive={pathname === "/admin/workshops"}>
          Workshops
        </SidebarLink>
        <SidebarLink href="/admin/pagos" icon={DollarSign} isActive={pathname === "/admin/pagos"}>
          Pagos y facturación
        </SidebarLink>
        <SidebarLink href="/admin/reportes" icon={BarChart2} isActive={pathname === "/admin/reportes"}>
          Reportes
        </SidebarLink>
        <SidebarLink href="/admin/faq" icon={HelpCircle} isActive={pathname === "/admin/faq"}>
          FAQ
        </SidebarLink>

        <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase">Configuración</div>
        <SidebarLink href="/admin/configuracion" icon={Settings} isActive={pathname === "/admin/configuracion"}>
          Configuración
        </SidebarLink>
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-[#F6F4F1] hover:text-[#305891] w-full text-left transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Cerrar sesión</span>
        </button>
      </nav>
    </div>
  )
}
