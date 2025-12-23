"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

// Modal de Recuperación de Contraseña
interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirmationOpen: () => void
}

function ForgotPasswordModal({ isOpen, onClose, onConfirmationOpen }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch('https://pranabackend.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Error al procesar la solicitud')
        setIsLoading(false)
        return
      }

      // Si todo sale bien, cerrar este modal y abrir el de confirmación
      onClose()
      onConfirmationOpen()
      
      // Limpiar el formulario
      setEmail("")
      setError("")

    } catch (error) {
      console.error('Error en forgot password:', error)
      setError('Error de conexión con el servidor')
    } finally {
      setIsLoading(false)
    }
  }

  // Limpiar formulario al cerrar
  useEffect(() => {
    if (!isOpen) {
      setEmail("")
      setError("")
      setIsLoading(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
          disabled={isLoading}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-[#305891]" />
          </div>
          <h2 className="text-2xl font-bold text-[#305891]">Recuperar Contraseña</h2>
          <p className="text-sm text-gray-600 mt-2">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="forgot-email">Correo Electrónico</Label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-[#305891] hover:bg-[#3D6CAC]"
            disabled={isLoading}
          >
            {isLoading ? "Enviando..." : "Enviar Enlace de Recuperación"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button 
            className="text-sm text-[#305891] hover:underline"
            onClick={onClose}
            disabled={isLoading}
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  )
}

// Modal de Confirmación
interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
}

function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (isOpen) {
      setCountdown(5)
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            // Usar setTimeout para evitar el error de setState durante render
            setTimeout(() => onClose(), 0)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-[#305891] mb-2">¡Correo Enviado!</h2>
          <p className="text-gray-600 mb-6">
            Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
          </p>
          
          <p className="text-sm text-gray-500">
            Este mensaje se cerrará automáticamente en {countdown} segundos
          </p>
          
          <div className="mt-4">
            <Button 
              onClick={onClose}
              className="w-full bg-[#305891] hover:bg-[#3D6CAC]"
            >
              Entendido
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente principal LoginModal actualizado
export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const router = useRouter()

  // Verificar si el usuario ya está logueado cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      const isLogged = localStorage.getItem("isLogged") === "true"
      if (isLogged) {
        // Cerrar el modal
        onClose()

        // Hacer scroll al inicio
        window.scrollTo(0, 0)

        // Redirigir según el rol del usuario
        const userRole = localStorage.getItem("userRole")
        if (userRole === "admin") {
          router.push("/admin/dashboard")
        } else if (userRole === "teacher") {
          router.push("/profesor/dashboard")
        } else {
          router.push("/usuario/tienda")
        }
      }
    }
  }, [isOpen, onClose, router])

  // Manejar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://pranabackend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Error en el login');
        return;
      }
      localStorage.setItem('userProfile', JSON.stringify(data.user));
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('userRole', data.user.role);

      onClose();
      window.scrollTo(0, 0);

      // Por ahora redirigimos directo al dashboard según rol:
      if (data.user.role === 'admin') router.push('/admin/dashboard');
      else if (data.user.role === 'profe') router.push('/profesor/dashboard');
      else router.push('/usuario/tienda');

    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión con el servidor');
    }
  };
  
  const handleSwitchToRegister = () => {
    onClose()
    onSwitchToRegister()
  }

  const handleForgotPassword = () => {
    onClose() // Cerrar el modal de login
    setIsForgotPasswordOpen(true) // Abrir el modal de recuperación
  }

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordOpen(false)
    onClose() // Mantener cerrado el login modal
  }

  const handleConfirmationOpen = () => {
    setIsConfirmationOpen(true)
  }

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false)
  }

  if (!isOpen) return (
    <>
      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen}
        onClose={handleCloseForgotPassword}
        onConfirmationOpen={handleConfirmationOpen}
      />
      <ConfirmationModal 
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
      />
    </>
  )

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-[#305891]">Iniciar Sesión</h2>
            <p className="text-sm text-gray-600">Accede a tu cuenta de Prana OM</p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email">Correo Electronico</Label>
              <Input
                id="email"
                type="text"
                placeholder="Correo con el que te registraste"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#305891] focus:ring-[#305891]"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>
              <button 
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-[#305891] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <Button type="submit" className="w-full bg-[#305891] hover:bg-[#3D6CAC]">
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              <button className="text-[#305891] hover:underline" onClick={handleSwitchToRegister}>
                Regístrate
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modales adicionales */}
      <ForgotPasswordModal 
        isOpen={isForgotPasswordOpen}
        onClose={handleCloseForgotPassword}
        onConfirmationOpen={handleConfirmationOpen}
      />
      <ConfirmationModal 
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
      />
    </>
  )
}