"use client"

import { AlertTriangle, Trash2, Users, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

interface ConfirmarEliminacionWorkshopModalProps {
  isOpen: boolean
  onClose: () => void
  workshop: any
  onConfirm: () => void
}

export function ConfirmarEliminacionWorkshopModal({
  isOpen,
  onClose,
  workshop,
  onConfirm,
}: ConfirmarEliminacionWorkshopModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  if (!workshop) return null

  const handleConfirm = async () => {
    // ✅ El modal solo llama a onConfirm
    // El padre (page.tsx) maneja el DELETE y la actualización
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden">
        {/* Header con gradiente rojo de advertencia */}
        <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white p-6 overflow-hidden">
          {/* Pattern decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg animate-pulse">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white mb-1">
                  Eliminar Workshop
                </DialogTitle>
                <DialogDescription className="text-white/90 text-base">
                  Esta acción no se puede deshacer
                </DialogDescription>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-5">
          {/* Alert principal */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-5 shadow-md">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">Workshop a eliminar</h4>
                <p className="text-sm text-gray-600">
                  Se eliminará permanentemente toda la información asociada
                </p>
              </div>
            </div>

            {/* Info del workshop */}
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                <p className="text-lg font-bold text-gray-900 mb-3">
                  {workshop.titulo || workshop.title}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Calendar className="h-3.5 w-3.5 text-purple-600" />
                    </div>
                    <span className="font-medium">Fecha:</span>
                    <span>{workshop.fecha || workshop.day}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200 mt-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Participantes inscritos</span>
                    </div>
                    <span className="text-lg font-bold text-blue-700">
                      {workshop.inscritos || 0}/{workshop.capacidad || workshop.maxParticipants || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning si hay participantes */}
          {(workshop.inscritos > 0) && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-5 shadow-md animate-in fade-in duration-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-md animate-pulse">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    ⚠️ Advertencia Importante
                  </h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Este workshop tiene <strong className="font-bold">{workshop.inscritos} {workshop.inscritos === 1 ? 'participante inscrito' : 'participantes inscritos'}</strong>.
                    Al eliminarlo, se <strong className="font-bold">cancelarán todas las inscripciones</strong> y se perderá toda la información asociada.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Confirmación final */}
          <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
            <p className="text-sm text-gray-700 text-center">
              ¿Estás seguro de que deseas continuar con la eliminación?
            </p>
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="border-t-2 border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="hover:bg-gray-100 border-2 transition-all duration-300 rounded-xl"
              size="default"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirm}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
              size="default"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar Definitivamente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}