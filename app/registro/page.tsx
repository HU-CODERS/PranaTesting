"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Chrome, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function RegistroPage() {
    const [step, setStep] = useState<'email' | 'code'>('email')
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [acceptTerms, setAcceptTerms] = useState(false)

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!acceptTerms) {
            setError("Debes aceptar los términos y condiciones")
            return
        }

        setIsSubmitting(true)

        try {
            // Aquí iría la lógica para enviar el código al email
            await new Promise(resolve => setTimeout(resolve, 1500))
            setStep('code')
        } catch (err) {
            setError("Hubo un error al enviar el código. Intenta nuevamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        try {
            // Aquí iría la validación del código y creación de cuenta
            await new Promise(resolve => setTimeout(resolve, 1500))
            // Guardar sesión
            localStorage.setItem('userEmail', email)
            localStorage.setItem('isLogged', 'true')
            // Redirigir
            window.location.href = "/"
        } catch (err) {
            setError("Código incorrecto. Intenta nuevamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleGoogleSignup = () => {
        // Aquí iría la integración con Google OAuth
        alert("Integración con Google próximamente")
    }

    const handleResendCode = async () => {
        setIsSubmitting(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            alert("Código reenviado a tu email")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                <section className="flex-1 flex items-center justify-center py-16 px-4 bg-gradient-to-br from-[#F6F4F1] to-white">
                    <div className="max-w-6xl w-full mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Columna Izquierda - Imagen/Info */}
                            <div className="hidden md:block">
                                <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/f3.jpg"
                                        alt="Únete a Prana"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#5862f0]/90 to-transparent flex items-end">
                                        <div className="p-8 text-white">
                                            <h2 className="text-3xl font-bold mb-4">Comenzá tu viaje</h2>
                                            <p className="text-lg font-light mb-6">
                                                Creá tu cuenta con tu email y recibí un código de verificación
                                            </p>
                                            <ul className="space-y-3">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    <span>Acceso a todas las clases</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    <span>Contenido exclusivo on-demand</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                    <span>Primera clase gratis</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha - Formulario */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                                <div className="mb-8">
                                    <h1 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-2">
                                        Crear Cuenta
                                    </h1>
                                    <p className="text-gray-600">
                                        {step === 'email' ? 'Ingresá tu email para comenzar' : 'Verificá tu email para continuar'}
                                    </p>
                                </div>

                                {step === 'email' ? (
                                    <form onSubmit={handleEmailSubmit} className="space-y-5">
                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Mail className="inline h-4 w-4 mr-1" />
                                                Email
                                            </label>
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder="tu@email.com"
                                                className="w-full py-6 text-lg"
                                            />
                                        </div>

                                        {/* Términos y Condiciones */}
                                        <div className="flex items-start gap-2">
                                            <input
                                                type="checkbox"
                                                checked={acceptTerms}
                                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                                className="mt-1 rounded border-gray-300"
                                            />
                                            <label className="text-sm text-gray-600">
                                                Acepto los{" "}
                                                <Link href="/terminos-y-condiciones" className="text-[#5862f0] hover:underline">
                                                    términos y condiciones
                                                </Link>{" "}
                                                y la{" "}
                                                <Link href="/politica-privacidad" className="text-[#5862f0] hover:underline">
                                                    política de privacidad
                                                </Link>
                                            </label>
                                        </div>

                                        {error && (
                                            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {/* Botón Submit */}
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 text-lg font-semibold"
                                        >
                                            {isSubmitting ? "Enviando código..." : "Crear Cuenta"}
                                        </Button>

                                        {/* Divisor */}
                                        <div className="my-6 flex items-center gap-4">
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                            <span className="text-gray-500 text-sm">o registrarse con</span>
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                        </div>

                                        {/* Registro con Google */}
                                        <Button
                                            type="button"
                                            onClick={handleGoogleSignup}
                                            variant="outline"
                                            className="w-full py-6 text-lg border-2 hover:bg-gray-50"
                                        >
                                            <Chrome className="mr-2 h-5 w-5" />
                                            Continuar con Google
                                        </Button>

                                        {/* Link a Login */}
                                        <div className="mt-6 text-center">
                                            <p className="text-gray-600">
                                                ¿Ya tenés cuenta?{" "}
                                                <Link href="/login" className="text-[#5862f0] font-semibold hover:underline">
                                                    Iniciar sesión
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                ) : (
                                    <form onSubmit={handleCodeSubmit} className="space-y-6">
                                        {/* Mostrar email */}
                                        <div className="bg-[#F6F4F1] rounded-lg p-4 flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Código enviado a:</p>
                                                <p className="font-semibold text-gray-800">{email}</p>
                                            </div>
                                        </div>

                                        {/* Código */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Código de verificación
                                            </label>
                                            <Input
                                                type="text"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                required
                                                placeholder="Ingresá el código de 6 dígitos"
                                                maxLength={6}
                                                className="w-full py-6 text-lg text-center tracking-widest"
                                                autoFocus
                                            />
                                        </div>

                                        {error && (
                                            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {/* Botón Submit */}
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 text-lg font-semibold"
                                        >
                                            {isSubmitting ? "Creando cuenta..." : "Verificar y Crear Cuenta"}
                                        </Button>

                                        {/* Reenviar código */}
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={handleResendCode}
                                                disabled={isSubmitting}
                                                className="text-sm text-[#5862f0] hover:underline"
                                            >
                                                ¿No recibiste el código? Reenviar
                                            </button>
                                        </div>

                                        {/* Volver */}
                                        <button
                                            type="button"
                                            onClick={() => setStep('email')}
                                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mx-auto"
                                        >
                                            <ArrowLeft className="h-4 w-4" />
                                            Cambiar email
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
