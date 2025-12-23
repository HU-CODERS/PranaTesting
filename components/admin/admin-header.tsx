"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Bell, MessageSquare, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export function AdminHeader() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  // Función para generar breadcrumbs basados en la ruta actual
  const generateBreadcrumbs = () => {
    if (!pathname) return []

    const segments = pathname.split("/").filter(Boolean)

    // Siempre incluir "Admin" como primer elemento
    const breadcrumbs = [{ label: "Admin", href: "/admin/dashboard" }]

    // Construir el resto de breadcrumbs basados en los segmentos de la URL
    let path = ""
    segments.forEach((segment, index) => {
      if (index === 0 && segment === "admin") return // Saltar el primer "admin"

      path += `/${segment}`
      const href = index === 0 ? `/admin/${segment}` : `/admin${path}`

      // Formatear el texto del breadcrumb (capitalizar primera letra)
      const label = segment.charAt(0).toUpperCase() + segment.slice(1)

      breadcrumbs.push({ label, href })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
              <a
                href={crumb.href}
                className={`${
                  index === breadcrumbs.length - 1 ? "font-medium text-[#305891]" : "text-gray-500 hover:text-[#305891]"
                }`}
              >
                {crumb.label}
              </a>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {/* Búsqueda global */}
        {searchOpen ? (
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar..."
              className="w-64 pr-8"
              autoFocus
              onBlur={() => setSearchOpen(false)}
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="text-gray-500 hover:text-[#305891]"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        {/* Notificaciones */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-[#305891]">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {[1, 2, 3].map((item) => (
                <DropdownMenuItem key={item} className="py-2 px-4 cursor-pointer">
                  <div>
                    <p className="font-medium text-sm">Nueva solicitud de registro</p>
                    <p className="text-xs text-gray-500">María López se ha registrado como estudiante</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 25 minutos</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center cursor-pointer">
              <span className="text-[#305891] text-sm">Ver todas las notificaciones</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mensajes */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-[#305891]">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Mensajes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              {[1, 2].map((item) => (
                <DropdownMenuItem key={item} className="py-2 px-4 cursor-pointer">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#305891] text-white flex items-center justify-center font-medium mr-3">
                      CL
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Carlos López</p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        Hola, tengo una consulta sobre la clase de mañana...
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Hace 10 minutos</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center cursor-pointer">
              <span className="text-[#305891] text-sm">Ver todos los mensajes</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Perfil de usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 hover:bg-transparent">
              <div className="w-8 h-8 rounded-full bg-[#305891] text-white flex items-center justify-center font-medium">
                AD
              </div>
              <span className="hidden md:inline text-sm">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
