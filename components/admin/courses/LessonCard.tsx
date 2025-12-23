// components/admin/courses/LessonCard.tsx
"use client"

import { Lesson } from "@/app/types/courses"
import { Pencil, Trash2, FileText, Video, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LessonCardProps {
  lesson: Lesson
  index: number
  onEdit: (lesson: Lesson) => void
  onDelete: (id: string) => void
}

export function LessonCard({ lesson, index, onEdit, onDelete }: LessonCardProps) {
  const Icon = lesson.type === "text" ? FileText : Video

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
              lesson.type === "text"
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-500">
                Lección {index + 1}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  lesson.type === "text"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {lesson.type === "text" ? "Texto" : "Video"}
              </span>
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {lesson.title}
            </h3>
            {lesson.type === "video" && lesson.duration && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration} minutos</span>
              </div>
            )}
            {lesson.type === "text" && (
              <div
                className="text-sm text-gray-500 line-clamp-2 mt-2"
                dangerouslySetInnerHTML={{
                  __html: lesson.content.replace(/<[^>]*>/g, "").substring(0, 100),
                }}
              />
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(lesson)}
            className="text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(lesson.id)}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}