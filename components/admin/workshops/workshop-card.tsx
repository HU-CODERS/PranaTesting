"use client"

import { Calendar, Clock, Users, DollarSign, MapPin, Monitor, Eye, Tag, FileText, Info, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Key, useState } from "react"

interface WorkshopCardProps {
  workshop: any
  onView: (workshop: any) => void
}

export function WorkshopCard({ workshop, onView }: WorkshopCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const getTipoGradient = (tipo: string) => {
    const gradientes: { [key: string]: string } = {
      yoga: "bg-gradient-to-br from-[#6366f1] via-[#7c3aed] to-[#8b5cf6]",
      meditacion: "bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500",
      retiro: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500",
      evento: "bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600",
      taller: "bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500",
      otro: "bg-gradient-to-br from-[#6366f1] via-[#7c3aed] to-[#8b5cf6]"
    }
    return gradientes[tipo?.toLowerCase()] || gradientes.yoga
  }

  const hasImages = workshop.imagenes && workshop.imagenes.length > 0
  const currentImage = hasImages ? workshop.imagenes[currentImageIndex] : null

  const goToPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? workshop.imagenes.length - 1 : prev - 1
    )
  }

  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === workshop.imagenes.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
      
      {/* Galería de imágenes */}
      {hasImages ? (
        <div className="relative h-48 bg-white overflow-hidden group flex items-center justify-center">
          <img 
            src={currentImage} 
            alt={workshop.titulo} 
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Controles de navegación de imágenes */}
          {workshop.imagenes.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                ‹
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                ›
              </button>
            </>
          )}

          {/* Indicador de imágenes */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {workshop.imagenes.map((_: any, index: Key | null | undefined) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-gray-400 w-6' : 'bg-gray-300 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gray-100 flex items-center justify-center border-b border-gray-200">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Sin imagen</p>
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="p-5 space-y-4">
        {/* Título */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight mb-2">
            {workshop.titulo}
          </h3>
        </div>

        {/* Info principal en grid */}
        <div className="space-y-3">
          {/* Fecha */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md flex-shrink-0">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-purple-600 font-semibold uppercase tracking-wide">Fecha</p>
              <p className="text-sm font-bold text-gray-900">{workshop.fecha || 'Por definir'}</p>
            </div>
          </div>

          {/* Horario completo */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md flex-shrink-0">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Horario</p>
              <p className="text-sm font-bold text-gray-900">
                {workshop.hora || '15:13'} - {workshop.horaFin || '16:13'}
              </p>
            </div>
          </div>

          {/* Grid de Precio y Capacidad */}
          <div className="grid grid-cols-2 gap-3">
            {/* Precio */}
            <div className="flex flex-col gap-2 p-3 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Precio</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                AR$ {workshop.precio?.toLocaleString() || '0'}
              </span>
            </div>

            {/* Capacidad */}
            <div className="flex flex-col gap-2 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs text-blue-700 font-semibold uppercase tracking-wide">Capacidad</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {workshop.capacidad || 15} personas
              </span>
            </div>
          </div>

          {/* Ubicación/Modalidad */}
          {workshop.ubicacion && (
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-slate-700 flex items-center justify-center shadow-md flex-shrink-0">
                {workshop.modalidad === "presencial" ? (
                  <MapPin className="h-5 w-5 text-white" />
                ) : (
                  <Monitor className="h-5 w-5 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Modalidad</p>
                <p className="text-sm font-bold text-gray-900 truncate">{workshop.ubicacion}</p>
              </div>
            </div>
          )}
        </div>

        {/* Descripción */}
        {workshop.descripcion && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-600" />
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Descripción</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
              {workshop.descripcion}
            </p>
          </div>
        )}

   

        {/* Botón para ver participantes y gestión */}
        <Button 
          onClick={() => onView(workshop)} 
          className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 rounded-xl h-11 mt-4"
        >
          <Users className="mr-2 h-5 w-5" />
          Ver Participantes y Gestión
        </Button>
      </div>
    </div>
  )
}