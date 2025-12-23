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
import { AlertTriangle } from "lucide-react"

interface ConfirmarEliminacionEstudianteModalProps {
  isOpen: boolean
  onClose: () => void
  estudiante: any
  onConfirm: () => void
}

export function ConfirmarEliminacionEstudianteModal({
  isOpen,
  onClose,
  estudiante,
  onConfirm,
}: ConfirmarEliminacionEstudianteModalProps) {
  if (!estudiante) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Eliminación
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. El estudiante será eliminado permanentemente del sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Estudiante a eliminar:</h4>
            <div className="space-y-1 text-sm text-red-700">
              <p>
                <strong>Nombre:</strong> {estudiante.nameAndLastname}
              </p>
              <p>
                <strong>Email:</strong> {estudiante.email}
              </p>
              <p>
                <strong>Membresía:</strong> {estudiante.membership.title}
              </p>
              <p>
                <strong>Próxima facturación:</strong> {estudiante?.membership?.expirationDate && new Date(estudiante.membership.expirationDate).toLocaleDateString("es-AR")}

              </p>
              <p>
                <strong>Clases asistidas:</strong> {estudiante?.membershipHistory?.length}
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Advertencia:</strong> Al eliminar este estudiante, también se eliminarán:
            </p>
            <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside">
              <li>Su membresía activa</li>
              <li>Sus reservas de clases</li>
              <li>Su historial de pagos</li>
              <li>Sus datos personales</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Eliminar Estudiante
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
