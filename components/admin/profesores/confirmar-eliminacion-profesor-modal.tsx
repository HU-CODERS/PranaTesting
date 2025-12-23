"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, User, Star, BookOpen, Trash2 } from "lucide-react"

interface ConfirmarEliminacionProfesorModalProps {
  isOpen: boolean
  onClose: () => void
  profesor: any
  onConfirm: () => void
}

export function ConfirmarEliminacionProfesorModal({
  isOpen,
  onClose,
  profesor,
  onConfirm,
}: ConfirmarEliminacionProfesorModalProps) {
  if (!profesor) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const getInitials = (nombre: string) => {
    if (!nombre || nombre.trim() === "") return "?"
    const names = nombre.trim().split(" ")
    if (names.length >= 2 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return nombre.substring(0, 2).toUpperCase()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header con icono de advertencia */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 text-center">
          <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 animate-pulse">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-white mb-1">
            ¿Eliminar profesor?
          </DialogTitle>
          <DialogDescription className="text-red-50 text-sm">
            Esta acción es permanente y no se puede deshacer
          </DialogDescription>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Card del profesor */}
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">
                {getInitials(profesor.nombre)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-gray-900 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  {profesor.nombre || "Sin nombre"}
                </h4>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                    <span><strong>{profesor.clasesImpartidas || 0}</strong> clases</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                    <span><strong>{profesor.valoracion || 0}</strong>/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advertencia de consecuencias */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3">
            <div className="flex gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-amber-900 mb-1.5 text-sm">
                  Se eliminarán permanentemente:
                </h5>
                <ul className="space-y-1 text-xs text-amber-800">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Clases programadas e historial</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Valoraciones y comentarios</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Información contractual</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mensaje final de confirmación */}
          <div className="text-center py-1">
            <p className="text-gray-700 font-medium text-sm">
              ¿Estás seguro de que deseas continuar?
            </p>
          </div>
        </div>

        {/* Footer con botones */}
        <div className="bg-gray-50 px-5 py-3 flex gap-3 justify-end border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="min-w-[90px]"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm}
            className="min-w-[120px] bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}