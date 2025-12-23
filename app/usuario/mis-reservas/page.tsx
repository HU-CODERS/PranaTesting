"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Users, X, Star, Trash2, CheckCircle, Sparkles, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type ReservaClase = {
  _id: string
  title: string
  teacher: {
    _id: string
    name: string
    email: string
  }
  day: string
  hour: string
  eventDate: string
  inscriptionDate: string
}

export default function MisReservasPage() {
  const [reservas, setReservas] = useState<ReservaClase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [valoracionModal, setValoracionModal] = useState<ReservaClase | null>(null)
  const [claseDetallesModal, setClaseDetallesModal] = useState<ReservaClase | null>(null)
  const [cancelarModal, setCancelarModal] = useState<ReservaClase | null>(null)
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [comentario, setComentario] = useState("")
  const [cancelando, setCancelando] = useState(false)

  const getStudentId = () => {
    return localStorage.getItem('userId') || ''
  }

  useEffect(() => {
    fetchReservas()
  }, [])

  const fetchReservas = async () => {
    try {
      setLoading(true)
      const studentId = getStudentId()
      const token = localStorage.getItem('token')

      const response = await fetch(`https://pranabackend.onrender.com/api/class-reservations/student/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error al cargar las reservas')
      }

      const data = await response.json()
      setReservas(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const cancelarReserva = async (classId: string) => {
    setCancelando(true)
    try {
      const studentId = getStudentId()
      const token = localStorage.getItem('token')

      const response = await fetch('https://pranabackend.onrender.com/api/class-reservations/', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          classId
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al cancelar la reserva')
      }

      await fetchReservas()
      setCancelarModal(null)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al cancelar la reserva')
    } finally {
      setCancelando(false)
    }
  }

  const enviarValoracion = async () => {
    if (rating === 0) {
      alert('Por favor selecciona una calificación')
      return
    }

    try {
      console.log('Valoración enviada:', {
        claseId: valoracionModal?._id,
        rating,
        comentario
      })

      setValoracionModal(null)
      setRating(0)
      setComentario("")
      alert('¡Gracias por tu valoración!')
    } catch (err) {
      alert('Error al enviar la valoración')
    }
  }

  const getEstadoClase = (eventDate: string) => {
    const now = new Date()
    const fechaClase = new Date(eventDate)

    if (fechaClase < now) {
      return {
        estado: 'completada',
        icono: <CheckCircle className="h-4 w-4" />,
        texto: 'Completada',
        color: 'bg-gradient-to-r from-emerald-500 to-teal-600',
        badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200'
      }
    } else {
      return {
        estado: 'confirmada',
        icono: <Sparkles className="h-4 w-4" />,
        texto: 'Confirmada',
        color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        badgeColor: 'bg-blue-100 text-blue-700 border-blue-200'
      }
    }
  }

  const formatearFecha = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatearFechaCorta = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
          {children}
        </div>
      </div>
    )
  }

  // Separar reservas en confirmadas y completadas
  const reservasConfirmadas = reservas.filter(r => getEstadoClase(r.eventDate).estado === 'confirmada')
  const reservasCompletadas = reservas.filter(r => getEstadoClase(r.eventDate).estado === 'completada')

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tus reservas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-16">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar las reservas</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchReservas}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent mb-3">
            Tus Reservas
          </h1>
          <p className="text-lg text-gray-600">
            Gestiona todas tus clases de yoga aquí
          </p>
        </div>

        {reservas.length === 0 ? (
          <div className="text-center py-8">
            <div className="mb-6 flex justify-center">
              <Image src="/logos/logo-1.png" alt="No Reservations" width={100} height={100} />
              </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No tienes reservas aún</h3>
            <p className="text-xl text-gray-600 mb-6 max-w-md mx-auto">
              ¡Comienza tu viaje de bienestar! Explora nuestras clases disponibles.
            </p>
            <Link href="/usuario/asisti-al-espacio" passHref>
              <button className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Explorar Clases
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Sección: Próximas Clases */}
            {reservasConfirmadas.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border-2 border-blue-200">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                      Próximas Clases
                    </h2>
                    <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                      {reservasConfirmadas.length}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reservasConfirmadas.map((reserva) => {
                    const estadoInfo = getEstadoClase(reserva.eventDate)

                    return (
                      <div
                        key={reserva._id}
                        className="group relative bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        {/* Barra superior de color */}
                        <div className={`h-2 ${estadoInfo.color}`} />

                        <div className="p-6">
                          {/* Badge de estado */}
                          <div className="flex justify-between items-start mb-4">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${estadoInfo.badgeColor} border`}>
                              {estadoInfo.icono}
                              <span>{estadoInfo.texto}</span>
                            </div>
                          </div>

                          {/* Título de la clase */}
                          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {reserva.title}
                          </h3>

                          {/* Información de la clase */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                              <div className="bg-blue-100 rounded-full p-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold">{formatearFechaCorta(reserva.eventDate)}</p>
                                <p className="text-xs text-gray-500">{reserva.day}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-700">
                              <div className="bg-purple-100 rounded-full p-2">
                                <Clock className="h-4 w-4 text-purple-600" />
                              </div>
                              <span className="font-semibold">{reserva.hour}</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-700">
                              {reserva.teacher?.name ?
                                <div className="bg-green-100 rounded-full p-2">
                                  <User className="h-4 w-4 text-emerald-600" />
                                </div>
                                : null}
                              <span className="font-semibold">{reserva?.teacher?.name}</span>
                            </div>
                          </div>

                          {/* Botones de acción */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => setClaseDetallesModal(reserva)}
                              className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                            >
                              Ver detalles
                            </button>
                            <button
                              onClick={() => setCancelarModal(reserva)}
                              className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Sección: Clases Completadas */}
            {reservasCompletadas.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full border-2 border-emerald-200">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                      Clases Completadas
                    </h2>
                    <span className="ml-1 px-2 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full">
                      {reservasCompletadas.length}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reservasCompletadas.map((reserva) => {
                    const estadoInfo = getEstadoClase(reserva.eventDate)

                    return (
                      <div
                        key={reserva._id}
                        className="group relative bg-white rounded-2xl shadow-lg border-2 border-emerald-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        {/* Barra superior de color */}
                        <div className={`h-2 ${estadoInfo.color}`} />

                        <div className="p-6">
                          {/* Badge de estado */}
                          <div className="flex justify-between items-start mb-4">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${estadoInfo.badgeColor} border`}>
                              {estadoInfo.icono}
                              <span>{estadoInfo.texto}</span>
                            </div>
                          </div>

                          {/* Título de la clase */}
                          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                            {reserva.title}
                          </h3>

                          {/* Información de la clase */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                              <div className="bg-emerald-100 rounded-full p-2">
                                <Calendar className="h-4 w-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="font-semibold">{formatearFechaCorta(reserva.eventDate)}</p>
                                <p className="text-xs text-gray-500">{reserva.day}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-700">
                              <div className="bg-purple-100 rounded-full p-2">
                                <Clock className="h-4 w-4 text-purple-600" />
                              </div>
                              <span className="font-semibold">{reserva.hour}</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-700">
                              <div className="bg-blue-100 rounded-full p-2">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-semibold">{reserva.teacher.name}</span>
                            </div>
                          </div>

                          {/* Botones de acción */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => setClaseDetallesModal(reserva)}
                              className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                            >
                              Ver detalles
                            </button>
                            <button
                              onClick={() => setValoracionModal(reserva)}
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all shadow-md"
                            >
                              <Star className="h-4 w-4" />
                              Valorar
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal de Confirmación de Cancelación */}
        <Modal isOpen={!!cancelarModal} onClose={() => setCancelarModal(null)}>
          {cancelarModal && (
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¿Cancelar reserva?
                </h3>
                <p className="text-gray-600">
                  Esta acción no se puede deshacerg
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 mb-6 border-2 border-slate-200">
                <h4 className="font-bold text-gray-900 mb-3">{cancelarModal.title}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>📅 {formatearFechaCorta(cancelarModal.eventDate)}</p>
                  <p>🕐 {cancelarModal.hour}</p>
                  {cancelarModal.teacher.name && (
                    <p>👤 {cancelarModal.teacher.name}</p>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-900">
                  💡 La clase será devuelta a tu cuenta
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCancelarModal(null)}
                  className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  No, mantener
                </button>
                <button
                  onClick={() => cancelarReserva(cancelarModal._id)}
                  disabled={cancelando}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
                >
                  {cancelando ? 'Cancelando...' : 'Sí, cancelar'}
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal de Valoración */}
        <Modal isOpen={!!valoracionModal} onClose={() => setValoracionModal(null)}>
          {valoracionModal && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Valorar Clase</h3>
                <button
                  onClick={() => setValoracionModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white fill-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{valoracionModal.title}</h4>
                <p className="text-sm text-gray-600">con {valoracionModal.teacher.name}</p>
              </div>

              <div className="mb-8">
                <p className="text-center text-gray-700 font-semibold mb-4">¿Cómo fue tu experiencia?</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-10 w-10 ${star <= (hoveredStar || rating)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300'
                          } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Comparte tu experiencia (opcional)
                </label>
                <textarea
                  rows={4}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="¿Qué te gustó más de la clase?"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setValoracionModal(null)
                    setRating(0)
                    setComentario("")
                  }}
                  className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={enviarValoracion}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg"
                >
                  Enviar Valoración
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal de Detalles de Clase */}
        <Modal isOpen={!!claseDetallesModal} onClose={() => setClaseDetallesModal(null)}>
          {claseDetallesModal && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Detalles de la Clase</h3>
                <button
                  onClick={() => setClaseDetallesModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{claseDetallesModal.title}</h4>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${getEstadoClase(claseDetallesModal.eventDate).badgeColor} border`}>
                  {getEstadoClase(claseDetallesModal.eventDate).icono}
                  <span>{getEstadoClase(claseDetallesModal.eventDate).texto}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-0.5">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fecha</p>
                    <p className="text-gray-600">{formatearFecha(claseDetallesModal.eventDate)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2 mt-0.5">
                    <Clock className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hora</p>
                    <p className="text-gray-600">{claseDetallesModal.hour}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  {claseDetallesModal.teacher?.name ? (
                    <>
                      <div className="bg-emerald-100 rounded-full p-2 mt-0.5">
                        <User className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="font-semibold text-gray-900">Instructor</p>
                      <p className="text-gray-600">{claseDetallesModal.teacher.name}</p>
                    </>
                  ) : null}
                  <div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 rounded-full p-2 mt-0.5">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Día de la semana</p>
                    <p className="text-gray-600">{claseDetallesModal.day}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {getEstadoClase(claseDetallesModal.eventDate).estado === "confirmada" && (
                  <button
                    onClick={() => {
                      setClaseDetallesModal(null)
                      setCancelarModal(claseDetallesModal)
                    }}
                    className="flex-1 py-3 px-4 border-2 border-red-300 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors"
                  >
                    Cancelar Reserva
                  </button>
                )}
                <button
                  onClick={() => setClaseDetallesModal(null)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  )
}