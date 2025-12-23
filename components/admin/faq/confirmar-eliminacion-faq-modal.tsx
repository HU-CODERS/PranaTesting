"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Trash2, X, HelpCircle } from "lucide-react"

interface ConfirmarEliminacionFAQModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  pregunta: string
}

export function ConfirmarEliminacionFAQModal({
  isOpen,
  onClose,
  onConfirm,
  pregunta,
}: ConfirmarEliminacionFAQModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] w-full max-h-[90vh] overflow-hidden p-0 gap-0 flex flex-col">
        <DialogTitle className="sr-only">
          Confirmar Eliminación de FAQ
        </DialogTitle>

        {/* Header con gradiente rojo - FIJO */}
        <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white p-5 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg animate-pulse flex-shrink-0">
                <AlertTriangle className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white mb-0.5">
                  Eliminar FAQ
                </h3>
                <p className="text-white/90 text-sm">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido SCROLLEABLE */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Alert principal */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 mb-1 text-sm">FAQ a eliminar</h4>
                <p className="text-xs text-gray-600">
                  Se eliminará permanentemente esta pregunta frecuente
                </p>
              </div>
            </div>

            {/* Info de la FAQ */}
            <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
              <div className="flex items-start gap-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-md flex-shrink-0">
                  <HelpCircle className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Pregunta</p>
                  <p className="text-sm font-bold text-gray-900 leading-relaxed break-words">
                    {pregunta}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning adicional */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-md animate-pulse">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-amber-900 mb-1.5 flex items-center gap-2 text-sm">
                  ⚠️ Advertencia Importante
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Esta FAQ será eliminada <strong className="font-bold">permanentemente</strong> del sistema. 
                  Los usuarios ya no podrán ver esta información en el sitio web.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmación final */}
          <div className="bg-gray-50 rounded-2xl p-3 border-2 border-gray-200">
            <p className="text-xs text-gray-700 text-center">
              ¿Estás seguro de que deseas eliminar esta FAQ?
            </p>
          </div>
        </div>

        {/* Footer FIJO */}
        <div className="border-t-2 border-gray-200 bg-white px-5 py-3 flex-shrink-0">
          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex items-center justify-center gap-2 h-11 px-5 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300 font-semibold text-sm"
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="flex items-center justify-center gap-2 h-11 px-5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar Definitivamente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}