"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"

interface Teacher {
  teacherProfile: any
  _id: string
  name: string
  email: string
}

interface Schedule {
  _id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  classTypeName: string
  teacherIds: string[]
  isActive: boolean
}

interface ScheduleFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  schedule?: Schedule | null
  teachers: Teacher[]
}

const DAYS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
]

export function ScheduleFormModal({
  isOpen,
  onClose,
  onSubmit,
  schedule,
  teachers,
}: ScheduleFormModalProps) {
  const [formData, setFormData] = useState({
    dayOfWeek: 1,
    startTime: "",
    endTime: "",
    classTypeName: "",
    teacherIds: [] as string[],
    isActive: true,
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [timeError, setTimeError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (schedule) {
      setFormData({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        classTypeName: schedule.classTypeName,
        teacherIds: schedule.teacherIds || [],
        isActive: schedule.isActive,
      })
    } else {
      setFormData({
        dayOfWeek: 1,
        startTime: "",
        endTime: "",
        classTypeName: "",
        teacherIds: [],
        isActive: true,
      })
    }
    setTimeError("")
    setShowConfirmation(false)
  }, [schedule, isOpen])

  const validateTimes = (start: string, end: string) => {
    if (!start || !end) return true
    
    const [startHour, startMin] = start.split(':').map(Number)
    const [endHour, endMin] = end.split(':').map(Number)
    
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    
    if (endMinutes <= startMinutes) {
      setTimeError("La hora de finalización debe ser posterior a la hora de inicio")
      return false
    }
    
    setTimeError("")
    return true
  }

  const handleStartTimeChange = (value: string) => {
    setFormData({ ...formData, startTime: value })
    if (formData.endTime) {
      validateTimes(value, formData.endTime)
    }
  }

  const handleEndTimeChange = (value: string) => {
    setFormData({ ...formData, endTime: value })
    if (formData.startTime) {
      validateTimes(formData.startTime, value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateTimes(formData.startTime, formData.endTime)) {
      return
    }
    
    if (formData.teacherIds.length === 0) {
      setTimeError("Debes seleccionar al menos un profesor")
      return
    }
    
    setShowConfirmation(true)
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onSubmit(formData)
      setShowConfirmation(false)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTeacher = (teacherId: string) => {
    setFormData((prev) => ({
      ...prev,
      teacherIds: prev.teacherIds.includes(teacherId)
        ? prev.teacherIds.filter((id) => id !== teacherId)
        : [...prev.teacherIds, teacherId],
    }))
  }

  if (!isOpen) return null

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {schedule ? "¿Confirmar cambios?" : "¿Crear horario?"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {schedule 
                  ? "Se actualizará el horario con los nuevos datos"
                  : "Se creará un nuevo horario con los datos ingresados"
                }
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Clase:</span>
              <span className="font-semibold text-gray-900">{formData.classTypeName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Día:</span>
              <span className="font-semibold text-gray-900">
                {DAYS.find(d => d.value === formData.dayOfWeek)?.label}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Horario:</span>
              <span className="font-semibold text-gray-900">
                {formData.startTime} - {formData.endTime}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Profesores:</span>
              <span className="font-semibold text-gray-900">
                {teachers.filter(t => formData.teacherIds.includes(t._id))
                  .map(t => t.name).join(", ")}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 text-white"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                  {schedule ? "Guardando..." : "Creando..."}
                </>
              ) : (
                schedule ? "Confirmar cambios" : "Crear horario"
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">
            {schedule ? "Editar Horario" : "Nuevo Horario"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {!schedule && (
            <div>
              <Label htmlFor="classTypeName">Nombre de la clase</Label>
              <Input
                id="classTypeName"
                value={formData.classTypeName}
                onChange={(e) =>
                  setFormData({ ...formData, classTypeName: e.target.value })
                }
                placeholder="Ej: Hatha Suave"
                required
                className="mt-1.5"
              />
            </div>
          )}

          {schedule && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="isActive" className="text-sm font-medium">
                  Estado del horario
                </Label>
                <p className="text-xs text-gray-500 mt-0.5">
                  {formData.isActive ? 'Visible para estudiantes' : 'Oculto para estudiantes'}
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>
          )}

          <div>
            <Label htmlFor="dayOfWeek">Día de la semana</Label>
            <Select
              value={formData.dayOfWeek.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, dayOfWeek: parseInt(value) })
              }
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((day) => (
                  <SelectItem key={day.value} value={day.value.toString()}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Hora inicio</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="endTime">Hora fin</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
          </div>

          {timeError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-600">{timeError}</p>
            </div>
          )}

          <div>
            <Label className="mb-2 block">Profesores asignados</Label>
            <div className="border rounded-lg p-3 space-y-3 max-h-48 overflow-y-auto bg-gray-50">
              {teachers.map((teacher) => (
                <div key={teacher._id} className="flex items-center space-x-3">
                  <Checkbox
                    id={teacher._id}
                    checked={formData.teacherIds.includes(teacher._id)}
                    onCheckedChange={() => toggleTeacher(teacher._id)}
                  />
                  <label
                    htmlFor={teacher._id}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    Prof. {teacher.teacherProfile?.name || teacher.name || "Sin nombre"}
                  </label>
                </div>
              ))}
            </div>
            {formData.teacherIds.length === 0 && (
              <p className="text-xs text-red-500 mt-2">
                Debes seleccionar al menos un profesor
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={formData.teacherIds.length === 0 || !!timeError || isLoading}
              className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90"
            >
              {schedule ? "Guardar cambios" : "Crear horario"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}