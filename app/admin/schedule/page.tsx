"use client"

import { useState, useEffect } from "react"
import { DayColumn } from "@/components/admin/schedule/DayColumn"
import { ScheduleFormModal } from "@/components/admin/schedule/ScheduleFormModal"
import { EditScheduleForm } from "@/components/admin/schedule/EditScheduleForm"
import { DeleteConfirmDialog } from "@/components/admin/schedule/DeleteConfirmDialog"
import { Calendar, Clock, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Teacher {
  _id: string
  name: string
  email: string
  teacherProfile: any
}

interface Schedule {
  _id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  classTypeName: string
  teacherIds: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const DAYS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
]

export default function SemanaClasesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(null)
  const [showInactive, setShowInactive] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [schedulesRes, teachersRes] = await Promise.all([
        fetch("https://pranabackend.onrender.com/api/schedules"),
        fetch("https://pranabackend.onrender.com/api/teachers")
      ])

      if (!schedulesRes.ok || !teachersRes.ok) throw new Error("Error al cargar datos")

      const schedulesData = await schedulesRes.json()
      const teachersData = await teachersRes.json()

      setSchedules(schedulesData)
      setTeachers(teachersData)
    } catch (err) {
      console.error("Error al cargar:", err)
      alert("Error al cargar los datos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAdd = () => {
    setSelectedSchedule(null)
    setIsFormOpen(true)
  }

  const handleEdit = (schedule: Schedule) => {
    setSelectedSchedule(schedule)
    setIsEditFormOpen(true)
  }

  const handleDelete = (schedule: Schedule) => {
    setScheduleToDelete(schedule)
    setIsDeleteDialogOpen(true)
  }

  const handleToggle = async (scheduleId: string, currentState: boolean) => {
    try {
      const schedule = schedules.find(s => s._id === scheduleId)
      if (!schedule) return

      const res = await fetch(`https://pranabackend.onrender.com/api/schedules/${scheduleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...schedule, isActive: !currentState })
      })

      if (!res.ok) throw new Error("Error al actualizar")

      const updated = await res.json()
      setSchedules(schedules.map(s => s._id === scheduleId ? updated : s))
    } catch (err) {
      console.error("Error:", err)
      alert("Error al actualizar el horario")
    }
  }

  const handleCreateSubmit = async (formData: any) => {
    try {
      const res = await fetch("https://pranabackend.onrender.com/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error("Error al crear")

      const newSchedule = await res.json()
      setSchedules([...schedules, newSchedule])
      setIsFormOpen(false)
    } catch (err) {
      console.error("Error:", err)
      alert("Error al crear el horario")
    }
  }

  const handleEditSubmit = async (scheduleId: string, formData: any) => {
    try {
      const res = await fetch(`https://pranabackend.onrender.com/api/schedules/${scheduleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error("Error al actualizar")

      const updated = await res.json()
      setSchedules(schedules.map(s => s._id === scheduleId ? updated : s))
      setIsEditFormOpen(false)
      setSelectedSchedule(null)
    } catch (err) {
      console.error("Error:", err)
      alert("Error al actualizar el horario")
    }
  }

  const handleConfirmDelete = async () => {
    if (!scheduleToDelete) return

    try {
      const res = await fetch(`https://pranabackend.onrender.com/api/schedules/${scheduleToDelete._id}`, {
        method: "DELETE"
      })

      if (!res.ok) throw new Error("Error al eliminar")

      setSchedules(schedules.filter(s => s._id !== scheduleToDelete._id))
      setIsDeleteDialogOpen(false)
      setScheduleToDelete(null)
    } catch (err) {
      console.error("Error:", err)
      alert("Error al eliminar el horario")
    }
  }

  const getSchedulesByDay = (dayOfWeek: number) => {
    const filtered = schedules.filter(s => s.dayOfWeek === dayOfWeek)
    return showInactive ? filtered : filtered.filter(s => s.isActive)
  }

  const totalClasses = schedules.length
  const activeClasses = schedules.filter(s => s.isActive).length
  const totalTeachers = new Set(schedules.flatMap(s => s.teacherIds)).size

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5862f0]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6 py-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">Gestión de Horarios</h1>
              <p className="text-white/90 mt-1 text-sm">Administra los horarios semanales de clases</p>
            </div>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-white text-[#6366f1] hover:bg-white/90 shadow-md font-semibold"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Añadir Horario
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Horarios</p>
                <p className="text-3xl font-bold text-gray-900">{totalClasses}</p>
              </div>
              <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#6366f1]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Horarios Activos</p>
                <p className="text-3xl font-bold text-gray-900">{activeClasses}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Profesores</p>
                <p className="text-3xl font-bold text-gray-900">{totalTeachers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-[#f8f9fa]">
        {/* Filtro */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setShowInactive(true)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors text-sm ${
                showInactive
                  ? "bg-[#6366f1] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Todos los Horarios
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  showInactive ? "bg-white/20" : "bg-gray-200"
                }`}
              >
                {totalClasses}
              </span>
            </button>
            <button
              onClick={() => setShowInactive(false)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors text-sm ${
                !showInactive
                  ? "bg-[#6366f1] text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Solo Activos
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  !showInactive ? "bg-white/20" : "bg-gray-200"
                }`}
              >
                {activeClasses}
              </span>
            </button>
          </div>
        </div>

        {/* Grid de días */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-20 lg:pb-6">
          {DAYS.map(day => (
            <DayColumn
              key={day.value}
              day={day.label}
              schedules={getSchedulesByDay(day.value)}
              teachers={teachers}
              onEdit={handleEdit}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Modales */}
      <ScheduleFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateSubmit}
        schedule={null}
        teachers={teachers}
      />

      <EditScheduleForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false)
          setSelectedSchedule(null)
        }}
        onSubmit={handleEditSubmit}
        schedule={selectedSchedule}
        teachers={teachers}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setScheduleToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
        schedule={scheduleToDelete}
      />
    </div>
  )
}
