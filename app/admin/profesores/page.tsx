"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Search, Users, GraduationCap, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfesoresTable } from "@/components/admin/profesores/profesores-table"
import { ProfesorModal } from "@/components/admin/profesores/profesor-modal"

export default function ProfesoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProfesor, setSelectedProfesor] = useState<any>(null)
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view")
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    valoracionPromedio: 0,
    clasesTotales: 0,
  })

  useEffect(() => {
    // Cargar estadísticas desde el backend
    const fetchStats = async () => {
      try {
        const res = await fetch("https://pranabackend.onrender.com/api/teachers")
        const data = await res.json()
        const profesores = data.filter((p: any) => p.role === "profe")
        
        const activos = profesores.filter((p: any) => p.verified).length
        const totalClases = profesores.reduce((acc: number, p: any) => acc + (p.myClasses?.length || 0), 0)
        const promedioValoracion = profesores.length > 0
          ? (profesores.reduce((acc: number, p: any) => acc + (p.rating || 0), 0) / profesores.length).toFixed(1)
          : 0

        setStats({
          total: profesores.length,
          activos,
          valoracionPromedio: Number(promedioValoracion),
          clasesTotales: totalClases,
        })
      } catch (error) {
        console.error("Error cargando estadísticas:", error)
      }
    }

    fetchStats()
  }, [])

  const handleOpenModal = (profesor: any = null, mode: "view" | "edit" | "create" = "view") => {
    setSelectedProfesor(profesor)
    setModalMode(mode)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProfesor(null)
  }

  const handleAddProfesor = () => {
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
                <GraduationCap className="h-10 w-10" />
                Gestión de Profesores
              </h1>
              <p className="text-white/80 text-lg">
                Administra el equipo docente de Prana OM
              </p>
            </div>
            <Button 
              onClick={handleAddProfesor}
              className="bg-white text-[#5862f0] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Añadir Profesor
            </Button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Profesores */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Total Profesores</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-14 h-14 bg-[#5862f0]/10 rounded-full flex items-center justify-center">
                <Users className="h-7 w-7 text-[#5862f0]" />
              </div>
            </div>
          </div>

          {/* Profesores Activos */}
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

          {/* Valoración Promedio */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-yellow-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Valoración Media</p>
                <p className="text-3xl font-bold text-gray-900 flex items-center gap-1">
                  {stats.valoracionPromedio}
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </p>
              </div>
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="h-7 w-7 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Total Clases */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Clases Totales</p>
                <p className="text-3xl font-bold text-gray-900">{stats.clasesTotales}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <GraduationCap className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          {/* Tabla/Grid de profesores */}
          <ProfesoresTable
            searchQuery={searchQuery}
            onEdit={(profesor: any) => handleOpenModal(profesor, "edit")}
            onView={(profesor: any) => handleOpenModal(profesor, "view")}
          />
        </div>
      </div>

      {/* Modal */}
      <ProfesorModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        profesorId={selectedProfesor} 
        mode={modalMode} 
      />
    </div>
  )
}