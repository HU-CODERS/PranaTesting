"use client"

import { useEffect, useState } from "react"
import { Edit, Trash, Eye, DollarSign, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProfesorModal } from "./profesor-modal"
import { ConfirmarEliminacionProfesorModal } from "./confirmar-eliminacion-profesor-modal"
import { RegistrarPagoModal } from "./registrar-pago-modal"

interface ProfesoresTableProps {
  searchQuery?: string
  onEdit?: (profesor: any) => void
  onView?: (profesor: any) => void
}

export function ProfesoresTable({ searchQuery = "", onEdit, onView }: ProfesoresTableProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedProfesor, setSelectedProfesor] = useState<any>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isRegistrarPagoModalOpen, setIsRegistrarPagoModalOpen] = useState(false)
  const [profesoresData, setProfesoresData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchProfesores() {
      try {
        const res = await fetch("https://pranabackend.onrender.com/api/teachers")
        if (!res.ok) throw new Error("Error al obtener profesores")
        const data = await res.json()
        const profesoresFormateados = data.map((profe: any) => ({
          id: profe._id,
          nombre: `${profe.teacherProfile?.name || ""} ${profe.teacherProfile?.lastname || ""}`.trim() || "Sin nombre",
          valoracion: profe.rating || 0,
          estado: profe.verified ? "Activo" : "Inactivo",
          ...profe,
        }))
        setProfesoresData(profesoresFormateados)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfesores()
  }, [])

  // Filtrar profesores según la búsqueda
  const filteredProfesores = profesoresData.filter(
    (profesor) =>
      profesor.role === "profe" &&
      (profesor.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === "")
  )

  const handleEdit = (profesor: any) => {
    if (onEdit) {
      onEdit(profesor)
    } else {
      setSelectedProfesor(profesor)
      setIsEditModalOpen(true)
    }
  }

  const handleView = (profesor: any) => {
    if (onView) {
      onView(profesor)
    } else {
      setSelectedProfesor(profesor)
      setIsViewModalOpen(true)
    }
  }

  const handleDelete = (profesor: any) => {
    setSelectedProfesor(profesor)
    setIsDeleteModalOpen(true)
  }

  const handleRegistrarPago = (profesor: any) => {
    setSelectedProfesor(profesor)
    setIsRegistrarPagoModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch("https://pranabackend.onrender.com/api/teachers/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedProfesor.id }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Error al eliminar el profesor")
      }

      alert("Profesor eliminado correctamente")
      setProfesoresData((prev) => prev.filter((p) => p.id !== selectedProfesor.id))
      setIsDeleteModalOpen(false)
    } catch (err: any) {
      console.error(err)
      alert("Ocurrió un error al eliminar el profesor: " + err.message)
    }
  }

  // Función para obtener las iniciales del nombre
  const getInitials = (nombre: string) => {
    // Si el nombre está vacío o es undefined, retornar un placeholder
    if (!nombre || nombre.trim() === "") {
      return "?"
    }
    
    const names = nombre.trim().split(" ")
    if (names.length >= 2 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return nombre.substring(0, 2).toUpperCase()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5862f0]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  return (
    <>
      {filteredProfesores.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron profesores</h3>
          <p className="text-gray-500">
            {searchQuery ? "Intenta con otra búsqueda" : "Aún no hay profesores registrados"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfesores.map((profesor) => (
            <div
              key={profesor.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#5862f0] group"
            >
              {/* Header con gradiente */}
              <div className="bg-gradient-to-br from-[#5862f0] to-[#7d86ff] h-24 relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
                    <span className="text-2xl font-bold text-[#5862f0]">
                      {getInitials(profesor.nombre)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="pt-14 px-6 pb-6">
                {/* Nombre y Estado */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#5862f0] transition-colors">
                    {profesor.nombre && profesor.nombre.trim() !== "" ? profesor.nombre : "Sin nombre"}
                  </h3>
                  <Badge
                    variant={profesor.estado === "Activo" ? "default" : "secondary"}
                    className={
                      profesor.estado === "Activo"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }
                  >
                    {profesor.estado}
                  </Badge>
                </div>

                {/* Email si está disponible */}
                {profesor.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{profesor.email}</span>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="grid grid-cols-2 gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(profesor)}
                    className="w-full hover:bg-[#5862f0] hover:text-white transition-all duration-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(profesor)}
                    className="w-full hover:bg-[#5862f0] hover:text-white transition-all duration-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRegistrarPago(profesor)}
                    className="w-full hover:bg-green-600 hover:text-white transition-all duration-300"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Pago
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(profesor)}
                    className="w-full hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProfesor && (
        <>
          <ProfesorModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            profesorId={selectedProfesor}
            mode="edit"
          />
          <ProfesorModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            profesorId={selectedProfesor}
            mode="view"
          />
          <RegistrarPagoModal
            isOpen={isRegistrarPagoModalOpen}
            onClose={() => setIsRegistrarPagoModalOpen(false)}
            profesor={selectedProfesor}
            onPagoRegistrado={() => {
              setIsRegistrarPagoModalOpen(false)
            }}
          />
        </>
      )}
      <ConfirmarEliminacionProfesorModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        profesor={selectedProfesor}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
