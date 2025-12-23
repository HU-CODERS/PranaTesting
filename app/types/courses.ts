// types/courses.ts
export interface Course {
  id: string
  title: string
  description: string
  duration: string // "10 horas", "6 semanas", etc
  priceARS: number
  priceUSD: number
  renewalPrice: number
  thumbnailUrl?: string
  isActive: boolean
  createdAt: string
  modules: Module[]
}

export interface Module {
  id: string
  courseId: string
  title: string
  description: string
  unlockDays: number // días desde la compra para desbloquear
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  type: 'text' | 'video'
  content: string // HTML para texto, URL para video
  order: number
  duration?: string // duración en minutos para videos
}

export interface CreateCourseDto {
  title: string
  description: string
  duration: string
  priceARS: number
  priceUSD: number
  renewalPrice: number
}

export interface CreateModuleDto {
  courseId: string
  title: string
  description: string
  unlockDays: number
}

export interface CreateLessonDto {
  moduleId: string
  title: string
  type: 'text' | 'video'
  content: string
  duration?: string
}