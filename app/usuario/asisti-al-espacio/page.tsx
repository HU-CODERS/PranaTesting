"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Info, User, X, Check, Flower, ChevronDown, ChevronUp, Calendar } from "lucide-react"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


// Types adaptados al backend
interface Plan {
  title?: string
  currentClasses?: number
  expirationDate?: string
  allowedClassTypes?: string[]
  // NUEVO: Sistema de asignaciones específicas
  classTypeAllocations?: Array<{
    classTypeId: string
    totalCount: number
    remainingCount: number
  }>
  // Campos opcionales existentes
  description?: string
  price?: number
  features?: string[]
}

interface Teacher {
  _id: string
  name: string
  bio?: string
}

interface ClassData {
  _id: string
  title: string
  day: string
  hour: string // Desde el backend
  type: string
  teacher: Teacher
  duration: number
  participants: string[]
  maxParticipants: number
  whatInclude: string
  description: string
  // Campos calculados para el frontend
  isReserved?: boolean
  canCancel?: boolean
}

interface Day {
  id: string
  name: string
  emoji: string
}

// Component Props Interfaces
interface MembershipCardProps {
  plan: Plan
}

interface DayNavigationProps {
  days: Day[]
  selectedDay: string
  onDaySelect: (dayId: string) => void
}

interface ClassCardProps {
  classData: ClassData
  onReserve: (classId: string) => void
  onCancel: (classId: string) => void
  plan: Plan | null
}

interface ConfirmationModalProps {
  isOpen: boolean
  type: 'reserve' | 'cancel'
  classData: ClassData | null
  remainingClasses: number
  membership: Plan | null
  onConfirm: () => void
  onCancel: () => void
  isReserving?: boolean
}

interface SuccessModalProps {
  isOpen: boolean
  type: 'reserve' | 'cancel'
  classData: ClassData | null
  membership: Plan | null
  onClose: () => void
}

// Nueva función helper para detectar tipo de membresía
const isNewMembershipSystem = (plan: Plan | null): boolean => {
  return !!(plan?.classTypeAllocations &&
    Array.isArray(plan.classTypeAllocations) &&
    plan.classTypeAllocations.length > 0)
}

// Nueva función helper para obtener clases disponibles por tipo
const getAvailableClassesByType = (plan: Plan | null): Record<string, number> => {
  if (!plan) return {}

  if (isNewMembershipSystem(plan)) {
    const available: Record<string, number> = {}
    plan.classTypeAllocations!.forEach(allocation => {
      available[allocation.classTypeId] = allocation.remainingCount
    })
    return available
  }

  // Sistema antiguo: no hay información específica por tipo
  return {}
}

// Nueva función helper para verificar si puede tomar una clase específica
const canTakeClassType = (plan: Plan | null, classType: string): boolean => {
  if (!plan) return false

  if (isNewMembershipSystem(plan)) {
    // Sistema nuevo: verificar asignación específica
    const allocation = plan.classTypeAllocations!.find(
      alloc => alloc.classTypeId.toLowerCase() === classType.toLowerCase()
    )
    return allocation ? allocation.remainingCount > 0 : false
  } else {
    // Sistema antiguo: verificar allowedClassTypes y currentClasses
    const isTypeAllowed = plan.allowedClassTypes?.some(
      type => type.toLowerCase() === classType.toLowerCase()
    ) ?? false
    return isTypeAllowed && (plan.currentClasses ?? 0) > 0
  }
}

