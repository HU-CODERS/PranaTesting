"use client"

import { useState, useMemo, useEffect, JSX } from "react"
import { Download, Filter, Search, ChevronLeft, ChevronRight, Loader2, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Tipos para los datos del backend (según lo que realmente llega)
interface BillFromAPI {
  date: string
  amount: number
  concept: string
  payment_method: string
}

// Tipos para los datos transformados del frontend
interface TransformedBill {
  id: string
  fecha: string
  concepto: string
  monto: number
  estado: string
  metodoPago: string
}

const meses: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

// Componente de tarjeta para móvil
function PagoCard({ pago }: { pago: TransformedBill }) {
  return (
    <Card className="shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{pago.concepto}</h3>
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(pago.fecha).toLocaleDateString("es-ES")}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-[#305891]">AR${pago.monto.toLocaleString()}</p>
            <Badge
              variant="secondary"
              className="text-xs bg-green-100 text-green-700 border-green-300 mt-1"
            >
              {pago.estado}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-600">
            <CreditCard className="h-3 w-3 mr-1" />
            {pago.metodoPago}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PagosPage(): JSX.Element {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date())
  const [busqueda, setBusqueda] = useState<string>("")
  const [bills, setBills] = useState<TransformedBill[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const añoActual: number = fechaSeleccionada.getFullYear()

  // Función para obtener los bills del backend
  const fetchBills = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      
      // Obtener el token del localStorage
      const token: string | null = localStorage.getItem('userId') // o el nombre que uses para guardar el token
      
      if (!token) {
        throw new Error('No se encontró el token de autenticación')
      }

      const response: Response = await fetch(`https://pranabackend.onrender.com/api/teachers/bills/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Si tu API requiere el token en headers, descomenta la siguiente línea:
          // 'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data: BillFromAPI[] = await response.json()
      
      // Transformar los datos del backend al formato que espera el frontend
      const transformedBills: TransformedBill[] = data.map((bill: BillFromAPI, index: number) => ({
        id: `bill-${index}-${Date.now()}`, // Generar ID único ya que no viene del backend
        fecha: bill.date,
        concepto: bill.concept,
        monto: bill.amount,
        estado: "Pagado", // Como no viene estado del backend, asumimos que están pagados
        metodoPago: bill.payment_method
      }))

      setBills(transformedBills)
    } catch (err) {
      console.error('Error fetching bills:', err)
      const errorMessage: string = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchBills()
  }, [])

  const pagosFiltrados: TransformedBill[] = useMemo(() => {
    if (!bills.length) return []
    
    return bills.filter((pago: TransformedBill) => {
      const fechaPago: Date = new Date(pago.fecha)
      const coincideFecha: boolean = fechaPago.getFullYear() === añoActual
      const coincideBusqueda: boolean =
        pago.concepto.toLowerCase().includes(busqueda.toLowerCase()) ||
        pago.metodoPago.toLowerCase().includes(busqueda.toLowerCase()) ||
        pago.estado.toLowerCase().includes(busqueda.toLowerCase())
      return coincideFecha && coincideBusqueda
    })
  }, [bills, añoActual, busqueda])

  const totalMes: number = pagosFiltrados.reduce((sum: number, pago: TransformedBill) => sum + pago.monto, 0)
  const totalPagadoMes: number = pagosFiltrados.reduce((sum: number, pago: TransformedBill) => sum + pago.monto, 0) // Todos están pagados
  const totalPendienteMes: number = 0 // No hay pendientes según los datos

  const cambiarMes = (offset: number): void => {
    setFechaSeleccionada((prev: Date) => {
      const nuevaFecha: Date = new Date(prev)
      nuevaFecha.setMonth(prev.getMonth() + offset)
      return nuevaFecha
    })
  }

  // Función para recargar los datos
  const handleRefresh = (): void => {
    fetchBills()
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span className="text-lg">Cargando pagos...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">
            Error al cargar los pagos: {error}
            <Button onClick={handleRefresh} variant="outline" size="sm" className="ml-4">
              Reintentar
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Mis Pagos</h1>
            <p className="text-sm sm:text-lg text-gray-600 mt-1">Visualiza y gestiona tus ingresos mensuales.</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm" className="self-start sm:self-auto">
            <Search className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </header>

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base text-gray-600">Total del Año</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl sm:text-3xl font-bold text-[#305891]">AR${totalMes.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base text-green-600">Pagos Recibidos</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl sm:text-3xl font-bold text-green-600">AR${totalPagadoMes.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base text-blue-600">Cantidad de Pagos</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xl sm:text-3xl font-bold text-blue-600">{pagosFiltrados.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por concepto, método de pago..."
            value={busqueda}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#305891] focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Lista de pagos - Vista móvil (tarjetas) y desktop (tabla) */}
      <Card className="shadow-lg">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-lg sm:text-xl">
            Historial de Recibos ◇ {añoActual}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Vista móvil - Tarjetas */}
          <div className="block lg:hidden">
            {pagosFiltrados.length > 0 ? (
              <div className="p-4 space-y-3">
                {pagosFiltrados.map((pago: TransformedBill) => (
                  <PagoCard key={pago.id} pago={pago} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-sm">
                  {bills.length === 0 
                    ? "No tienes pagos registrados aún."
                    : `No se encontraron recibos del año ${añoActual} con los filtros aplicados.`
                  }
                </p>
              </div>
            )}
          </div>

          {/* Vista desktop - Tabla */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Fecha</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead className="w-[120px] text-right">Monto</TableHead>
                  <TableHead className="w-[150px] text-center">Estado</TableHead>
                  <TableHead className="w-[150px]">Método de Pago</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagosFiltrados.length > 0 ? (
                  pagosFiltrados.map((pago: TransformedBill) => (
                    <TableRow key={pago.id} className="hover:bg-gray-50">
                      <TableCell>{new Date(pago.fecha).toLocaleDateString("es-ES")}</TableCell>
                      <TableCell className="font-medium">{pago.concepto}</TableCell>
                      <TableCell className="text-right font-semibold">AR${pago.monto.toLocaleString()}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-green-100 text-green-700 border-green-300"
                        >
                          {pago.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>{pago.metodoPago}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                      <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      {bills.length === 0 
                        ? "No tienes pagos registrados aún."
                        : `No se encontraron recibos del año ${añoActual} con los filtros aplicados.`
                      }
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}