"use client"

import { useState, useEffect } from "react"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Wallet,
  CreditCard,
  UserPlus,
  UserMinus,
  Wrench,
  Sparkles
} from "lucide-react"
import * as XLSX from "xlsx"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 🔧 CONFIGURACIÓN DE MANTENIMIENTO - Cambiar a false cuando el backend esté listo
const MAINTENANCE_MODE = false

// Datos de ejemplo - En producción vendrían del backend
const pagosRecientes = [
  { id: 1, usuario: "María García", monto: 15000, concepto: "Membresía Mensual", fecha: "2024-10-08", estado: "completado", metodo: "Tarjeta" },
  { id: 2, usuario: "Juan Pérez", monto: 8000, concepto: "Clase Individual", fecha: "2024-10-07", estado: "completado", metodo: "Efectivo" },
  { id: 3, usuario: "Ana Martínez", monto: 45000, concepto: "Workshop Avanzado", fecha: "2024-10-06", estado: "pendiente", metodo: "Transferencia" },
  { id: 4, usuario: "Carlos López", monto: 15000, concepto: "Membresía Mensual", fecha: "2024-10-05", estado: "completado", metodo: "Tarjeta" },
  { id: 5, usuario: "Laura Silva", monto: 12000, concepto: "Pack 10 Clases", fecha: "2024-10-04", estado: "rechazado", metodo: "Tarjeta" },
]

const movimientos = [
  { id: 1, usuario: "María García", tipo: "inscripcion", clase: "Yoga Vinyasa", fecha: "2024-10-08 10:30" },
  { id: 2, usuario: "Juan Pérez", tipo: "cancelacion", clase: "Meditación", fecha: "2024-10-08 09:15" },
  { id: 3, usuario: "Ana Martínez", tipo: "inscripcion", clase: "Hatha Yoga", fecha: "2024-10-07 16:20" },
  { id: 4, usuario: "Carlos López", tipo: "inscripcion", clase: "Yoga Restaurativo", fecha: "2024-10-07 14:45" },
  { id: 5, usuario: "Laura Silva", tipo: "cancelacion", clase: "Ashtanga", fecha: "2024-10-06 11:30" },
]

const salariosProfesores = [
  { id: 1, nombre: "Cati Bacchi", clases: 12, tarifa: 5000, total: 60000, pagado: false },
  { id: 2, nombre: "Vero Paiva", clases: 8, tarifa: 5000, total: 40000, pagado: true },
  { id: 3, nombre: "Erika Lahr", clases: 15, tarifa: 5500, total: 82500, pagado: false },
]

