'use client';

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


interface RegistroModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
}

export default function RegistroModal({ isOpen, onClose, onSwitchToLogin }: RegistroModalProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    aceptaTerminos: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    debugger; // ← cuando envíes el formulario, deberías frenar aquí

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    if (!formData.aceptaTerminos) {
      toast.error("Debes aceptar los Términos y Condiciones.");
      return;
    }

    try {
      const res = await fetch("https://pranabackend.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.nombre,
          lastname: formData.apellido
        })
      });


      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error al registrar la cuenta.");
        return;
      }

      toast.success("Cuenta creada. Revisa tu email para activarla.");

      // Cerrar el modal manualmente
      onClose()

    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Error al conectar con el servidor.");
    }
  };

  const handleSwitchToLogin = () => {
    onClose()
    onSwitchToLogin()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[#305891]">Crear Cuenta</h2>
          <p className="text-sm text-gray-600">Únete a la comunidad de Prana OM</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Tu apellido"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="aceptaTerminos"
              name="aceptaTerminos"
              type="checkbox"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-[#305891] focus:ring-[#305891]"
              required
            />
            <label htmlFor="aceptaTerminos" className="ml-2 block text-sm text-gray-700">
              Acepto los{" "}
              <Link href="/terminos" className="text-[#305891] hover:underline">
                Términos y Condiciones
              </Link>{" "}
              y la{" "}
              <Link href="/privacidad" className="text-[#305891] hover:underline">
                Política de Privacidad
              </Link>
            </label>
          </div>

          <Button type="submit" className="w-full bg-[#305891] hover:bg-[#3D6CAC]">
            Crear Cuenta
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <button className="text-[#305891] hover:underline" onClick={handleSwitchToLogin}>
              Iniciar Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
