"use client"

import { useState, useEffect } from "react"
import { X, Upload, Plus, Mail, Phone, MapPin, Award, Briefcase, DollarSign, Calendar, Star, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface ProfesorModalProps {
  isOpen: boolean
  onClose: () => void
  profesorId?: number | null
  mode?: "view" | "edit" | "create"
}

export function ProfesorModal({ isOpen, onClose, profesorId = null, mode = "create" }: ProfesorModalProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [profesor, setProfesor] = useState<any>(null)
  const [especialidades, setEspecialidades] = useState<string[]>([])
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfesor = async () => {
      if (profesorId && (mode === "view" || mode === "edit")) {
        try {
          const res = await fetch(`https://pranabackend.onrender.com/api/teachers`)
          const data = await res.json()
          const profe = data.find((p: any) =>
            typeof profesorId === "object" && profesorId !== null && "id" in profesorId
              ? p._id === (profesorId as any).id
              : p._id === profesorId
          )

          if (profe) {
            setProfesor({
              id: profe._id,
              nombre: profe.teacherProfile?.name || "",
              apellidos: profe.teacherProfile?.lastname || "",
              email: profe.email || "",
              telefono: profe.teacherProfile?.tel || "",
              avatar: profe.teacherProfile?.picture || "",
              biografia: profe.teacherProfile?.biography || "",
              direccion: profe.teacherProfile?.address || "",
              certificaciones: profe.teacherProfile?.certifications || [],
              experiencia: profe.teacherProfile?.yearsOfExperience || 0,
              tipoContrato: profe.teacherProfile?.typeOfContract || "Autónomo",
              comision: profe.teacherProfile?.comission || "0",
              datosBancarios: profe.teacherProfile?.bankAccount || "",
              clasesImpartidas: profe.myClasses?.length || 0,
              valoracion: profe.rating || 0,
              ingresosGenerados: 0,
              fechaIngreso: new Date(profe.createdAt).toLocaleDateString("es-AR"),
            })
            setEspecialidades(profe.teacherProfile?.specialitys || [])
          } else {
            setProfesor(null)
          }
        } catch (err) {
          console.error("Error al cargar profesor:", err)
        }
      } else {
        setProfesor({
          nombre: "",
          apellidos: "",
          email: "",
          telefono: "",
          avatar: "",
          biografia: "",
          direccion: "",
          certificaciones: [],
          experiencia: 0,
          tipoContrato: "Autónomo",
          comision: "30",
          datosBancarios: "",
        })
        setEspecialidades([])
      }
    }

    fetchProfesor()
  }, [profesorId, mode])

  const handleAddEspecialidad = () => {
    if (nuevaEspecialidad && !especialidades.includes(nuevaEspecialidad)) {
      setEspecialidades([...especialidades, nuevaEspecialidad])
      setNuevaEspecialidad("")
    }
  }

  const handleRemoveEspecialidad = (esp: string) => {
    setEspecialidades(especialidades.filter((e) => e !== esp))
  }

  const isViewOnly = mode === "view"

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = {
        id: profesor.id,
        email: profesor.email,
        teacherProfile: {
          name: profesor.nombre || "",
          lastname: profesor.apellidos || "",
          picture: profesor.avatar || "",
          tel: profesor.telefono || "",
          biography: profesor.biografia || "",
          address: profesor.direccion || "",
          specialitys: especialidades,
          yearsOfExperience: profesor.experiencia || 0,
          certifications: profesor.certificaciones || [],
          typeOfContract: profesor.tipoContrato || "Autónomo",
          comission: profesor.comision?.toString() || "0",
          bankAccount: profesor.datosBancarios || "",
          redesSociales: ""
        }
      }

      const url =
        mode === "create"
          ? "https://pranabackend.onrender.com/api/teachers/create"
          : "https://pranabackend.onrender.com/api/teachers/update"

      const method = mode === "create" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Error al guardar profesor")
      }
      window.location.reload()

      const result = await response.json()
      alert(`Profesor ${mode === "create" ? "creado" : "actualizado"} con éxito`)
      onClose()

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getInitials = (nombre: string, apellidos: string) => {
    if (!nombre && !apellidos) return "?"
    return `${nombre?.[0] || ""}${apellidos?.[0] || ""}`.toUpperCase()
  }

  if (!profesor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Título oculto para accesibilidad en modo vista */}
        {mode === "view" && (
          <VisuallyHidden>
            <DialogTitle>Detalles del profesor {profesor.nombre} {profesor.apellidos}</DialogTitle>
          </VisuallyHidden>
        )}
        
        {/* Header con gradiente y avatar */}
        {mode === "view" && (
          <div className="bg-gradient-to-br from-[#5862f0] to-[#7d86ff] p-8 relative">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white">
                {profesor.avatar ? (
                  <img src={profesor.avatar} alt={profesor.nombre} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-[#5862f0]">
                    {getInitials(profesor.nombre, profesor.apellidos)}
                  </span>
                )}
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {profesor.nombre} {profesor.apellidos}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
                    {profesor.tipoContrato}
                  </Badge>
                  <div className="flex items-center gap-1 text-white">
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    <span className="font-semibold">{profesor.valoracion}</span>
                  </div>
                </div>
                <div className="flex gap-4 text-white/90 text-sm">
                  {profesor.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {profesor.email}
                    </div>
                  )}
                  {profesor.telefono && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {profesor.telefono}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={mode === "view" ? "p-6" : "p-6 pt-6"}>
          {mode !== "view" && (
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl">
                {mode === "create" ? "Añadir nuevo profesor" : "Editar profesor"}
              </DialogTitle>
              <DialogDescription>
                {mode === "create"
                  ? "Completa el formulario para añadir un nuevo profesor a Prana OM."
                  : "Modifica la información del profesor."}
              </DialogDescription>
            </DialogHeader>
          )}

          {/* Estadísticas solo en modo vista */}
          {mode === "view" && (
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Clases</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">{profesor.clasesImpartidas}</div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-900">Valoración</span>
                </div>
                <div className="text-3xl font-bold text-yellow-600">{profesor.valoracion}</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Ingresos</span>
                </div>
                <div className="text-3xl font-bold text-green-600">€{profesor.ingresosGenerados}</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Desde</span>
                </div>
                <div className="text-lg font-bold text-purple-600">{profesor.fechaIngreso}</div>
              </div>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-gray-100">
              <TabsTrigger 
                value="personal" 
                className="data-[state=active]:bg-[#a3aaff] transition-all"
                style={{ color: activeTab === "personal" ? "white" : undefined }}
              >
                Información personal
              </TabsTrigger>
              <TabsTrigger 
                value="profesional" 
                className="data-[state=active]:bg-[#a3aaff] transition-all"
                style={{ color: activeTab === "profesional" ? "white" : undefined }}
              >
                Información profesional
              </TabsTrigger>
              <TabsTrigger 
                value="administrativa" 
                className="data-[state=active]:bg-[#a3aaff] transition-all"
                style={{ color: activeTab === "administrativa" ? "white" : undefined }}
              >
                Información administrativa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <Mail className="h-5 w-5 text-[#5862f0]" />
                  Datos de contacto
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-sm font-medium">Nombre</Label>
                    <Input
                      id="nombre"
                      value={profesor.nombre}
                      onChange={(e) => setProfesor({ ...profesor, nombre: e.target.value })}
                      disabled={isViewOnly}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidos" className="text-sm font-medium">Apellidos</Label>
                    <Input
                      id="apellidos"
                      value={profesor.apellidos}
                      onChange={(e) => setProfesor({ ...profesor, apellidos: e.target.value })}
                      disabled={isViewOnly}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profesor.email}
                      onChange={(e) => setProfesor({ ...profesor, email: e.target.value })}
                      disabled={isViewOnly}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-sm font-medium">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={profesor.telefono}
                      onChange={(e) => setProfesor({ ...profesor, telefono: e.target.value })}
                      disabled={isViewOnly}
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profesional" className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="biografia" className="text-sm font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[#5862f0]" />
                    Biografía
                  </Label>
                  <Textarea
                    id="biografia"
                    rows={5}
                    value={profesor.biografia}
                    onChange={(e) => setProfesor({ ...profesor, biografia: e.target.value })}
                    disabled={isViewOnly}
                    className="bg-white resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Award className="h-4 w-4 text-[#5862f0]" />
                    Especialidades
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {especialidades.map((esp, index) => (
                      <Badge 
                        key={index} 
                        className="bg-[#5862f0]/10 text-[#5862f0] hover:bg-[#5862f0]/20 border-[#5862f0]/20 px-3 py-1"
                      >
                        {esp}
                        {!isViewOnly && (
                          <button
                            className="ml-2 hover:text-red-600"
                            onClick={() => handleRemoveEspecialidad(esp)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {!isViewOnly && (
                    <div className="flex gap-2 mt-3">
                      <Input
                        value={nuevaEspecialidad}
                        onChange={(e) => setNuevaEspecialidad(e.target.value)}
                        placeholder="Añadir especialidad"
                        className="bg-white"
                      />
                      <Button 
                        onClick={handleAddEspecialidad}
                        className="bg-[#5862f0] hover:bg-[#2d38ad]"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificaciones" className="text-sm font-medium">Certificaciones</Label>
                    <Input
                      id="certificaciones"
                      value={profesor.certificaciones?.join(", ")}
                      onChange={(e) =>
                        setProfesor({
                          ...profesor,
                          certificaciones: e.target.value.split(", "),
                        })
                      }
                      disabled={isViewOnly}
                      className="bg-white"
                      placeholder="Separadas por comas"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experiencia" className="text-sm font-medium">Años de experiencia</Label>
                    <Input
                      id="experiencia"
                      type="number"
                      value={profesor.experiencia}
                      onChange={(e) => setProfesor({ ...profesor, experiencia: Number.parseInt(e.target.value) })}
                      disabled={isViewOnly}
                      className="bg-white"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="administrativa" className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-[#5862f0]" />
                  Información contractual
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipoContrato" className="text-sm font-medium">Tipo de contrato</Label>
                    <Select
                      value={profesor.tipoContrato}
                      onValueChange={(value) => setProfesor({ ...profesor, tipoContrato: value })}
                      disabled={isViewOnly}
                    >
                      <SelectTrigger id="tipoContrato" className="bg-white">
                        <SelectValue placeholder="Seleccionar tipo de contrato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Autónomo">Autónomo</SelectItem>
                        <SelectItem value="Contrato laboral">Contrato laboral</SelectItem>
                        <SelectItem value="Colaborador">Colaborador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comision" className="text-sm font-medium">Comisión (%)</Label>
                    <Input
                      id="comision"
                      type="number"
                      value={profesor.comision}
                      onChange={(e) => setProfesor({ ...profesor, comision: e.target.value })}
                      disabled={isViewOnly}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="datosBancarios" className="text-sm font-medium">Datos bancarios (IBAN)</Label>
                    <Input
                      id="datosBancarios"
                      value={profesor.datosBancarios}
                      onChange={(e) => setProfesor({ ...profesor, datosBancarios: e.target.value })}
                      disabled={isViewOnly}
                      className="bg-white"
                      placeholder="ES00 0000 0000 0000 0000 0000"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Botón cerrar integrado en modo vista */}
          {mode === "view" && (
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={onClose}
                className="bg-[#5862f0] hover:bg-[#2d38ad] text-white"
              >
                <X className="h-4 w-4 mr-2" />
                Cerrar
              </Button>
            </div>
          )}
        </div>

        {/* Footer solo para crear/editar */}
        {mode !== "view" && (
          <DialogFooter className="px-6 pb-6">
            <Button 
              variant="outline" 
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="bg-[#5862f0] hover:bg-[#2d38ad] text-white"
            >
              {loading ? (mode === "create" ? "Creando..." : "Guardando...") : mode === "create" ? "Crear profesor" : "Guardar cambios"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}