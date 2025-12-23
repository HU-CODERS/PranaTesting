// app/admin/cursos/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Course } from "@/app/types/courses"
import { BookOpen, Plus, DollarSign, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/admin/courses/CourseCard"
import { CourseFormModal } from "@/components/admin/courses/CourseFormModal"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// MOCK DATA
const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Fundamentos de Yoga",
    description: "Aprende las bases del yoga desde cero",
    duration: "8 semanas",
    priceARS: 50000,
    priceUSD: 50,
    renewalPrice: 30000,
    isActive: true,
    createdAt: "2024-01-15",
    modules: [],
  },
  {
    id: "2",
    title: "Meditación Avanzada",
    description: "Técnicas avanzadas de meditación",
    duration: "6 semanas",
    priceARS: 40000,
    priceUSD: 40,
    renewalPrice: 25000,
    isActive: true,
    createdAt: "2024-02-20",
    modules: [],
  },
]

export default function CursosPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setCourses(MOCK_COURSES)
      setIsLoading(false)
    }, 500)
  }

  const handleAdd = () => {
    setSelectedCourse(null)
    setIsFormOpen(true)
  }

  const handleEdit = (course: Course) => {
    setSelectedCourse(course)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id))
    toast({
      title: "Éxito",
      description: "Curso eliminado correctamente",
    })
  }

  const handleToggle = (id: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    )
    toast({
      title: "Éxito",
      description: "Estado actualizado correctamente",
    })
  }

  const handleSubmit = (data: any) => {
    if (selectedCourse) {
      const updated = { ...selectedCourse, ...data }
      setCourses(courses.map((c) => (c.id === updated.id ? updated : c)))
      toast({
        title: "Éxito",
        description: "Curso actualizado correctamente",
      })
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...data,
        isActive: true,
        createdAt: new Date().toISOString(),
        modules: [],
      }
      setCourses([...courses, newCourse])
      toast({
        title: "Éxito",
        description: "Curso creado correctamente",
      })
    }
    setIsFormOpen(false)
    setSelectedCourse(null)
  }

  const handleViewDetails = (courseId: string) => {
    router.push(`/admin/ondemand/${courseId}`)
  }

  const totalRevenue = courses.reduce((sum, c) => sum + c.priceARS, 0)
  const activeCourses = courses.filter((c) => c.isActive).length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5862f0]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-6 py-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">Gestión de Cursos</h1>
              <p className="text-white/90 mt-1 text-sm">
                Administra cursos, módulos y lecciones
              </p>
            </div>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-white text-[#6366f1] hover:bg-white/90 shadow-md font-semibold"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Curso
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Cursos</p>
                <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#6366f1]/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-[#6366f1]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Cursos Activos</p>
                <p className="text-3xl font-bold text-gray-900">{activeCourses}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">Valor Total</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-[#f8f9fa]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20 lg:pb-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay cursos creados
            </h3>
            <p className="text-gray-500 mb-4">
              Comienza creando tu primer curso
            </p>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Curso
            </Button>
          </div>
        )}
      </div>

      <CourseFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedCourse(null)
        }}
        onSubmit={handleSubmit}
        course={selectedCourse}
      />
    </div>
  )
}