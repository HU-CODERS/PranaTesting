"use client"

import { SetStateAction, useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { HorarioTabla } from "@/components/admin/semana-clases/horario-tabla"
import { NuevaClaseModal } from "@/components/admin/semana-clases/nueva-clase-modal"
import { DetallesClasesModal } from "@/components/admin/semana-clases/detalles-clases-modal"
import { Clase } from "@/app/types/clase"

export default function SemanaClasesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetallesModalOpen, setIsDetallesModalOpen] = useState(false)
  const [selectedHoraDia, setSelectedHoraDia] = useState<{ hora: string; dia: string } | null>(null)
  const [selectedClase, setSelectedClase] = useState<Clase | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [clases, setClases] = useState<Clase[]>([])
  const [loading, setLoading] = useState(true)

  function obtenerNombreProfesor(teacher: any): string {
    if (!teacher) return "Sin datos"
    if (teacher.role === "profe") {
      return `${teacher.teacherProfile?.name || "Sin nombre"} ${teacher.teacherProfile?.lastname || ""}`.trim()
    }
    return `${teacher.adminProfile?.name || "Sin nombre"} ${teacher.adminProfile?.lastname || ""}`.trim()
  }

  const fetchClases = async () => {
    try {
      setLoading(true)
      const res = await fetch("https://pranabackend.onrender.com/api/classes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      
      if (!res.ok) {
        throw new Error('Error al obtener las clases')
      }
      
      const data = await res.json()

      const clasesFormateadas: Clase[] = data.map((clase: any) => ({
        id: clase._id,
        titulo: clase.title,
        tipo: clase.type,
        dia: clase.day,
        hora: clase.hour,
        profesor: obtenerNombreProfesor(clase.teacher),
        duracion: clase.duration,
        capacidad: clase.maxParticipants,
        precio: clase.price,
        incluye: clase.whatInclude,
        detalles: clase.description,
        participants: clase.participants || [],
        teacher: clase.teacher,
        fechaInicio: undefined,
        fechaFin: undefined,
      }))

      setClases(clasesFormateadas)
    } catch (err) {
      console.error("Error al obtener clases:", err)
      toast.error("Error al cargar las clases")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClases()
  }, [])

  const handleAddClase = (nuevaClase: any) => {
    fetchClases()
    setIsModalOpen(false)
    setIsEditMode(false)
    setSelectedClase(null)
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

  const handleDeleteClase = async (claseId: string | number) => {
    try {
      // Eliminar la clase del estado local inmediatamente para UX
      const nuevasClases = clases.filter((clase) => clase.id.toString() !== claseId.toString())
      setClases(nuevasClases)

      // Verificar si después de eliminar, aún hay clases en el horario seleccionado
      if (selectedHoraDia) {
        const clasesRestantes = nuevasClases.filter(
          (clase) => clase.hora === selectedHoraDia.hora && clase.dia === selectedHoraDia.dia,
        )

        // Si no quedan clases en ese horario, cerrar el modal
        if (clasesRestantes.length === 0) {
          setIsDetallesModalOpen(false)
          setSelectedHoraDia(null)
        }
      } else {
        // Si estamos viendo una clase individual, cerrar el modal
        setIsDetallesModalOpen(false)
        setSelectedClase(null)
      }

      // Refetch después de un delay para asegurar consistencia de datos
      setTimeout(() => {
        fetchClases()
      }, 3500)

    } catch (err) {
      console.error("Error al manejar eliminación:", err)
      toast.error("Error al eliminar la clase")
      fetchClases()
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

  const handleCloseModalAndRefresh = () => {
    handleCloseModal()
    setTimeout(() => {
      fetchClases()
    }, 300)
  }

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Organizá la semana de Prana OM</h1>
            <p className="text-gray-600">Arma clases permanentes para los diferentes días y horarios</p>
          </div>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#305891] mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando clases...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Organizá la semana de Prana OM</h1>
          <p className="text-gray-600">Arma clases permanentes para los diferentes días y horarios</p>
        </div>
        <Button
          className="mt-4 md:mt-0 bg-[#305891] text-white hover:bg-[#4070b0]"
          onClick={() => {
            setSelectedClase(null)
            setIsEditMode(false)
            setIsModalOpen(true)
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Nueva Clase
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        <HorarioTabla clases={clases} onVerDetalles={handleVerDetalles} onVerDetallesClase={handleVerDetallesClase} />
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
          onClose={handleCloseModalAndRefresh}
          clases={selectedHoraDia ? getClasesByHoraDia(selectedHoraDia.hora, selectedHoraDia.dia) : [selectedClase]}
          onEdit={handleEditClase}
          onDelete={handleDeleteClase}
        />
      )}
    </div>
  )
}