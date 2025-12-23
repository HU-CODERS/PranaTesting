"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Search, Users, TrendingUp, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EstudiantesTable } from "@/components/admin/estudiantes/estudiantes-table"
import { EstudianteModal } from "@/components/admin/estudiantes/estudiante-modal"

export default function EstudiantesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEstudiante, setSelectedEstudiante] = useState<any>(null)
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view")
  const API_URL = "https://pranabackend.onrender.com/api/students"
  const [estudiantes, setEstudiantes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    nuevosEsteMes: 0,
  })

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error("Error al obtener estudiantes")
        const data = await res.json()
        setEstudiantes(data)
        
        // Calcular estadísticas
        const activos = data.filter((e: any) => e.verified).length
        setStats({
          total: data.length,
          activos,
          nuevosEsteMes: 0, // Calcular según fecha de creación
        })
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEstudiantes()
  }, [])

  const handleOpenModal = (estudiante: any = null, mode: "view" | "edit" | "create" = "view") => {
    setSelectedEstudiante(estudiante)
    setModalMode(mode)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEstudiante(null)
  }

  const handleAddEstudiante = () => {
    handleOpenModal(null, "create")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Users className="h-10 w-10" />
                Gestión de Estudiantes
              </h1>
              <p className="text-white/80 text-lg">
                Administra la comunidad de alumnos de Prana OM
              </p>
            </div>
            <Button 
              onClick={handleAddEstudiante}
              className="bg-white text-[#5862f0] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Añadir Estudiante
            </Button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Estudiantes */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Estudiantes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-14 h-14 bg-[#5862f0]/10 rounded-full flex items-center justify-center">
                <Users className="h-7 w-7 text-[#5862f0]" />
              </div>
            </div>
          </div>

          {/* Estudiantes Activos */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Activos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activos}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </div>

          {/* Nuevos este mes */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Nuevos Este Mes</p>
                <p className="text-3xl font-bold text-gray-900">{stats.nuevosEsteMes}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          {/* Barra de búsqueda */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar por nombre de estudiante..."
                className="pl-12 h-12 border-2 border-gray-200 focus:border-[#5862f0] transition-colors rounded-lg text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Loading o Tabla/Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5862f0]"></div>
            </div>
          ) : (
            <EstudiantesTable
              estudiantes={estudiantes}
              searchQuery={searchQuery}
              onEdit={(estudiante) => handleOpenModal(estudiante, "edit")}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      <EstudianteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        estudiante={selectedEstudiante}
        mode={modalMode}
      />
    </div>
  )
}