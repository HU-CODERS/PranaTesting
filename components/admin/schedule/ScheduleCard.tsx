"use client"

import { Pencil, Trash2, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface Teacher {
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
  createdAt: string
  updatedAt: string
}

interface ScheduleCardProps {
  schedule: Schedule
  teachers: Teacher[]
  onEdit: (schedule: Schedule) => void
  onToggle: (scheduleId: string, currentState: boolean) => void
  onDelete: (schedule: Schedule) => void
}

export function ScheduleCard({
  schedule,
  teachers,
  onEdit,
  onToggle,
  onDelete
}: ScheduleCardProps) {
  const teacherNames = schedule.teacherIds
    .map((teacher: any) => teacher?.teacherProfile?.name || teacher?.name)
    .filter(Boolean)
    .join(", Prof. ")

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            {schedule.classTypeName}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {schedule.startTime} - {schedule.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {teacherNames || "Sin profesores asignados"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(schedule)}
            className="text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(schedule)}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Estado</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${schedule.isActive ? 'text-green-600' : 'text-gray-500'}`}>
            {schedule.isActive ? 'Activo' : 'Inactivo'}
          </span>
          <Switch
            checked={schedule.isActive}
            onCheckedChange={(checked) => onToggle(schedule._id, checked)}
          />
        </div>
      </div>
    </div>
  )
}
