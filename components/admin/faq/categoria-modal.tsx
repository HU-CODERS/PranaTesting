"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CategoriaModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (categoria: string) => void
}

export function CategoriaModal({ isOpen, onClose, onSave }: CategoriaModalProps) {
  const [nombreCategoria, setNombreCategoria] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombreCategoria.trim()) {
      alert("Por favor, ingresa un nombre para la categoría")
      return
    }

    onSave(nombreCategoria.trim())
    setNombreCategoria("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Nueva Categoría</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Categoría</Label>
            <Input
              id="nombre"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              placeholder="Ej: Membresías, Clases, Pagos..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Crear Categoría</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
