"use client"

import { useEffect, useState } from "react"
import { Plus, Award, MapPin, Globe, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WorkshopCard } from "@/components/admin/workshops/workshop-card"
import { NuevoWorkshopModal } from "@/components/admin/workshops/nuevo-workshop-modal"
import { WorkshopModal } from "@/components/admin/workshops/workshop-modal"
import { ConfirmarEliminacionWorkshopModal } from "@/components/admin/workshops/confirmar-eliminacion-workshop-modal"

export default function WorkshopsPage() {
  const [isNewWorkshopModalOpen, setIsNewWorkshopModalOpen] = useState(false)
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false)
  const [currentWorkshop, setCurrentWorkshop] = useState<any | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [workshopToDelete, setWorkshopToDelete] = useState<any | null>(null)
  const [workshops, setWorkshops] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    presenciales: 0,
    online: 0,
  })

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await fetch("https://pranabackend.onrender.com/api/workshops")
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        
        // Mapear los datos al formato que espera WorkshopCard
        const mappedWorkshops = data.map((w: any) => {
          // Calcular duración en minutos desde hourStart y hourEnd
          const duracion = w.hourEnd && w.hourStart 
            ? (new Date(`1970-01-01T${w.hourEnd}`).getTime() - new Date(`1970-01-01T${w.hourStart}`).getTime()) / 60000
            : 0

          return {
            _id: w._id,
            titulo: w.title,
            fecha: w.day,
            hora: w.hourStart,
            horaFin: w.hourEnd,
            precio: w.price,
            descripcion: w.description,
            modalidad: w.modality,
            capacidad: w.maxParticipants,
            inscritos: w.participants?.length || 0,
            duracion: duracion,
            ubicacion: w.modality === "presencial" ? "Prana OM Studio" : "Plataforma Online",
            imagenes: w.images || [],
            whatInclude: w.whatInclude,
            extra_details: w.extra_details,
            createdAt: w.createdAt,
            updatedAt: w.updatedAt
          }
        })
        
        setWorkshops(mappedWorkshops)
        
        // Calcular estadísticas
        const presenciales = data.filter((w: any) => w.modality === "presencial").length
        const online = data.filter((w: any) => w.modality === "online").length
        setStats({
          total: data.length,
          presenciales,
          online,
        })
      } catch (err) {
        console.error("Error al obtener workshops:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  const handleOpenNewWorkshopModal = () => {
    setIsNewWorkshopModalOpen(true)
  }

  const handleCloseNewWorkshopModal = () => {
    setIsNewWorkshopModalOpen(false)
  }

  const handleViewWorkshop = (workshop: any) => {
    setCurrentWorkshop(workshop)
    setIsEditMode(false)
    setIsWorkshopModalOpen(true)
  }

  const handleCloseWorkshopModal = () => {
    setIsWorkshopModalOpen(false)
    setCurrentWorkshop(null)
    setIsEditMode(false)
  }

  const handleDeleteWorkshop = (workshop: any) => {
    setWorkshopToDelete(workshop)
    setIsDeleteModalOpen(true)
    setIsWorkshopModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (workshopToDelete) {
      try {
        const res = await fetch(`https://pranabackend.onrender.com/api/workshops/${workshopToDelete._id}`, {
          method: "DELETE"
        })
        
        if (res.ok) {
          // Actualizar lista de workshops
          setWorkshops(workshops.filter(w => w._id !== workshopToDelete._id))
          setWorkshopToDelete(null)
          setIsDeleteModalOpen(false)
        }
      } catch (err) {
        console.error("Error al eliminar workshop:", err)
      }
    }
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setWorkshopToDelete(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Award className="h-10 w-10" />
                Gestión de Workshops
              </h1>
              <p className="text-white/80 text-lg">
                Administra los workshops y eventos especiales de Prana OM
              </p>
            </div>
            <Button 
              onClick={handleOpenNewWorkshopModal}
              className="bg-white text-[#5862f0] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Añadir Workshop
            </Button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Workshops */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Workshops</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-14 h-14 bg-[#5862f0]/10 rounded-full flex items-center justify-center">
                <Award className="h-7 w-7 text-[#5862f0]" />
              </div>
            </div>
          </div>

          {/* Presenciales */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Presenciales</p>
                <p className="text-3xl font-bold text-gray-900">{stats.presenciales}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </div>

          {/* Online */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Online</p>
                <p className="text-3xl font-bold text-gray-900">{stats.online}</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <Globe className="h-7 w-7 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
          {/* Estado de carga */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5862f0] to-[#7d86ff] flex items-center justify-center mx-auto mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
                <p className="text-gray-600 font-medium">Cargando workshops...</p>
              </div>
            </div>
          )}

          {/* Estado vacío */}
          {!loading && workshops.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Award className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No hay workshops disponibles</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Comienza creando tu primer workshop o evento especial para tus estudiantes.
                </p>
                <Button 
                  onClick={handleOpenNewWorkshopModal}
                  className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl h-11"
                  size="default"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Crear primer workshop
                </Button>
              </div>
            </div>
          )}

          {/* Grid de workshops usando WorkshopCard */}
          {!loading && workshops.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((workshop) => (
                <WorkshopCard 
                  key={workshop._id}
                  workshop={workshop}
                  onView={handleViewWorkshop}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <NuevoWorkshopModal 
        isOpen={isNewWorkshopModalOpen} 
        onClose={handleCloseNewWorkshopModal} 
      />

      <WorkshopModal
        isOpen={isWorkshopModalOpen}
        onClose={handleCloseWorkshopModal}
        workshop={currentWorkshop}
        isEditMode={isEditMode}
        onEdit={(workshop: any) => {
          setCurrentWorkshop(workshop)
          setIsEditMode(true)
        }}
        onDelete={handleDeleteWorkshop}
      />

      <ConfirmarEliminacionWorkshopModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        workshop={workshopToDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}