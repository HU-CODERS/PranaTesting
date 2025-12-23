"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, Users, Edit, Trash, Eye, UserCircle, UserPlus, Filter, ChevronDown, CheckCircle2, CalendarClock, X, Sparkles, TrendingUp } from "lucide-react"
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
import { toast } from "react-toastify"

interface DetallesClasesModalProps {
  isOpen: boolean
  onClose: () => void
  clases: any[]
  onEdit: (clase: any) => void
  onDelete: (id: number) => void
  onDeleteSuccess?: () => Promise<void> // 🆕 Callback para refetch
}

export function DetallesClasesModal({
  isOpen,
  onClose,
  clases,
  onEdit,
  onDelete,
  onDeleteSuccess // 🆕
}: DetallesClasesModalProps) {
  const [deleteDialogState, setDeleteDialogState] = useState({
    isOpen: false,
    claseId: null as number | null,
    claseTitle: "",
  })
  const [isDeleting, setIsDeleting] = useState(false) // 🆕 Estado para bloquear durante eliminación
  const [selectedClase, setSelectedClase] = useState<any | null>(null)
  const [isDetalleIndividualOpen, setIsDetalleIndividualOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [selectedWeek, setSelectedWeek] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  if (!clases || clases.length === 0) return null

  // 🆕 ACTUALIZADO: Con toast, bloqueo y refetch
  const handleConfirmDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("❌ No estás autenticado", {
        position: "top-right",
        autoClose: 2500,
      })
      return
    }

    setIsDeleting(true) // 🆕 Bloquear interfaz

    try {
      const res = await fetch(`https://pranabackend.onrender.com/api/classes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Error al eliminar la clase")
      }

      // 🆕 Toast de éxito
      toast.success("✅ ¡Clase eliminada correctamente!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // Cerrar modal
      onClose()

      // 🆕 Refetch desde el padre
      if (onDeleteSuccess) {
        await onDeleteSuccess()
      } else {
        // Fallback si no hay callback
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (err: any) {
      console.error("Error al eliminar clase:", err)
      toast.error(`❌ ${err.message || "Error inesperado"}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsDeleting(false) // 🆕 Desbloquear interfaz
    }
  }

  const handleVerDetalles = (clase: any) => {
    setSelectedClase(clase)
    setIsDetalleIndividualOpen(true)
  }

  const handleCloseDetalleIndividual = () => {
    setIsDetalleIndividualOpen(false)
    setSelectedClase(null)
    setSelectedMonth("all")
    setSelectedWeek("all")
    setShowFilters(false)
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getWeekOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const dayOfMonth = date.getDate()
    const firstDayOfWeek = firstDay.getDay()
    return Math.ceil((dayOfMonth + firstDayOfWeek) / 7)
  }

  const getMonthYear = (date: Date) => {
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  }

  const esFechaPasada = (fecha: string) => {
    return new Date(fecha) < new Date()
  }

  const organizarParticipantes = (clase: any) => {
    const allParticipants = [
      ...(clase.participants || []).map((p: any) => ({ ...p, tipo: 'actual' })),
      ...(clase.oldParticipants || []).map((p: any) => ({ ...p, tipo: 'historico' }))
    ]

    const grouped: { [key: string]: { [key: string]: any[] } } = {}

    allParticipants.forEach(participante => {
      const fecha = new Date(participante.eventDate)
      const monthYear = getMonthYear(fecha)
      const weekNumber = getWeekOfMonth(fecha)
      const weekKey = `Semana ${weekNumber}`

      if (!grouped[monthYear]) {
        grouped[monthYear] = {}
      }
      if (!grouped[monthYear][weekKey]) {
        grouped[monthYear][weekKey] = []
      }

      grouped[monthYear][weekKey].push(participante)
    })

    Object.keys(grouped).forEach(month => {
      Object.keys(grouped[month]).forEach(week => {
        grouped[month][week].sort((a, b) =>
          new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
        )
      })
    })

    return grouped
  }

  const handleAgregarAlumno = () => {
    toast.info("ℹ️ Funcionalidad en desarrollo", {
      position: "top-right",
      autoClose: 2500,
    })
  }

  if ((clases.length === 1 && !isDetalleIndividualOpen) || (selectedClase && isDetalleIndividualOpen)) {
    const clase = selectedClase || clases[0]

    const participantesOrganizados = useMemo(() => organizarParticipantes(clase), [clase])

    const mesesDisponibles = useMemo(() => {
      return Object.keys(participantesOrganizados).sort((a, b) => {
        const dateA = new Date(a)
        const dateB = new Date(b)
        return dateB.getTime() - dateA.getTime()
      })
    }, [participantesOrganizados])

    const participantesFiltrados = useMemo(() => {
      if (selectedMonth === "all") {
        return participantesOrganizados
      }

      const monthData = participantesOrganizados[selectedMonth]
      if (!monthData) return {}

      if (selectedWeek === "all") {
        return { [selectedMonth]: monthData }
      }

      return { [selectedMonth]: { [selectedWeek]: monthData[selectedWeek] } }
    }, [participantesOrganizados, selectedMonth, selectedWeek])

    const totalParticipantes = useMemo(() => {
      let total = 0
      Object.values(participantesFiltrados).forEach(monthData => {
        Object.values(monthData).forEach((weekData: any) => {
          total += weekData.length
        })
      })
      return total
    }, [participantesFiltrados])

    function obtenerTiposArray(tipo: string | string[]) {
      return Array.isArray(tipo) ? tipo : [tipo]
    }

    return (
      <Dialog
        open={isOpen && (clases.length === 1 || isDetalleIndividualOpen)}
        onOpenChange={(open) => {
          if (!open) {
            if (isDetalleIndividualOpen) {
              handleCloseDetalleIndividual()
            } else {
              onClose()
            }
          }
        }}
      >
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0 gap-0 overflow-y-auto">
          <div className="top-0 z-10 relative bg-gradient-to-br from-[#5862f0] via-[#6872fe] to-[#7d86ff] text-white p-6 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div className="flex flex-wrap gap-4">
                  <DialogTitle className="text-2xl font-bold text-white mb-2 break-words">
                    {clase.titulo}
                  </DialogTitle>
                  {obtenerTiposArray(clase.tipo).map((t) => (
                    <Badge
                      key={t}
                      className="bg-white/90 backdrop-blur-sm text-[#5862f0] border-0 shadow-md text-sm px-3 py-1 gap-4"
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-white/80" />
                    <span className="text-xs text-white/80 font-semibold uppercase tracking-wide">Horario</span>
                  </div>
                  <p className="text-sm font-bold text-white mb-0.5">{clase.dia}</p>
                  <p className="text-xs text-white/90">{clase.hora} • {clase.duracion}min</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-white/80" />
                    <span className="text-xs text-white/80 font-semibold uppercase tracking-wide">Capacidad</span>
                  </div>
                  <p className="text-xl font-bold text-white mb-0.5">{clase.capacidad}</p>
                  <p className="text-xs text-white/90">personas máx.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <UserCircle className="h-4 w-4 text-white/80" />
                    <span className="text-xs text-white/80 font-semibold uppercase tracking-wide">Profesor</span>
                  </div>
                  <p className="text-sm font-bold text-white break-words" title={clase.profesor}>
                    {clase.profesor}
                  </p>
                </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-white/80" />
                      <span className="text-xs text-white/80 font-semibold uppercase tracking-wide">Modalidad</span>
                    </div>
                    <p className="text-sm font-bold text-white break-words" title={clase?.modalidad}>
                      {clase?.modalidad}
                    </p>
                  </div>
        
              </div>

              {clase.detalles && (
                <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <p className="text-sm text-white/90 italic leading-relaxed">{clase.detalles}</p>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-lg">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5862f0] to-[#7d86ff] flex items-center justify-center shadow-lg flex-shrink-0">
                      <Users className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Participantes Registrados
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white rounded-full text-base font-bold shadow-md">
                          {totalParticipantes} {totalParticipantes === 1 ? 'alumno' : 'alumnos'}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          de {clase.capacidad} disponibles
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full lg:w-auto">
                    <Button
                      variant="outline"
                      size="default"
                      onClick={() => setShowFilters(!showFilters)}
                      disabled={isDeleting} // 🆕
                      className="flex-1 lg:flex-none hover:bg-gray-100 border-2 hover:border-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                      <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                    </Button>

                    <Button
                      size="default"
                      onClick={handleAgregarAlumno}
                      disabled={isDeleting} // 🆕
                      className="flex-1 lg:flex-none bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </div>

              {showFilters && (
                <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-md animate-in slide-in-from-top duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="h-5 w-5 text-[#5862f0]" />
                    <h4 className="font-semibold text-gray-900">Filtrar por período</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mes
                      </label>
                      <select
                        value={selectedMonth}
                        onChange={(e) => {
                          setSelectedMonth(e.target.value)
                          setSelectedWeek("all")
                        }}
                        disabled={isDeleting} // 🆕
                        className="w-full px-4 py-2.5 text-sm border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5862f0] focus:border-[#5862f0] transition-all duration-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="all">📅 Todos los meses</option>
                        {mesesDisponibles.map(mes => (
                          <option key={mes} value={mes}>{mes}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Semana
                      </label>
                      <select
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                        disabled={selectedMonth === "all" || isDeleting} // 🆕
                        className="w-full px-4 py-2.5 text-sm border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5862f0] focus:border-[#5862f0] disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200 transition-all duration-300 hover:border-gray-400"
                      >
                        <option value="all">📊 Todas las semanas</option>
                        {selectedMonth !== "all" && participantesOrganizados[selectedMonth] &&
                          Object.keys(participantesOrganizados[selectedMonth]).map(semana => (
                            <option key={semana} value={semana}>{semana}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {Object.keys(participantesFiltrados).length === 0 || totalParticipantes === 0 ? (
                  <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <UserCircle className="h-12 w-12 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">No hay participantes</h4>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Los alumnos que se inscriban a esta clase aparecerán aquí
                    </p>
                    <Button
                      onClick={handleAgregarAlumno}
                      disabled={isDeleting} // 🆕
                      className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Agregar primer alumno
                    </Button>
                  </div>
                ) : (
                  Object.entries(participantesFiltrados).map(([mes, semanas]) => (
                    <div key={mes} className="rounded-2xl border-2 border-gray-200 overflow-hidden shadow-md bg-white">
                      <div className="relative bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white px-5 py-4 overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '20px 20px'
                          }}></div>
                        </div>
                        <div className="relative z-10 flex items-center justify-between">
                          <h4 className="font-bold text-lg capitalize flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            {mes}
                          </h4>
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold border border-white/30">
                            {Object.values(semanas).reduce((acc: number, arr: any) => acc + arr.length, 0)} alumnos
                          </span>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-200">
                        {Object.entries(semanas).map(([semana, participantes]: [string, any]) => (
                          <div key={semana}>
                            <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-5 py-3 border-b border-gray-200">
                              <div className="flex items-center justify-between">
                                <h5 className="font-bold text-gray-800 flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-[#5862f0]" />
                                  {semana}
                                </h5>
                                <span className="px-2.5 py-1 bg-white rounded-full text-xs font-bold text-gray-700 border border-gray-200 shadow-sm">
                                  {participantes.length}
                                </span>
                              </div>
                            </div>

                            <div className="divide-y divide-gray-100">
                              {participantes.map((participante: any, index: number) => {
                                const fechaPasada = esFechaPasada(participante.eventDate)
                                const esHistorico = participante.tipo === 'historico'

                                return (
                                  <div
                                    key={participante.userId?._id || index}
                                    className={`px-5 py-4 hover:bg-gray-50 transition-all duration-300 ${esHistorico ? 'bg-green-50/30' : ''
                                      }`}
                                  >
                                    <div className="flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0 ${esHistorico
                                          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                                          : 'bg-gradient-to-br from-[#5862f0] to-[#7d86ff]'
                                          }`}>
                                          {participante.userId?.name?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1">
                                            <p className="font-bold text-gray-900 truncate">
                                              {participante.userId?.name && participante.userId?.lastname
                                                ? `${participante.userId.name} ${participante.userId.lastname}`
                                                : participante.userId?.email || 'Sin nombre'
                                              }
                                            </p>
                                            {esHistorico && (
                                              <span className="px-2 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-300 whitespace-nowrap">
                                                Histórico
                                              </span>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-500 truncate">{participante.userId?.email}</p>
                                        </div>
                                      </div>

                                      <div className="text-right flex-shrink-0">
                                        <p className="text-xs text-gray-500 font-medium mb-2">
                                          {formatearFecha(participante.eventDate)}
                                        </p>
                                        {esHistorico ? (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border-2 border-emerald-200 shadow-sm">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Completada
                                          </span>
                                        ) : (
                                          fechaPasada ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border-2 border-emerald-200 shadow-sm">
                                              <CheckCircle2 className="h-3.5 w-3.5" />
                                              Completada
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border-2 border-blue-200 shadow-sm">
                                              <CalendarClock className="h-3.5 w-3.5" />
                                              Próxima
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 border-t-2 border-gray-200 bg-white px-6 py-4 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div>
                {isDetalleIndividualOpen ? (
                  <Button
                    variant="outline"
                    onClick={handleCloseDetalleIndividual}
                    disabled={isDeleting} // 🆕
                    className="hover:bg-gray-100 border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    size="default"
                  >
                    Volver
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isDeleting} // 🆕
                    className="hover:bg-gray-100 border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    size="default"
                  >
                    Cerrar
                  </Button>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => onEdit(clase)}
                  disabled={isDeleting} // 🆕
                  className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="default"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Clase
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleConfirmDelete(clase.id)}
                  disabled={isDeleting} // 🆕 BLOQUEO DEL BOTÓN
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="default"
                >
                  {isDeleting ? (
                    // 🆕 SPINNER MIENTRAS SE ELIMINA
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Eliminando...
                    </span>
                  ) : (
                    <>
                      <Trash className="mr-2 h-4 w-4" />
                      Eliminar
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog
      open={isOpen && !isDetalleIndividualOpen}
      onOpenChange={(open) => {
        if (!open) {
          setSelectedClase(null)
          setIsDetalleIndividualOpen(false)
          onClose()
        }
      }}
    >
      <DialogContent className="sm:max-w-[850px] max-h-[90vh] p-0 gap-0 overflow-y-auto">
        <div className="top-0 z-10 relative bg-gradient-to-br from-[#5862f0] via-[#6872fe] to-[#7d86ff] text-white p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white mb-1">
                  Clases en este horario
                </DialogTitle>
                <DialogDescription className="text-white/90 text-base font-medium">
                  {clases.length} {clases.length === 1 ? 'clase programada' : 'clases programadas'}
                </DialogDescription>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-5">
          {clases.map((clase) => (
            <div
              key={clase.id}
              className="rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#5862f0] hover:shadow-2xl transition-all duration-300 bg-white"
            >
              <div className={`${getTipoClaseGradient(clase.tipo)} p-5 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">{clase.titulo}</h3>
                  <Badge className="bg-white/90 backdrop-blur-sm text-[#5862f0] border-0 shadow-md text-sm px-3 py-1">
                    {formatearTipo(clase.tipo)}
                  </Badge>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5862f0] to-[#7d86ff] flex items-center justify-center shadow-md flex-shrink-0">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Duración</p>
                      <p className="text-lg font-bold text-gray-900">{clase.duracion} min</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5862f0] to-[#7d86ff] flex items-center justify-center shadow-md flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Capacidad</p>
                      <p className="text-lg font-bold text-gray-900">{clase.capacidad}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {(clase.participants?.length || 0) + (clase.oldParticipants?.length || 0)}
                    </div>
                    <div>
                      <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Alumnos inscritos</p>
                      <p className="text-lg font-bold text-blue-900">
                        {(clase.participants?.length || 0) + (clase.oldParticipants?.length || 0)} / {clase.capacidad}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-md flex-shrink-0">
                    <UserCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Profesor</p>
                    <p className="text-base font-bold text-gray-900 truncate">
                      {clase.teacher?.teacherProfile
                        ? `${clase.teacher.teacherProfile.name} ${clase.teacher.teacherProfile.lastname}`
                        : `${clase.teacher?.adminProfile?.name || ""} ${clase.teacher?.adminProfile?.lastname || ""}`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => handleVerDetalles(clase)}
                    disabled={isDeleting} // 🆕
                    className="flex-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver detalles
                  </Button>
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => onEdit(clase)}
                    disabled={isDeleting} // 🆕
                    className="hover:bg-gray-100 border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="default"
                    onClick={() => handleConfirmDelete(clase.id)}
                    disabled={isDeleting} // 🆕 BLOQUEO
                    className="hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? (
                      // 🆕 SPINNER
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-gray-200 bg-white px-8 py-5">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting} // 🆕
            size="default"
            className="w-full hover:bg-gray-100 border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ✅ Funciones al final del archivo

function formatearTipo(tipo: string | string[]) {
  const tipoActual = Array.isArray(tipo) ? tipo[0] : tipo
  return tipoActual.charAt(0).toUpperCase() + tipoActual.slice(1)
}

function getTipoClaseBadgeStyle(tipo: string | string[]) {
  const tipoActual = Array.isArray(tipo) ? tipo[0] : tipo

  const estilos: { [key: string]: string } = {
    hatha: "bg-red-100 text-red-700 border-2 border-red-300",
    aereo: "bg-pink-100 text-pink-700 border-2 border-pink-300",
    ashtanga: "bg-purple-100 text-purple-700 border-2 border-purple-300",
    prenatal: "bg-pink-100 text-pink-700 border-2 border-pink-300",
    intensivo: "bg-orange-100 text-orange-700 border-2 border-orange-300",
    curso: "bg-blue-100 text-blue-700 border-2 border-blue-300",
    formacion: "bg-purple-100 text-purple-700 border-2 border-purple-300",
    exclusivo: "bg-amber-100 text-amber-700 border-2 border-amber-300",
    meditacion: "bg-teal-100 text-teal-700 border-2 border-teal-300",
    respiracion: "bg-cyan-100 text-cyan-700 border-2 border-cyan-300",
    pranayama: "bg-indigo-100 text-indigo-700 border-2 border-indigo-300",
    virtual: "bg-emerald-100 text-emerald-700 border-2 border-emerald-300",
  }
  return estilos[tipoActual.toLowerCase()] || estilos.hatha
}

function getTipoClaseGradient(tipo: string | string[]) {
  const tipoActual = Array.isArray(tipo) ? tipo[0] : tipo

  const gradientes: { [key: string]: string } = {
    hatha: "bg-gradient-to-br from-[#5862f0] via-[#6872fe] to-[#7d86ff]",
    ashtanga: "bg-gradient-to-br from-[#4051d9] via-[#5862f0] to-[#6872fe]",
    aereo: "bg-gradient-to-br from-[#7d86ff] via-[#8d96ff] to-[#9da6ff]",
    prenatal: "bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600",
    intensivo: "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600",
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