"use client"

import { useState, useEffect } from "react"
import { Plus, Calendar, Users, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HorarioTabla } from "@/components/admin/semana-clases/horario-tabla"
import { NuevaClaseModal } from "@/components/admin/semana-clases/nueva-clase-modal"
import { DetallesClasesModal } from "@/components/admin/semana-clases/detalles-clases-modal"
import { Clase } from "@/app/types/clase"

function obtenerNombreProfesor(teacher: any): string {
  if (!teacher) return "Sin datos"
  if (teacher.role === "profe") {
    return `${teacher.teacherProfile?.name || "Sin nombre"} ${teacher.teacherProfile?.lastname || ""}`.trim()
  }
  return `${teacher.adminProfile?.name || "Sin nombre"} ${teacher.adminProfile?.lastname || ""}`.trim()
}

export default function SemanaClasesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetallesModalOpen, setIsDetallesModalOpen] = useState(false)
  const [selectedHoraDia, setSelectedHoraDia] = useState<{ hora: string; dia: string } | null>(null)
  const [selectedClase, setSelectedClase] = useState<Clase | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [clases, setClases] = useState<Clase[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalClases: 0,
    capacidadTotal: 0,
    profesoresActivos: 0,
    duracionPromedio: 0,
  })

  // 🆕 Extraer fetchClases como función separada
  const fetchClases = async () => {
    try {
      setLoading(true)
      const res = await fetch("https://pranabackend.onrender.com/api/classes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await res.json()

      const clasesFormateadas = data.map((clase: any) => ({
        id: clase._id,
        titulo: clase.title,
        tipo: clase.type,
        dia: clase.day,
        hora: clase.hour,
        profesor: obtenerNombreProfesor(clase.teacher),
        duracion: clase.duration,
        capacidad: clase.maxParticipants,
        modalidad: clase.modalidad || 'presencial', // Added with default value
        precio: clase.price,
        incluye: clase.whatInclude,
        detalles: clase.description,
        participants: clase.participants || [],
        oldParticipants: clase.oldParticipants || [],
        fechaInicio: undefined,
        fechaFin: undefined,
      }))

      setClases(clasesFormateadas)

      // Calcular estadísticas
      const profesoresUnicos = new Set(clasesFormateadas.map((c: Clase) => c.profesor)).size
      const capacidadTotal = clasesFormateadas.reduce((acc: number, c: Clase) => acc + c.capacidad, 0)
      const duracionPromedio = clasesFormateadas.length > 0
        ? Math.round(clasesFormateadas.reduce((acc: number, c: Clase) => acc + c.duracion, 0) / clasesFormateadas.length)
        : 0

      setStats({
        totalClases: clasesFormateadas.length,
        capacidadTotal,
        profesoresActivos: profesoresUnicos,
        duracionPromedio,
      })
    } catch (err) {
      console.error("Error al obtener clases:", err)
    } finally {
      setLoading(false)
    }
  }

  // Cargar clases al montar el componente
  useEffect(() => {
    fetchClases()
  }, [])

  // 🆕 Actualizado para refetch después de crear/editar
  const handleAddClase = async (nuevaClase: Clase) => {
    // Cerrar modal y resetear estados
    setIsModalOpen(false)
    setIsEditMode(false)
    setSelectedClase(null)
    
    // 🆕 Refetch de clases para obtener los datos actualizados del servidor
    await fetchClases()
  }

  const handleVerDetalles = (hora: string, dia: string) => {
    setSelectedHoraDia({ hora, dia })
    setSelectedClase(null)
    setIsDetallesModalOpen(true)
  }

  const handleVerDetallesClase = (clase: Clase) => {
    setSelectedClase(clase)
    setSelectedHoraDia(null)
    setIsDetallesModalOpen(true)
  }

  const handleEditClase = (clase: Clase) => {
    setSelectedClase(clase)
    setIsEditMode(true)
    setIsDetallesModalOpen(false)
    setIsModalOpen(true)
  }

  const handleDeleteClase = (claseId: number) => {
    setClases(clases.filter((clase) => clase.id !== claseId))

    if (selectedHoraDia) {
      const clasesRestantes = clases.filter(
        (clase) => clase.id !== claseId && clase.hora === selectedHoraDia.hora && clase.dia === selectedHoraDia.dia
      )

      if (clasesRestantes.length === 0) {
        setIsDetallesModalOpen(false)
        setSelectedHoraDia(null)
      }
    } else {
      setIsDetallesModalOpen(false)
      setSelectedClase(null)
    }
  }

  const getClasesByHoraDia = (hora: string, dia: string) => {
    return clases.filter((clase) => clase.hora === hora && clase.dia === dia)
  }

  const handleCloseModal = () => {
    setIsDetallesModalOpen(false)
    setSelectedHoraDia(null)
    setSelectedClase(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Calendar className="h-10 w-10" />
                Semana de Clases
              </h1>
              <p className="text-white/80 text-lg">
                Organiza el horario semanal de Prana OM
              </p>
            </div>
            <Button 
              onClick={() => {
                setSelectedClase(null)
                setIsEditMode(false)
                setIsModalOpen(true)
              }}
              className="bg-white text-[#5862f0] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Nueva Clase
            </Button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Clases */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Clases Semanales</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalClases}</p>
              </div>
              <div className="w-14 h-14 bg-[#5862f0]/10 rounded-full flex items-center justify-center">
                <Calendar className="h-7 w-7 text-[#5862f0]" />
              </div>
            </div>
          </div>

          {/* Capacidad Total */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Capacidad Total</p>
                <p className="text-3xl font-bold text-gray-900">{stats.capacidadTotal}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Profesores Activos */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Profesores Activos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.profesoresActivos}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </div>

          {/* Duración Promedio */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Duración Promedio</p>
                <p className="text-3xl font-bold text-gray-900">{stats.duracionPromedio}<span className="text-lg text-gray-500">min</span></p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-7 w-7 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5862f0]"></div>
            </div>
          ) : (
            <HorarioTabla 
              clases={clases} 
              onVerDetalles={handleVerDetalles} 
              onVerDetallesClase={handleVerDetallesClase} 
            />
          )}
        </div>
      </div>

      <NuevaClaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddClase={handleAddClase}
        initialData={selectedClase}
        isEdit={isEditMode}
      />

      {(selectedHoraDia || selectedClase) && (
        <DetallesClasesModal
          isOpen={isDetallesModalOpen}
          onClose={handleCloseModal}
          clases={selectedHoraDia ? getClasesByHoraDia(selectedHoraDia.hora, selectedHoraDia.dia) : [selectedClase]}
          onEdit={handleEditClase}
          onDelete={handleDeleteClase}
        />
      )}
    </div>
  )
}
