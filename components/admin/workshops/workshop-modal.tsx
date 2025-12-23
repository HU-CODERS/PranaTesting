"use client"

import { useState, useEffect } from "react"
import { Users, Edit, Trash2, UserPlus, Mail, Phone, Calendar, CheckCircle2, X, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface WorkshopModalProps {
  isOpen: boolean
  onClose: () => void
  workshop?: any
  isEditMode?: boolean
  onEdit?: (workshop: any) => void
  onDelete?: (workshop: any) => void
}

export function WorkshopModal({ isOpen, onClose, workshop, isEditMode, onEdit, onDelete }: WorkshopModalProps) {
  const [participants, setParticipants] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (workshop && isOpen) {
      fetchParticipants()
    }
  }, [workshop, isOpen])

  const fetchParticipants = async () => {
    setLoading(true)
    try {
      // Simulación - reemplazar con tu endpoint real
      // const res = await fetch(`/api/workshops/${workshop.id}/participants`)
      // const data = await res.json()
      // setParticipants(data)
      
      // Mock data
      setParticipants(workshop?.participants || [])
    } catch (error) {
      console.error("Error fetching participants:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddParticipant = () => {
    alert("Funcionalidad para agregar participante en desarrollo")
  }

  const getTipoGradient = (tipo: string) => {
    const gradientes: { [key: string]: string } = {
      yoga: "from-[#6366f1] via-[#7c3aed] to-[#8b5cf6]",
      meditacion: "from-teal-400 via-teal-500 to-cyan-500",
      retiro: "from-emerald-400 via-emerald-500 to-teal-500",
      evento: "from-purple-500 via-purple-600 to-indigo-600",
      taller: "from-orange-400 via-orange-500 to-amber-500",
      otro: "from-[#6366f1] via-[#7c3aed] to-[#8b5cf6]"
    }
    return gradientes[tipo?.toLowerCase()] || gradientes.yoga
  }

  if (!workshop) return null

  const inscritos = participants.length
  const disponibles = (workshop.capacidad || workshop.maxParticipants || 0) - inscritos
  const porcentajeOcupacion = ((inscritos / (workshop.capacidad || workshop.maxParticipants || 1)) * 100).toFixed(0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0 gap-0 overflow-y-auto">
        {/* Header con gradiente */}
        <div className={`relative bg-gradient-to-br ${getTipoGradient(workshop.tipo)} text-white p-6 overflow-hidden`}>
          {/* Pattern decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl font-bold text-white mb-1 break-words">
                  {workshop.titulo || workshop.title}
                </DialogTitle>
                <DialogDescription className="text-white/90 text-base">
                  Gestión de participantes y configuración
                </DialogDescription>
              </div>
            </div>

            {/* Stats rápidas */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-xs text-white/80 font-semibold uppercase tracking-wide mb-1">Inscritos</p>
                <p className="text-2xl font-bold text-white">{inscritos}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-xs text-white/80 font-semibold uppercase tracking-wide mb-1">Disponibles</p>
                <p className="text-2xl font-bold text-white">{disponibles}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <p className="text-xs text-white/80 font-semibold uppercase tracking-wide mb-1">Ocupación</p>
                <p className="text-2xl font-bold text-white">{porcentajeOcupacion}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-6">
          <div className="space-y-6">
            {/* Header de participantes */}
            <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Lista de Participantes
                    </h3>
                    <p className="text-sm text-gray-600">
                      {inscritos} de {workshop.capacidad || workshop.maxParticipants} personas
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleAddParticipant}
                  className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
                  size="default"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Agregar Participante
                </Button>
              </div>
            </div>

            {/* Lista de participantes */}
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mx-auto mb-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                    <p className="text-gray-600">Cargando participantes...</p>
                  </div>
                </div>
              ) : inscritos === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <Users className="h-10 w-10 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">No hay participantes inscritos</h4>
                  <p className="text-gray-600 mb-6">
                    Comienza agregando el primer participante a este workshop
                  </p>
                  <Button
                    onClick={handleAddParticipant}
                    className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] text-white rounded-xl"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Agregar primer participante
                  </Button>
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-gray-200 overflow-hidden shadow-md bg-white">
                  {/* Header de la tabla */}
                  <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-5 py-3">
                    <div className="grid grid-cols-12 gap-4 text-white text-sm font-bold uppercase tracking-wide">
                      <div className="col-span-5">Participante</div>
                      <div className="col-span-4">Contacto</div>
                      <div className="col-span-3 text-right">Estado</div>
                    </div>
                  </div>

                  {/* Lista de participantes */}
                  <div className="divide-y divide-gray-200">
                    {participants.map((participant, index) => (
                      <div 
                        key={participant.id || index}
                        className="px-5 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Nombre */}
                          <div className="col-span-5 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                              {participant.name?.[0]?.toUpperCase() || participant.userId?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-gray-900 truncate">
                                {participant.name || `${participant.userId?.name || ''} ${participant.userId?.lastname || ''}`.trim() || 'Sin nombre'}
                              </p>
                              <p className="text-xs text-gray-500">
                                Inscrito #{index + 1}
                              </p>
                            </div>
                          </div>

                          {/* Contacto */}
                          <div className="col-span-4 space-y-1">
                            {(participant.email || participant.userId?.email) && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                                <span className="truncate">{participant.email || participant.userId?.email}</span>
                              </div>
                            )}
                            {(participant.phone || participant.userId?.phone) && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                                <span>{participant.phone || participant.userId?.phone}</span>
                              </div>
                            )}
                          </div>

                          {/* Estado */}
                          <div className="col-span-3 text-right">
                            <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-100">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Confirmado
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Barra de progreso de capacidad */}
            {inscritos > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-gray-900">Capacidad del Workshop</span>
                  </div>
                  <span className="text-sm font-bold text-blue-700">
                    {porcentajeOcupacion}% ocupado
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500 shadow-md"
                    style={{ width: `${porcentajeOcupacion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {disponibles} {disponibles === 1 ? 'lugar disponible' : 'lugares disponibles'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer con acciones */}
        <div className="border-t-2 border-gray-200 bg-white px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="hover:bg-gray-100 border-2 transition-all duration-300 rounded-xl"
              size="default"
            >
              Cerrar
            </Button>
            
            <div className="flex gap-3">
              {onEdit && (
                <Button 
                  variant="outline" 
                  onClick={() => onEdit(workshop)}
                  className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border-2 transition-all duration-300 rounded-xl"
                  size="default"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Workshop
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="destructive"
                  onClick={() => onDelete(workshop)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
                  size="default"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}