// Reusable Components
const MembershipCard = ({ plan }: MembershipCardProps) => {
  const isNewSystem = isNewMembershipSystem(plan)
  const availableByType = getAvailableClassesByType(plan)

  const totalClasses = isNewSystem
    ? Object.values(availableByType).reduce((sum, count) => sum + count, 0)
    : plan.currentClasses ?? 0

  return (
    <TooltipProvider>
      <div className="mb-6 md:mb-8 px-2">
        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          {/* Accent bar lateral */}
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600" />

          <CardContent className="p-5 md:p-6 pl-6 md:pl-7">
            {/* Header row - todo en una línea */}
            <div className="flex items-center justify-between mb-4">
              {/* Lado izquierdo: título */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 truncate">
                  {plan.title}
                </h3>
              </div>

              {/* Lado derecho: fecha con tooltip */}
              <div className="flex items-center gap-2 flex-shrink-0 sm:flex">
                <Badge className="bg-blue-600 text-white border-0 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span className="hidden md:inline">Expira: </span>
                  {plan.expirationDate
                    ? new Date(plan.expirationDate).toLocaleDateString('es-AR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })
                    : 'Sin fecha'}
                </Badge>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="text-sm">Si tu membresía expira, las clases que no hayas tomado las perderás.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Contador principal + info - en dos columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Columna izquierda: contador grande */}
              <div className="flex items-center gap-4">
                <div className="text-5xl md:text-6xl font-black text-blue-600 leading-none">
                  {totalClasses}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-700">clases disponibles</div>
                  <div className="text-xs text-slate-500">
                    {isNewSystem ? 'por tipo de clase' : 'este mes'}
                  </div>
                </div>
              </div>

              {/* Columna derecha: tipos de clases */}
              <div className="bg-white rounded-xl p-3 border border-blue-100 shadow-sm">
                <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1">
                  <Info className="h-3 w-3 text-blue-600" />
                  {isNewSystem ? 'Distribuidas por tipo:' : 'Clases incluidas:'}
                </div>

                {isNewSystem ? (
                  // Sistema nuevo: mostrar como lista compacta
                  <div className="space-y-1.5">
                    {plan.classTypeAllocations!.map((allocation, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-700 capitalize">
                          {allocation.classTypeId}
                        </span>
                        <span className="font-bold text-blue-600">
                          {allocation.remainingCount}/{allocation.totalCount}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Sistema antiguo: mostrar badges inline
                  <div className="flex flex-wrap gap-1">
                    {plan?.allowedClassTypes?.map((className) => (
                      <span
                        key={className}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Fecha en mobile - abajo de todo con tooltip */}
            <div className="sm:hidden mt-4 pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Calendar className="w-3 h-3 text-blue-600" />
                  <span className="font-medium">Expira:</span>
                  <span className="font-bold text-blue-600">
                    {plan.expirationDate
                      ? new Date(plan.expirationDate).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                      : 'Sin fecha'}
                  </span>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-xs">
                    <p className="text-sm">Si tu membresía expira, las clases que no hayas tomado las perderás.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

const DayNavigation = ({ days, selectedDay, onDaySelect }: DayNavigationProps) => (
  <div className="mb-8 md:mb-10 px-4">
    {/* Header minimalista */}
    <div className="text-center mb-6 md:mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
        ¿Qué día querés practicar?
      </h2>
      <p className="text-sm text-slate-500">
        Seleccioná un día para ver las clases disponibles
      </p>
    </div>

    {/* Grid de días - diseño limpio y moderno */}
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
        {days.map((day) => {
          const isSelected = selectedDay === day.id
          return (
            <button
              key={day.id}
              onClick={() => onDaySelect(day.id)}
              className={`
                relative group
                flex flex-col items-center justify-center
                p-4 md:p-5
                rounded-2xl md:rounded-3xl
                transition-all duration-200 ease-out
                ${isSelected
                  ? 'bg-blue-100 shadow-lg shadow-blue-600/25'
                  : 'bg-white hover:bg-slate-50 shadow-sm hover:shadow-md border border-slate-200'
                }
              `}
            >
              {/* Imagen (logo de Prana o cualquier imagen) */}
              <div className={`
                w-12 h-12 md:w-14 md:h-14 mb-2 md:mb-3
                transition-all duration-200
              `}>
                <img
                  src={day.emoji}
                  alt={day.name}
                />
              </div>

              {/* Nombre del día */}
              <span className={`
                text-xs md:text-sm font-bold
                ${isSelected
                  ? 'text-black'
                  : 'text-slate-700'
                }
              `}>
                {day.name}
              </span>

              {/* Check indicator para el día seleccionado */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full p-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>

    {/* Indicador del día seleccionado */}
    <div className="text-center mt-6">
      <div className="inline-flex items-center gap-2 text-sm text-slate-600">
        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
        <span>
          Clases del{' '}
          <span className="font-bold text-blue-600 capitalize">
            {days.find(d => d.id === selectedDay)?.id}
          </span>
        </span>
      </div>
    </div>
  </div>
)

const ClassCard = ({ classData, onReserve, onCancel, plan }: ClassCardProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true)
  const canTakeThisClass = canTakeClassType(plan, classData.type)
  const isNewSystem = isNewMembershipSystem(plan)
  const availableByType = getAvailableClassesByType(plan)

  const remainingForThisType = isNewSystem
    ? availableByType[classData.type.toLowerCase()] ?? 0
    : (plan?.currentClasses ?? 0)

  const getAvailabilityMessage = () => {
    if (!plan) return { available: false, message: 'Sin membresía activa' }

    if (isNewSystem) {
      if (canTakeThisClass) {
        return {
          available: true,
          message: `${remainingForThisType} clases ${classData.type} disponibles`
        }
      } else {
        return {
          available: false,
          message: `Sin clases ${classData.type} disponibles`
        }
      }
    } else {
      // Sistema antiguo
      const isTypeAllowed = plan.allowedClassTypes?.some(
        type => type.toLowerCase() === classData.type.toLowerCase()
      )

      if (!isTypeAllowed) {
        return { available: false, message: 'No incluido en tu plan' }
      }

      if ((plan.currentClasses ?? 0) <= 0) {
        return { available: false, message: 'Sin clases disponibles' }
      }

      return {
        available: true,
        message: `${plan.currentClasses} clases disponibles`
      }
    }
  }

  const availability = getAvailabilityMessage()

  // Calcular disponibilidad basado en participantes actuales vs máximo
  const getAvailability = () => {
    const occupied = classData.participants?.length || 0
    const total = classData.maxParticipants
    const available = total - occupied
    return { available, total, occupied }
  }

  const getAvailabilityPercentage = () => {
    const { occupied, total } = getAvailability()
    return (occupied / total) * 100
  }

  const getUrgencyLevel = () => {
    const percentage = getAvailabilityPercentage()
    if (percentage >= 80) return 'high'
    if (percentage >= 60) return 'medium'
    return 'low'
  }

  const urgencyColors = {
    high: 'from-red-400 to-orange-500',
    medium: 'from-yellow-400 to-orange-400',
    low: 'from-emerald-400 to-teal-500'
  }

  // Parsear materiales del campo whatInclude - solo si existe contenido válido
  const materials = classData.whatInclude && classData.whatInclude.trim().length >= 6
    ? classData.whatInclude.split(',').map(item => item.trim()).filter(item => item.length >= 6)
    : []

  // Validar si la descripción es válida (más de 6 caracteres)
  const hasValidDescription = classData.description?.trim() && classData.description.trim().length >= 6

  const { available, total, occupied } = getAvailability()
  const urgency = getUrgencyLevel()

  return (
    <Card className="group overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-slate-200 rounded-3xl mb-4 md:mb-6">
      {/* Barra de color superior según disponibilidad */}
      <div className={`h-1.5 w-full bg-gradient-to-r transition-all duration-500 ${availability.available
          ? 'from-emerald-400 via-teal-500 to-cyan-500'
          : 'from-slate-300 to-slate-400'
        }`} />

      <CardContent className="p-0">
        <div className="p-5 sm:p-6 md:p-7">
          {/* Header Section - Rediseñado */}
          <div className="mb-5 md:mb-6">
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                {classData.title}
              </h3>
              {classData.teacher?.name && (
                <div className="flex items-center gap-2 text-slate-500">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{classData.teacher.name}</span>
                </div>
              )}
            </div>

            {/* Info Pills - Rediseñadas */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <div className="group/pill flex items-center gap-2 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl px-3 py-2 transition-all border border-blue-100">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-sm text-blue-900">{classData.hour}</span>
              </div>

              <div className="group/pill flex items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl px-3 py-2 transition-all border border-purple-100">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="font-semibold text-sm text-purple-900">Presencial</span>
              </div>

              <div className="group/pill flex items-center gap-2 bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-xl px-3 py-2 transition-all border border-emerald-100">
                <Flower className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold text-sm text-emerald-900 capitalize">{classData.type}</span>
              </div>
            </div>
          </div>

          {/* Cupos disponibles - Mejorado */}
          {availability.available && (
            <div className="mb-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Cupos disponibles</span>
                <span className="text-sm font-bold text-slate-900">{available} de {total}</span>
              </div>

              {/* Barra de progreso */}
              <div className="relative w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full bg-gradient-to-r ${urgencyColors[urgency]} transition-all duration-500 rounded-full`}
                  style={{ width: `${(occupied / total) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">{occupied} reservados</span>
                {urgency === 'high' && (
                  <span className="text-xs font-semibold text-orange-600 animate-pulse">¡Últimos cupos!</span>
                )}
              </div>
            </div>
          )}

          {/* Mensaje de disponibilidad de membresía - Rediseñado */}
          <div className="mb-5">
            <div className={`rounded-2xl p-4 border-2 transition-all ${availability.available
              ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
              : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
              }`}>
              <div className="flex items-start gap-3">
                <div className={`rounded-full p-2 flex-shrink-0 ${availability.available
                  ? 'bg-emerald-100'
                  : 'bg-red-100'
                  }`}>
                  {availability.available ? (
                    <Check className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <X className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className={`font-bold text-sm block ${availability.available
                    ? 'text-emerald-800'
                    : 'text-red-800'
                    }`}>
                    {availability.message}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción expandible - Solo si existe */}
          {classData.description?.trim() && (
            <div className="mb-5">
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="flex items-center justify-between w-full text-left group/desc"
              >
                <span className="text-sm font-bold text-slate-700 group-hover/desc:text-blue-600 transition-colors">
                  Sobre la clase
                </span>
                {isDescriptionExpanded ? (
                  <ChevronUp className="h-4 w-4 text-slate-500 group-hover/desc:text-blue-600 transition-all" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500 group-hover/desc:text-blue-600 transition-all" />
                )}
              </button>

              {isDescriptionExpanded && (
                <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-in slide-in-from-top-2">
                  <p className="text-sm text-slate-700 leading-relaxed">{classData.description}</p>
                </div>
              )}
            </div>
          )}

          {/* Materiales incluidos - Solo si existen */}
          {materials.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-amber-700" />
                <span className="text-sm font-bold text-amber-900">Incluye</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {materials.map((material, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-white text-amber-800 border border-amber-200"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button - Completamente rediseñado */}
        <div className="px-5 sm:px-6 md:px-7 pb-5 sm:pb-6 md:pb-7">
          {classData.isReserved ? (
            <div className="space-y-3">
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-lg">
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
                <div className="relative flex items-center gap-3">
                  <div className="bg-white/30 backdrop-blur rounded-full p-2">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-white">¡Reserva confirmada!</span>
                </div>
              </div>
              {classData.canCancel && (
                <Button
                  onClick={() => onCancel(classData._id)}
                  variant="outline"
                  className="w-full h-12 border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 font-bold rounded-2xl transition-all hover:shadow-lg"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar reserva
                </Button>
              )}
            </div>
          ) : (
            availability.available ? (
              <Button
                onClick={() => onReserve(classData._id)}
                disabled={available === 0}
                className={`w-full h-14 font-bold rounded-2xl transition-all duration-300 text-base ${available === 0
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-0.5'
                  }`}
              >
                {available === 0 ? (
                  <div className="flex items-center gap-2">
                    <X className="h-5 w-5" />
                    <span>Sin cupos disponibles</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>✨ Reservar ahora</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {remainingForThisType} disponibles
                    </span>
                  </div>
                )}
              </Button>
            ) : (
              <Button
                disabled
                className="w-full h-14 font-bold rounded-2xl bg-slate-300 text-slate-500 cursor-not-allowed text-base"
              >
                <div className="flex items-center gap-2">
                  <X className="h-5 w-5" />
                  <span>{availability.message}</span>
                </div>
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Modal de confirmación
const ConfirmationModal = ({ isOpen, type, classData, remainingClasses, membership, onConfirm, onCancel, isReserving }: ConfirmationModalProps) => {
  if (!isOpen || !classData) return null

  // Obtener información específica de la membresía
  const isNewSystem = isNewMembershipSystem(membership)
  const availableByType = getAvailableClassesByType(membership)
  const canTakeThisType = canTakeClassType(membership, classData.type)

  // Calcular clases restantes específicas para este tipo
  const remainingForThisType = isNewSystem
    ? availableByType[classData.type.toLowerCase()] ?? 0
    : remainingClasses

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
              {type === 'reserve' ? '✨ Confirmar reserva' : '❌ Cancelar reserva'}
            </h3>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-4 md:p-6">
              <h4 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                {classData.title}
              </h4>
              <p className="text-slate-600 text-sm md:text-base">
                {classData.hour} • {classData.teacher?.name} • <span className="capitalize">{classData.type}</span>
              </p>
            </div>

            {/* NUEVA SECCIÓN: Información específica de la membresía */}
            <div className={`rounded-2xl p-4 md:p-6 border-2 ${canTakeThisType
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-red-50 border-red-200'
              }`}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`rounded-full p-1 ${canTakeThisType
                    ? 'bg-emerald-100'
                    : 'bg-red-100'
                    }`}>
                    {canTakeThisType ? (
                      <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <span className={`font-semibold text-sm ${canTakeThisType
                    ? 'text-emerald-700'
                    : 'text-red-700'
                    }`}>
                    {isNewSystem ? 'Sistema Nuevo de Membresías' : 'Sistema Antiguo de Membresías'}
                  </span>
                </div>

                {isNewSystem ? (
                  <div className="text-sm text-slate-700">
                    <p className="font-semibold mb-2">Clases disponibles por tipo:</p>
                    <div className="space-y-1">
                      {Object.entries(availableByType).map(([classType, remaining]) => (
                        <div key={classType} className={`flex justify-between px-3 py-1 rounded-lg ${classType === classData.type.toLowerCase()
                          ? 'bg-blue-100 border border-blue-300 font-semibold'
                          : 'bg-white'
                          }`}>
                          <span className="capitalize">{classType}:</span>
                          <span>{remaining} restantes</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-slate-700">
                    <p>Tienes <strong>{remainingClasses} clases disponibles</strong> en tu membresía.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-slate-700 leading-relaxed text-sm md:text-lg">
              {type === 'reserve' ? (
                <div className="space-y-2">
                  <p>
                    {isNewSystem ? (
                      <>Esto te consumirá <span className="font-bold text-blue-600">1 clase de {classData.type}</span> de las <span className="font-bold">{remainingForThisType} disponibles</span>.</>
                    ) : (
                      <>Esto te consumirá <span className="font-bold text-blue-600">1 de tus {remainingClasses} clases restantes</span>.</>
                    )}
                  </p>
                  <p className="text-xs md:text-sm text-slate-500">
                    ⚠️ Recordá que solo podés cancelar con más de 24 horas de anticipación.
                  </p>
                </div>
              ) : (
                <p>
                  ¿Seguro que querés cancelar tu reserva?
                  <br /><br />
                  <span className="text-xs md:text-sm text-slate-500">
                    {isNewSystem
                      ? `Esta clase de ${classData.type} volverá a estar disponible.`
                      : 'Esta clase volverá a estar disponible para otros usuarios.'
                    }
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 md:gap-4">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 h-10 md:h-12 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl text-sm md:text-base"
            >
              {type === 'reserve' ? 'Cancelar' : 'Volver'}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={(type === 'reserve' && !canTakeThisType) || isReserving}
              className={`flex-1 h-10 md:h-12 font-bold rounded-xl text-sm md:text-base ${type === 'reserve' && (!canTakeThisType || isReserving)
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : type === 'reserve'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  : 'bg-red-600 hover:bg-red-700'
                } text-white shadow-lg`}
            >
              {type === 'reserve' ?
                (isReserving ? '⏳ Procesando...' : canTakeThisType ? '✨ Confirmar' : 'Sin clases disponibles') :
                '❌ Confirmar cancelación'
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal de éxito
const SuccessModal = ({ isOpen, type, classData, membership, onClose }: SuccessModalProps) => {
  if (!isOpen || !classData) return null

  const isNewSystem = isNewMembershipSystem(membership)
  const availableByType = getAvailableClassesByType(membership)
  
  const remainingForThisType = isNewSystem
    ? availableByType[classData.type.toLowerCase()] ?? 0
    : (membership?.currentClasses ?? 0)

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 md:p-8">
          {/* Ícono de éxito animado */}
          <div className="flex justify-center mb-6">
            <div className={`relative ${type === 'reserve' 
              ? 'bg-gradient-to-br from-emerald-400 to-teal-500' 
              : 'bg-gradient-to-br from-blue-400 to-indigo-500'
            } rounded-full p-6 shadow-lg animate-in zoom-in duration-500`}>
              <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping" />
              {type === 'reserve' ? (
                <Check className="h-12 w-12 text-white relative z-10" />
              ) : (
                <Check className="h-12 w-12 text-white relative z-10" />
              )}
            </div>
          </div>

          {/* Título */}
          <h3 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-2">
            {type === 'reserve' ? '¡Reserva confirmada! ✨' : '¡Cancelación exitosa! ✅'}
          </h3>
          
          <p className="text-center text-slate-600 mb-6">
            {type === 'reserve' 
              ? 'Tu lugar está asegurado' 
              : 'Tu reserva ha sido cancelada'}
          </p>

          {/* Detalles de la clase */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 mb-6 border border-slate-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                <Flower className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-900 mb-1 text-lg">
                  {classData.title}
                </h4>
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{classData.hour}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {classData.teacher?.name && <User className="h-4 w-4" />}
                    <span>{classData.teacher?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flower className="h-4 w-4" />
                    <span className="capitalize">{classData.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clases restantes */}
            {type === 'reserve' && (
              <div className="pt-4 border-t border-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">
                    Clases restantes:
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    {remainingForThisType}
                    {isNewSystem && ` (${classData.type})`}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Recordatorio */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                {type === 'reserve' 
                  ? 'Recordá llegar 10 minutos antes. Solo podés cancelar con más de 24 horas de anticipación.' 
                  : 'El cupo ahora está disponible para otros usuarios.'}
              </p>
            </div>
          </div>

          {/* Botón de cerrar */}
          <Button
            onClick={onClose}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg"
          >
            Entendido
          </Button>
        </div>
      </div>
    </div>
  )
}

const EmptyState = () => (
  <div className="text-center py-12 md:py-16">
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-md mx-auto">
      <div className="text-4xl md:text-6xl mb-3 md:mb-4">🧘‍♀️</div>
      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">
        Sin clases programadas
      </h3>
      <p className="text-sm md:text-base text-slate-600">
        No hay clases disponibles para este día
      </p>
    </div>
  </div>
)

// Nuevo componente para los headers de sección
const SectionHeader = ({ title, count, isAvailable }: { title: string; count: number; isAvailable: boolean }) => (
  <div className={`mb-4 md:mb-6 p-4 rounded-2xl border-2 ${isAvailable
      ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
      : 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-300'
    }`}>
    <div className="flex items-center gap-3">
      <div className={`rounded-full p-2 ${isAvailable ? 'bg-emerald-100' : 'bg-slate-200'
        }`}>
        {isAvailable ? (
          <Check className="h-5 w-5 text-emerald-600" />
        ) : (
          <X className="h-5 w-5 text-slate-600" />
        )}
      </div>
      <div className="flex-1">
        <h3 className={`text-base md:text-lg font-bold ${isAvailable ? 'text-emerald-900' : 'text-slate-700'
          }`}>
          {title}
        </h3>
        <p className="text-xs md:text-sm text-slate-600">
          {count} {count === 1 ? 'clase' : 'clases'}
        </p>
      </div>
    </div>
  </div>
)

// Main Component
export default function AsistiAlEspacio() {
  const [classes, setClasses] = useState<ClassData[]>([])
  const [membership, setMembership] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')

        if (!token) {
          throw new Error('No se encontró token de autenticación')
        }

        const res = await fetch('https://pranabackend.onrender.com/api/classes', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!res.ok) {
          throw new Error(`Error al obtener clases: ${res.status}`)
        }

        const data = await res.json()
        setClasses(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar clases:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchClasses()
  }, [])

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const studentId = localStorage.getItem('userId')

        if (!token) {
          throw new Error('No se encontró token de autenticación')
        }

        const res = await fetch(`https://pranabackend.onrender.com/api/student/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!res.ok) {
          throw new Error(`Error al obtener membresía: ${res.status}`)
        }

        const data = await res.json()
        setMembership(data.membership)
        setError(null)
      } catch (err) {
        console.error('Error al cargar membresía:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchMembership()
  }, [])

  useEffect(() => {
    const fetchUserReservations = async () => {
      try {
        const token = localStorage.getItem('token')
        const studentId = localStorage.getItem('userId')

        if (!token || !studentId) return

        const res = await fetch(`https://pranabackend.onrender.com/api/class-reservations/student/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (res.ok) {
          const reservations = await res.json()
          const reservedIds = reservations.map((reservation: { _id: any }) => reservation._id)
          setReservedClassIds(reservedIds)
        }
      } catch (err) {
        console.error('Error al cargar reservas del usuario:', err)
      }
    }

    fetchUserReservations()
  }, [])

  const days: Day[] = [
    { id: "Lunes", name: "Lun", emoji: "/logos/logo-1.png" },
    { id: "Martes", name: "Mar", emoji: "/logos/logo-2.png" },
    { id: "Miércoles", name: "Mié", emoji: "/logos/logo-3.png" },
    { id: "Jueves", name: "Jue", emoji: "/logos/logo-4.png" },
    { id: "Viernes", name: "Vie", emoji: "/logos/logo-1.png" },
    { id: "Sábado", name: "Sáb", emoji: "/logos/logo-2.png" }
  ]

  // State
  const [selectedDay, setSelectedDay] = useState("Lunes")
  const [remainingClasses, setRemainingClasses] = useState<number>(membership?.currentClasses ?? 0)
  const [reservedClassIds, setReservedClassIds] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'reserve' | 'cancel'>('reserve')
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successModalType, setSuccessModalType] = useState<'reserve' | 'cancel'>('reserve')

  // Handlers
  const handleReserve = (classId: string) => {
    const classData = findClassById(classId)
    if (classData) {
      setSelectedClass(classData)
      setModalType('reserve')
      setShowModal(true)
    }
  }

  const handleCancel = (classId: string) => {
    const classData = findClassById(classId)
    if (classData) {
      setSelectedClass(classData)
      setModalType('cancel')
      setShowModal(true)
    }
  }
  const [isReserving, setIsReserving] = useState(false)

  const confirmReservation = async () => {
    if (selectedClass && !isReserving) {
      setIsReserving(true)

      console.log('🚀 Iniciando reserva...')
      console.log('📊 Membresía antes:', membership)
      console.log('🎯 Clase seleccionada:', selectedClass)

      try {
        const token = localStorage.getItem('token')
        const studentId = localStorage.getItem('userId')

        const res = await fetch('https://pranabackend.onrender.com/api/class-reservations/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            studentId: studentId,
            classId: selectedClass._id
          })
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Error al reservar clase')
        }

        const responseData = await res.json()
        console.log('✅ Respuesta del servidor COMPLETA:', responseData)
        console.log('📈 remainingClasses en respuesta:', responseData.remainingClasses)
        console.log('🏷️ membershipType en respuesta:', responseData.membershipType)

        // NUEVA LÓGICA: Actualizar estado según tipo de membresía
        if (membership && isNewMembershipSystem(membership)) {
          // Sistema nuevo: actualizar membresía completa desde la respuesta del servidor
          if (responseData.remainingClasses) {
            const newMembership = { ...membership }

            // Actualizar classTypeAllocations con los datos del servidor
            Object.entries(responseData.remainingClasses).forEach(([classType, remaining]) => {
              const allocation = newMembership.classTypeAllocations?.find(
                alloc => alloc.classTypeId.toLowerCase() === classType.toLowerCase()
              )
              if (allocation) {
                allocation.remainingCount = remaining as number
              }
            })

            // Recalcular currentClasses
            newMembership.currentClasses = Object.values(responseData.remainingClasses).reduce(
              (sum: number, count) => sum + (count as number), 0
            )

            setMembership(newMembership)
            console.log('🔄 Membresía actualizada (sistema nuevo):', newMembership)
          }
        } else {
          // Sistema antiguo: solo actualizar currentClasses
          if (membership && typeof responseData.remainingClasses === 'number') {
            setMembership({
              ...membership,
              currentClasses: responseData.remainingClasses
            })
            console.log('🔄 Membresía actualizada (sistema antiguo):', responseData.remainingClasses)
          }
        }

        // Actualizar lista de reservas
        setReservedClassIds([...reservedClassIds, selectedClass._id])
        setShowModal(false)
        
        // Mostrar modal de éxito
        setSuccessModalType('reserve')
        setShowSuccessModal(true)

      } catch (err) {
        console.error('❌ Error al reservar:', err)
        alert(err instanceof Error ? err.message : 'Error al reservar la clase')
      } finally {
        setIsReserving(false)
      }
    }
  }

  const confirmCancellation = async () => {
    if (selectedClass) {
      try {
        const token = localStorage.getItem('token')
        const studentId = localStorage.getItem('userId')

        const res = await fetch('https://pranabackend.onrender.com/api/class-reservations/', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            studentId: studentId,
            classId: selectedClass._id
          })
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Error al cancelar reserva')
        }

        const responseData = await res.json()
        console.log('✅ Respuesta del servidor:', responseData)

        // NUEVA LÓGICA: Actualizar estado según tipo de membresía
        if (membership && isNewMembershipSystem(membership)) {
          // Sistema nuevo: actualizar membresía completa desde la respuesta del servidor
          if (responseData.remainingClasses) {
            const newMembership = { ...membership }

            // Actualizar classTypeAllocations con los datos del servidor
            Object.entries(responseData.remainingClasses).forEach(([classType, remaining]) => {
              const allocation = newMembership.classTypeAllocations?.find(
                alloc => alloc.classTypeId.toLowerCase() === classType.toLowerCase()
              )
              if (allocation) {
                allocation.remainingCount = remaining as number
              }
            })

            // Recalcular currentClasses
            newMembership.currentClasses = Object.values(responseData.remainingClasses).reduce(
              (sum: number, count) => sum + (count as number), 0
            )

            setMembership(newMembership)
            console.log('🔄 Membresía actualizada (sistema nuevo):', newMembership)
          }
        } else {
          // Sistema antiguo: solo actualizar currentClasses
          if (membership && typeof responseData.remainingClasses === 'number') {
            setMembership({
              ...membership,
              currentClasses: responseData.remainingClasses
            })
            console.log('🔄 Membresía actualizada (sistema antiguo):', responseData.remainingClasses)
          }
        }

        // Actualizar lista de reservas
        setReservedClassIds(reservedClassIds.filter(id => id !== selectedClass._id))
        setShowModal(false)
        
        // Mostrar modal de éxito
        setSuccessModalType('cancel')
        setShowSuccessModal(true)

      } catch (err) {
        console.error('❌ Error al cancelar:', err)
        alert(err instanceof Error ? err.message : 'Error al cancelar la reserva')
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedClass(null)
  }

  // Helper function
  const findClassById = (classId: string): ClassData | null => {
    const found = classes.find(c => c._id === classId)
    if (!found) return null

    return {
      ...found,
      isReserved: reservedClassIds.includes(classId),
      canCancel: true
    }
  }

  // Get classes for selected day with updated reservation status
  const getClassesForDay = (dayId: string): ClassData[] => {
    return classes
      .filter(c => c.day === dayId)
      .map(classData => ({
        ...classData,
        isReserved: reservedClassIds.includes(classData._id),
        canCancel: true
      }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando clases...</p>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Error al cargar</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Reintentar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
            <Flower className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Asistí al espacio
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium">
            Reservá tus clases presenciales en nuestro estudio
          </p>
        </div>

        {/* Membership Card */}
        {membership && membership.title && membership.expirationDate && membership.allowedClassTypes ? (
          <MembershipCard
            plan={{
              title: membership.title,
              currentClasses: membership.currentClasses,
              expirationDate: membership.expirationDate,
              allowedClassTypes: membership.allowedClassTypes,
              classTypeAllocations: membership.classTypeAllocations
            }}
          />
        ) : null}

        {/* Day Navigation */}
        <DayNavigation
          days={days}
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
        />

        {/* Classes */}
        <div>
          {(() => {
            const allClasses = getClassesForDay(selectedDay)

            if (allClasses.length === 0) {
              return <EmptyState />
            }

            // Separar clases disponibles y no disponibles
            const availableClasses = allClasses.filter(classData =>
              canTakeClassType(membership, classData.type)
            )
            const unavailableClasses = allClasses.filter(classData =>
              !canTakeClassType(membership, classData.type)
            )

            const dayName = days.find(d => d.id === selectedDay)?.id || selectedDay

            return (
              <>
                {/* Clases disponibles */}
                {availableClasses.length > 0 && (
                  <div className="mb-8">
                    <SectionHeader
                      title={`El día ${dayName} tenés estas clases disponibles según tu abono`}
                      count={availableClasses.length}
                      isAvailable={true}
                    />
                    {availableClasses.map((classData) => (
                      <ClassCard
                        key={classData._id}
                        classData={classData}
                        onReserve={handleReserve}
                        onCancel={handleCancel}
                        plan={membership}
                      />
                    ))}
                  </div>
                )}

                {/* Clases no disponibles */}
                {unavailableClasses.length > 0 && (
                  <div>
                    <SectionHeader
                      title="Estas clases no están disponibles en tu abono"
                      count={unavailableClasses.length}
                      isAvailable={false}
                    />
                    {unavailableClasses.map((classData) => (
                      <ClassCard
                        key={classData._id}
                        classData={classData}
                        onReserve={handleReserve}
                        onCancel={handleCancel}
                        plan={membership}
                      />
                    ))}
                  </div>
                )}
              </>
            )
          })()}
        </div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showModal}
          type={modalType}
          classData={selectedClass}
          remainingClasses={membership?.currentClasses ?? 0}
          membership={membership}
          onConfirm={modalType === 'reserve' ? confirmReservation : confirmCancellation}
          onCancel={closeModal}
        />

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          type={successModalType}
          classData={selectedClass}
          membership={membership}
          onClose={() => {
            setShowSuccessModal(false)
            setSelectedClass(null)
          }}
        />
      </div>
    </div>
  )
}