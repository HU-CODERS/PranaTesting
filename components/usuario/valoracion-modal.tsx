"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"

interface ValoracionModalProps {
  isOpen: boolean
  onClose: () => void
  clase: {
    titulo: string
    instructor: string
    fecha: string
  }
}

export function ValoracionModal({ isOpen, onClose, clase }: ValoracionModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comentario, setComentario] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la valoración
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Valorar Clase</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{clase.titulo}</h3>
            <p className="text-sm text-gray-600">
              {clase.instructor} • {new Date(clase.fecha).toLocaleDateString("es-ES")}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">¿Cómo calificarías esta clase?</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comentario" className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios (opcional)
            </label>
            <Textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Comparte tu experiencia con esta clase..."
              rows={4}
              className="w-full"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={rating === 0} className="bg-[#305891] hover:bg-[#264a77]">
              Enviar Valoración
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