export default function DashboardPage() {
  const [stats, setStats] = useState({
    billetera: 238000,
    ingresosMes: 185000,
    salariosPendientes: 142500,
    pagosCompletados: 47,
  })

  const downloadExcelReport = () => {
    const workbook = XLSX.utils.book_new()

    // Hoja de pagos
    const pagosData = [
      ["ID", "Usuario", "Monto", "Concepto", "Fecha", "Estado", "Método"],
      ...pagosRecientes.map(p => [p.id, p.usuario, p.monto, p.concepto, p.fecha, p.estado, p.metodo])
    ]

    // Hoja de movimientos
    const movimientosData = [
      ["ID", "Usuario", "Tipo", "Clase", "Fecha"],
      ...movimientos.map(m => [m.id, m.usuario, m.tipo, m.clase, m.fecha])
    ]

    // Hoja de salarios
    const salariosData = [
      ["Profesor", "Clases", "Tarifa", "Total", "Estado"],
      ...salariosProfesores.map(s => [s.nombre, s.clases, s.tarifa, s.total, s.pagado ? "Pagado" : "Pendiente"])
    ]

    const pagosSheet = XLSX.utils.aoa_to_sheet(pagosData)
    const movimientosSheet = XLSX.utils.aoa_to_sheet(movimientosData)
    const salariosSheet = XLSX.utils.aoa_to_sheet(salariosData)

    XLSX.utils.book_append_sheet(workbook, pagosSheet, "Pagos")
    XLSX.utils.book_append_sheet(workbook, movimientosSheet, "Movimientos")
    XLSX.utils.book_append_sheet(workbook, salariosSheet, "Salarios")

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Auditoria_Prana_OM_${new Date().toISOString().split('T')[0]}.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount)
  }

  return (
    <>
      {/* Contenedor con posición relativa para el overlay */}
      <div className="relative min-h-screen">
        {/* Contenido principal - con blur cuando está en mantenimiento */}
        <div className={MAINTENANCE_MODE ? "filter  pointer-events-none" : ""}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    <Wallet className="h-10 w-10" />
                    Panel de Auditoría
                  </h1>
                  <p className="text-white/80 text-lg">
                    Registro financiero y de actividad
                  </p>
                </div>
                <Button 
                  onClick={downloadExcelReport}
                  className="bg-white text-[#5862f0] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Descargar Reportes
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="max-w-7xl mx-auto px-6 -mt-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Cards de estadísticas */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <Wallet className="h-7 w-7 text-green-600" />
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">Billetera Plataforma</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.billetera)}</p>
                <p className="text-xs text-green-600 mt-2">Saldo disponible</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-7 w-7 text-blue-600" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">Ingresos del Mes</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.ingresosMes)}</p>
                <p className="text-xs text-blue-600 mt-2">+12% vs mes anterior</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-7 w-7 text-orange-600" />
                  </div>
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">Salarios Pendientes</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.salariosPendientes)}</p>
                <p className="text-xs text-orange-600 mt-2">A pagar este mes</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-7 w-7 text-purple-600" />
                  </div>
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium mb-1">Pagos Completados</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pagosCompletados}</p>
                <p className="text-xs text-purple-600 mt-2">En los últimos 30 días</p>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="max-w-7xl mx-auto px-6 pb-12">
        <Tabs defaultValue="pagos" className="space-y-6">
          <TabsList className="bg-white shadow-md p-1 border border-gray-200">
            <TabsTrigger value="pagos" className="data-[state=active]:bg-[#a0a7ff] data-[state=active]:text-white">
              Pagos y Facturación
            </TabsTrigger>
            <TabsTrigger value="movimientos" className="data-[state=active]:bg-[#a0a7ff] data-[state=active]:text-white">
              Inscripciones
            </TabsTrigger>
            <TabsTrigger value="salarios" className="data-[state=active]:bg-[#a0a7ff] data-[state=active]:text-white">
              Salarios Profesores
            </TabsTrigger>
          </TabsList>

          {/* Tab: Pagos */}
          <TabsContent value="pagos">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Registro de Pagos</CardTitle>
                <CardDescription>Historial completo de transacciones de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Usuario</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Concepto</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Monto</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Método</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Fecha</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagosRecientes.map((pago) => (
                        <tr key={pago.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{pago.usuario}</div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{pago.concepto}</td>
                          <td className="py-4 px-4 font-semibold text-gray-900">{formatCurrency(pago.monto)}</td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="font-normal">
                              {pago.metodo}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-gray-600 text-sm">{pago.fecha}</td>
                          <td className="py-4 px-4">
                            {pago.estado === "completado" && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Completado
                              </Badge>
                            )}
                            {pago.estado === "pendiente" && (
                              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                                <Clock className="h-3 w-3 mr-1" />
                                Pendiente
                              </Badge>
                            )}
                            {pago.estado === "rechazado" && (
                              <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                                <XCircle className="h-3 w-3 mr-1" />
                                Rechazado
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Movimientos */}
          <TabsContent value="movimientos">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Inscripciones y Cancelaciones</CardTitle>
                <CardDescription>Registro de actividad de usuarios en clases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {movimientos.map((mov) => (
                    <div 
                      key={mov.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          mov.tipo === "inscripcion" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {mov.tipo === "inscripcion" ? (
                            <UserPlus className={`h-6 w-6 text-green-600`} />
                          ) : (
                            <UserMinus className={`h-6 w-6 text-red-600`} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{mov.usuario}</p>
                          <p className="text-sm text-gray-600">{mov.clase}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={mov.tipo === "inscripcion" 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                        }>
                          {mov.tipo === "inscripcion" ? "Inscripción" : "Cancelación"}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{mov.fecha}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Salarios */}
          <TabsContent value="salarios">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Salarios de Profesores</CardTitle>
                    <CardDescription>Gestión de pagos a instructores</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total a pagar</p>
                    <p className="text-3xl font-bold text-[#5862f0]">
                      {formatCurrency(salariosProfesores.reduce((acc, s) => acc + s.total, 0))}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salariosProfesores.map((profesor) => (
                    <div 
                      key={profesor.id}
                      className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-[#5862f0] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#5862f0] to-[#7d86ff] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {profesor.nombre.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{profesor.nombre}</h3>
                            <p className="text-sm text-gray-600">
                              {profesor.clases} clases × {formatCurrency(profesor.tarifa)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(profesor.total)}</p>
                            {profesor.pagado ? (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mt-2">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Pagado
                              </Badge>
                            ) : (
                              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 mt-2">
                                <Clock className="h-3 w-3 mr-1" />
                                Pendiente
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
        </div>

        {/* Overlay de Mantenimiento - Solo para esta sección */}
        {MAINTENANCE_MODE && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 ">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-4 border border-gray-100">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] rounded-xl p-6 mb-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Wrench className="h-8 w-8 text-[#5862f0]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Estamos trabajando en esta sección
              </h2>
              <p className="text-white/90 text-sm">
                El sistema de auditoría y pagos estará disponible muy pronto
              </p>
            </div>

            {/* Cards de características */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Registro de Pagos</h3>
                    <p className="text-xs text-gray-600">Historial completo de transacciones</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Inscripciones</h3>
                    <p className="text-xs text-gray-600">Control de altas y bajas de clases</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Salarios</h3>
                    <p className="text-xs text-gray-600">Gestión de pagos a profesores</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Download className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Reportes Excel</h3>
                    <p className="text-xs text-gray-600">Exportación de datos completos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensaje final */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Gracias por tu paciencia mientras mejoramos la plataforma 🙏
              </p>
            </div>
          </div>
      </div>
        )}
      </div>
  </>
  )
}