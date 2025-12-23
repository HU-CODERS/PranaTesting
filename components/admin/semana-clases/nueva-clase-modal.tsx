"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import { X } from "lucide-react"

interface NuevaClaseModalProps {
  isOpen: boolean
  onClose: () => void
  onAddClase: (clase: any) => void
  initialData?: any
  isEdit?: boolean
}

interface FormData {
  tipos: string[]
  dia: string
  hora: string
  teacher: string
  duracion: string
  capacidad: string
  detalles: string
  modalidad: string
}

export function NuevaClaseModal({ isOpen, onClose, onAddClase, initialData, isEdit = false }: NuevaClaseModalProps) {
  const [formData, setFormData] = useState<FormData>({
    tipos: [],
    dia: "",
    hora: "",
    teacher: "",
    duracion: "",
    capacidad: "",
    detalles: "",
    modalidad: "presencial",
  })

  const [profesores, setProfesores] = useState<{ _id: string; nombre: string }[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false) // 🆕 Estado para controlar el envío

  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        const res = await fetch("https://pranabackend.onrender.com/api/teachers")
        const data = await res.json()

        const formateados = data.map((user: any) => ({
          _id: user._id,
          nombre:
            user.role === "profe"
              ? `${user.teacherProfile?.name || ""} ${user.teacherProfile?.lastname || ""}`
              : `${user.adminProfile?.name || ""} ${user.adminProfile?.lastname || ""}`,
        }))

        const userRole = localStorage.getItem("userRole")
        const userId = localStorage.getItem("userId")

        const filtrados = formateados.filter((profesor: { _id: string | null }) => {
          if (profesor._id === "default") return false
          if (userRole === "profe") return profesor._id === userId
          return true
        })

        setProfesores(filtrados)
      } catch (err) {
        console.error("Error al cargar profesores:", err)
      }
    }

    fetchProfesores()
  }, [])

  useEffect(() => {
    if (initialData) {
      setFormData({
        tipos: initialData.tipo ? (Array.isArray(initialData.tipo) ? initialData.tipo : [initialData.tipo]) : [],
        dia: initialData.dia || "",
        hora: initialData.hora || "",
        teacher: initialData.teacher?._id || initialData.teacher || "",
        duracion: initialData.duracion ? initialData.duracion.toString() : "",
        capacidad: initialData.capacidad ? initialData.capacidad.toString() : "",
        detalles: initialData.detalles || "",
        modalidad: initialData.modalidad || "presencial",
      })
    } else {
      setFormData({
        tipos: [],
        dia: "",
        hora: "",
        teacher: "",
        duracion: "",
        capacidad: "",
        detalles: "",
        modalidad: "presencial",
      })
    }
  }, [initialData, isOpen])

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const toggleTipo = (tipo: string) => {
    setFormData((prev) => ({
      ...prev,
      tipos: prev.tipos.includes(tipo)
        ? prev.tipos.filter((t) => t !== tipo)
        : [...prev.tipos, tipo],
    }))
  }

  const generateTitulo = () => {
    if (formData.tipos.length === 0) return ""

    const tiposFormateados = formData.tipos.map((tipo) => {
      const palabras = tipo.split(" ")
      return palabras.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ")
    })

    if (tiposFormateados.length === 1) {
      return `Clase de ${tiposFormateados[0]}`
    } else {
      const todos = tiposFormateados.slice(0, -1).join(", ")
      return `Clase de ${todos} y ${tiposFormateados[tiposFormateados.length - 1]}`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 🆕 Bloquear el botón
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      console.log("🔍 Token antes de fetch:", token)

      const payload = {
        title: generateTitulo(),
        type: formData.tipos.length === 1 ? formData.tipos[0] : formData.tipos,
        day: formData.dia,
        hour: formData.hora,
        teacher: formData.teacher,
        duration: parseInt(formData.duracion),
        maxParticipants: parseInt(formData.capacidad),
        description: formData.detalles,
        modalidad: formData.modalidad,
      }

      const url = isEdit
        ? `https://pranabackend.onrender.com/api/classes/${initialData.id}`
        : `https://pranabackend.onrender.com/api/classes/create`

      const method = isEdit ? "PUT" : "POST"

      console.log("📤 Enviando:", { method, url, token, payload })

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      console.log("📥 Respuesta:", data)

      if (!res.ok) throw new Error(data.message || "Error al guardar la clase")

      // 🆕 Mostrar confirmación de éxito
      const mensaje = isEdit ? "✅ ¡Clase editada exitosamente!" : "✅ ¡Clase creada exitosamente!"
      toast.success(mensaje, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // 🆕 Llamar callback y cerrar modal
      onAddClase(data)
      onClose()
    } catch (err: any) {
      console.error("❌ Error completo:", err)
      toast.error(`❌ ${err.message || "Error al guardar la clase"}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      // 🆕 Desbloquear el botón
      setIsSubmitting(false)
    }
  }

  const tiposClase = [
    "hatha",
    "aereo",
    "ashtanga",
    "prenatal",
    "intensivo",
    "curso",
    "formacion",
    "exclusivo",
    "meditacion",
    "respiracion",
    "pranayama",
    "virtual",
  ]

  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const duraciones = [15, 30, 45, 60, 90, 120]

  const horas: string[] = []

  for (let i = 6; i <= 22; i++) {
    for (let m = 0; m < 60; m += 15) {
      const hora = `${i.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
      horas.push(hora)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[750px] w-[95%] max-h-[90vh] p-0 gap-0 bg-gradient-to-br from-white to-gray-50">
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-[#305891] to-[#4070b0]">
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            {isEdit ? "Editar Clase" : "Nueva Clase"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 max-h-[calc(90vh-140px)]">
            {/* ✅ TÍTULO AUTO-GENERADO ARRIBA */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
              <Label className="text-sm font-medium text-gray-600 block mb-2">
                Título de la clase (Auto-generado)
              </Label>
              <Input
                value={generateTitulo()}
                disabled
                className="bg-white border-blue-300 text-gray-900 font-semibold cursor-not-allowed"
              />
              <p className="text-xs text-blue-600 mt-2">
                El título se genera automáticamente según los tipos de yoga seleccionados
              </p>
            </div>

            {/* ✅ SELECCIONAR TIPOS - CON NUEVO TEXTO */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg shadow-sm border border-orange-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Selecciona que tipo de yoga aplica en tu clase *
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {tiposClase.map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => toggleTipo(tipo)}
                    disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                    className={`
                      p-2.5 rounded-lg border-2 transition-all duration-200 text-left font-medium text-sm capitalize
                      ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                      ${formData.tipos.includes(tipo)
                        ? "border-orange-600 bg-white shadow-md"
                        : "border-gray-300 bg-white/50 hover:border-orange-400"
                      }
                    `}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
              {formData.tipos.length > 0 && (
                <div className="mt-3 p-2 bg-white rounded-lg border border-orange-200">
                  <div className="text-xs font-medium text-gray-600 mb-2">Seleccionados:</div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tipos.map((tipo) => (
                      <div
                        key={tipo}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                      >
                        {tipo}
                        <button
                          type="button"
                          onClick={() => toggleTipo(tipo)}
                          disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                          className={`hover:bg-orange-200 rounded-full p-0.5 ${isSubmitting ? "cursor-not-allowed" : ""}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modalidad */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg shadow-sm border border-purple-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Modalidad de la clase *
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectChange("modalidad", "presencial")}
                  disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200 text-left font-medium flex items-center gap-2
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                    ${formData.modalidad === "presencial"
                      ? "border-purple-600 bg-white shadow-md"
                      : "border-gray-300 bg-white/50 hover:border-purple-400"
                    }
                  `}
                >
                  <div className="text-lg">📍</div>
                  <div className="text-sm">Presencial</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectChange("modalidad", "online")}
                  disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200 text-left font-medium flex items-center gap-2
                    ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                    ${formData.modalidad === "online"
                      ? "border-blue-600 bg-white shadow-md"
                      : "border-gray-300 bg-white/50 hover:border-blue-400"
                    }
                  `}
                >
                  <div className="text-lg">💻</div>
                  <div className="text-sm">Online</div>
                </button>
              </div>
            </div>

            {/* Día de la Semana - Botones */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Día de la Semana *
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {dias.map((dia) => (
                  <button
                    key={dia}
                    type="button"
                    onClick={() => handleSelectChange("dia", dia)}
                    disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                    className={`
                      p-2.5 rounded-lg border-2 transition-all duration-200 text-center font-medium text-sm
                      ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                      ${formData.dia === dia
                        ? "border-[#305891] bg-white shadow-md"
                        : "border-gray-300 bg-white/50 hover:border-[#305891]/50"
                      }
                    `}
                  >
                    {dia}
                  </button>
                ))}
              </div>
            </div>

            {/* Hora y Duración - Botones */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                ⏰ Horario y Duración
              </h3>

              {/* Hora */}
              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-600 block mb-2">
                  Hora de inicio *
                </Label>
                <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                  {horas.map((hora) => (
                    <button
                      key={hora}
                      type="button"
                      onClick={() => handleSelectChange("hora", hora)}
                      disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                      className={`
                        p-2 rounded-lg border-2 transition-all duration-200 text-center font-medium text-sm
                        ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                        ${formData.hora === hora
                          ? "border-[#305891] bg-white shadow-md"
                          : "border-gray-300 bg-white/50 hover:border-[#305891]/50"
                        }
                      `}
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duración */}
              <div>
                <Label className="text-sm font-medium text-gray-600 block mb-2">
                  Duración *
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {duraciones.map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => handleSelectChange("duracion", dur.toString())}
                      disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                      className={`
                        p-2.5 rounded-lg border-2 transition-all duration-200 text-center font-medium text-sm
                        ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                        ${formData.duracion === dur.toString()
                          ? "border-[#305891] bg-white shadow-md"
                          : "border-gray-300 bg-white/50 hover:border-[#305891]/50"
                        }
                      `}
                    >
                      {dur} min
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profesor - Botones Visuales */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                👤 Profesor/a asignado *
              </h3>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {profesores.map((profesor) => (
                  <button
                    key={profesor._id}
                    type="button"
                    onClick={() => handleSelectChange("teacher", profesor._id)}
                    disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                    className={`
                      p-2.5 rounded-lg border-2 transition-all duration-200 text-left font-medium text-sm
                      ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                      ${formData.teacher === profesor._id
                        ? "border-[#305891] bg-white shadow-md"
                        : "border-gray-300 bg-white/50 hover:border-[#305891]/50"
                      }
                    `}
                  >
                    {profesor.nombre}
                  </button>
                ))}
              </div>
            </div>

            {/* Capacidad */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                📊 Capacidad Máxima
              </h3>
              <div className="relative">
                <Input
                  id="capacidad"
                  name="capacidad"
                  type="number"
                  value={formData.capacidad}
                  onChange={handleChange}
                  disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                  required
                  className="pl-3 pr-16 py-2 border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="20"
                  min="1"
                  max="50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  alumnos
                </span>
              </div>
            </div>

            {/* Detalles */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                📝 Detalles y Observaciones
              </h3>
              <div className="space-y-2">
                <Label htmlFor="detalles" className="text-sm font-medium text-gray-600">
                  Información adicional sobre la clase
                </Label>
                <Textarea
                  id="detalles"
                  name="detalles"
                  value={formData.detalles}
                  onChange={handleChange}
                  disabled={isSubmitting} // 🆕 Deshabilitado durante envío
                  className="resize-none h-24 border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Ej: Traer mat, agua, es recomendado para principiantes..."
                />
              </div>
            </div>

            {/* Nota informativa */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <p className="text-xs text-blue-700">
                <strong>Nota:</strong> Los campos marcados con * son obligatorios. La clase será visible para los alumnos una vez guardada.
              </p>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t bg-gray-50 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting} // 🆕 Deshabilitado durante envío
              className="min-w-[100px] border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting} // 🆕 Deshabilitado durante envío
              className="min-w-[120px] bg-gradient-to-r from-[#305891] to-[#4070b0] text-white hover:from-[#254670] hover:to-[#305891] transition-all duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                // 🆕 Mostrar estado de carga
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  {isEdit ? "Guardando..." : "Creando..."}
                </span>
              ) : (
                <span>{isEdit ? "💾 Guardar cambios" : "✅ Crear clase"}</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}