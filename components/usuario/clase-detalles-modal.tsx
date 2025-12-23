"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Users, MapPin, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ClaseDetallesModalProps {
  isOpen: boolean
  onClose: () => void
  clase: any
}

export function ClaseDetallesModal({ isOpen, onClose, clase }: ClaseDetallesModalProps) {
  if (!clase) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{clase.titulo}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-gray-600">{clase.descripcion}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-[#305891]" />
              {new Date(clase.fecha).toLocaleDateString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-[#305891]" />
              {clase.hora} • {clase.duracion}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2 text-[#305891]" />
              {clase.instructor}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-[#305891]" />
              {clase.ubicacion}
            </div>
          </div>

          <div className="border-t pt-3">
            <h4 className="font-medium mb-2">Información adicional</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Nivel:</span>
                <span className="font-medium">{clase.nivel}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Capacidad:</span>
                <span className="font-medium">{clase.capacidad}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estado:</span>
                <Badge
                  variant="outline"
                  className={
                    clase.estado === "confirmada"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }
                >
                  {clase.estado === "confirmada" ? "Confirmada" : "Pendiente"}
                </Badge>
              </div>
            </div>
          </div>

          {clase.recomendaciones && (
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Recomendaciones</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {clase.recomendaciones.map((rec: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <Info className="h-4 w-4 mr-2 mt-0.5 text-[#305891]" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
