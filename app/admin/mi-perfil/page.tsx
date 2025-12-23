"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Mail, Phone, Shield, Key, CheckCircle2, AlertCircle } from "lucide-react"

export default function MiPerfilPage() {
  const [perfil, setPerfil] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [passwords, setPasswords] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  })

  const obtenerPerfil = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No estás autenticado.");

    try {
      const response = await fetch("https://pranabackend.onrender.com/api/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al obtener perfil.");
      }

      const data = await response.json();

      setPerfil({
        nombre: data.profile.name || "",
        apellido: data.profile.lastname || "",
        telefono: data.profile.tel || "",
        avatar: data.profile.picture || "/placeholder.svg",
        email: data.email || "",
      });
    } catch (err) {
      console.error("Error al obtener perfil:", err);
      alert("No se pudo cargar el perfil del usuario.");
    }
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);

  const handlePerfilChange = (campo: string, valor: string) => {
    setPerfil((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const handlePasswordChange = (campo: string, valor: string) => {
    setPasswords((prev) => ({
      ...prev,
      [campo]: valor,
    }))
  }

  const handleGuardarPerfilAdmin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No estás autenticado.");

    const payload = {
      isAdmin: true,
      adminProfile: {
        name: perfil.nombre,
        lastname: perfil.apellido,
        tel: perfil.telefono,
      }
    };

    try {
      const response = await fetch("https://pranabackend.onrender.com/api/user/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Perfil actualizado correctamente.");
      } else {
        alert(data.message || "Error al actualizar el perfil.");
      }
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      alert("Error en el servidor.");
    }
  };

  const handleGuardarCambios = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("No estás autenticado.");

    const payload: any = {};

    if (perfil.email && perfil.email !== "admin@pranaom.com") {
      payload.newEmail = perfil.email;
    }

    const { actual, nueva, confirmar } = passwords;
    if (nueva || confirmar || actual) {
      if (!actual) return alert("Debés ingresar tu contraseña actual para cambiarla.");
      if (nueva !== confirmar) return alert("La nueva contraseña y su confirmación no coinciden.");
      if (nueva.length < 6) return alert("La nueva contraseña debe tener al menos 6 caracteres.");
      payload.password = actual;
      payload.newPassword = nueva;
    }

    if (Object.keys(payload).length === 0) {
      return alert("No hiciste ningún cambio.");
    }

    try {
      const response = await fetch("https://pranabackend.onrender.com/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Datos actualizados correctamente.");
        setPasswords({ actual: "", nueva: "", confirmar: "" });
      } else {
        alert(data.message || "Error al actualizar.");
      }
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      alert("Error en el servidor.");
    }
  };

  const getInitials = () => {
    if (!perfil.nombre && !perfil.apellido) return "?"
    const initials = `${perfil.nombre.charAt(0)}${perfil.apellido.charAt(0)}`
    return initials.toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header con gradiente */}
      <div className="relative bg-gradient-to-br from-[#5862f0] via-[#6872fe] to-[#7d86ff] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Avatar grande */}
              <div className="w-24 h-24 rounded-2xl  shadow-xl flex items-center justify-center  border-white/30">
                <Image src={"/dv/ro.jpg"} alt="Avatar" width={96} height={96} className="w-full h-full object-cover rounded-2xl" />
              </div>
              
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  Mi Perfil
                </h1>
                <p className="text-white/90 text-lg">
                  Gestiona tu información personal y configuración de cuenta
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Tarjetas de información rápida */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 -mt-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">Nombre Completo</p>
                <p className="text-2xl font-bold text-gray-900">
                  {perfil.nombre || perfil.apellido 
                    ? `${perfil.nombre} ${perfil.apellido}`.trim()
                    : "Sin nombre"}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#5862f0] to-[#7d86ff] rounded-2xl flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">Email</p>
                <p className="text-lg font-bold text-gray-900 truncate max-w-[200px]">
                  {perfil.email || "Sin email"}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">Teléfono</p>
                <p className="text-lg font-bold text-gray-900">
                  {perfil.telefono || "Sin teléfono"}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Phone className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="pb-12 space-y-6">
          {/* Información Personal */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header de la card */}
            <div className="relative bg-gradient-to-br from-[#6366f1]/10 via-[#7c3aed]/10 to-[#8b5cf6]/10 p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5862f0] to-[#7d86ff] flex items-center justify-center shadow-md">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Información Personal</h3>
                  <p className="text-sm text-gray-600">Actualiza tu información personal</p>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <Label htmlFor="nombre" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <User className="h-4 w-4 text-[#5862f0]" />
                    Nombre *
                  </Label>
                  <Input
                    id="nombre"
                    value={perfil.nombre}
                    onChange={(e) => handlePerfilChange("nombre", e.target.value)}
                    placeholder="Tu nombre"
                    className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
                  />
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <Label htmlFor="apellido" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <User className="h-4 w-4 text-[#5862f0]" />
                    Apellido *
                  </Label>
                  <Input
                    id="apellido"
                    value={perfil.apellido}
                    onChange={(e) => handlePerfilChange("apellido", e.target.value)}
                    placeholder="Tu apellido"
                    className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <Label htmlFor="email" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#5862f0]" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    disabled
                    value={perfil.email}
                    onChange={(e) => handlePerfilChange("email", e.target.value)}
                    placeholder="tu@email.com"
                    className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-gray-100 text-base"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    El email no se puede modificar desde aquí
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <Label htmlFor="telefono" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#5862f0]" />
                    Teléfono *
                  </Label>
                  <Input
                    id="telefono"
                    value={perfil.telefono}
                    onChange={(e) => handlePerfilChange("telefono", e.target.value)}
                    placeholder="+54 11 1234-5678"
                    className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={handleGuardarPerfilAdmin}
                  className="h-12 px-8 bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] text-white font-semibold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </div>

          {/* Cambiar Contraseña */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header de la card */}
            <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Cambiar Contraseña</h3>
                  <p className="text-sm text-gray-600">Actualiza tu contraseña para mantener tu cuenta segura</p>
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Alert de seguridad */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-900 mb-1 text-sm">Consejo de Seguridad</h4>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Usa una contraseña segura con al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <Label htmlFor="password-actual" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Key className="h-4 w-4 text-[#5862f0]" />
                  Contraseña Actual *
                </Label>
                <Input
                  id="password-actual"
                  type="password"
                  value={passwords.actual}
                  onChange={(e) => handlePasswordChange("actual", e.target.value)}
                  placeholder="Ingresa tu contraseña actual"
                  className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <Label htmlFor="password-nueva" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#5862f0]" />
                    Nueva Contraseña *
                  </Label>
                  <Input
                    id="password-nueva"
                    type="password"
                    value={passwords.nueva}
                    onChange={(e) => handlePasswordChange("nueva", e.target.value)}
                    placeholder="Ingresa tu nueva contraseña"
                    className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Mínimo 6 caracteres
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <Label htmlFor="password-confirmar" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#5862f0]" />
                    Confirmar Contraseña *
                  </Label>
                  <Input
                    id="password-confirmar"
                    type="password"
                    value={passwords.confirmar}
                    onChange={(e) => handlePasswordChange("confirmar", e.target.value)}
                    placeholder="Confirma tu nueva contraseña"
                    className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
                  />
                  {passwords.nueva && passwords.confirmar && passwords.nueva !== passwords.confirmar && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Las contraseñas no coinciden
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={handleGuardarCambios}
                  className="h-12 px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Shield className="h-5 w-5" />
                  Actualizar Contraseña
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}