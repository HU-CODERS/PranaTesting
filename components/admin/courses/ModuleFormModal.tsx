// components/admin/courses/ModuleFormModal.tsx
"use client"

import { useState, useEffect } from "react"
import { Module } from "@/app/types/courses"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ModuleFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  module?: Module | null
}

export function ModuleFormModal({
  isOpen,
  onClose,
  onSubmit,
  module,
}: ModuleFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    unlockDays: 0,
  })

  useEffect(() => {
    if (module) {
      setFormData({
        title: module.title,
        description: module.description,
        unlockDays: module.unlockDays,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        unlockDays: 0,
      })
    }
  }, [module, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">
            {module ? "Editar Módulo" : "Nuevo Módulo"}
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
            <Label htmlFor="title">Título del módulo</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ej: Introducción al Yoga"
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
              placeholder="Describe el módulo..."
              rows={4}
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="unlockDays">Días para desbloquear</Label>
            <Input
              id="unlockDays"
              type="number"
              min="0"
              value={formData.unlockDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  unlockDays: parseInt(e.target.value) || 0,
                })
              }
              required
              className="mt-1.5"
            />
            <p className="text-xs text-gray-500 mt-1">
              Días desde la compra del curso. 0 = disponible inmediatamente
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90"
            >
              {module ? "Guardar cambios" : "Crear módulo"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}