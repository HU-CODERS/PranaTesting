"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock, Users, MapPin, Check } from "lucide-react"

interface EventoDetallesModalProps {
  isOpen: boolean
  onClose: () => void
  evento: any
}

export function EventoDetallesModal({ isOpen, onClose, evento }: EventoDetallesModalProps) {
  if (!evento) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{evento.titulo}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="text-gray-600">{evento.descripcion}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-[#305891]" />
              {evento.fechaFin
                ? `${new Date(evento.fecha).toLocaleDateString("es-ES")} - ${new Date(evento.fechaFin).toLocaleDateString("es-ES")}`
                : new Date(evento.fecha).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </div>
            {evento.hora && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-[#305891]" />
                {evento.hora} {evento.duracion && `• ${evento.duracion}`}
              </div>
            )}
            {evento.instructor && (
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-[#305891]" />
                {evento.instructor}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-[#305891]" />
              {evento.ubicacion}
            </div>
          </div>

          {evento.incluye && (
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Incluye:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {evento.incluye.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {evento.temario && (
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Temario:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {evento.temario.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {evento.programa && (
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Programa:</h4>
              <p className="text-sm text-gray-600">{evento.programa}</p>
            </div>
          )}

          <div className="border-t pt-3 flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-600">Precio:</span>
            </div>
            <div>
              <span className="text-xl font-bold text-[#305891]">{evento.precio}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
