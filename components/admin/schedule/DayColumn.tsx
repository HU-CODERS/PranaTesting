"use client"

import { ScheduleCard } from './ScheduleCard';

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

interface DayColumnProps {
  day: string
  schedules: Schedule[]
  teachers: Teacher[]
  onEdit: (schedule: Schedule) => void
  onToggle: (scheduleId: string, currentState: boolean) => void
  onDelete: (schedule: Schedule) => void
}

export function DayColumn({ 
  day, 
  schedules, 
  teachers,
  onEdit, 
  onToggle, 
  onDelete 
}: DayColumnProps) {
  const sortedSchedules = [...schedules].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime)
  })

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-[#5862f0] to-[#8b5cf6] px-5 py-4">
        <h2 className="text-white font-bold text-lg">{day}</h2>
      </div>
      <div className="p-4 space-y-3 min-h-[300px]">
        {sortedSchedules.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <p className="text-sm">No hay horarios programados</p>
          </div>
        ) : (
          sortedSchedules.map((schedule) => (
            <ScheduleCard
              key={schedule._id}
              schedule={schedule}
              teachers={teachers}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
