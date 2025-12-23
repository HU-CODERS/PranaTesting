"use client"

import { useState, useEffect } from "react"
import { DollarSign, Calendar as CalendarIconLucide, CreditCard, FileText, MessageSquare, X, CheckCircle2, AlertCircle, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface RegistrarPagoModalProps {
  isOpen: boolean
  onClose: () => void
  profesor: any | null
  onPagoRegistrado: (pago: any) => void
}

export function RegistrarPagoModal({ isOpen, onClose, profesor, onPagoRegistrado }: RegistrarPagoModalProps) {
  const [fecha, setFecha] = useState<Date | undefined>(new Date())
  const [concepto, setConcepto] = useState("")
  const [monto, setMonto] = useState("")
  const [metodoPago, setMetodoPago] = useState("")
  const [aliasDestino, setAliasDestino] = useState("")
  const [notas, setNotas] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!isOpen) {
      setFecha(new Date())
      setConcepto("")
      setMonto("")
      setMetodoPago("")
      setAliasDestino("")
      setNotas("")
      setErrors({})
    }
  }, [isOpen])

  const validarFormulario = () => {
    const nuevosErrores: Record<string, string> = {}
    if (!fecha) nuevosErrores.fecha = "La fecha es requerida."
    if (!concepto.trim()) nuevosErrores.concepto = "El concepto es requerido."
    if (!monto.trim() || Number.isNaN(Number.parseFloat(monto)) || Number.parseFloat(monto) <= 0) {
      nuevosErrores.monto = "El monto debe ser un número positivo."
    }
    if (!metodoPago) nuevosErrores.metodoPago = "El método de pago es requerido."
    if (metodoPago === "Transferencia Bancaria" && !aliasDestino.trim()) {
      nuevosErrores.aliasDestino = "El alias/CBU/CVU es requerido para transferencias."
    }
    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async () => {
    if (!profesor || !validarFormulario()) return;

    const payload = {
      id: profesor._id,
      date: fecha ? format(fecha, "dd-MM-yyyy") : undefined,
      alias: aliasDestino || "",
      amount: parseFloat(monto),
      concept: concepto,
      payment_method: metodoPago,
      notes: notas || ""
    };

    try {
      const res = await fetch("https://pranabackend.onrender.com/api/teachers/register-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al registrar el pago");
      }

      const data = await res.json();
      onPagoRegistrado(data.payment);
      onClose();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (!profesor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden p-0 gap-0 flex flex-col">
        <DialogTitle className="sr-only">
          Registrar Pago a {profesor.nombre}
        </DialogTitle>

        {/* Header con gradiente verde */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 text-white p-5 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white mb-0.5">
                  Registrar Pago
                </h3>
                <p className="text-white/90 text-sm">
                  A profesor/a {profesor.nombre}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all flex-shrink-0"
              type="button"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Info destacada del profesor */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                {profesor.nombre.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900">{profesor.nombre}</p>
                <p className="text-sm text-gray-600">{profesor.email}</p>
              </div>
              <Badge className="bg-emerald-500 text-white">
                Pago
              </Badge>
            </div>
          </div>

          {/* Fecha del Pago */}
          <div className="bg-gray-50 rounded-xl p-4">
            <Label htmlFor="fecha" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CalendarIconLucide className="h-4 w-4 text-[#5862f0]" />
              Fecha del Pago *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white",
                    !fecha && "text-muted-foreground"
                  )}
                >
                  <CalendarIconLucide className="mr-2 h-4 w-4" />
                  {fecha ? format(fecha, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={fecha} onSelect={setFecha} initialFocus />
              </PopoverContent>
            </Popover>
            {errors.fecha && (
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.fecha}
              </p>
            )}
          </div>

          {/* Concepto y Monto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <Label htmlFor="concepto" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#5862f0]" />
                Concepto *
              </Label>
              <Input
                id="concepto"
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
                placeholder="Ej: Pago Clases Enero"
                className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
              />
              {errors.concepto && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.concepto}
                </p>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <Label htmlFor="monto" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" />
                Monto (AR$) *
              </Label>
              <Input
                id="monto"
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="0.00"
                className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
              />
              {errors.monto && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.monto}
                </p>
              )}
              {monto && !isNaN(parseFloat(monto)) && (
                <p className="text-xs text-emerald-600 mt-2 font-semibold">
                  ${parseFloat(monto).toLocaleString('es-AR')}
                </p>
              )}
            </div>
          </div>

          {/* Método de Pago */}
          <div className="bg-gray-50 rounded-xl p-4">
            <Label htmlFor="metodoPago" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#5862f0]" />
              Método de Pago *
            </Label>
            <Select value={metodoPago} onValueChange={setMetodoPago}>
              <SelectTrigger className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white">
                <SelectValue placeholder="Selecciona un método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Transferencia Bancaria">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4" />
                    Transferencia Bancaria
                  </div>
                </SelectItem>
                <SelectItem value="Efectivo">
                  <div className="flex items-center gap-2">
                    💵 Efectivo
                  </div>
                </SelectItem>
                <SelectItem value="Otro">
                  <div className="flex items-center gap-2">
                    ➕ Otro
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.metodoPago && (
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.metodoPago}
              </p>
            )}
          </div>

          {/* Alias/CBU/CVU (solo si es transferencia) */}
          {metodoPago === "Transferencia Bancaria" && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
              <Label htmlFor="aliasDestino" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Banknote className="h-4 w-4 text-blue-600" />
                Alias/CBU/CVU de Destino *
              </Label>
              <Input
                id="aliasDestino"
                value={aliasDestino}
                onChange={(e) => setAliasDestino(e.target.value)}
                placeholder="Ingrese el alias o CBU/CVU"
                className="h-12 border-2 border-blue-300 focus:border-blue-500 bg-white text-base"
              />
              {errors.aliasDestino && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.aliasDestino}
                </p>
              )}
              <p className="text-xs text-blue-700 mt-2">
                💡 Requerido para transferencias bancarias
              </p>
            </div>
          )}

          {/* Notas Adicionales */}
          <div className="bg-gray-50 rounded-xl p-4">
            <Label htmlFor="notas" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#5862f0]" />
              Notas Adicionales (Opcional)
            </Label>
            <Textarea
              id="notas"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Cualquier detalle relevante sobre el pago..."
              rows={3}
              className="border-2 border-gray-300 focus:border-[#5862f0] bg-white resize-none text-base"
            />
            <p className="text-xs text-gray-500 mt-2">
              Información adicional que quieras guardar sobre este pago
            </p>
          </div>
        </div>

        {/* Footer fijo */}
        <div className="border-t-2 border-gray-200 bg-white px-5 py-3 flex-shrink-0">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-100 font-semibold"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-5 w-5" />
              Registrar Pago
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}