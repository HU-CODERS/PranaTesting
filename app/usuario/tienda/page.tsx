"use client"

import { useState, useEffect } from "react"
import { Calendar, Zap, Wind, Heart, GraduationCap, Users } from "lucide-react"

interface Membresia {
  _id: string
  name: string
  description: string
  price: number
  classCount: number
  classTypes: string[]
  classTypeAllocations?: Array<{
    classTypeId: string
    count: number
  }>
  createdAt: string
  updatedAt: string
}

const getClassTypeIcon = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case 'hatha':
      return Heart
    case 'ashtanga':
      return Zap
    case 'aereo':
      return Wind
    default:
      return Heart
  }
}

const getClassTypeColor = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case 'hatha':
      return 'bg-sky-100 text-sky-700 border-sky-200'
    case 'ashtanga':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'aereo':
      return 'bg-indigo-100 text-indigo-700 border-indigo-200'
    default:
      return 'bg-blue-100 text-blue-700 border-blue-200'
  }
}

const getClassTypeName = (tipo: string) => {
  switch (tipo.toLowerCase()) {
    case 'hatha':
      return 'Hatha Yoga'
    case 'ashtanga':
      return 'Ashtanga Yoga'
    case 'aereo':
      return 'Yoga Aéreo'
    default:
      return tipo.charAt(0).toUpperCase() + tipo.slice(1)
  }
}

// Función para detectar si es una membresía de formación
const isFormacionMembership = (membresia: Membresia): boolean => {
  const keywords = ['formación', 'formacion', 'profesor', 'profesorado', 'teacher', 'training', 'certificación', 'certificacion']
  const textToCheck = `${membresia.name} ${membresia.description}`.toLowerCase()
  return keywords.some(keyword => textToCheck.includes(keyword))
}

