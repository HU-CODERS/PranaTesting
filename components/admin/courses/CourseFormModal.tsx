// components/admin/courses/CourseFormModal.tsx
"use client"

import { useState, useEffect } from "react"
import { Course } from "@/app/types/courses"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface CourseFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  course?: Course | null
}

export function CourseFormModal({
  isOpen,
  onClose,
  onSubmit,
  course,
}: CourseFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    priceARS: 0,
    priceUSD: 0,
    renewalPrice: 0,
  })

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        duration: course.duration,
        priceARS: course.priceARS,
        priceUSD: course.priceUSD,
        renewalPrice: course.renewalPrice,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        duration: "",
        priceARS: 0,
        priceUSD: 0,
        renewalPrice: 0,
      })
    }
  }, [course, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">
            {course ? "Editar Curso" : "Nuevo Curso"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <Label htmlFor="title">Título del curso</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ej: Fundamentos de Yoga"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe el curso..."
              rows={4}
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="duration">Duración</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              placeholder="Ej: 8 semanas, 20 horas"
              required
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priceARS">Precio (ARS)</Label>
              <Input
                id="priceARS"
                type="number"
                min="0"
                step="1000"
                value={formData.priceARS || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priceARS: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="50000"
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="priceUSD">Precio (USD)</Label>
              <Input
                id="priceUSD"
                type="number"
                min="0"
                step="1"
                value={formData.priceUSD || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priceUSD: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="50"
                required
                className="mt-1.5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="renewalPrice">Precio de Renovación (ARS)</Label>
            <Input
              id="renewalPrice"
              type="number"
              min="0"
              step="1000"
              value={formData.renewalPrice || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  renewalPrice: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="30000"
              required
              className="mt-1.5"
            />
            <p className="text-xs text-gray-500 mt-1">
              Precio para renovar el acceso al curso
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90"
            >
              {course ? "Guardar cambios" : "Crear curso"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}