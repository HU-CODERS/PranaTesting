"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Download, Calendar, Clock, Users, Award, BookOpen, Heart, User, Mail, Phone, MapPin, CreditCard, Building2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function FormacionesPage() {
    const [selectedYear, setSelectedYear] = useState<number | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        experienciaYoga: "",
        motivacion: "",
        anioInscripcion: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState("")

    useEffect(() => {
        setIsMounted(true)
        const logged = localStorage.getItem('isLogged') === 'true'
        setIsLoggedIn(logged)
    }, [])

    const planesEstudio = [
        {
            año: 1,
            titulo: "Fundamentos del Hatha Yoga",
            subtitulo: "Bases sólidas para tu camino",
            descripcion: "Establecé las bases de tu práctica y comprensión del Yoga. Aprendé las asanas fundamentales, principios de alineación y los fundamentos filosóficos que sustentan esta disciplina milenaria.",
            duracion: "10 meses",
            modalidad: "Presencial - Jueves 18:00 a 21:00hs",
            precio: "AR$ 35.000/mes",
            precioTotal: "AR$ 350.000",
            imagen: "/f1.jpg",
            contenidos: [
                "Introducción a las Asanas básicas y su correcta ejecución",
                "Principios fundamentales de alineación corporal",
                "Respiración consciente (Pranayama básico)",
                "Fundamentos de la filosofía del Yoga",
                "Ética del practicante y Yamas y Niyamas",
                "Anatomía básica para yoguis",
                "Introducción a la meditación"
            ],
            beneficios: [
                "Base sólida para continuar la formación",
                "Comprensión profunda de tu práctica personal",
                "Herramientas para enseñar clases básicas",
                "Certificado de Año 1 - Fundamentos"
            ]
        },
        {
            año: 2,
            titulo: "Profundización en la Práctica",
            subtitulo: "Expandí tus conocimientos",
            descripcion: "Profundizá en asanas más complejas, técnicas de ajuste y modificación. Estudiá anatomía aplicada y comenzá a desarrollar tu propia voz como instructor.",
            duracion: "10 meses",
            modalidad: "Presencial - Jueves 18:00 a 21:00hs",
            precio: "AR$ 38.000/mes",
            precioTotal: "AR$ 380.000",
            imagen: "/f2.jpg",
            contenidos: [
                "Asanas avanzadas, inversiones y arm balances",
                "Técnicas de modificación y ajustes personalizados",
                "Anatomía aplicada al Yoga (sistema musculoesquelético)",
                "Pranayamas intermedios y sus efectos",
                "Profundización en meditación",
                "Secuenciación de clases nivel intermedio",
                "Práctica de enseñanza supervisada"
            ],
            beneficios: [
                "Capacidad de enseñar clases de nivel intermedio",
                "Comprensión anatómica profunda",
                "Desarrollo de tu estilo personal",
                "Certificado de Año 2 - Práctica Avanzada"
            ]
        },
        {
            año: 3,
            titulo: "Pranayama y Energía Sutil",
            subtitulo: "El arte de la respiración",
            descripcion: "Dominá las técnicas avanzadas de Pranayama y explorá el cuerpo energético sutil. Aprendé sobre chakras, nadis y el sistema energético completo.",
            duracion: "10 meses",
            modalidad: "Presencial - Jueves 18:00 a 21:00hs",
            precio: "AR$ 40.000/mes",
            precioTotal: "AR$ 400.000",
            imagen: "/f3.jpg",
            contenidos: [
                "Pranayamas avanzados y sus aplicaciones terapéuticas",
                "Sistema de chakras en profundidad",
                "Nadis y cuerpo energético sutil",
                "Bandhas y Mudras avanzados",
                "Yoga Nidra - teoría y práctica",
                "Kundalini y despertar energético",
                "Meditación en los chakras"
            ],
            beneficios: [
                "Dominio del Pranayama avanzado",
                "Comprensión del sistema energético",
                "Capacidad de enseñar prácticas sutiles",
                "Certificado de Año 3 - Energía Sutil"
            ]
        },
        {
            año: 4,
            titulo: "Filosofía y Textos Sagrados",
            subtitulo: "La sabiduría milenaria",
            descripcion: "Sumergite en el estudio profundo de los textos sagrados del Yoga. Estudiá los Yoga Sutras, Bhagavad Gita y Upanishads con maestros experimentados.",
            duracion: "10 meses",
            modalidad: "Presencial - Jueves 18:00 a 21:00hs",
            precio: "AR$ 42.000/mes",
            precioTotal: "AR$ 420.000",
            imagen: "/f4.jpg",
            contenidos: [
                "Yoga Sutras de Patanjali - estudio completo",
                "Bhagavad Gita - filosofía y aplicación práctica",
                "Upanishads principales",
                "Filosofías del Yoga (Vedanta, Samkhya, Tantra)",
                "Meditación avanzada y estados de consciencia",
                "Historia del Yoga",
                "Integración filosofía-práctica"
            ],
            beneficios: [
                "Comprensión profunda de la filosofía yóguica",
                "Capacidad de transmitir enseñanzas filosóficas",
                "Base sólida para la maestría",
                "Certificado de Año 4 - Filosofía"
            ]
        },
        {
            año: 5,
            titulo: "Maestría y Enseñanza",
            subtitulo: "Convertite en maestro",
            descripcion: "El año final integra todo el conocimiento adquirido. Desarrollá tu metodología de enseñanza, perfeccioná tu práctica personal y preparate para certificarte como instructor profesional de Yoga.",
            duracion: "10 meses",
            modalidad: "Presencial - Jueves 18:00 a 21:00hs",
            precio: "AR$ 45.000/mes",
            precioTotal: "AR$ 450.000",
            imagen: "/f1.jpg",
            contenidos: [
                "Metodología de enseñanza avanzada",
                "Secuenciación de clases para todos los niveles",
                "Asistencia y ajustes avanzados",
                "Ética del instructor profesional",
                "Yoga terapéutico y adaptaciones",
                "Gestión y desarrollo de tu carrera como instructor",
                "Práctica personal y crecimiento continuo",
                "Proyecto final y certificación"
            ],
            beneficios: [
                "Certificación completa como instructor de Yoga",
                "Portfolio profesional de clases",
                "Red de contactos en la comunidad yóguica",
                "Certificado Final - Instructor Profesional de Yoga"
            ]
        }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!paymentMethod || !formData.anioInscripcion) {
            setSubmitMessage("Por favor completá todos los campos requeridos")
            return
        }

        setIsSubmitting(true)
        setSubmitMessage("")

        try {
            // Aquí iría la lógica de integración con MercadoPago o procesamiento de transferencia
            await new Promise(resolve => setTimeout(resolve, 2000))

            if (paymentMethod === "mercadopago") {
                setSubmitMessage("¡Redirigiendo a MercadoPago! En breve recibirás el enlace de pago en tu email.")
            } else {
                setSubmitMessage("¡Inscripción recibida! Te enviaremos los datos para la transferencia bancaria a tu email.")
            }

            // Reset form
            setFormData({
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                direccion: "",
                ciudad: "",
                experienciaYoga: "",
                motivacion: "",
                anioInscripcion: ""
            })
            setPaymentMethod("")
        } catch (error) {
            setSubmitMessage("Hubo un error al procesar tu inscripción. Por favor, intenta nuevamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDownloadProgram = () => {
        alert("Descargando programa completo de formación (5 años)")
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[70vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f2.jpg"
                            alt="Formación Profesional de Yoga"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-5xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Formación Profesional de Yoga
                        </h1>
                        <p className="text-xl md:text-2xl text-white/95 font-light mb-8">
                            Un viaje transformador de 5 años hacia la maestría del Yoga
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                                <span className="text-white font-semibold">✨ Certificación Internacional</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                                <span className="text-white font-semibold">📚 5 Años de Formación</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
                                <span className="text-white font-semibold">🎓 Maestros Certificados</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Información General */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#5862f0] mb-4">
                                ¿Por qué elegir nuestra formación?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Nuestra formación de 5 años es un programa integral que te guiará desde los fundamentos hasta la maestría en la enseñanza del Yoga.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8 mb-16">
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Certificación</h3>
                                <p className="text-sm text-gray-600">Certificación oficial avalada internacionalmente</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Grupos Reducidos</h3>
                                <p className="text-sm text-gray-600">Máximo 20 estudiantes por año para atención personalizada</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Material Incluido</h3>
                                <p className="text-sm text-gray-600">Acceso a biblioteca y material de estudio completo</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Comunidad</h3>
                                <p className="text-sm text-gray-600">Formá parte de una comunidad de practicantes comprometidos</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button onClick={handleDownloadProgram} size="lg" variant="outline" className="border-[#5862f0] text-[#5862f0] hover:bg-[#5862f0] hover:text-white">
                                <Download className="mr-2 h-5 w-5" />
                                Descargar Programa Completo (PDF)
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Plan de Estudios Detallado */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-center text-[#5862f0] mb-12">
                            Plan de Estudios - 5 Años
                        </h2>

                        <div className="space-y-8">
                            {planesEstudio.map((plan) => (
                                <div
                                    key={plan.año}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="grid md:grid-cols-3 gap-0">
                                        {/* Imagen */}
                                        <div className="relative h-64 md:h-auto">
                                            <Image
                                                src={plan.imagen}
                                                alt={plan.titulo}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-4 left-4 bg-[#5862f0] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                                                {plan.año}
                                            </div>
                                        </div>

                                        {/* Contenido */}
                                        <div className="md:col-span-2 p-8">
                                            <div className="mb-6">
                                                <h3 className="text-3xl font-bold text-[#5862f0] mb-2">{plan.titulo}</h3>
                                                <p className="text-xl text-gray-600 font-light mb-4">{plan.subtitulo}</p>
                                                <p className="text-gray-700 mb-4">{plan.descripcion}</p>

                                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <Clock className="h-5 w-5 text-[#5862f0]" />
                                                        <span><strong>Duración:</strong> {plan.duracion}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <Calendar className="h-5 w-5 text-[#5862f0]" />
                                                        <span><strong>Modalidad:</strong> {plan.modalidad}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <CreditCard className="h-5 w-5 text-[#5862f0]" />
                                                        <span><strong>Mensual:</strong> {plan.precio}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <CreditCard className="h-5 w-5 text-[#5862f0]" />
                                                        <span><strong>Total año:</strong> {plan.precioTotal}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                        <BookOpen className="h-5 w-5 text-[#5862f0]" />
                                                        Contenidos:
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {plan.contenidos.map((contenido, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                <CheckCircle2 className="h-4 w-4 text-[#5862f0] shrink-0 mt-0.5" />
                                                                {contenido}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                        <Award className="h-5 w-5 text-[#5862f0]" />
                                                        Beneficios:
                                                    </h4>
                                                    <ul className="space-y-2 mb-6">
                                                        {plan.beneficios.map((beneficio, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                                <CheckCircle2 className="h-4 w-4 text-[#826597] shrink-0 mt-0.5" />
                                                                {beneficio}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {!isMounted ? (
                                                        <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white" disabled>
                                                            Cargando...
                                                        </Button>
                                                    ) : isLoggedIn ? (
                                                        <Button
                                                            onClick={() => {
                                                                setSelectedYear(plan.año)
                                                                setFormData(prev => ({ ...prev, anioInscripcion: `Año ${plan.año}` }))
                                                                document.getElementById('formulario-inscripcion')?.scrollIntoView({ behavior: 'smooth' })
                                                            }}
                                                            className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white"
                                                        >
                                                            Inscribirme a Año {plan.año}
                                                            <ChevronRight className="ml-2 h-5 w-5" />
                                                        </Button>
                                                    ) : (
                                                        <Link href="/login" className="block w-full">
                                                            <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                                                Iniciar Sesión para Inscribirte
                                                                <ChevronRight className="ml-2 h-5 w-5" />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Formulario de Inscripción */}
                <section id="formulario-inscripcion" className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#5862f0] mb-4">
                                Formulario de Inscripción
                            </h2>
                            <p className="text-lg text-gray-600">
                                Completá tus datos y elegí tu método de pago para reservar tu lugar
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-[#F6F4F1] rounded-2xl p-8 shadow-xl">
                            {/* Datos Personales */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <User className="h-6 w-6 text-[#5862f0]" />
                                    Datos Personales
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                                        <Input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                                        <Input
                                            type="text"
                                            name="apellido"
                                            value={formData.apellido}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Tu apellido"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                                        <Input
                                            type="tel"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="11 1234-5678"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                                        <Input
                                            type="text"
                                            name="direccion"
                                            value={formData.direccion}
                                            onChange={handleInputChange}
                                            placeholder="Tu dirección"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                                        <Input
                                            type="text"
                                            name="ciudad"
                                            value={formData.ciudad}
                                            onChange={handleInputChange}
                                            placeholder="Tu ciudad"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Información Adicional */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <BookOpen className="h-6 w-6 text-[#5862f0]" />
                                    Información Adicional
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Año al que te inscribís *</label>
                                        <select
                                            name="anioInscripcion"
                                            value={formData.anioInscripcion}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent"
                                        >
                                            <option value="">Seleccioná el año...</option>
                                            {planesEstudio.map((plan) => (
                                                <option key={plan.año} value={`Año ${plan.año}`}>
                                                    Año {plan.año} - {plan.titulo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">¿Cuál es tu experiencia previa con Yoga?</label>
                                        <Textarea
                                            name="experienciaYoga"
                                            value={formData.experienciaYoga}
                                            onChange={handleInputChange}
                                            placeholder="Contanos sobre tu práctica de Yoga..."
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">¿Por qué querés hacer esta formación?</label>
                                        <Textarea
                                            name="motivacion"
                                            value={formData.motivacion}
                                            onChange={handleInputChange}
                                            placeholder="Compartí tu motivación..."
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Método de Pago */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <CreditCard className="h-6 w-6 text-[#5862f0]" />
                                    Método de Pago
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("mercadopago")}
                                        className={`p-6 border-2 rounded-xl transition-all duration-300 ${
                                            paymentMethod === "mercadopago"
                                                ? "border-[#5862f0] bg-[#5862f0]/5 shadow-lg"
                                                : "border-gray-300 hover:border-[#5862f0]/50"
                                        }`}
                                    >
                                        <CreditCard className="h-8 w-8 text-[#5862f0] mx-auto mb-3" />
                                        <h4 className="font-bold text-gray-800 mb-2">MercadoPago</h4>
                                        <p className="text-sm text-gray-600">Pagá con tarjeta de crédito/débito en cuotas</p>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("transferencia")}
                                        className={`p-6 border-2 rounded-xl transition-all duration-300 ${
                                            paymentMethod === "transferencia"
                                                ? "border-[#5862f0] bg-[#5862f0]/5 shadow-lg"
                                                : "border-gray-300 hover:border-[#5862f0]/50"
                                        }`}
                                    >
                                        <Building2 className="h-8 w-8 text-[#5862f0] mx-auto mb-3" />
                                        <h4 className="font-bold text-gray-800 mb-2">Transferencia Bancaria</h4>
                                        <p className="text-sm text-gray-600">Transferencia o depósito bancario</p>
                                    </button>
                                </div>
                            </div>

                            {submitMessage && (
                                <div className={`mb-6 p-4 rounded-lg ${
                                    submitMessage.includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                }`}>
                                    {submitMessage}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 text-lg font-semibold"
                            >
                                {isSubmitting ? "Procesando..." : "Confirmar Inscripción"}
                                <ChevronRight className="ml-2 h-6 w-6" />
                            </Button>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                * Al confirmar tu inscripción, aceptás nuestros términos y condiciones. Te contactaremos dentro de las 24hs para coordinar el inicio.
                            </p>
                        </form>
                    </div>
                </section>

                {/* FAQ Rápido */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-[#5862f0] mb-12">
                            Preguntas Frecuentes
                        </h2>
                        <div className="space-y-4">
                            <details className="bg-white rounded-lg p-6 shadow-md">
                                <summary className="font-bold text-gray-800 cursor-pointer">¿Necesito experiencia previa?</summary>
                                <p className="text-gray-600 mt-3">Para el Año 1 no se requiere experiencia previa formal, aunque se recomienda tener al menos 6 meses de práctica regular de Yoga.</p>
                            </details>
                            <details className="bg-white rounded-lg p-6 shadow-md">
                                <summary className="font-bold text-gray-800 cursor-pointer">¿Puedo inscribirme directamente en un año superior?</summary>
                                <p className="text-gray-600 mt-3">Sí, si tenés formación previa podés aplicar para ingresar en años superiores. Deberás pasar por una entrevista y evaluación de conocimientos.</p>
                            </details>
                            <details className="bg-white rounded-lg p-6 shadow-md">
                                <summary className="font-bold text-gray-800 cursor-pointer">¿Qué incluye el precio mensual?</summary>
                                <p className="text-gray-600 mt-3">El precio incluye: clases teóricas y prácticas, material de estudio, acceso a biblioteca, certificación al finalizar cada año.</p>
                            </details>
                            <details className="bg-white rounded-lg p-6 shadow-md">
                                <summary className="font-bold text-gray-800 cursor-pointer">¿Puedo pagar en cuotas?</summary>
                                <p className="text-gray-600 mt-3">Sí, aceptamos pagos mensuales y también ofrecemos planes de financiación a través de MercadoPago.</p>
                            </details>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            ¿Tenés más consultas?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 font-light">
                            Nuestro equipo está disponible para responder todas tus preguntas sobre la formación
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="mailto:formacion@prana-om.com">
                                <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                                    Contactar por Email
                                </Button>
                            </a>
                            <a href="https://wa.me/5491234567890">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                                    WhatsApp
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