export default function TiendaPage() {
  const [membresias, setMembresias] = useState<Membresia[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [paymentLink, setPaymentLink] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

  const handlePayment = async (membresia: Membresia) => {
    const userId = localStorage.getItem('userId')
    setModalLoading(true)
    try {
      const res = await fetch("https://pranapayment.onrender.com/api/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: membresia.name,
          studentId: userId,
          maxClasses: membresia.classCount,
          unit_price: membresia.price,
          allowedClassTypes: membresia.classTypes,
          classTypeAllocations: membresia.classTypeAllocations || []
        })
      })
      if (!res.ok) throw new Error("Error al crear la preferencia de pago")

      const data = await res.json()
      setPaymentLink(data.init_point)
      setSelectedPlan({ name: membresia.name, price: membresia.price })
      setShowModal(true)
    } catch (err) {
      alert("Error al iniciar el pago. Intenta nuevamente.")
    } finally {
      setModalLoading(false)
    }
  }

  useEffect(() => {
    const fetchMembresias = async () => {
      try {
        const response = await fetch('https://pranabackend.onrender.com/api/membership')
        if (!response.ok) {
          throw new Error('Error al cargar las membresías')
        }
        const data = await response.json()
        setMembresias(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchMembresias()
  }, [])

  // Separar membresías
  const membresiasRegulares = membresias.filter(m => !isFormacionMembership(m))
  const membresiasFormacion = membresias.filter(m => isFormacionMembership(m))

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando abonos...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors duration-200"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Principal */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Nuestros Abonos
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Encuentra el abono perfecto para tu práctica de yoga y comienza tu transformación hoy
        </p>
      </div>

      {/* SECCIÓN: ABONOS REGULARES */}
      {membresiasRegulares.length > 0 && (
        <div className="mb-20">
          {/* Header de sección */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
              <Users className="h-7 w-7 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Abonos para Clases Regulares
              </h2>
            </div>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Practica yoga con flexibilidad y elige el plan que mejor se adapte a tu ritmo
            </p>
          </div>

          {/* Grid de membresías regulares */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membresiasRegulares.map((membresia, index) => (
              <div
                key={membresia._id}
                className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-blue-200 p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Badge superior */}
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                      ✨ Más Popular
                    </span>
                  </div>
                )}

                <div className="flex-1 mt-2">
                  {/* Nombre del plan */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {membresia.name}
                    </h3>

                    <p className="text-base font-medium text-gray-700 mb-6 leading-relaxed">
                      {membresia.description}
                    </p>

                    {/* Precio */}
                    <div className="flex items-baseline justify-center mb-6">
                      <span className="text-4xl font-bold text-indigo-600">
                        ${membresia.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-1 self-end mb-1">
                        /mes
                      </span>
                    </div>
                  </div>

                  {/* Información de clases */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center mb-6 bg-white border-2 border-blue-200 rounded-xl p-4 shadow-sm">
                      <Calendar className="h-6 w-6 text-indigo-600 mr-3" />
                      <span className="text-lg font-semibold text-gray-800">
                        {membresia.classCount} clases por mes
                      </span>
                    </div>

                    {/* Tipos de clase */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                        Clases incluidas:
                      </h4>

                      {membresia.classTypeAllocations && membresia.classTypeAllocations.length > 0 ? (
                        <div className="space-y-3">
                          {membresia.classTypeAllocations.map((allocation, idx) => {
                            const IconComponent = getClassTypeIcon(allocation.classTypeId)
                            const colorClasses = getClassTypeColor(allocation.classTypeId)
                            const displayName = getClassTypeName(allocation.classTypeId)

                            return (
                              <div
                                key={idx}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl ${colorClasses} shadow-sm border`}
                              >
                                <div className="flex items-center">
                                  <IconComponent className="h-5 w-5 mr-3" />
                                  <span className="font-medium">{displayName}</span>
                                </div>
                                <span className="font-bold text-lg">
                                  {allocation.count} clases
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3 justify-center">
                          {membresia.classTypes.map((tipo, idx) => {
                            const IconComponent = getClassTypeIcon(tipo)
                            const colorClasses = getClassTypeColor(tipo)
                            const displayName = getClassTypeName(tipo)

                            return (
                              <div
                                key={idx}
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${colorClasses} shadow-sm`}
                              >
                                <IconComponent className="h-4 w-4 mr-2" />
                                {displayName}
                              </div>
                            )
                          })}
                          <p className="w-full text-center text-sm text-gray-500 mt-2">
                            Distribución flexible de {membresia.classCount} clase
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botón de acción */}
                <button
                  disabled={modalLoading}
                  onClick={() => handlePayment(membresia)}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {modalLoading ? 'Cargando...' : 'Seleccionar Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIVISOR */}
      {membresiasRegulares.length > 0 && membresiasFormacion.length > 0 && (
        <div className="my-16">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 py-3 text-gray-500 font-medium rounded-full border-2 border-gray-200">
                •••
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN: FORMACIÓN DE PROFESORES */}
      {membresiasFormacion.length > 0 && (
        <div className="mb-20">
          {/* Header de sección */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200">
              <GraduationCap className="h-7 w-7 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-800">
                Programas de Formación de Profesores
              </h2>
            </div>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Conviértete en profesor certificado con nuestros programas de formación profesional
            </p>
          </div>

          {/* Grid de membresías de formación */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {membresiasFormacion.map((membresia) => (
              <div
                key={membresia._id}
                className="relative bg-gradient-to-br from-white via-emerald-50 to-green-50 rounded-2xl shadow-lg border-2 border-emerald-200 p-8 flex flex-col h-full hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Badge superior */}
                <div className="flex-1 mt-2">
                  {/* Nombre del plan */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {membresia.name}
                    </h3>

                    <p className="text-base font-medium text-gray-700 mb-6 leading-relaxed">
                      {membresia.description}
                    </p>

                    {/* Precio */}
                    <div className="flex items-baseline justify-center mb-6">
                      <span className="text-4xl font-bold text-emerald-600">
                        ${membresia.price}
                      </span>
                      <span className="text-sm text-gray-500 ml-1 self-end mb-1">
                        /mes
                      </span>
                    </div>
                  </div>

                  {/* Información de clases */}
                  <div className="mb-8">
                    <div className="flex items-center justify-center mb-6 bg-white border-2 border-emerald-200 rounded-xl p-4 shadow-sm">
                      <Calendar className="h-6 w-6 text-emerald-600 mr-3" />
                      <span className="text-lg font-semibold text-gray-800">
                        {membresia.classCount} clases por mes
                      </span>
                    </div>

                    {/* Tipos de clase */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                        Clases incluidas:
                      </h4>

                      {membresia.classTypeAllocations && membresia.classTypeAllocations.length > 0 ? (
                        <div className="space-y-3">
                          {membresia.classTypeAllocations.map((allocation, idx) => {
                            const IconComponent = getClassTypeIcon(allocation.classTypeId)
                            const colorClasses = getClassTypeColor(allocation.classTypeId)
                            const displayName = getClassTypeName(allocation.classTypeId)

                            return (
                              <div
                                key={idx}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl ${colorClasses} shadow-sm border`}
                              >
                                <div className="flex items-center">
                                  <IconComponent className="h-5 w-5 mr-3" />
                                  <span className="font-medium">{displayName}</span>
                                </div>
                                <span className="font-bold text-lg">
                                  {allocation.count} clases
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3 justify-center">
                          {membresia.classTypes.map((tipo, idx) => {
                            const IconComponent = getClassTypeIcon(tipo)
                            const colorClasses = getClassTypeColor(tipo)
                            const displayName = getClassTypeName(tipo)

                            return (
                              <div
                                key={idx}
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${colorClasses} shadow-sm`}
                              >
                                <IconComponent className="h-4 w-4 mr-2" />
                                {displayName}
                              </div>
                            )
                          })}
                          <p className="w-full text-center text-sm text-gray-500 mt-2">
                            Distribución flexible de {membresia.classCount} clases
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botón de acción */}
                <button
                  disabled={modalLoading}
                  onClick={() => handlePayment(membresia)}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {modalLoading ? 'Cargando...' : 'Seleccionar Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado vacío */}
      {membresias.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="mb-4 text-6xl">🧘‍♀️</div>
          <p className="text-gray-600 text-xl mb-4">
            No hay membresías disponibles en este momento
          </p>
          <p className="text-gray-500">Vuelve pronto para ver nuestras ofertas</p>
        </div>
      )}

      {/* Modal de pago */}
      {showModal && paymentLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💳</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Redirección a MercadoPago
              </h2>
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              <strong>No cierres la página de MercadoPago al finalizar la compra.</strong> Serás redirigido automáticamente a nuestro sitio una vez completado el pago.
            </p>
            
            <button
              onClick={() => {
                setShowModal(false)
                window.location.href = paymentLink
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg"
            >
              Ir a MercadoPago
            </button>
            
            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}