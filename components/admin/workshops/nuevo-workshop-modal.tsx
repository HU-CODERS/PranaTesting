"use client"

import type React from "react"
import { useState } from "react"
import { Calendar, X, Image, Upload, Clock, DollarSign, Users, MapPin, Sparkles, Loader } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NuevoWorkshopModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NuevoWorkshopModal({ isOpen, onClose }: NuevoWorkshopModalProps) {
  const [fecha, setFecha] = useState("")
  const [titulo, setTitulo] = useState("")
  const [horaInicio, setHoraInicio] = useState("")
  const [horaFin, setHoraFin] = useState("")
  const [precio, setPrecio] = useState<number | ''>('')
  const [modalidad, setModalidad] = useState("")
  const [capacidad, setCapacidad] = useState<number | ''>('')
  const [descripcion, setDescripcion] = useState("")
  const [imagenes, setImagenes] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<number[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} es mayor a 5MB`)
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    const newPreviews: string[] = []
    let loadedCount = 0

    validFiles.forEach((file, index) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews[index] = reader.result as string
        loadedCount++
        
        if (loadedCount === validFiles.length) {
          setImagenes([...imagenes, ...validFiles])
          setImagePreviews([...imagePreviews, ...newPreviews])
          setUploadProgress([...uploadProgress, ...validFiles.map(() => 0)])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (index: number) => {
    setImagenes(imagenes.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index))
    setUploadProgress(uploadProgress.filter((_, i) => i !== index))
  }

  const uploadImageToCloudinary = async (file: File, index: number): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'moneke_courses')

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/drtbreabi/image/upload',
        { method: 'POST', body: formData }
      )

      const data = await response.json()
      if (data.secure_url) {
        setUploadProgress(prev => {
          const newProgress = [...prev]
          newProgress[index] = 100
          return newProgress
        })
        return data.secure_url
      }
      return null
    } catch (err) {
      console.error(`Error al subir imagen:`, err)
      return null
    }
  }

  const handleSubmit = async () => {
    if (!titulo || !fecha || !horaInicio || !horaFin || !precio || !modalidad || !capacidad || !descripcion ) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    setIsLoading(true)
    setUploadProgress(imagenes.map(() => 0))

    try {
      const imageUrls: string[] = []
      
      if (imagenes.length > 0) {
        const uploadPromises = imagenes.map((imagen, index) => 
          uploadImageToCloudinary(imagen, index)
        )
        const results = await Promise.all(uploadPromises)
        results.forEach(url => {
          if (url) imageUrls.push(url)
        })

        if (imageUrls.length === 0) {
          alert("No se pudieron subir las imágenes")
          setIsLoading(false)
          return
        }
      }

      const payload = {
        title: titulo,
        day: fecha,
        hourStart: horaInicio,
        hourEnd: horaFin,
        price: Number(precio),
        modality: modalidad,
        maxParticipants: Number(capacidad),
        description: descripcion,
        images: imageUrls,
      }

      const res = await fetch("https://pranabackend.onrender.com/api/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Error al crear")

      window.location.reload()
      onClose()
    } catch (err) {
      console.error("Error:", err)
      alert("Error al crear el workshop")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">Crear Nuevo Workshop</DialogTitle>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Crear Nuevo Workshop</h2>
              <p className="text-sm text-white/80">Completa los datos para crear tu workshop</p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-5">
          
          {/* Imágenes */}
          <div className="space-y-2">
            <Label className="text-sm font-bold flex items-center gap-2">
              <Image className="h-4 w-4 text-[#5862f0]" />
              Imágenes <span className="text-xs text-gray-500 font-normal">(Opcional)</span>
            </Label>
            
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200 group h-20">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    {isLoading && uploadProgress[index] < 100 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Loader className="h-3 w-3 text-white animate-spin" />
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleRemoveImage(index)}
                      disabled={isLoading}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <label className="flex flex-col items-center justify-center cursor-pointer h-28 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#5862f0] hover:bg-blue-50 transition bg-gray-50">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5862f0] to-[#7d86ff] rounded-lg flex items-center justify-center mb-1">
                <Image className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-700">{imagePreviews.length > 0 ? 'Agregar más' : 'Subir imágenes'}</span>
              <span className="text-xs text-gray-500">PNG, JPG max 5MB</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={isLoading}
              />
            </label>
          </div>

          {/* Campos principales - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Título */}
            <div>
              <Label className="text-xs font-bold mb-1 block">Título *</Label>
              <Input
                placeholder="Ej: Workshop de Yoga"
                className="border-2 border-gray-300 focus:border-[#5862f0] h-9 text-sm rounded-lg"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Fecha */}
            <div>
              <Label className="text-xs font-bold mb-1 block">Fecha *</Label>
              <Input
                type="date"
                className="border-2 border-gray-300 focus:border-[#5862f0] h-9 text-sm rounded-lg"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Horario Inicio */}
            <div>
              <Label className="text-xs font-bold mb-1 block">Inicio *</Label>
              <Input
                type="time"
                className="border-2 border-gray-300 focus:border-[#5862f0] h-9 text-sm rounded-lg"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Horario Fin */}
            <div>
              <Label className="text-xs font-bold mb-1 block">Fin *</Label>
              <Input
                type="time"
                className="border-2 border-gray-300 focus:border-[#5862f0] h-9 text-sm rounded-lg"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Precio */}
            <div>
              <Label className="text-xs font-bold mb-1 block">Precio (AR$) *</Label>
              <Input
                type="number"
                placeholder="10000"
                className="border-2 border-gray-300 focus:border-[#5862f0] h-9 text-sm rounded-lg"
                value={precio || ''}
                onChange={(e) => setPrecio(Number(e.target.value))}
                disabled={isLoading}
              />
            </div>

            {/* Capacidad */}
            <div>
              <Label className="text-xs font-bold mb-1 block">Capacidad *</Label>
              <Input
                type="number"
                placeholder="20"
                className="border-2 border-gray-300 focus:border-[#5862f0] h-9 text-sm rounded-lg"
                value={capacidad || ''}
                onChange={(e) => setCapacidad(Number(e.target.value))}
                disabled={isLoading}
              />
            </div>

            {/* Modalidad */}
            <div className="md:col-span-2">
              <Label className="text-xs font-bold mb-1 block">Modalidad *</Label>
              <Select onValueChange={setModalidad} value={modalidad} disabled={isLoading}>
                <SelectTrigger className="border-2 border-gray-300 focus:border-[#5862f0] h-9 text-sm rounded-lg">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">🏢 Presencial</SelectItem>
                  <SelectItem value="online">💻 Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Información del Workshop */}
          <div className="space-y-2 pt-4 border-t">
            <Label className="text-sm font-bold">Información del Workshop *</Label>
            
            <Textarea
              placeholder="Descripción: De qué trata el workshop, qué aprenderán..."
              className="min-h-24 resize-none border-2 border-gray-300 focus:border-[#5862f0] text-sm rounded-lg"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-3 flex gap-2 justify-end sticky bottom-0">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
            size="sm"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white hover:shadow-lg"
            size="sm"
          >
            {isLoading ? (
              <>
                <Loader className="h-3 w-3 animate-spin mr-1" />
                Creando...
              </>
            ) : (
              <>
                <Upload className="h-3 w-3 mr-1" />
                Crear Workshop
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}