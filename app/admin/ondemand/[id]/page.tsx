// app/admin/cursos/[id]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Course, Module } from "@/app/types/courses"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Plus, BookOpen, Lock, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModuleCard } from "@/components/admin/courses/ModuleCard"
import { ModuleFormModal } from "@/components/admin/courses/ModuleFormModal"
import { useToast } from "@/hooks/use-toast"

// MOCK DATA
const MOCK_COURSE: Course = {
  id: "1",
  title: "Fundamentos de Yoga",
  description: "Aprende las bases del yoga desde cero",
  duration: "8 semanas",
  priceARS: 50000,
  priceUSD: 50,
  renewalPrice: 30000,
  isActive: true,
  createdAt: "2024-01-15",
  modules: [
    {
      id: "1",
      courseId: "1",
      title: "Introducción al Yoga",
      description: "Conceptos básicos y filosofía del yoga",
      unlockDays: 0,
      order: 1,
      lessons: [],
    },
    {
      id: "2",
      courseId: "1",
      title: "Posturas Fundamentales",
      description: "Aprende las asanas básicas",
      unlockDays: 7,
      order: 2,
      lessons: [],
    },
  ],
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setCourse(MOCK_COURSE)
      setIsLoading(false)
    }, 500)
  }

  const handleAdd = () => {
    setSelectedModule(null)
    setIsFormOpen(true)
  }

  const handleEdit = (module: Module) => {
    setSelectedModule(module)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    if (!course) return
    const updatedModules = course.modules.filter((m) => m.id !== id)
    setCourse({ ...course, modules: updatedModules })
    toast({
      title: "Éxito",
      description: "Módulo eliminado correctamente",
    })
  }

  const handleSubmit = (data: any) => {
    if (!course) return

    if (selectedModule) {
      const updated = { ...selectedModule, ...data }
      const updatedModules = course.modules.map((m) =>
        m.id === updated.id ? updated : m
      )
      setCourse({ ...course, modules: updatedModules })
      toast({
        title: "Éxito",
        description: "Módulo actualizado correctamente",
      })
    } else {
      const newModule: Module = {
        id: Date.now().toString(),
        courseId: course.id,
        ...data,
        order: course.modules.length + 1,
        lessons: [],
      }
      setCourse({ ...course, modules: [...course.modules, newModule] })
      toast({
        title: "Éxito",
        description: "Módulo creado correctamente",
      })
    }
    setIsFormOpen(false)
    setSelectedModule(null)
  }

  const handleViewLessons = (moduleId: string) => {
    router.push(`/admin/ondemand/${course?.id}/modulos/${moduleId}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5862f0]"></div>
      </div>
    )
  }

  if (!course) return null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6 py-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/ondemand")}
          className="text-white hover:bg-white/20 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a Cursos
        </Button>

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">{course.title}</h1>
              <p className="text-white/90 mt-1 text-sm">{course.description}</p>
            </div>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-white text-[#6366f1] hover:bg-white/90 shadow-md font-semibold"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Módulo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Módulos</p>
                <p className="text-3xl font-bold text-gray-900">
                  {course.modules.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-[#6366f1]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Lecciones</p>
                <p className="text-3xl font-bold text-gray-900">
                  {course.modules.reduce((sum, m) => sum + m.lessons.length, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Duración</p>
                <p className="text-2xl font-bold text-gray-900">{course.duration}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-[#f8f9fa]">
        <div className="space-y-4 pb-20 lg:pb-6">
          {course.modules
            .sort((a, b) => a.order - b.order)
            .map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewLessons={handleViewLessons}
              />
            ))}
        </div>

        {course.modules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay módulos creados
            </h3>
            <p className="text-gray-500 mb-4">
              Comienza agregando módulos al curso
            </p>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Módulo
            </Button>
          </div>
        )}
      </div>

      <ModuleFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedModule(null)
        }}
        onSubmit={handleSubmit}
        module={selectedModule}
      />
    </div>
  )
}