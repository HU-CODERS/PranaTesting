// app/admin/cursos/[id]/modulos/[moduleId]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Module, Lesson } from "@/app/types/courses"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Plus, FileText, Video, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LessonCard } from "@/components/admin/courses/LessonCard"
import { LessonFormModal } from "@/components/admin/courses/LessonFormModal"
import { useToast } from "@/hooks/use-toast"

// MOCK DATA
const MOCK_MODULE: Module = {
  id: "1",
  courseId: "1",
  title: "Introducción al Yoga",
  description: "Conceptos básicos y filosofía del yoga",
  unlockDays: 0,
  order: 1,
  lessons: [
    {
      id: "1",
      moduleId: "1",
      title: "¿Qué es el Yoga?",
      type: "text",
      content: "<h1>Bienvenido al Yoga</h1><p>El yoga es una práctica antigua...</p>",
      order: 1,
    },
    {
      id: "2",
      moduleId: "1",
      title: "Historia del Yoga",
      type: "video",
      content: "https://www.youtube.com/watch?v=example",
      order: 2,
      duration: "15",
    },
  ],
}

export default function LessonsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [module, setModule] = useState<Module | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setModule(MOCK_MODULE)
      setIsLoading(false)
    }, 500)
  }

  const handleAdd = () => {
    setSelectedLesson(null)
    setIsFormOpen(true)
  }

  const handleEdit = (lesson: Lesson) => {
    setSelectedLesson(lesson)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!module) return
    const updatedLessons = module.lessons.filter((l) => l.id !== id)
    setModule({ ...module, lessons: updatedLessons })
    toast({
      title: "Éxito",
      description: "Lección eliminada correctamente",
    })
  }

  const handleSubmit = (data: any) => {
    if (!module) return

    if (selectedLesson) {
      const updated = { ...selectedLesson, ...data }
      const updatedLessons = module.lessons.map((l) =>
        l.id === updated.id ? updated : l
      )
      setModule({ ...module, lessons: updatedLessons })
      toast({
        title: "Éxito",
        description: "Lección actualizada correctamente",
      })
    } else {
      const newLesson: Lesson = {
        id: Date.now().toString(),
        moduleId: module.id,
        ...data,
        order: module.lessons.length + 1,
      }
      setModule({ ...module, lessons: [...module.lessons, newLesson] })
      toast({
        title: "Éxito",
        description: "Lección creada correctamente",
      })
    }
    setIsFormOpen(false)
    setSelectedLesson(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5862f0]"></div>
      </div>
    )
  }

  if (!module) return null

  const textLessons = module.lessons.filter((l) => l.type === "text").length
  const videoLessons = module.lessons.filter((l) => l.type === "video").length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6 py-6">
        <Button
          variant="ghost"
          onClick={() => router.push(`/admin/ondemand/${params.id}`)}
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Módulos
        </Button>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{module.title}</h1>
            <p className="text-white/90 mt-1 text-sm">{module.description}</p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-white text-[#6366f1] hover:bg-white/90 shadow-md font-semibold"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nueva Lección
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Lecciones</p>
                <p className="text-3xl font-bold text-gray-900">
                  {module.lessons.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#6366f1]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Lecciones de Texto</p>
                <p className="text-3xl font-bold text-gray-900">{textLessons}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Lecciones de Video</p>
                <p className="text-3xl font-bold text-gray-900">{videoLessons}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-[#f8f9fa]">
        <div className="space-y-4 pb-20 lg:pb-6">
          {module.lessons
            .sort((a, b) => a.order - b.order)
            .map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </div>

        {module.lessons.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay lecciones creadas
            </h3>
            <p className="text-gray-500 mb-4">
              Comienza agregando lecciones al módulo
            </p>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Lección
            </Button>
          </div>
        )}
      </div>

      <LessonFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedLesson(null)
        }}
        onSubmit={handleSubmit}
        lesson={selectedLesson}
      />
    </div>
  )
}