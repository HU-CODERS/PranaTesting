// components/admin/courses/ModuleCard.tsx
"use client"

import { Module } from "@/app/types/courses"
import { Pencil, Trash2, Eye, Lock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModuleCardProps {
  module: Module
  index: number
  onEdit: (module: Module) => void
  onDelete: (id: string) => void
  onViewLessons: (id: string) => void
}

export function ModuleCard({
  module,
  index,
  onEdit,
  onDelete,
  onViewLessons,
}: ModuleCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{index + 1}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {module.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{module.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Lock className="h-4 w-4" />
                <span>
                  Desbloqueo:{" "}
                  {module.unlockDays === 0
                    ? "Inmediato"
                    : `${module.unlockDays} días`}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{module.lessons.length} lecciones</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => onViewLessons(module.id)}
            className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90"
          >
            <Eye className="h-4 w-4 mr-1" />
            Ver Lecciones
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(module)}
            className="text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(module.id)}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}