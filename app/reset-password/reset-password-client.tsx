"use client"

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Eye, EyeOff, CheckCircle, XCircle, Lock, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PasswordStrength {
  score: number
  label: string
  color: string
  bgColor: string
}

interface ValidationCriteria {
  minLength: boolean
  hasUppercase: boolean
  hasSymbol: boolean
}

export default function ResetPasswordClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [token, setToken] = useState<string>('')
  
  // Estados del formulario
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  // Estados de validación
  const [validation, setValidation] = useState<ValidationCriteria>({
    minLength: false,
    hasUppercase: false,
    hasSymbol: false
  })
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    label: 'Muy débil',
    color: 'text-red-500',
    bgColor: 'bg-red-500'
  })
  
  // Estados de la aplicación
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)

  // Extraer token de la URL
  useEffect(() => {
    const urlToken = searchParams.get('token')
    if (urlToken) {
      setToken(urlToken)
    } else {
      setTokenValid(false)
      setError('Token no encontrado en la URL')
    }
  }, [searchParams])

  // Calcular fortaleza de contraseña
  const calculatePasswordStrength = useCallback((password: string): PasswordStrength => {
    let score = 0
    
    // Criterios de puntuación
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    if (password.length >= 16) score += 1

    // Determinar etiqueta y color
    if (score <= 2) {
      return { score, label: 'Muy débil', color: 'text-red-500', bgColor: 'bg-red-500' }
    } else if (score <= 3) {
      return { score, label: 'Débil', color: 'text-orange-500', bgColor: 'bg-orange-500' }
    } else if (score <= 4) {
      return { score, label: 'Regular', color: 'text-yellow-500', bgColor: 'bg-yellow-500' }
    } else if (score <= 5) {
      return { score, label: 'Fuerte', color: 'text-blue-500', bgColor: 'bg-blue-500' }
    } else {
      return { score, label: 'Muy fuerte', color: 'text-green-500', bgColor: 'bg-green-500' }
    }
  }, [])

  // Validar criterios de contraseña
  useEffect(() => {
    const newValidation: ValidationCriteria = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasSymbol: /[^A-Za-z0-9]/.test(password)
    }
    
    setValidation(newValidation)
    setStrength(calculatePasswordStrength(password))
    
    // Verificar si las contraseñas coinciden
    if (confirmPassword) {
      setPasswordsMatch(password === confirmPassword)
    }
  }, [password, confirmPassword, calculatePasswordStrength])

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validaciones antes del envío
    if (!validation.minLength || !validation.hasUppercase || !validation.hasSymbol) {
      setError('La contraseña no cumple con todos los requisitos')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('https://pranabackend.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          newPassword: password
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setError(data.message || 'Error al restablecer la contraseña')
        if (response.status === 400 && data.message?.includes('token')) {
          setTokenValid(false)
        }
        return
      }
      
      setIsSuccess(true)
      
      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        router.push('/')
      }, 3000)
      
    } catch (error) {
      console.error('Error:', error)
      setError('Error de conexión con el servidor')
    } finally {
      setIsLoading(false)
    }
  }

  // Manejar visibilidad de contraseña (solo en desktop)
  const handlePasswordVisibility = (field: 'password' | 'confirm') => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (!isMobile) {
      // En desktop: mantener presionado para ver
      if (field === 'password') {
        setShowPassword(true)
      } else {
        setShowConfirmPassword(true)
      }
    } else {
      // En móvil: toggle normal
      if (field === 'password') {
        setShowPassword(!showPassword)
      } else {
        setShowConfirmPassword(!showConfirmPassword)
      }
    }
  }

  const handlePasswordVisibilityEnd = (field: 'password' | 'confirm') => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (!isMobile) {
      if (field === 'password') {
        setShowPassword(false)
      } else {
        setShowConfirmPassword(false)
      }
    }
  }

  // Renderizar criterios de validación
  const ValidationCriterion = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      {isValid ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      )}
      <span className={`text-sm ${isValid ? 'text-green-700' : 'text-red-700'}`}>
        {text}
      </span>
    </div>
  )

  // Pantalla de éxito
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Contraseña Restablecida!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Tu contraseña ha sido actualizada exitosamente. Serás redirigido al inicio de sesión en unos segundos.
          </p>
          
          <Button 
            onClick={() => router.push('/')}
            className="w-full bg-[#305891] hover:bg-[#3D6CAC]"
          >
            Ir al Inicio de Sesión
          </Button>
        </div>
      </div>
    )
  }

  // Pantalla de token inválido
  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Token Inválido
          </h1>
          
          <p className="text-gray-600 mb-6">
            El enlace de recuperación no es válido o ha expirado. Por favor, solicita un nuevo enlace de recuperación.
          </p>
          
          <Button 
            onClick={() => router.push('/')}
            className="w-full bg-[#305891] hover:bg-[#3D6CAC]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Inicio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Lock className="h-8 w-8 text-[#305891]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Nueva Contraseña
          </h1>
          <p className="text-gray-600 mt-2">
            Crea una contraseña segura para tu cuenta
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nueva Contraseña */}
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Nueva Contraseña
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-12"
                placeholder="Ingresa tu nueva contraseña"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onMouseDown={() => handlePasswordVisibility('password')}
                onMouseUp={() => handlePasswordVisibilityEnd('password')}
                onMouseLeave={() => handlePasswordVisibilityEnd('password')}
                onTouchStart={() => handlePasswordVisibility('password')}
                onTouchEnd={() => handlePasswordVisibilityEnd('password')}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* Medidor de Fortaleza */}
            {password && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">Fortaleza:</span>
                  <span className={`text-xs font-medium ${strength.color}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${strength.bgColor}`}
                    style={{ width: `${(strength.score / 7) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Criterios de Validación */}
            {password && (
              <div className="mt-4 space-y-2 p-3 bg-gray-50 rounded-lg">
                <ValidationCriterion 
                  isValid={validation.minLength} 
                  text="Mínimo 8 caracteres" 
                />
                <ValidationCriterion 
                  isValid={validation.hasUppercase} 
                  text="Al menos una mayúscula" 
                />
                <ValidationCriterion 
                  isValid={validation.hasSymbol} 
                  text="Al menos un símbolo (!@#$%^&*)" 
                />
              </div>
            )}
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`pr-12 ${!passwordsMatch && confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Confirma tu nueva contraseña"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onMouseDown={() => handlePasswordVisibility('confirm')}
                onMouseUp={() => handlePasswordVisibilityEnd('confirm')}
                onMouseLeave={() => handlePasswordVisibilityEnd('confirm')}
                onTouchStart={() => handlePasswordVisibility('confirm')}
                onTouchEnd={() => handlePasswordVisibilityEnd('confirm')}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* Mensaje de coincidencia */}
            {confirmPassword && (
              <div className="mt-2">
                {passwordsMatch ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-700">Las contraseñas coinciden</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-700">Las contraseñas no coinciden</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={
              isLoading || 
              !validation.minLength || 
              !validation.hasUppercase || 
              !validation.hasSymbol || 
              !passwordsMatch ||
              !password ||
              !confirmPassword
            }
            className="w-full bg-[#305891] hover:bg-[#3D6CAC] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Restableciendo..." : "Restablecer Contraseña"}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-[#305891] hover:underline flex items-center justify-center space-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al inicio de sesión</span>
          </button>
        </div>
      </div>
    </div>
  )
}