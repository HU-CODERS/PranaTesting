// components/admin/courses/CourseCard.tsx
"use client"

import { Course } from "@/app/types/courses"
import { Pencil, Trash2, Power, Eye, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  course: Course
  onEdit: (course: Course) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  onViewDetails: (id: string) => void
}

export function CourseCard({
  course,
  onEdit,
  onDelete,
  onToggle,
  onViewDetails,
}: CourseCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border overflow-hidden group transition-all hover:shadow-md",
        !course.isActive && "opacity-60"
      )}
    >
      <div className="aspect-video bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-6xl font-bold opacity-20">
            {course.title[0]}
          </span>
        </div>
        {!course.isActive && (
          <div className="absolute top-3 right-3">
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              Inactivo
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Duración
            </span>
            <span className="font-semibold text-gray-900">{course.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Precio
            </span>
            <span className="font-semibold text-gray-900">
              ${course.priceARS.toLocaleString()} / ${course.priceUSD}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => onViewDetails(course.id)}
            className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90"
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onToggle(course.id)}
            className={cn(
              course.isActive
                ? "text-green-600 hover:bg-green-50"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <Power className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(course)}
            className="text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(course.id)}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}