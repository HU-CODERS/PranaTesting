"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Heart, Sparkles, User, Mail, Phone, MessageSquare, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Loader from "@/components/loader"

function MasajesContent() {
    const searchParams = useSearchParams()
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        tipoMasaje: searchParams.get("tipo") || "",
        fecha: searchParams.get("fecha") || "",
        horario: searchParams.get("horario") || "",
        mensaje: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const logged = localStorage.getItem('isLogged') === 'true'
        setIsLoggedIn(logged)
    }, [])

    const tiposMasaje = [
        {
            id: 1,
            nombre: "Masaje Relajante",
            duracion: "60 min",
            precio: "AR$ 15.000",
            descripcion: "Masaje de cuerpo completo con técnicas suaves para liberar tensiones y promover la relajación profunda.",
            beneficios: ["Reduce el estrés", "Mejora la circulación", "Promueve el descanso", "Alivia tensiones musculares"],
            imagen: "/f1.jpg"
        },
        {
            id: 2,
            nombre: "Masaje Descontracturante",
            duracion: "75 min",
            precio: "AR$ 18.000",
            descripcion: "Técnicas profundas enfocadas en liberar contracturas y nudos musculares específicos.",
            beneficios: ["Alivia contracturas", "Reduce dolor muscular", "Aumenta flexibilidad", "Libera tensión profunda"],
            imagen: "/f2.jpg"
        },
        {
            id: 3,
            nombre: "Masaje con Piedras Calientes",
            duracion: "90 min",
            precio: "AR$ 22.000",
            descripcion: "Terapia que combina masaje con piedras volcánicas calientes para una relajación profunda.",
            beneficios: ["Relajación intensa", "Equilibra energía", "Mejora circulación", "Calma sistema nervioso"],
            imagen: "/f3.jpg"
        },
        {
            id: 4,
            nombre: "Masaje Ayurvédico",
            duracion: "90 min",
            precio: "AR$ 20.000",
            descripcion: "Masaje tradicional de la India con aceites herbales que equilibra los doshas y armoniza cuerpo y mente.",
            beneficios: ["Equilibra doshas", "Nutre la piel", "Desintoxica", "Armoniza cuerpo-mente"],
            imagen: "/f4.jpg"
        },
        {
            id: 5,
            nombre: "Masaje Thai",
            duracion: "90 min",
            precio: "AR$ 19.000",
            descripcion: "Técnica ancestral tailandesa que combina presiones, estiramientos y trabajo sobre líneas de energía.",
            beneficios: ["Aumenta flexibilidad", "Libera bloqueos", "Energiza el cuerpo", "Mejora movilidad"],
            imagen: "/f1.jpg"
        },
        {
            id: 6,
            nombre: "Reflexología Podal",
            duracion: "60 min",
            precio: "AR$ 14.000",
            descripcion: "Masaje terapéutico en pies que estimula puntos reflejos conectados con órganos y sistemas del cuerpo.",
            beneficios: ["Estimula órganos", "Mejora circulación", "Reduce estrés", "Equilibra sistemas"],
            imagen: "/f2.jpg"
        }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage("")

        try {
            // Aquí iría la lógica para enviar la reserva
            await new Promise(resolve => setTimeout(resolve, 1500))

            setSubmitMessage("¡Solicitud enviada! Nos contactaremos pronto para confirmar tu reserva.")
            setFormData({
                nombre: "",
                email: "",
                telefono: "",
                tipoMasaje: "",
                fecha: "",
                horario: "",
                mensaje: ""
            })
        } catch (error) {
            setSubmitMessage("Hubo un error al enviar la solicitud. Por favor, intenta nuevamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f3.jpg"
                            alt="Masajes Terapéuticos Prana"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Masajes Terapéuticos
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-light">
                            Relajación profunda y bienestar para tu cuerpo y mente
                        </p>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                            Beneficios de los Masajes Terapéuticos
                        </h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Reduce el Estrés</h3>
                                <p className="text-sm text-gray-600">Disminuye los niveles de cortisol y promueve la relajación profunda</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Mejora la Circulación</h3>
                                <p className="text-sm text-gray-600">Estimula el flujo sanguíneo y linfático en todo el cuerpo</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Alivia Dolores</h3>
                                <p className="text-sm text-gray-600">Reduce tensiones musculares y alivia dolores crónicos</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Equilibra Energía</h3>
                                <p className="text-sm text-gray-600">Armoniza el flujo energético y promueve el bienestar integral</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tipos de Masajes */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                            Nuestros Masajes
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tiposMasaje.map((masaje) => (
                                <div
                                    key={masaje.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={masaje.imagen}
                                            alt={masaje.nombre}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xl font-bold text-[#5862f0]">{masaje.nombre}</h3>
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Clock className="h-4 w-4" />
                                                {masaje.duracion}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">{masaje.descripcion}</p>

                                        <div className="mb-4">
                                            <p className="text-xs font-semibold text-gray-700 mb-2">Beneficios:</p>
                                            <ul className="space-y-1">
                                                {masaje.beneficios.map((beneficio, idx) => (
                                                    <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full"></span>
                                                        {beneficio}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="pt-4 border-t flex items-center justify-between">
                                            <p className="text-2xl font-bold text-[#5862f0]">{masaje.precio}</p>
                                            {!isMounted ? (
                                                <Button className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white" disabled>
                                                    Cargando...
                                                </Button>
                                            ) : isLoggedIn ? (
                                                <Button
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, tipoMasaje: masaje.nombre }))
                                                        document.getElementById('formulario-reserva')?.scrollIntoView({ behavior: 'smooth' })
                                                    }}
                                                    className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white"
                                                >
                                                    Reservar
                                                </Button>
                                            ) : (
                                                <Link href="/login">
                                                    <Button className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                                        Iniciar Sesión
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Formulario de Reserva */}
                <section id="formulario-reserva" className="py-16 px-4 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                Reservá tu Masaje
                            </h2>
                            <p className="text-lg text-gray-600">
                                Completá el formulario y nos contactaremos para confirmar tu turno
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-[#F6F4F1] rounded-xl p-8 shadow-lg">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <User className="inline h-4 w-4 mr-1" />
                                        Nombre Completo *
                                    </label>
                                    <Input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Tu nombre"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="inline h-4 w-4 mr-1" />
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="tu@email.com"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="inline h-4 w-4 mr-1" />
                                    Teléfono *
                                </label>
                                <Input
                                    type="tel"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="11 1234-5678"
                                    className="w-full"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 mb-6">
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Sparkles className="inline h-4 w-4 mr-1" />
                                        Tipo de Masaje *
                                    </label>
                                    <select
                                        name="tipoMasaje"
                                        value={formData.tipoMasaje}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent"
                                    >
                                        <option value="">Seleccionar...</option>
                                        {tiposMasaje.map((masaje) => (
                                            <option key={masaje.id} value={masaje.nombre}>
                                                {masaje.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Calendar className="inline h-4 w-4 mr-1" />
                                        Fecha Preferida
                                    </label>
                                    <Input
                                        type="date"
                                        name="fecha"
                                        value={formData.fecha}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Clock className="inline h-4 w-4 mr-1" />
                                        Horario Preferido
                                    </label>
                                    <select
                                        name="horario"
                                        value={formData.horario}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent"
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="mañana">Mañana (9:00 - 12:00)</option>
                                        <option value="tarde">Tarde (14:00 - 18:00)</option>
                                        <option value="noche">Noche (18:00 - 21:00)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MessageSquare className="inline h-4 w-4 mr-1" />
                                    Mensaje (opcional)
                                </label>
                                <Textarea
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleInputChange}
                                    placeholder="¿Alguna consulta o consideración especial?"
                                    rows={4}
                                    className="w-full"
                                />
                            </div>

                            {submitMessage && (
                                <div className={`mb-6 p-4 rounded-lg ${submitMessage.includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                                    {submitMessage}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 text-lg"
                            >
                                {isSubmitting ? "Enviando..." : "Enviar Solicitud de Reserva"}
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                * Campos obligatorios. Nos contactaremos dentro de las 24hs para confirmar tu turno.
                            </p>
                        </form>
                    </div>
                </section>

                {/* Información Adicional */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-[#5862f0] mb-3">Nuestros Terapeutas</h3>
                                <p className="text-sm text-gray-600">
                                    Equipo de profesionales certificados con años de experiencia en diversas técnicas de masaje terapéutico.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-[#5862f0] mb-3">Ambiente Especial</h3>
                                <p className="text-sm text-gray-600">
                                    Salas preparadas para tu máxima comodidad con música relajante, aromaterapia y ambiente cálido.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold text-[#5862f0] mb-3">Política de Cancelación</h3>
                                <p className="text-sm text-gray-600">
                                    Podés cancelar o reprogramar tu turno con hasta 24hs de anticipación sin cargo.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Paquetes */}
                <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Paquetes Especiales
                        </h2>
                        <p className="text-xl text-white/90 mb-8 font-light">
                            Aprovechá nuestros paquetes de 4 u 8 sesiones con descuento especial. Consultá por planes personalizados.
                        </p>
                        <a href="mailto:masajes@prana-om.com">
                            <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                                Consultar Paquetes
                            </Button>
                        </a>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}

export default function MasajesPage() {
    return (
        <Suspense fallback={<Loader />}>
            <MasajesContent />
        </Suspense>
    )
}
