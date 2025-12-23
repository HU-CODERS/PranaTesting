"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { AlertTriangle } from "lucide-react"

interface SancionModalProps {
  isOpen: boolean
  onClose: () => void
  estudiante: any
}

export function SancionModal({ isOpen, onClose, estudiante }: SancionModalProps) {
  const [motivoTipo, setMotivoTipo] = useState("predefinido")
  const [motivoSeleccionado, setMotivoSeleccionado] = useState("")
  const [motivoPersonalizado, setMotivoPersonalizado] = useState("")
  const [duracionTipo, setDuracionTipo] = useState("dias")
  const [duracionValor, setDuracionValor] = useState("1")
  const [esPermanente, setEsPermanente] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const motivoFinal = motivoTipo === "predefinido" ? motivoSeleccionado : motivoPersonalizado
    const duracionFinal = esPermanente ? "permanente" : `${duracionValor} ${duracionTipo}`

    try {
      const res = await fetch("https://pranabackend.onrender.com/api/students/ban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: estudiante._id,
          motivo: motivoFinal,
          duracion: duracionFinal,
        }),
      })

      if (!res.ok) throw new Error("No se pudo aplicar la sanción")
      onClose()
    } catch (err) {
      console.error("Error al sancionar:", err)
      alert("Hubo un error al sancionar al estudiante")
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] dialog-content">
        <DialogHeader>
          <DialogTitle className="flex items-center text-red-600">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Sancionar estudiante
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Estás por sancionar a <span className="font-bold">{estudiante?.nombre}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              La sanción impedirá que el estudiante pueda reservar clases o acceder a ciertos contenidos durante el
              período especificado.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Motivo de la sanción</Label>
              <RadioGroup value={motivoTipo} onValueChange={setMotivoTipo} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="predefinido" id="predefinido" />
                  <Label htmlFor="predefinido">Seleccionar motivo predefinido</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personalizado" id="personalizado" />
                  <Label htmlFor="personalizado">Especificar motivo personalizado</Label>
                </div>
              </RadioGroup>
            </div>

            {motivoTipo === "predefinido" ? (
              <Select value={motivoSeleccionado} onValueChange={setMotivoSeleccionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comportamiento_inapropiado">Comportamiento inapropiado</SelectItem>
                  <SelectItem value="falta_pago">Falta de pago</SelectItem>
                  <SelectItem value="ausencias_reiteradas">Ausencias reiteradas sin aviso</SelectItem>
                  <SelectItem value="incumplimiento_normas">Incumplimiento de normas del centro</SelectItem>
                  <SelectItem value="acoso">Acoso a otros estudiantes o profesores</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Textarea
                placeholder="Describe el motivo de la sanción..."
                value={motivoPersonalizado}
                onChange={(e) => setMotivoPersonalizado(e.target.value)}
                rows={3}
              />
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Duración de la sanción</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="permanente"
                    checked={esPermanente}
                    onChange={() => setEsPermanente(!esPermanente)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="permanente" className="text-sm">
                    Sanción permanente
                  </Label>
                </div>
              </div>

              {!esPermanente && (
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    min="1"
                    value={duracionValor}
                    onChange={(e) => setDuracionValor(e.target.value)}
                    className="w-20"
                    disabled={esPermanente}
                  />
                  <Select value={duracionTipo} onValueChange={setDuracionTipo} disabled={esPermanente}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dias">Días</SelectItem>
                      <SelectItem value="semanas">Semanas</SelectItem>
                      <SelectItem value="meses">Meses</SelectItem>
                      <SelectItem value="anos">Años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="destructive">
              Aplicar sanción
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
