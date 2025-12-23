"use client"

import { useState, useEffect } from "react"
import { MoreHorizontal, Edit, Trash, Eye, AlertTriangle, AlertCircle, ChevronLeft, ChevronRight, Users, Crown, UserPlus } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EstudianteModal } from "./estudiante-modal"
import { SancionModal } from "./sancion-modal"
import { UnBanModal } from "./unban-modal"
import { ConfirmarEliminacionEstudianteModal } from "./confirmar-eliminacion-estudiante-modal"

const API_URL = "https://pranabackend.onrender.com/api/students"

type FilterType = "todos" | "clientes" | "registrados"

interface EstudiantesTableProps {
  searchQuery?: string
  onEdit?: (estudiante: any) => void
  onSancion?: (estudiante: any) => void
  estudiantes?: any[]
}

export function EstudiantesTable({
  searchQuery = "",
  onEdit,
  onSancion
}: EstudiantesTableProps) {
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState<FilterType>("todos")
  const itemsPerPage = 10

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error("Error al obtener estudiantes")
        const data = await res.json()
        setEstudiantes(data)
      } catch (err) {
        console.error("Error cargando estudiantes:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEstudiantes()
  }, [])

  // Reset página cuando cambia la búsqueda o el filtro
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeFilter])

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isSancionModalOpen, setIsSancionModalOpen] = useState(false)
  const [isUnBanModalOpen, setIsUnBanModalOpen] = useState(false)
  const [selectedEstudiante, setSelectedEstudiante] = useState<any>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Función para determinar si un estudiante es cliente (tiene membresía de pago)
  const esCliente = (estudiante: any) => {
    const membershipTitle = estudiante?.membership?.title?.toLowerCase() || 'free'
    return membershipTitle !== 'free' && membershipTitle !== 'gratis'
  }

  // Filtrar estudiantes por búsqueda
  const searchFiltered = estudiantes?.filter(
    (estudiante) =>
      estudiante.nameAndLastname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (estudiante.email && estudiante.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Filtrar por tipo (clientes/registrados)
  const typeFiltered = searchFiltered?.filter((estudiante) => {
    if (activeFilter === "clientes") return esCliente(estudiante)
    if (activeFilter === "registrados") return !esCliente(estudiante)
    return true // "todos"
  })

  // Calcular contadores
  const totalEstudiantes = estudiantes.length
  const totalClientes = estudiantes.filter(esCliente).length
  const totalRegistrados = totalEstudiantes - totalClientes

  // Calcular paginación
  const totalItems = typeFiltered?.length || 0
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEstudiantes = typeFiltered?.slice(startIndex, endIndex) || []

  // Funciones de paginación
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handleEdit = (estudiante: any) => {
    if (onEdit) {
      onEdit(estudiante)
      return
    }
    setSelectedEstudiante(estudiante)
    setIsEditModalOpen(true)
  }

  const handleView = (estudiante: any) => {
    setSelectedEstudiante(estudiante)
    setIsViewModalOpen(true)
  }

  const handleSancion = (estudiante: any) => {
    if (onSancion) {
      onSancion(estudiante)
      return
    }
    setSelectedEstudiante(estudiante)
    setIsSancionModalOpen(true)
  }

  const handleDesban = (estudiante: any) => {
    if (onSancion) {
      onSancion(estudiante)
      return
    }
    setSelectedEstudiante(estudiante)
    setIsUnBanModalOpen(true)
  }

  const handleDelete = (estudiante: any) => {
    setSelectedEstudiante(estudiante)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedEstudiante?._id) return

    try {
      const res = await fetch("https://pranabackend.onrender.com/api/students/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedEstudiante._id }),
      })
      window.location.reload()
      if (!res.ok) throw new Error("Error al eliminar el estudiante")

    } catch (error) {
      console.error("Fallo al eliminar estudiante:", error)
      alert("Hubo un error al eliminar el estudiante.")
    }
  }

  // Componente de paginación
  const PaginationControls = () => {
    if (totalPages <= 1) return null

    const getVisiblePageNumbers = () => {
      const delta = 2
      const left = currentPage - delta
      const right = currentPage + delta + 1
      const pages: number[] = []

      for (let i = Math.max(2, left); i < Math.min(totalPages, right); i++) {
        pages.push(i)
      }

      if (left > 2) {
        pages.unshift(-1)
      }
      pages.unshift(1)

      if (right < totalPages) {
        pages.push(-1)
      }
      if (totalPages > 1) {
        pages.push(totalPages)
      }

      return pages.filter((page, index, arr) => arr.indexOf(page) === index)
    }

    return (
      <div className="flex items-center justify-between px-2 py-4">
        <div className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1} a {Math.min(endIndex, totalItems)} de {totalItems} estudiantes
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex items-center space-x-1">
            {getVisiblePageNumbers().map((page, index) => {
              if (page === -1) {
                return (
                  <span key={`ellipsis-${index}`} className="px-2 py-1 text-muted-foreground">
                    ...
                  </span>
                )
              }

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className="w-10 h-8"
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1"
          >
            Siguiente
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {/* Filtros tipo tabs */}
        <div className="flex items-center gap-3 pb-4 border-b">
          <button
            onClick={() => setActiveFilter("todos")}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm
              ${activeFilter === "todos"
                ? 'bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <Users className="h-4 w-4" />
            Todos los Estudiantes
            <Badge variant="secondary" className="ml-1 bg-white/20 text-current border-0">
              {totalEstudiantes}
            </Badge>
          </button>

          <button
            onClick={() => setActiveFilter("clientes")}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm
              ${activeFilter === "clientes"
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <Crown className="h-4 w-4" />
            Estudiantes con Abono
            <Badge variant="secondary" className="ml-1 bg-white/20 text-current border-0">
              {totalClientes}
            </Badge>
          </button>

          <button
            onClick={() => setActiveFilter("registrados")}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm
              ${activeFilter === "registrados"
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <UserPlus className="h-4 w-4" />
            Estudiantes sin Abono
            <Badge variant="secondary" className="ml-1 bg-white/20 text-current border-0">
              {totalRegistrados}
            </Badge>
          </button>
        </div>

        {/* Tabla */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Membresía</TableHead>
                <TableHead className="hidden md:table-cell">Estado</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>Cargando estudiantes...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : currentEstudiantes?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {searchQuery ? 
                      `No se encontraron estudiantes que coincidan con "${searchQuery}"` : 
                      activeFilter === "clientes" ?
                        "No hay clientes con membresía activa" :
                        activeFilter === "registrados" ?
                          "No hay usuarios registrados sin membresía" :
                          "No se encontraron estudiantes"
                    }
                  </TableCell>
                </TableRow>
              ) : (
                currentEstudiantes.map((estudiante) => (
                  <TableRow key={estudiante._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {esCliente(estudiante) && (
                          <><Crown className="h-4 w-4 text-yellow-500" /><span className="sr-only">Cliente</span></>
                        )}
                        {estudiante.nameAndLastname || '-'}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{estudiante.email || '-'}</TableCell>
                    <TableCell>
                      <div>
                        <Badge
                          variant={esCliente(estudiante) ? "default" : "outline"}
                          className={esCliente(estudiante) ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                        >
                          {estudiante?.membership?.title || 'Free'}
                        </Badge>
                        {esCliente(estudiante) && estudiante?.membership?.buyDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            Último pago:{" "}
                            {new Date(estudiante?.membership?.buyDate).toLocaleDateString("es-AR")}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          estudiante.status === "active"
                            ? "default"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {estudiante.status || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {estudiante.tel ? (
                        <a
                          href={`https://wa.me/${estudiante.tel}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {estudiante.tel}
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="dropdown-menu-content">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="dropdown-menu-item" onClick={() => handleView(estudiante)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem className="dropdown-menu-item" onClick={() => handleEdit(estudiante)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="dropdown-menu-item text-red-600"
                            onClick={() => handleDelete(estudiante)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Controles de paginación */}
        <PaginationControls />
      </div>

      {selectedEstudiante && (
        <>
          <EstudianteModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            estudiante={selectedEstudiante}
            mode="edit"
          />
          <EstudianteModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            estudiante={selectedEstudiante}
            mode="view"
          />
          <SancionModal
            isOpen={isSancionModalOpen}
            onClose={() => setIsSancionModalOpen(false)}
            estudiante={selectedEstudiante}
          />
           <UnBanModal
            isOpen={isUnBanModalOpen}
            onClose={() => setIsUnBanModalOpen(false)}
            estudiante={selectedEstudiante}
          />
          <ConfirmarEliminacionEstudianteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            estudiante={selectedEstudiante}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </>
  )
}