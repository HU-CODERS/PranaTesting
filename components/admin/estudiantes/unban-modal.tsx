"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Undo2, ShieldX, Trash2 } from "lucide-react"

interface UnBanModalProps {
  isOpen: boolean
  onClose: () => void
  estudiante: any
}

interface Sancion {
  id: string
  fecha: string
  motivo: string
  duracion: string
  aplicadaPor: string
  estado: "activa" | "expirada" | "revocada"
  observaciones?: string
}

export function UnBanModal({ isOpen, onClose, estudiante }: UnBanModalProps) {
  // Datos hardcodeados (listo para reemplazar por backend)
  const [sanciones, setSanciones] = useState<Sancion[]>([
    { id: "1", fecha: "2025-07-28 14:12", motivo: "Ausencias reiteradas", duracion: "3 dias", aplicadaPor: "info@prana-om.com", estado: "activa", observaciones: "Se notificó por email." },
  ])

  const [loadingUltima, setLoadingUltima] = useState(false)
  const [loadingTodas, setLoadingTodas] = useState(false)

  const ultimaActivaIndex = sanciones.findIndex(s => s.estado === "activa")
  const ultimaActiva = ultimaActivaIndex >= 0 ? sanciones[ultimaActivaIndex] : null

  const handleEliminarUltima = async () => {
    if (!ultimaActiva) return alert("No hay sanciones activas para eliminar.")
    if (!confirm("¿Seguro que querés eliminar la última sanción activa?")) return
    try {
      setLoadingUltima(true)
      // await fetch(`/api/students/${estudiante._id}/sanctions/last`, { method: "DELETE" })
      setSanciones(prev => {
        const next = [...prev]
        const idx = next.findIndex(s => s.estado === "activa")
        if (idx >= 0) next[idx] = { ...next[idx], estado: "revocada" }
        return next
      })
      alert("Última sanción eliminada correctamente.")
    } finally {
      setLoadingUltima(false)
    }
  }

  const handleEliminarTodas = async () => {
    if (!confirm("¿Seguro que querés eliminar TODAS las sanciones?")) return
    try {
      setLoadingTodas(true)
      // await fetch(`/api/students/${estudiante._id}/sanctions`, { method: "DELETE" })
      setSanciones(prev => prev.map(s => ({ ...s, estado: "revocada" })))
      alert("Todas las sanciones fueron eliminadas correctamente.")
    } finally {
      setLoadingTodas(false)
    }
  }

  const EstadoBadge = ({ estado }: { estado: Sancion["estado"] }) => {
    if (estado === "activa") return <Badge className="bg-red-100 text-red-800 border border-red-300 text-[10px] sm:text-xs">Activa</Badge>
    if (estado === "expirada") return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300 text-[10px] sm:text-xs">Expirada</Badge>
    return <Badge variant="secondary" className="bg-green-100 text-green-800 border border-green-300 text-[10px] sm:text-xs">Revocada</Badge>
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
    p-0 overflow-hidden
    w-full
    max-w-[calc(100svw-32px)]   /* 16px de margen por lado */
    sm:max-w-[700px]
    h-[72svh]                   /* alto predeterminado del modal */
    max-h-[calc(100svh-64px)]   /* 32px de margen arriba/abajo */
    rounded-2xl
  "
  style={scrollY ? { overflowY: "auto" } : {}}
      >
        {/* Layout vertical: header + body (scroll) + footer */}
        <div className="space-y-4 flex h-full flex-col">
          <DialogHeader className="px-5 pt-4 pb-2 shrink-0">
            <DialogTitle className="flex items-center text-green-700 text-base sm:text-lg">
              <Undo2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Desbanear / gestionar sanciones
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Podés eliminar solo la última sanción activa o limpiar el historial completo.
            </p>
          </DialogHeader>

          {/* BODY: todo fijo excepto el sub-div del historial que scrollea */}
          <div className="px-5 pb-3 flex-1 min-h-0">
            {/* bloque superior (fijo) */}
            <div className="space-y-2 mb-3 shrink-0">
              <p className="text-sm sm:text-base font-medium">
                Estás gestionando sanciones de <span className="font-bold break-words">{estudiante?.nombre}</span>
              </p>
            </div>

            {/* SUB-DIV SCROLLEABLE — SOLO el historial */}
            <div className="space-y-2 flex-1 min-h-0">
              <Label>Historial de sanciones</Label>
              {/* Este div es el contenedor scrolleable específico */}
              <div className="h-full overflow-y-auto rounded-md border p-2">
                <div className="space-y-3 pr-1">
                  {sanciones.length === 0 && (
                    <p className="text-sm text-muted-foreground">Sin sanciones registradas.</p>
                  )}

                  {sanciones.map((s) => (
                    <div key={s.id} className="rounded-xl border p-3 bg-slate-50/60">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs sm:text-sm font-medium truncate">#{s.id}</div>
                        <EstadoBadge estado={s.estado} />
                      </div>

                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                        <div className="min-w-0">
                          <span className="text-muted-foreground">Fecha: </span>
                          <span className="font-medium break-words">{s.fecha}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-muted-foreground">Duración: </span>
                          <span className="font-medium break-words">{s.duracion}</span>
                        </div>
                        <div className="col-span-1 sm:col-span-2 min-w-0">
                          <span className="text-muted-foreground">Motivo: </span>
                          <span className="font-medium break-words">{s.motivo}</span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-muted-foreground">Aplicada por: </span>
                          <span className="font-medium break-words">{s.aplicadaPor}</span>
                        </div>
                        {s.observaciones && (
                          <div className="col-span-1 sm:col-span-2 min-w-0">
                            <span className="text-muted-foreground">Observaciones: </span>
                            <span className="font-medium break-words">{s.observaciones}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER (fijo, no scrollea) */}
          <div className="border-t px-5 py-3 flex flex-col sm:flex-row gap-2 shrink-0 bg-white">
            <Button
              type="button"
              variant="secondary"
              onClick={handleEliminarUltima}
              disabled={loadingUltima || !ultimaActiva}
              className="w-full sm:w-auto sm:flex-1"
            >
              <ShieldX className="mr-2 h-4 w-4" />
              Eliminar última sanción
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleEliminarTodas}
              disabled={loadingTodas || sanciones.length === 0}
              className="w-full sm:w-auto sm:flex-1"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar todas
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
