"use client"

import { useState, useEffect } from "react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
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

interface EditScheduleFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (id: string, data: any) => Promise<void>
  schedule: Schedule | null
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

export function EditScheduleForm({
  isOpen,
  onClose,
  onSubmit,
  schedule,
  teachers,
}: EditScheduleFormProps) {
  const [formData, setFormData] = useState({
    dayOfWeek: 1,
    startTime: "",
    endTime: "",
    classTypeName: "",
    teacherIds: [] as string[],
    isActive: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeError, setTimeError] = useState("")

  useEffect(() => {
    if (schedule) {
      setFormData({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        classTypeName: schedule.classTypeName,
        teacherIds: schedule.teacherIds?.map((t: any) => t._id || t) || [],  // ✅ Extrae solo los IDs
        isActive: schedule.isActive,
      })
    }
  }, [schedule, isOpen])

  const validateTimes = (start: string, end: string) => {
    if (!start || !end) return true

    const [startHour, startMin] = start.split(':').map(Number)
    const [endHour, endMin] = end.split(':').map(Number)

    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin

    if (endMinutes <= startMinutes) {
      setTimeError("La hora de fin debe ser posterior a la hora de inicio")
      return false
    }

    setTimeError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!schedule) return

    if (!validateTimes(formData.startTime, formData.endTime)) {
      return
    }

    if (formData.teacherIds.length === 0) {
      setTimeError("Debes seleccionar al menos un profesor")
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(schedule._id, formData)
      handleClose()
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeError("")
  }

  const toggleTeacher = (teacherId: string) => {
    setFormData((prev) => ({
      ...prev,
      teacherIds: prev.teacherIds.includes(teacherId)
        ? prev.teacherIds.filter((id) => id !== teacherId)
        : [...prev.teacherIds, teacherId],
    }))
  }

  if (!schedule) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Horario: {schedule.classTypeName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Label htmlFor="isActive" className="cursor-pointer">
                Estado del horario
              </Label>
              <span className={`text-xs font-medium ${formData.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                {formData.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked })
              }
            />
          </div>

          <div>
            <Label htmlFor="dayOfWeek">Día de la semana</Label>
            <Select
              value={formData.dayOfWeek.toString()}
              onValueChange={(value) =>
                setFormData({ ...formData, dayOfWeek: parseInt(value) })
              }
            >
              <SelectTrigger>
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="startTime">Hora inicio</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => {
                  setFormData({ ...formData, startTime: e.target.value })
                  if (formData.endTime) {
                    validateTimes(e.target.value, formData.endTime)
                  }
                }}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">Hora fin</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => {
                  setFormData({ ...formData, endTime: e.target.value })
                  if (formData.startTime) {
                    validateTimes(formData.startTime, e.target.value)
                  }
                }}
                required
              />
            </div>
          </div>

          {timeError && (
            <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {timeError}
            </div>
          )}

          <div>
            <Label>Profesores asignados</Label>
            <div className="border rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
              {teachers.map((teacher) => (
                <div key={teacher._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={teacher._id}
                    checked={formData.teacherIds.includes(teacher._id)}
                    onCheckedChange={() => toggleTeacher(teacher._id)}
                  />
                  <label
                    htmlFor={teacher._id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Prof. {teacher.teacherProfile?.name || teacher.name || "Sin nombre"}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || formData.teacherIds.length === 0 || !!timeError}
              className="bg-gradient-to-r from-[#6366f1] to-[#7d86ff]"
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}