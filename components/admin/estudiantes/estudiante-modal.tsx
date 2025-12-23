"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Mail, Phone, Calendar, CreditCard, User, Award } from "lucide-react"

interface MembershipPayment {
  _id: string;
  concepto: string;
  fecha: string;
  monto: number;
  estado: string;
}

interface EstudianteModalProps {
  isOpen: boolean
  onClose: () => void
  estudiante?: any
  mode?: "view" | "edit" | "create"
}

export function EstudianteModal({ isOpen, onClose, estudiante, mode = "view" }: EstudianteModalProps) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [tel, setTelefono] = useState("")
  const [membresia, setMembresia] = useState("")
  const [tipoEstudiante, setTipoEstudiante] = useState<"regular" | "formacion">("regular")
  const [fechaInicio, setFechaInicio] = useState("")
  const [memberships, setMemberships] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("personal")
  const [sanciones, setSanciones] = useState<any[]>([])
  const API_BASE_URL = "https://pranabackend.onrender.com/api/students"
  const GetMembership_URL = "https://pranabackend.onrender.com/api/membership"
  const [loading, setLoading] = useState(false)

  // Establecer fecha actual por defecto
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFechaInicio(today);
  }, []);

  useEffect(() => {
    const fetchMemberships = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(GetMembership_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Error al cargar membresías");
        const data = await res.json();
        setMemberships(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberships();
  }, []);

  useEffect(() => {
    if (estudiante) {
      setNombre(estudiante.nameAndLastname || "");
      setEmail(estudiante.email || "");
      setTelefono(estudiante.tel || "");
      setMembresia(estudiante.membership?.title || "free");
      setTipoEstudiante(estudiante.isFormacion ? "formacion" : "regular");
      setSanciones(estudiante.sanciones || []);
      
      // Si existe buyDate en la membresía, usar esa fecha
      if (estudiante.membership?.buyDate) {
        const date = new Date(estudiante.membership.buyDate);
        setFechaInicio(date.toISOString().split('T')[0]);
      }
    } else {
      setNombre("");
      setEmail("");
      setTelefono("");
      setMembresia("");
      setTipoEstudiante("regular");
      setSanciones([]);
      // La fecha se establece en el useEffect inicial con la fecha actual
    }
  }, [estudiante]);

  // Filtrar y ordenar membresías
  const filteredMemberships = memberships
    .filter((m) => {
      // Determinar si es de formación buscando en los tipos de clase permitidos
      const tiposClase = m.classTypes || m.allowedClassTypes || [];
      const incluyeFormacion = tiposClase.some((tipo: string) => 
        tipo.toLowerCase().includes("formacion") || tipo.toLowerCase().includes("formación")
      );
      
      // Debug: mostrar información de la membresía
      console.log(`Membresía: ${m.name}, tipos: ${JSON.stringify(tiposClase)}, incluyeFormacion: ${incluyeFormacion}`);
      
      if (tipoEstudiante === "formacion") {
        return incluyeFormacion;
      } else {
        return !incluyeFormacion;
      }
    })
    .sort((a, b) => {
      // Ordenar: Suscripción Flexible primero, Clases Específicas después
      const aIsNew = a.classTypeAllocations && a.classTypeAllocations.length > 0;
      const bIsNew = b.classTypeAllocations && b.classTypeAllocations.length > 0;
      
      if (!aIsNew && bIsNew) return -1; // a es flexible, b es específico -> a primero
      if (aIsNew && !bIsNew) return 1;  // a es específico, b es flexible -> b primero
      return 0; // mismo tipo, mantener orden
    });

  const handleSubmit = async () => {
    const selectedMembership = memberships.find((m) => m.name === membresia);

    if (!selectedMembership) {
      alert("Debe seleccionar una membresía válida");
      return;
    }

    const isNewMembershipSystem = selectedMembership.classTypeAllocations && 
                                 Array.isArray(selectedMembership.classTypeAllocations) && 
                                 selectedMembership.classTypeAllocations.length > 0;

    // Usar la fecha seleccionada o la fecha actual
    const startDate = fechaInicio ? new Date(fechaInicio) : new Date();
    const expirationDate = new Date(startDate);
    expirationDate.setMonth(expirationDate.getMonth() + 1);

    const membershipData: any = {
      title: selectedMembership.name,
      buyDate: startDate,
      totalClasses: selectedMembership.classCount || 0,
      currentClasses: selectedMembership.classCount || 0,
      price: selectedMembership.price || 0,
      allowedClassTypes: selectedMembership.classTypes || [],
      expirationDate: expirationDate
    };

    if (isNewMembershipSystem) {
      membershipData.classTypeAllocations = selectedMembership.classTypeAllocations.map((allocation: any) => ({
        classTypeId: allocation.classTypeId,
        totalCount: allocation.count,
        remainingCount: allocation.count
      }));
      
      membershipData.currentClasses = selectedMembership.classTypeAllocations.reduce(
        (total: number, allocation: any) => total + allocation.count, 
        0
      );
    }

    const payload = {
      email,
      nameAndLastname: nombre,
      tel,
      membership: membershipData,
      isFormacion: tipoEstudiante === "formacion",
      id: estudiante?._id,
    };

    try {
      if (mode === "create") {
        const res = await fetch(`${API_BASE_URL}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al crear estudiante");
        }
        
        window.location.reload()
      }

      if (mode === "edit") {
        const res = await fetch(`${API_BASE_URL}/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al actualizar estudiante");
        }
        
        window.location.reload()
      }

      onClose()
    } catch (error: any) {
      console.error("Error en el envío del formulario:", error)
      alert(`Ocurrió un error al guardar el estudiante: ${error.message || error}`)
    }
  }

  const getInitials = (nombre: string) => {
    if (!nombre || nombre.trim() === "") return "?"
    const names = nombre.trim().split(" ")
    if (names.length >= 2 && names[0] && names[1]) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return nombre.substring(0, 2).toUpperCase()
  }

  const renderForm = () => (
    <div className="space-y-6">
      {mode === "edit" && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Al modificar los datos del estudiante, se le enviará una notificación por correo electrónico.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-[#5862f0]" />
          Información Personal
        </h3>

        <div className="space-y-2">
          <Label htmlFor="nombre" className="text-sm font-medium">Nombre completo</Label>
          <Input
            id="nombre"
            value={nombre}
            placeholder="Nombre y apellido"
            onChange={(e) => setNombre(e.target.value)}
            className="bg-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono" className="text-sm font-medium">Teléfono</Label>
            <Input
              id="telefono"
              value={tel}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="+54 11 1234-5678"
              className="bg-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Selector de tipo de estudiante */}
      <div className="bg-gradient-to-r from-[#5862f0]/5 to-[#7d86ff]/5 rounded-xl p-6 border-2 border-[#5862f0]/20">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipo de Estudiante</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setTipoEstudiante("regular");
              setMembresia(""); // Resetear selección de membresía
            }}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${tipoEstudiante === "regular"
                ? "border-[#5862f0] bg-white shadow-md"
                : "border-gray-300 bg-white/50 hover:border-[#5862f0]/50"
              }
            `}
          >
            {tipoEstudiante === "regular" && (
              <div className="absolute top-3 right-3">
                <div className="w-5 h-5 bg-[#5862f0] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            <div className="text-2xl mb-2">🧘</div>
            <h4 className="font-bold text-gray-900 mb-1">Estudiante Regular</h4>
            <p className="text-xs text-gray-600">Clases y membresías estándar</p>
          </button>

          <button
            type="button"
            onClick={() => {
              setTipoEstudiante("formacion");
              setMembresia(""); // Resetear selección de membresía
            }}
            className={`
              relative p-4 rounded-xl border-2 transition-all duration-300 text-left
              ${tipoEstudiante === "formacion"
                ? "border-[#5862f0] bg-white shadow-md"
                : "border-gray-300 bg-white/50 hover:border-[#5862f0]/50"
              }
            `}
          >
            {tipoEstudiante === "formacion" && (
              <div className="absolute top-3 right-3">
                <div className="w-5 h-5 bg-[#5862f0] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            <div className="text-2xl mb-2">🎓</div>
            <h4 className="font-bold text-gray-900 mb-1">Formación</h4>
            <p className="text-xs text-gray-600">Programas de certificación</p>
          </button>
        </div>
      </div>

      {/* Selector de fecha de inicio */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Fecha de Inicio de Membresía
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              La membresía expirará 1 mes desde esta fecha
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-blue-200">
          <div className="space-y-2">
            <Label htmlFor="fechaInicio" className="text-sm font-medium">
              Seleccionar fecha de inicio
            </Label>
            <Input
              id="fechaInicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="bg-white"
              required
            />
            {fechaInicio && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-600">Fecha de inicio:</span>
                    <span className="font-semibold text-gray-900 ml-2">
                      {new Date(fechaInicio + 'T00:00:00').toLocaleDateString('es-AR', { 
                        day: '2-digit', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <div>
                    <span className="text-gray-600">Fecha de expiración:</span>
                    <span className="font-semibold text-blue-600 ml-2">
                      {(() => {
                        const expDate = new Date(fechaInicio + 'T00:00:00');
                        expDate.setMonth(expDate.getMonth() + 1);
                        return expDate.toLocaleDateString('es-AR', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        });
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 text-xs text-gray-600 bg-white/50 rounded-lg p-3">
          <div className="text-blue-600 font-bold">💡</div>
          <p>
            <strong>Consejo:</strong> Si el estudiante ya asistió a clases este mes pero está pagando ahora, 
            puedes ajustar la fecha al día que realmente comenzó a usar su membresía.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5 text-[#5862f0]" />
          Membresía
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Seleccionar Plan</Label>
            <Badge variant="outline" className="bg-white">
              {tipoEstudiante === "formacion" ? "Membresías de Formación" : "Membresías Regulares"} 
              <span className="ml-1.5 font-bold">({filteredMemberships.length})</span>
            </Badge>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5862f0]"></div>
            </div>
          ) : filteredMemberships.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <div className="mb-4 text-4xl">📋</div>
              <p className="text-gray-700 font-medium mb-2">
                No hay membresías disponibles para {tipoEstudiante === "formacion" ? "formación" : "estudiantes regulares"}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Total de membresías cargadas: {memberships.length}
              </p>
              <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3 max-w-md mx-auto">
                <p className="mb-2"><strong>Información:</strong></p>
                <p>
                  {tipoEstudiante === "formacion" 
                    ? "Las membresías de formación deben tener 'formacion' o 'formación' en su lista de tipos de clase permitidos."
                    : "Las membresías regulares son aquellas que NO incluyen 'formacion' en sus tipos de clase."
                  }
                </p>
                <p className="mt-2 text-blue-600">
                  Verifica la consola del navegador (F12) para ver los tipos de clase de cada membresía.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs">
                <span className="text-blue-700">
                  <strong>Suscripción Flexible</strong> aparece primero, <strong>Clases Específicas</strong> al final
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
              {filteredMemberships.map((m) => {
                const isNewSystem = m.classTypeAllocations && m.classTypeAllocations.length > 0;
                const isSelected = membresia === m.name;
                
                return (
                  <div
                    key={m._id || m.name}
                    onClick={() => setMembresia(m.name)}
                    className={`
                      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
                      ${isSelected 
                        ? 'border-[#5862f0] bg-gradient-to-r from-[#5862f0]/5 to-[#7d86ff]/5 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-[#5862f0]/50 hover:shadow-sm'
                      }
                    `}
                  >
                    {/* Indicador de selección */}
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 bg-[#5862f0] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Header de la card */}
                    <div className="flex items-start justify-between mb-3 pr-8">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900 capitalize">
                          {m.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{m.description}</p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge 
                        variant={isNewSystem ? "default" : "secondary"} 
                        className={isNewSystem ? "bg-[#5862f0]" : "bg-green-400 text-white hover:bg-green-500"}
                      >
                        {isNewSystem ? "Clases Específicas por Tipo" : "Suscripción Flexible"}
                      </Badge>
                      <Badge variant="outline" className="bg-white">
                        {m.classCount} clases
                      </Badge>
                    </div>

                    {/* Precio destacado */}
                    <div className="bg-white rounded-lg p-3 mb-3 border border-gray-100">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-3xl font-bold text-[#5862f0]">${m.price}</span>
                          <span className="text-sm text-gray-500 ml-2">/mes</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Precio por clase</div>
                          <div className="text-sm font-semibold text-gray-700">
                            ${(m.price / m.classCount).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detalles de clases */}
                    {isNewSystem ? (
                      <div className="space-y-1.5">
                        {m.classTypeAllocations.slice(0, 3).map((allocation: any, index: number) => (
                          <div key={index} className="flex justify-between items-center text-xs bg-gray-50 rounded px-2 py-1.5">
                            <span className="capitalize text-gray-700">{allocation.classTypeId}</span>
                            <span className="font-semibold text-[#5862f0]">{allocation.count} clases</span>
                          </div>
                        ))}
                        {m.classTypeAllocations.length > 3 && (
                          <div className="text-xs text-gray-500 text-center pt-1">
                            +{m.classTypeAllocations.length - 3} tipos más
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {m.classTypes?.slice(0, 4).map((type: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                            {type}
                          </Badge>
                        ))}
                        {m.classTypes?.length > 4 && (
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            +{m.classTypes.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            </>
          )}

          {!membresia && !loading && filteredMemberships.length > 0 && (
            <div className="text-sm text-gray-500 text-center py-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="font-medium">💡 Consejo:</span> Selecciona una membresía para continuar
            </div>
          )}
        </div>
      </div>

      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} className="bg-[#5862f0] hover:bg-[#2d38ad]">
          {mode === "create" ? "Crear Estudiante" : "Guardar Cambios"}
        </Button>
      </DialogFooter>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {mode === "view" && estudiante && (
          <div className="bg-gradient-to-br from-[#5862f0] to-[#7d86ff] p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white">
                <span className="text-2xl font-bold text-[#5862f0]">
                  {getInitials(estudiante.nameAndLastname)}
                </span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {estudiante.nameAndLastname || "Sin nombre"}
                </h2>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={estudiante.sanciones?.length > 0 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-green-500 hover:bg-green-600"
                  }>
                    {estudiante.sanciones?.length > 0
                      ? `Sancionado - ${estudiante.sanciones.at(-1)?.duracion}`
                      : "Activo"}
                  </Badge>
                  <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
                    {estudiante.membership?.title || "Sin membresía"}
                  </Badge>
                  {estudiante.isFormacion && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      🎓 Formación
                    </Badge>
                  )}
                </div>
                <div className="flex gap-4 text-white/90 text-sm">
                  {estudiante.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {estudiante.email}
                    </div>
                  )}
                  {estudiante.tel && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {estudiante.tel}
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
                {mode === "create" ? "Añadir nuevo estudiante" : "Editar estudiante"}
              </DialogTitle>
              <DialogDescription>
                {mode === "create"
                  ? "Completa el formulario para añadir un nuevo estudiante a Prana OM."
                  : "Modifica la información del estudiante."}
              </DialogDescription>
            </DialogHeader>
          )}

          {mode === "create" || mode === "edit" ? (
            renderForm()
          ) : estudiante ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6 bg-gray-100">
                <TabsTrigger value="personal" className="data-[state=active]:bg-[#5862f0] data-[state=active]:text-white">
                  Información personal
                </TabsTrigger>
                <TabsTrigger disabled value="clases" className="data-[state=active]:bg-[#5862f0] data-[state=active]:text-white">
                  Historial de clases
                </TabsTrigger>
                <TabsTrigger disabled value="pagos" className="data-[state=active]:bg-[#5862f0] data-[state=active]:text-white">
                  Historial de pagos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>Fecha de inicio</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {estudiante?.membership?.buyDate
                          ? new Date(estudiante?.membership?.buyDate).toLocaleDateString("es-AR")
                          : "No disponible"}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>Próxima facturación</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {estudiante?.membership?.expirationDate
                          ? new Date(estudiante?.membership?.expirationDate).toLocaleDateString("es-AR")
                          : "Sin membresía activa"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-[#5862f0]" />
                    Membresía Actual
                  </h3>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-lg">
                        {estudiante.membership?.title || "Sin membresía"}
                      </span>
                      {estudiante.membership && (
                        <Badge variant={
                          estudiante.membership.classTypeAllocations && estudiante.membership.classTypeAllocations.length > 0 
                            ? "default" 
                            : "secondary"
                        } className={
                          estudiante.membership.classTypeAllocations && estudiante.membership.classTypeAllocations.length > 0 
                            ? "bg-[#5862f0]" 
                            : "bg-green-400 text-white hover:bg-green-500"
                        }>
                          {estudiante.membership.classTypeAllocations && estudiante.membership.classTypeAllocations.length > 0 
                            ? "Clases Específicas por Tipo" 
                            : "Suscripción Flexible"
                          }
                        </Badge>
                      )}
                    </div>
                    
                    {estudiante.membership?.classTypeAllocations && estudiante.membership.classTypeAllocations.length > 0 ? (
                      <div>
                        <div className="text-sm font-medium mb-3 text-gray-700">Clases disponibles por tipo:</div>
                        <div className="space-y-2">
                          {estudiante.membership.classTypeAllocations.map((allocation: any, index: number) => (
                            <div key={index} className="flex justify-between items-center bg-gradient-to-r from-[#5862f0]/5 to-[#7d86ff]/5 rounded-lg px-3 py-2 border border-[#5862f0]/20">
                              <span className="capitalize font-medium">{allocation.classTypeId}</span>
                              <span className="font-bold text-[#5862f0]">
                                {allocation.remainingCount} / {allocation.totalCount}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : estudiante.membership?.currentClasses !== undefined ? (
                      <div>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Clases restantes</div>
                            <div className="text-2xl font-bold text-[#5862f0]">{estudiante.membership.currentClasses}</div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="text-xs text-gray-500 mb-1">Clases totales</div>
                            <div className="text-2xl font-bold text-gray-900">{estudiante.membership.totalClasses || 0}</div>
                          </div>
                        </div>
                        
                        {estudiante.membership.allowedClassTypes && estudiante.membership.allowedClassTypes.length > 0 && (
                          <div>
                            <div className="text-sm font-medium mb-2 text-gray-700">Tipos incluidos:</div>
                            <div className="flex flex-wrap gap-2">
                              {estudiante.membership.allowedClassTypes.map((type: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-gray-50">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 text-center py-4">Sin información de membresía</div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="clases">
                <div className="text-center py-12 text-gray-500">
                  Historial de clases próximamente disponible
                </div>
              </TabsContent>

              <TabsContent value="pagos">
                <div className="text-center py-12 text-gray-500">
                  Historial de pagos próximamente disponible
                </div>
              </TabsContent>
            </Tabs>
          ) : null}

          {mode === "view" && (
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={onClose}
                className="bg-[#5862f0] hover:bg-[#2d38ad] text-white"
              >
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}