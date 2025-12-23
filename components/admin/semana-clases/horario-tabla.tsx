"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Info, User, Users } from "lucide-react"
import { Clase } from "@/app/types/clase"

interface HorarioTablaProps {
  clases: Clase[]
  onVerDetalles: (hora: string, dia: string) => void
  onVerDetallesClase: (clase: Clase) => void
}

export function HorarioTabla({ clases, onVerDetalles, onVerDetallesClase }: HorarioTablaProps) {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  return (
    <div className="space-y-8">
      {dias.map((dia) => {
        const clasesDelDia = clases.filter((clase) => clase.dia === dia)
        if (clasesDelDia.length === 0) return null

        return (
          <div key={dia} className="space-y-4">
            {/* Header del día modernizado */}
            <div className="flex items-center gap-4 pb-3 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5862f0] to-[#7d86ff] flex items-center justify-center shadow-md">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-[#5862f0] to-[#7d86ff] bg-clip-text text-transparent">
                  {dia}
                </h3>
              </div>
              <span className="ml-auto text-sm font-semibold text-[#5862f0] bg-[#5862f0]/10 px-4 py-1.5 rounded-full border border-[#5862f0]/20">
                {clasesDelDia.length} {clasesDelDia.length === 1 ? 'clase' : 'clases'}
              </span>
            </div>

            {/* Grid responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {clasesDelDia
                .sort((a, b) => {
                  const [hA, mA] = a.hora.split(":").map(Number)
                  const [hB, mB] = b.hora.split(":").map(Number)
                  return hA * 60 + mA - (hB * 60 + mB)
                })
                .map((clase) => (
                  <Card
                    key={clase.id}
                    className="overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-[#5862f0] shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group bg-white flex flex-col h-full"
                  >
                    {/* Header con gradiente */}
                    <div className={`${getTipoClaseGradient(clase.tipo)} p-6 relative overflow-hidden flex-shrink-0`}>
                      {/* Pattern decorativo */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                          backgroundSize: '24px 24px'
                        }}></div>
                      </div>

                      {/* Badge del tipo */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-block bg-white/90 backdrop-blur-sm text-[#5862f0] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                          {(() => {
                            const tipoActual = Array.isArray(clase.tipo) ? clase.tipo[0] : clase.tipo
                            return tipoActual.charAt(0).toUpperCase() + tipoActual.slice(1)
                          })()}
                        </span>
                      </div>

                      {/* Hora */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                            <Clock className="h-6 w-6 text-[#5862f0]" />
                          </div>
                          <div>
                            <p className="text-3xl font-black text-white drop-shadow-lg">
                              {clase.hora}
                            </p>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <p className="text-sm text-white font-bold">{clase.duracion} min</p>
                        </div>
                      </div>
                    </div>

                    {/* ✅ Contenido con flex-1 para distribuir espacio */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Título */}
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
                          {clase.titulo}
                        </h4>
                      </div>

                      {/* Info del profesor */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5862f0] to-[#7d86ff] flex items-center justify-center flex-shrink-0 shadow-md">
                          <span className="text-white font-bold text-sm">
                            {clase.profesor.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 font-medium">Instructor</p>
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {clase.profesor}
                          </p>
                        </div>
                      </div>

                      {/* Capacidad */}
                      {clase.participants && (
                        <div className="space-y-2 mb-4">
                          {/* Inscritos actuales */}
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-semibold text-blue-900">Inscritos</span>
                            </div>
                            <span className="text-lg font-bold text-blue-600">
                              {clase.participants.length}/{clase.capacidad}
                            </span>
                          </div>

                          {/* Mostrar históricos si hay */}
                          {clase.oldParticipants && clase.oldParticipants.length > 0 && (
                            <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                              <span className="text-xs font-semibold text-emerald-700">
                                Ex Inscriptos
                              </span>
                              <span className="text-sm font-bold text-emerald-600">
                                +{clase.oldParticipants.length}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* ✅ Botón - mt-auto lo empuja al final */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onVerDetallesClase(clase)
                        }}
                        className="w-full bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 mt-auto"
                      >
                        <Info className="h-4 w-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )
      })}

      {/* Mensaje si no hay clases */}
      {clases.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No hay clases programadas</h3>
          <p className="text-gray-500 mb-6">Comienza agregando tu primera clase de la semana</p>
          <Button className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Agregar Clase
          </Button>
        </div>
      )}
    </div>
  )
}

function getTipoClaseGradient(tipo: string | string[]) {
  // ✅ NUEVO: Manejar array de tipos
  const tipoActual = Array.isArray(tipo) ? tipo[0] : tipo

  const gradientes: { [key: string]: string } = {
    hatha: "bg-gradient-to-br from-[#5862f0] via-[#6872fe] to-[#7d86ff]",
    ashtanga: "bg-gradient-to-br from-[#4051d9] via-[#5862f0] to-[#6872fe]",
    aereo: "bg-gradient-to-br from-[#7d86ff] via-[#8d96ff] to-[#9da6ff]",
    prenatal: "bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600",
    intensivo: "bg-gradient-to-br from-green-400 via-green-500 to-green-600",
    curso: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
    formacion: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
    exclusivo: "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700",
    meditacion: "bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600",
    respiracion: "bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600",
    pranayama: "bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600",
    virtual: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600"
  }

  return gradientes[tipoActual.toLowerCase()] || gradientes.hatha
}