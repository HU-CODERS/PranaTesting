"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { Save, X, Edit3, Shield, Eye, EyeOff, Lock, User, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Tipos e interfaces
interface PasswordRequirements {
  length: boolean
  lowercase: boolean
  uppercase: boolean
  numbers: boolean
  special: boolean
}

interface PasswordStrength {
  score: number
  feedback: string
  requirements: PasswordRequirements
}

interface NotificacionesConfig {
  nuevasReservas: boolean
  cancelaciones: boolean
  mensajesEstudiantes: boolean
  actualizacionesPlataforma: boolean
}

interface RedesSociales {
  instagram: string
  facebook: string
  youtube: string
}

interface PerfilProfesor {
  nombre: string
  apellido: string
  telefono: string
  avatar: string
  email: string
  descripcion: string
  especialidades: string[]
  formacion: string
  redesSociales: RedesSociales
  notificaciones: NotificacionesConfig
  idioma: string
  zonaHoraria: string
}

interface PasswordInputProps {
  id: string
  name: string
  placeholder: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputRef?: React.RefObject<HTMLInputElement>
}

// Componente para input de contraseña con visualizador
const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  name,
  placeholder,
  className = "",
  onChange,
  inputRef
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`pr-12 ${className}`}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}

const ConfiguracionPage: React.FC = () => {
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState<string>("")
  const [guardadoExitoso, setGuardadoExitoso] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("perfil")
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: "",
    requirements: {
      length: false,
      lowercase: false,
      uppercase: false,
      numbers: false,
      special: false
    }
  })

  // Referencias para los inputs de contraseña
  const currentPasswordRef = useRef<HTMLInputElement>(null!)
  const newPasswordRef = useRef<HTMLInputElement>(null!)
  const confirmPasswordRef = useRef<HTMLInputElement>(null!)

  const [perfil, setPerfil] = useState<PerfilProfesor>({
    nombre: "",
    apellido: "",
    telefono: "",
    avatar: "/placeholder.svg",
    email: "",
    descripcion: "",
    especialidades: [],
    formacion: "",
    redesSociales: {
      instagram: "",
      facebook: "",
      youtube: "",
    },
    notificaciones: {
      nuevasReservas: true,
      cancelaciones: true,
      mensajesEstudiantes: false,
      actualizacionesPlataforma: true,
    },
    idioma: "es",
    zonaHoraria: "Europe/Madrid",
  })

  const obtenerPerfil = async (): Promise<void> => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("No estás autenticado.")
      return
    }

    try {
      const response = await fetch("https://pranabackend.onrender.com/api/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Error al obtener perfil.")
      }

      const data = await response.json()

      setPerfil({
        nombre: data.profile?.name || "",
        apellido: data.profile?.lastname || "",
        telefono: data.profile?.tel || "",
        avatar: data.profile?.picture || "/placeholder.svg",
        email: data?.email || "",
        descripcion: data.profile?.biography || "",
        especialidades: data.profile?.specialitys || [],
        formacion: data.profile?.certifications || "",
        redesSociales: {
          instagram: data.profile?.socials?.instagram || "",
          facebook: data.profile?.socials?.facebook || "",
          youtube: data.profile?.socials?.youtube || "",
        },
        notificaciones: {
          nuevasReservas: data.profile?.notifications?.nuevasReservas ?? true,
          cancelaciones: data.profile?.notifications?.cancelaciones ?? true,
          mensajesEstudiantes: data.profile?.notifications?.mensajesEstudiantes ?? false,
          actualizacionesPlataforma: data.profile?.notifications?.actualizacionesPlataforma ?? true,
        },
        idioma: data.profile?.language || "es",
        zonaHoraria: data.profile?.timezone || "Europe/Madrid",
      })
    } catch (err) {
      console.error("Error al obtener perfil:", err)
      alert("No se pudo cargar el perfil del usuario.")
    }
  }

  useEffect(() => {
    obtenerPerfil()
  }, [])

  // Función para evaluar la fuerza de la contraseña
  const evaluatePasswordStrength = (password: string): void => {
    let score = 0
    let feedback = ""
    const requirements: PasswordRequirements = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password)
    }

    if (requirements.length) score += 1
    if (requirements.lowercase) score += 1
    if (requirements.uppercase) score += 1
    if (requirements.numbers) score += 1
    if (requirements.special) score += 1

    switch (score) {
      case 0:
      case 1:
        feedback = "Muy débil"
        break
      case 2:
        feedback = "Débil"
        break
      case 3:
        feedback = "Regular"
        break
      case 4:
        feedback = "Fuerte"
        break
      case 5:
        feedback = "Muy fuerte"
        break
    }

    setPasswordStrength({ score, feedback, requirements })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    evaluatePasswordStrength(e.target.value)
  }

  const handleSaveProfile = async (): Promise<void> => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("No estás autenticado")
      return
    }

    try {
      const res = await fetch("https://pranabackend.onrender.com/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAdmin: false,
          teacherProfile: {
            name: perfil.nombre,
            lastname: perfil.apellido,
            tel: perfil.telefono,
            picture: perfil.avatar,
            biography: perfil.descripcion,
            specialitys: perfil.especialidades,
            certifications: typeof perfil.formacion === "string"
              ? perfil.formacion.split("\n")
              : perfil.formacion,
            socials: perfil.redesSociales,
            notifications: perfil.notificaciones,
            language: perfil.idioma,
            timezone: perfil.zonaHoraria,
          },
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Error al actualizar el perfil")
      }

      setGuardadoExitoso(true)
      setTimeout(() => setGuardadoExitoso(false), 15000)
      alert("Perfil actualizado exitosamente")
    } catch (err) {
      console.error("Error al guardar perfil:", err)
      alert("Hubo un problema al guardar el perfil.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setPerfil((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitChange = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      alert("No estás autenticado.")
      return
    }

    const currentPassword = currentPasswordRef.current?.value
    const newPassword = newPasswordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Por favor, completá todos los campos.")
      return
    }

    if (newPassword !== confirmPassword) {
      alert("La nueva contraseña y su confirmación no coinciden.")
      return
    }

    try {
      const res = await fetch("https://pranabackend.onrender.com/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: currentPassword,
          newPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Error al actualizar la contraseña.")
        return
      }

      alert("Contraseña actualizada exitosamente.")

      // Limpiar los campos usando las referencias
      if (currentPasswordRef.current) currentPasswordRef.current.value = ""
      if (newPasswordRef.current) newPasswordRef.current.value = ""
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = ""

    } catch (err) {
      console.error("Error:", err)
      alert("Hubo un error al intentar actualizar la contraseña.")
    }
  }

  const handleNotificacionesChange = (name: keyof NotificacionesConfig, checked: boolean): void => {
    setPerfil((prev) => ({
      ...prev,
      notificaciones: { ...prev.notificaciones, [name]: checked },
    }))
  }

  const agregarEspecialidad = (): void => {
    if (nuevaEspecialidad.trim() !== "" && !perfil.especialidades.includes(nuevaEspecialidad)) {
      setPerfil((prev) => ({
        ...prev,
        especialidades: [...prev.especialidades, nuevaEspecialidad.trim()],
      }))
      setNuevaEspecialidad("")
    }
  }

  const eliminarEspecialidad = (index: number): void => {
    setPerfil((prev) => ({
      ...prev,
      especialidades: prev.especialidades.filter((_, i) => i !== index),
    }))
  }
  return (
    <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Configuración de Cuenta</h1>
        <p className="text-sm sm:text-lg text-gray-600 mt-1">Gestiona tu perfil, seguridad y preferencias.</p>
      </header>

      {guardadoExitoso && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <Save className="h-6 w-6 text-green-500 mr-3" />
            </div>
            <div>
              <p className="font-bold">¡Éxito!</p>
              <p className="text-sm">Tus cambios han sido guardados correctamente.</p>
            </div>
            <button onClick={() => setGuardadoExitoso(false)} className="ml-auto -mx-1.5 -my-1.5">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 gap-2 h-auto p-1 bg-gray-100">
          <TabsTrigger
            value="perfil"
            className="flex items-center justify-center py-3 px-4 text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#305891] transition-all"
          >
            <Edit3 className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Perfil Profesional</span>
            <span className="sm:hidden">Perfil</span>
          </TabsTrigger>
          <TabsTrigger
            value="seguridad"
            className="flex items-center justify-center py-3 px-4 text-sm sm:text-base data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#305891] transition-all"
          >
            <Shield className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Seguridad</span>
            <span className="sm:hidden">Seguridad</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfil">
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              handleSaveProfile()
            }}
          >
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="border-b bg-white">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#305891]/10 rounded-lg">
                    <User className="h-5 w-5 text-[#305891]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">Información Profesional</CardTitle>
                    <CardDescription className="text-gray-600">Actualiza tu información pública y especialidades.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-sm font-semibold text-gray-700">
                        Nombre
                      </Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={perfil.nombre}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellido" className="text-sm font-semibold text-gray-700">
                        Apellido
                      </Label>
                      <Input
                        id="apellido"
                        name="apellido"
                        value={perfil.apellido}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={perfil.email}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20 bg-gray-50"
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-sm font-semibold text-gray-700">
                        Teléfono
                      </Label>
                      <Input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={perfil.telefono}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion" className="text-sm font-semibold text-gray-700">
                    Descripción Profesional
                  </Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    rows={4}
                    value={perfil.descripcion}
                    onChange={handleChange}
                    className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                    placeholder="Cuéntanos sobre tu experiencia y especialidades..."
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Especialidades</Label>
                  <div className="flex flex-wrap gap-2">
                    {perfil.especialidades.map((esp: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm py-1.5 px-3 bg-[#305891]/10 text-[#305891] border-[#305891]/20 hover:bg-[#305891]/20 transition-colors">
                        {esp}
                        <button
                          type="button"
                          onClick={() => eliminarEspecialidad(index)}
                          className="ml-2 text-[#305891]/70 hover:text-red-500 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={nuevaEspecialidad}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNuevaEspecialidad(e.target.value)}
                      placeholder="Añadir especialidad"
                      className="flex-1 border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          agregarEspecialidad()
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={agregarEspecialidad}
                      className="border-[#305891] text-[#305891] hover:bg-[#305891] hover:text-white transition-colors"
                    >
                      Añadir
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="formacion" className="text-sm font-semibold text-gray-700">
                    Certificaciones
                  </Label>
                  <Textarea
                    id="formacion"
                    name="formacion"
                    rows={3}
                    value={perfil.formacion}
                    onChange={handleChange}
                    className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                    placeholder="Lista tus certificaciones y formaciones..."
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gray-50/50 p-6">
                <Button
                  type="submit"
                  className="ml-auto bg-[#305891] hover:bg-[#264a77] text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Save className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Guardar Cambios de Perfil</span>
                  <span className="sm:hidden">Guardar</span>
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="seguridad">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="border-b bg-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Lock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Seguridad de la Cuenta</CardTitle>
                  <CardDescription className="text-gray-600">Gestiona tu contraseña y mantén tu cuenta segura.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Consejos de Seguridad</h3>
                </div>
                <ul className="text-sm text-blue-800 space-y-1 ml-7">
                  <li>• Usa al menos 8 caracteres</li>
                  <li>• Combina mayúsculas, minúsculas y números</li>
                  <li>• Incluye símbolos especiales</li>
                  <li>• No uses información personal</li>
                </ul>
              </div>

              <form onSubmit={handleSubmitChange}>
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm font-semibold text-gray-700">
                      Contraseña Actual *
                    </Label>
                    <PasswordInput
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Ingresa tu contraseña actual"
                      className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                      inputRef={currentPasswordRef}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">
                      Nueva Contraseña *
                    </Label>
                    <PasswordInput
                      id="newPassword"
                      name="newPassword"
                      placeholder="Ingresa tu nueva contraseña"
                      className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                      onChange={handlePasswordChange}
                      inputRef={newPasswordRef}
                    />

                    {passwordStrength.score > 0 && (
                      <div className="mt-3 space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-600">Fuerza de la contraseña</span>
                            <span className={`text-xs font-bold ${passwordStrength.score <= 2 ? "text-red-500" :
                              passwordStrength.score === 3 ? "text-yellow-500" :
                                "text-green-500"
                              }`}>
                              {passwordStrength.feedback}
                            </span>
                          </div>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((level: number) => (
                              <div
                                key={level}
                                className={`h-2 flex-1 rounded-full transition-all duration-300 ${level <= passwordStrength.score
                                  ? passwordStrength.score <= 2
                                    ? "bg-red-400 shadow-sm"
                                    : passwordStrength.score === 3
                                      ? "bg-yellow-400 shadow-sm"
                                      : "bg-green-400 shadow-sm"
                                  : "bg-gray-200"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          <h4 className="text-xs font-semibold text-gray-700 mb-2">Requisitos:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                            <div className={`flex items-center space-x-2 ${passwordStrength.requirements.length ? "text-green-600" : "text-gray-500"
                              }`}>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.requirements.length ? "bg-green-100" : "bg-gray-200"
                                }`}>
                                {passwordStrength.requirements.length ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                )}
                              </div>
                              <span>Mínimo 8 caracteres</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${passwordStrength.requirements.lowercase ? "text-green-600" : "text-gray-500"
                              }`}>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.requirements.lowercase ? "bg-green-100" : "bg-gray-200"
                                }`}>
                                {passwordStrength.requirements.lowercase ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                )}
                              </div>
                              <span>Minúsculas (a-z)</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${passwordStrength.requirements.uppercase ? "text-green-600" : "text-gray-500"
                              }`}>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.requirements.uppercase ? "bg-green-100" : "bg-gray-200"
                                }`}>
                                {passwordStrength.requirements.uppercase ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                )}
                              </div>
                              <span>Mayúsculas (A-Z)</span>
                            </div>
                            <div className={`flex items-center space-x-2 ${passwordStrength.requirements.numbers ? "text-green-600" : "text-gray-500"
                              }`}>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.requirements.numbers ? "bg-green-100" :
                                "bg-gray-200"

                                }`}>
                                {passwordStrength.requirements.numbers ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                )}
                              </div>
                              <span>Números (0-9)</span>
                            </div>
                            <div className={`flex items-center space-x-2 col-span-1 sm:col-span-2 ${passwordStrength.requirements.special ? "text-green-600" : "text-gray-500"
                              }`}>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passwordStrength.requirements.special ? "bg-green-100" : "bg-gray-200"
                                }`}>
                                {passwordStrength.requirements.special ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <div className="w-2 h-2 bg-gray-400 rounded-full" />
                                )}
                              </div>
                              <span>Símbolos especiales (!@#$%^&*)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                      Confirmar Nueva Contraseña *
                    </Label>
                    <PasswordInput
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirma tu nueva contraseña"
                      className="border-gray-200 focus:border-[#305891] focus:ring-[#305891]/20"
                      inputRef={confirmPasswordRef}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Actualizar Contraseña</span>
                    <span className="sm:hidden">Actualizar</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ConfiguracionPage