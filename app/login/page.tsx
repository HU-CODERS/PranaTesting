"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Chrome, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function LoginPage() {
    const [step, setStep] = useState<'email' | 'code'>('email')
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

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
            // Aquí iría la validación del código
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

    const handleGoogleLogin = () => {
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
                                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/f2.jpg"
                                        alt="Bienvenido a Prana"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#5862f0]/90 to-transparent flex items-end">
                                        <div className="p-8 text-white">
                                            <h2 className="text-3xl font-bold mb-4">Bienvenido de vuelta</h2>
                                            <p className="text-lg font-light">
                                                Ingresá con tu email y recibí un código de acceso instantáneo
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha - Formulario */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                                <div className="mb-8">
                                    <h1 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-2">
                                        Iniciar Sesión
                                    </h1>
                                    <p className="text-gray-600">
                                        {step === 'email' ? 'Ingresá tu email para comenzar' : 'Ingresá el código que te enviamos'}
                                    </p>
                                </div>

                                {step === 'email' ? (
                                    <form onSubmit={handleEmailSubmit} className="space-y-6">
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
                                            {isSubmitting ? "Enviando código..." : "Continuar"}
                                        </Button>

                                        {/* Divisor */}
                                        <div className="my-8 flex items-center gap-4">
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                            <span className="text-gray-500 text-sm">o continuar con</span>
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                        </div>

                                        {/* Login con Google */}
                                        <Button
                                            type="button"
                                            onClick={handleGoogleLogin}
                                            variant="outline"
                                            className="w-full py-6 text-lg border-2 hover:bg-gray-50"
                                        >
                                            <Chrome className="mr-2 h-5 w-5" />
                                            Continuar con Google
                                        </Button>

                                        {/* Link a Registro */}
                                        <div className="mt-8 text-center">
                                            <p className="text-gray-600">
                                                ¿No tenés cuenta?{" "}
                                                <Link href="/registro" className="text-[#5862f0] font-semibold hover:underline">
                                                    Crear cuenta
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
                                            {isSubmitting ? "Verificando..." : "Verificar e Ingresar"}
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
