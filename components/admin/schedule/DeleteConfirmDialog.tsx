"use client"

import { AlertTriangle, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Schedule {
  _id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  classTypeName: string
  teacherIds: string[]
  isActive: boolean
}

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  schedule: Schedule | null
}

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  schedule,
}: DeleteConfirmDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!isOpen || !schedule) return null

  const handleConfirm = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      onClose()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">¿Eliminar horario?</h3>
            <p className="text-sm text-gray-600 mt-1">
              Esta acción no se puede deshacer
            </p>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-4 mb-6 space-y-3">
          <p className="text-sm text-gray-700 font-medium">
            Estás a punto de eliminar:
          </p>
          <div className="space-y-2 bg-white rounded p-3 border border-red-200">
            <p className="text-sm font-semibold text-gray-900">
              {schedule.classTypeName}
            </p>
            <p className="text-xs text-gray-600">
              {DAYS[schedule.dayOfWeek]} • {schedule.startTime} - {schedule.endTime}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Eliminando...
              </>
            ) : (
              "Eliminar horario"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}