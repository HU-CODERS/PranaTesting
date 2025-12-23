// components/admin/courses/LessonFormModal.tsx
"use client"

import { useState, useEffect } from "react"
import { Lesson } from "@/app/types/courses"
import { X, FileText, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HtmlEditor } from "./HtmlEditor"

interface LessonFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  lesson?: Lesson | null
}

export function LessonFormModal({
  isOpen,
  onClose,
  onSubmit,
  lesson,
}: LessonFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "text" as "text" | "video",
    content: "",
    duration: "",
  })
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        type: lesson.type,
        content: lesson.content,
        duration: lesson.duration || "",
      })
      setStep(2)
    } else {
      setFormData({
        title: "",
        type: "text",
        content: "",
        duration: "",
      })
      setStep(1)
    }
  }, [lesson, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleTypeSelect = (type: "text" | "video") => {
    setFormData({ ...formData, type, content: "" })
    setStep(2)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-white">
            {lesson ? "Editar Lección" : "Nueva Lección"}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 1 && !lesson && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Selecciona el tipo de lección
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleTypeSelect("text")}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#6366f1] hover:bg-[#6366f1]/5 transition-all group"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                      <FileText className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Lección de Texto
                    </h4>
                    <p className="text-sm text-gray-500">
                      Contenido escrito con editor HTML
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTypeSelect("video")}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-[#6366f1] hover:bg-[#6366f1]/5 transition-all group"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <Video className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Lección de Video
                    </h4>
                    <p className="text-sm text-gray-500">
                      Video desde URL o subida
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="title">Título de la lección</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Ej: Introducción a las asanas"
                  required
                  className="mt-1.5"
                />
              </div>

              {formData.type === "text" && (
                <div>
                  <Label>Contenido de la lección</Label>
                  <HtmlEditor
                    value={formData.content}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                  />
                </div>
              )}

              {formData.type === "video" && (
                <>
                  <div>
                    <Label htmlFor="content">URL del video</Label>
                    <Input
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      placeholder="https://www.youtube.com/watch?v=..."
                      required
                      className="mt-1.5"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      YouTube, Vimeo o enlace directo al video
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="duration">Duración (minutos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      placeholder="15"
                      className="mt-1.5"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4 border-t">
                {!lesson && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Atrás
                  </Button>
                )}
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
                  {lesson ? "Guardar cambios" : "Crear lección"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}