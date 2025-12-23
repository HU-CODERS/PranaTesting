"use client"
export const dynamic = 'force-dynamic';
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Calendar, Users, Star, TrendingUp, Award, Clock, CheckCircle2, Heart, Sparkles, Facebook, Instagram, Youtube, ChevronLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import RegistroModal from "@/components/registro-modal"

export default function Home() {
    const router = useRouter()
    const clasesRef = useRef<HTMLDivElement>(null)
    const redesRef = useRef<HTMLDivElement>(null)
    const ondemandRef = useRef<HTMLDivElement>(null)
    const eventosRef = useRef<HTMLDivElement>(null)
    const masajesRef = useRef<HTMLDivElement>(null)
    const formacionesRef = useRef<HTMLDivElement>(null)
    const tiendaRef = useRef<HTMLDivElement>(null)

    const [isRegistroModalOpen, setIsRegistroModalOpen] = useState(false)
    const [masajeForm, setMasajeForm] = useState({ fecha: "", nombre: "", telefono: "" })
    const [currentYearIndex, setCurrentYearIndex] = useState(0)
    const [isCarouselPaused, setIsCarouselPaused] = useState(false)

    const planesEstudio = [
        {
            año: "Año 1",
            titulo: "Fundamentos del Hatha Yoga",
            descripcion: "Bases del Hatha Yoga",
            imagen: "/f1.jpg",
            contenidos: [
                "Introducción a las Asanas básicas",
                "Principios de alineación corporal",
                "Respiración consciente (Pranayama)",
                "Fundamentos de la filosofía del Yoga",
                "Ética del practicante"
            ]
        },
        {
            año: "Año 2",
            titulo: "Profundización en la Práctica",
            descripcion: "Asanas avanzadas y técnicas",
            imagen: "/f2.jpg",
            contenidos: [
                "Asanas avanzadas e inversiones",
                "Técnicas de modificación y ajustes",
                "Anatomía aplicada al Yoga",
                "Pranayamas intermedios",
                "Introducción a la meditación"
            ]
        },
        {
            año: "Año 3",
            titulo: "Pranayama y Energía Sutil",
            descripcion: "Control de la energía vital",
            imagen: "/f3.jpg",
            contenidos: [
                "Pranayamas avanzados",
                "Sistema de chakras",
                "Nadis y cuerpo energético",
                "Bandhas y Mudras",
                "Yoga Nidra"
            ]
        },
        {
            año: "Año 4",
            titulo: "Filosofía y Textos Sagrados",
            descripcion: "Estudio profundo de textos",
            imagen: "/f4.jpg",
            contenidos: [
                "Yoga Sutras de Patanjali",
                "Bhagavad Gita",
                "Upanishads",
                "Filosofías del Yoga",
                "Meditación avanzada"
            ]
        },
        {
            año: "Año 5",
            titulo: "Maestría y Enseñanza",
            descripcion: "Arte de enseñar Yoga",
            imagen: "/f1.jpg",
            contenidos: [
                "Metodología de enseñanza",
                "Secuenciación de clases",
                "Asistencia y ajustes avanzados",
                "Ética del instructor",
                "Práctica personal y crecimiento continuo"
            ]
        }
    ]

    const handleDownloadYear = (year: number) => {
        // Aquí iría la lógica para descargar el PDF del año específico
        console.log(`Descargando PDF del año ${year}`)
        // Simulación de descarga
        alert(`Descargando programa del ${planesEstudio[year - 1].año}`)
    }

    const handleDownloadComplete = () => {
        // Aquí iría la lógica para descargar el PDF completo
        console.log('Descargando PDF completo')
        alert('Descargando programa completo de formación (5 años)')
    }

    useEffect(() => {
        const animationTypes = [
            "animate-fade-up",
            "animate-fade-down",
            "animate-fade-left",
            "animate-fade-right",
            "animate-fade-in",
        ]

        const refs = [clasesRef, redesRef, ondemandRef, eventosRef, masajesRef, formacionesRef, tiendaRef]
        const animationClasses: Record<string, string> = {}

        refs.forEach((ref) => {
            const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)]
            if (ref.current) {
                animationClasses[ref.current.id] = randomAnimation
            }
        })

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        entry.target.classList.add(animationClasses[entry.target.id])
                        entry.target.classList.remove("opacity-0")
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 },
        )

        refs.forEach((ref, index) => {
            if (ref.current) {
                ref.current.id = `section-${index}`
                observer.observe(ref.current)
            }
        })

        return () => {
            refs.forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current)
                }
            })
        }
    }, [])

    // Auto-rotación del carrusel
    useEffect(() => {
        if (isCarouselPaused) return

        const interval = setInterval(() => {
            setCurrentYearIndex((prev) => (prev + 1) % planesEstudio.length)
        }, 5000) // Cambiar cada 5 segundos

        return () => clearInterval(interval)
    }, [isCarouselPaused, planesEstudio.length])

    const handleNavigation = () => {
        window.scrollTo(0, 0)
    }

    const handleMasajeSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const queryParams = new URLSearchParams({
            fecha: masajeForm.fecha,
            nombre: masajeForm.nombre,
            telefono: masajeForm.telefono,
        }).toString()
        router.push(`/masajes?info=${queryParams}`)
    }

    const goToNextYear = () => {
        setCurrentYearIndex((prev) => (prev + 1) % planesEstudio.length)
    }

    const goToPrevYear = () => {
        setCurrentYearIndex((prev) => (prev - 1 + planesEstudio.length) % planesEstudio.length)
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative w-full h-[90vh] flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="none"
                        >
                            <source src="/start.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>

                    <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            PRANA OM
                        </h1>
                        <h2 className="text-xl md:text-3xl text-white mb-10 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            Si buscas un espacio <span style={{ color: "#bbcfff" }}>seguro, cálido y de transformación</span>, PRANA es para<span style={{ color: "#bdc2ff" }}> vos</span>!
                        </h2>
                        <Link href="/formaciones" onClick={handleNavigation}>
                            <Button
                                size="lg"
                                className="bg-[#5862f0] hover:bg-[#3c4cc6] text-white text-lg px-8 py-6 transition-all duration-300 hover:scale-[1.03] shadow-md"
                            >
                                Conoce Nuestras Propuestas
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Clases Presenciales */}
                <section
                    ref={clasesRef}
                    className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1] opacity-0 transition-all duration-700"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1">
                                <h2 className="text-3xl md:text-5xl font-bold text-[#5862f0] mb-8 leading-tight">
                                    Clases Presenciales
                                </h2>
                                <p className="text-lg mb-6 font-light leading-relaxed text-gray-700">
                                    Experimentá la energía única de practicar en comunidad en un espacio cálido y único de la mano de profesores con experiencia y certificados.
                                </p>
                                <div className="space-y-4 mb-10">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-[#5862f0] shrink-0 mt-1" />
                                        <p className="text-gray-700">Variedad de estilos: Hatha, Vinyasa, Yoga Suave y más</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-[#5862f0] shrink-0 mt-1" />
                                        <p className="text-gray-700">Horarios flexibles durante toda la semana</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-[#5862f0] shrink-0 mt-1" />
                                        <p className="text-gray-700">Espacio acogedor y equipado con todo lo necesario</p>
                                    </div>
                                </div>
                                <Link href="/clases" onClick={handleNavigation}>
                                    <Button className="group bg-[#5862f0] hover:bg-[#3c4ac6] text-white px-8 py-6 flex items-center gap-2 text-lg transition-all duration-300 hover:scale-[1.03]">
                                        Ver Clases y Horarios
                                        <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-500 order-1 md:order-2">
                                <Image src="/f4.jpg" alt="Clases Presenciales Prana OM" fill className="object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección Redes Sociales */}
                <section
                    ref={redesRef}
                    className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#5862f0] to-[#826597] opacity-0 transition-all duration-700"
                >
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Seguinos en Redes Sociales
                        </h2>
                        <p className="text-xl text-white/90 mb-8 font-light">
                            Unite a nuestra comunidad y mantente al día con clases, eventos y contenido exclusivo
                        </p>
                        <div className="flex justify-center items-center gap-8">
                            <a
                                href="https://www.facebook.com/pranaomyoga/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className="bg-white p-6 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Facebook className="h-10 w-10 text-[#5862f0]" />
                                </div>
                                <span className="text-white font-semibold">Facebook</span>
                            </a>
                            <a
                                href="https://www.instagram.com/pranaomyoga/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className="bg-white p-6 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Instagram className="h-10 w-10 text-[#5862f0]" />
                                </div>
                                <span className="text-white font-semibold">Instagram</span>
                            </a>
                            <a
                                href="https://www.youtube.com/@pranaomyoga7825/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-3 group"
                            >
                                <div className="bg-white p-6 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Youtube className="h-10 w-10 text-[#5862f0]" />
                                </div>
                                <span className="text-white font-semibold">YouTube</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Cursos On Demand */}
                <section ref={ondemandRef} className="py-24 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#5862f0] mb-4">Cursos On Demand</h2>
                            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light">
                                Contenido diseñado para acompañar tu camino. Cursos pensados en profundidad y calidez integrando cuerpo, mente y energía.
                            </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-xl p-8 shadow-lg text-center transform transition-all duration-500 hover:-translate-y-2">
                                <TrendingUp className="h-12 w-12 text-[#5862f0] mx-auto mb-4" />
                                <h3 className="text-4xl font-bold text-[#5862f0] mb-2">150+</h3>
                                <p className="text-gray-700">Horas de Contenido</p>
                            </div>
                            <div className="bg-white rounded-xl p-8 shadow-lg text-center transform transition-all duration-500 hover:-translate-y-2">
                                <Users className="h-12 w-12 text-[#5862f0] mx-auto mb-4" />
                                <h3 className="text-4xl font-bold text-[#5862f0] mb-2">500+</h3>
                                <p className="text-gray-700">Estudiantes Activos</p>
                            </div>
                            <div className="bg-white rounded-xl p-8 shadow-lg text-center transform transition-all duration-500 hover:-translate-y-2">
                                <Award className="h-12 w-12 text-[#5862f0] mx-auto mb-4" />
                                <h3 className="text-4xl font-bold text-[#5862f0] mb-2">25+</h3>
                                <p className="text-gray-700">Cursos Disponibles</p>
                            </div>
                        </div>

                        {/* Curso Destacado */}
                        <div className="bg-gradient-to-br from-[#5862f0] to-[#826597] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="grid md:grid-cols-2 gap-0">
                                <div className="relative h-[400px] md:h-auto">
                                    <Image
                                        src="/f3.jpg"
                                        alt="Curso Destacado"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                                        CURSO DESTACADO
                                    </div>
                                </div>
                                <div className="p-12 text-white flex flex-col justify-center">
                                    <h3 className="text-3xl font-bold mb-4">Yoga para el Bienestar Integral</h3>
                                    <p className="text-lg mb-6 text-white/90">
                                        Un curso completo de 8 semanas para transformar tu práctica y tu vida. Incluye asanas, pranayama, meditación y filosofía del yoga.
                                    </p>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5" />
                                            <span>12 horas</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            <span>4.9 (230 reseñas)</span>
                                        </div>
                                    </div>
                                    <Link href="/ondemand" onClick={handleNavigation}>
                                        <Button className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                                            Ver Todos los Cursos
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Eventos Prana */}
                <section
                    ref={eventosRef}
                    className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1] opacity-0 transition-all duration-700"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#5862f0] mb-4">Eventos Prana</h2>
                            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light">
                                Espacios de profundización, exploración y conexión a través de eventos únicos, retiros, jornadas y masterclass.
                            </p>
                        </div>

                        {/* Próximos Eventos */}
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {[
                                { fecha: "15 ENE 2025", titulo: "Retiro de Fin de Semana", tipo: "Retiro" },
                                { fecha: "22 ENE 2025", titulo: "Masterclass: Inversiones", tipo: "Workshop" },
                                { fecha: "05 FEB 2025", titulo: "Círculo de Meditación", tipo: "Encuentro" },
                            ].map((evento, index) => (
                                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2">
                                    <div className="bg-[#5862f0] text-white p-6 text-center">
                                        <p className="text-2xl font-bold">{evento.fecha}</p>
                                    </div>
                                    <div className="p-6">
                                        <span className="inline-block bg-[#826597]/10 text-[#826597] px-3 py-1 rounded-full text-sm font-semibold mb-3">
                                            {evento.tipo}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{evento.titulo}</h3>
                                        <Button variant="ghost" className="text-[#5862f0] hover:text-[#3c4ac6] p-0 h-auto">
                                            Ver detalles <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link href="/eventos" onClick={handleNavigation}>
                                <Button size="lg" className="bg-[#5862f0] hover:bg-[#3c4ac6] px-8">
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Ver Calendario Completo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Masajes Prana */}
                <section ref={masajesRef} className="py-24 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                                <Image src="/workshops.jpg" alt="Masajes Prana" fill className="object-cover rounded-lg" />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-[#5862f0] mb-8 leading-tight">
                                    Masajes Prana
                                </h2>
                                <p className="text-lg mb-8 font-light leading-relaxed text-gray-700">
                                    Experimentá el poder de la sanación a través de nuestros masajes terapéuticos. Cada sesión está diseñada para liberar tensiones y restaurar el equilibrio.
                                </p>

                                {/* Mini Form */}
                                <form onSubmit={handleMasajeSubmit} className="bg-white rounded-xl p-8 shadow-lg space-y-4">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Reservá tu sesión</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                        <Input
                                            type="text"
                                            placeholder="Tu nombre"
                                            value={masajeForm.nombre}
                                            onChange={(e) => setMasajeForm({ ...masajeForm, nombre: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                                        <Input
                                            type="tel"
                                            placeholder="Tu teléfono"
                                            value={masajeForm.telefono}
                                            onChange={(e) => setMasajeForm({ ...masajeForm, telefono: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha preferida</label>
                                        <Input
                                            type="date"
                                            value={masajeForm.fecha}
                                            onChange={(e) => setMasajeForm({ ...masajeForm, fecha: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] py-6">
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        Solicitar Reserva
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Formaciones con Carrusel */}
                <section
                    ref={formacionesRef}
                    className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1] opacity-0 transition-all duration-700"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#5862f0] mb-4">Formaciones Prana</h2>
                            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light">
                                Profundizá en tu práctica y estudio del yoga a través de nuestras Formaciones. Un viaje de 5 años de transformación y aprendizaje.
                            </p>
                        </div>

                        {/* Carrusel de Plan de Estudios */}
                        <div
                            className="relative mb-12"
                            onMouseEnter={() => setIsCarouselPaused(true)}
                            onMouseLeave={() => setIsCarouselPaused(false)}
                            onTouchStart={() => setIsCarouselPaused(true)}
                            onTouchEnd={() => setIsCarouselPaused(false)}
                        >
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-0">
                                    {/* Contenido - Izquierda */}
                                    <div className="p-8 md:p-12 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="bg-[#5862f0] text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                                                    {currentYearIndex + 1}
                                                </div>
                                                <div className="flex gap-2">
                                                    {planesEstudio.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setCurrentYearIndex(index)}
                                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                                index === currentYearIndex ? 'w-8 bg-[#5862f0]' : 'w-2 bg-gray-300'
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-[#5862f0] mb-3">
                                                {planesEstudio[currentYearIndex].titulo}
                                            </h3>
                                            <p className="text-base text-gray-600 mb-6">
                                                {planesEstudio[currentYearIndex].descripcion}
                                            </p>
                                            <div className="space-y-3">
                                                <h4 className="font-semibold text-gray-800">Contenidos:</h4>
                                                <ul className="space-y-2">
                                                    {planesEstudio[currentYearIndex].contenidos.map((contenido, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <CheckCircle2 className="h-4 w-4 text-[#5862f0] shrink-0 mt-1" />
                                                            <span className="text-sm text-gray-700">{contenido}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Controles y Botones */}
                                        <div className="mt-8 space-y-4">
                                            <div className="flex items-center justify-between pt-6 border-t">
                                                <button
                                                    onClick={goToPrevYear}
                                                    className="bg-[#5862f0] text-white p-3 rounded-full hover:bg-[#3c4ac6] transition-colors"
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </button>
                                                <span className="text-gray-600 font-medium">
                                                    {planesEstudio[currentYearIndex].año}
                                                </span>
                                                <button
                                                    onClick={goToNextYear}
                                                    className="bg-[#5862f0] text-white p-3 rounded-full hover:bg-[#3c4ac6] transition-colors"
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <Button
                                                onClick={() => handleDownloadYear(currentYearIndex + 1)}
                                                variant="outline"
                                                className="w-full border-[#5862f0] text-[#5862f0] hover:bg-[#5862f0] hover:text-white"
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Descargar Programa {planesEstudio[currentYearIndex].año}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Imagen - Derecha */}
                                    <div className="relative h-[400px] md:h-auto">
                                        <Image
                                            src={planesEstudio[currentYearIndex].imagen}
                                            alt={planesEstudio[currentYearIndex].titulo}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botón Descargar Programa Completo */}
                        <div className="text-center mb-16">
                            <Button
                                onClick={handleDownloadComplete}
                                size="lg"
                                className="bg-[#826597] hover:bg-[#6b5180] text-white px-8"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Descargar Programa Completo (5 Años)
                            </Button>
                        </div>

                        {/* Testimonios */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            {[
                                {
                                    photo: "/testimonials/cariste.jpg",
                                    name: "Claudia Ariste",
                                    testimonial:
                                        "Desde el primer instante en que entré a este maravilloso espacio, me sentí cómoda con el lugar y con las profes. Siento que es acá, en Prana.",
                                },
                                {
                                    photo: "/testimonials/ezirulnik.jpg",
                                    name: "Emilia Zirulnik",
                                    testimonial:
                                        "En la formación no solo aprendimos sobre asanas y anatomía, sino también sobre respiración, pranayamas, chakras y mucho más.",
                                },
                                {
                                    photo: "/testimonials/sweber.jpg",
                                    name: "Sergio Weeber",
                                    testimonial:
                                        "El yoga es mucho más que ejercicio: es un camino que integra valores, perspectivas y formas de vivir con un significado profundo.",
                                },
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                            <Image
                                                src={testimonial.photo}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#5862f0]">{testimonial.name}</h3>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-base italic font-light leading-relaxed text-gray-700">
                                        "{testimonial.testimonial}"
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link href="/formaciones" onClick={handleNavigation}>
                                <Button size="lg" className="bg-[#5862f0] hover:bg-[#3c4ac6] px-8">
                                    Conocer Más Sobre Formaciones
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Tienda con AR$ */}
                <section ref={tiendaRef} className="py-24 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#5862f0] mb-4">Tienda Prana</h2>
                            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-light">
                                Descubrí nuestra selección de productos para tu práctica de yoga
                            </p>
                            <p className="text-sm text-gray-500 mt-2">Precios en pesos argentinos (AR$)</p>
                        </div>

                        {/* Productos Destacados */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-8">Productos Destacados</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                {[
                                    { nombre: "Mat Premium", precio: "AR$ 15.000", imagen: "/placeholder.svg" },
                                    { nombre: "Bloque de Yoga", precio: "AR$ 5.000", imagen: "/placeholder.svg" },
                                    { nombre: "Correa de Yoga", precio: "AR$ 3.500", imagen: "/placeholder.svg" },
                                    { nombre: "Bolster", precio: "AR$ 12.000", imagen: "/placeholder.svg" },
                                ].map((producto, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2"
                                    >
                                        <div className="relative h-48 bg-gray-200">
                                            <div className="absolute top-2 right-2 bg-[#5862f0] text-white px-3 py-1 rounded-full text-xs font-bold">
                                                DESTACADO
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">{producto.nombre}</h4>
                                            <p className="text-2xl font-bold text-[#5862f0] mb-4">{producto.precio}</p>
                                            <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6]">
                                                Ver Producto
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Productos Mejor Valorados */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-8">Mejor Valorados</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { nombre: "Set Completo Yoga", precio: "AR$ 35.000", rating: 4.9 },
                                    { nombre: "Colchoneta Pro", precio: "AR$ 18.000", rating: 4.8 },
                                    { nombre: "Kit Meditación", precio: "AR$ 22.000", rating: 4.7 },
                                ].map((producto, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2"
                                    >
                                        <div className="relative h-48 bg-gray-200"></div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                <span className="font-bold text-gray-800">{producto.rating}</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-800 mb-2">{producto.nombre}</h4>
                                            <p className="text-2xl font-bold text-[#5862f0] mb-4">{producto.precio}</p>
                                            <Button variant="outline" className="w-full border-[#5862f0] text-[#5862f0] hover:bg-[#5862f0] hover:text-white">
                                                Ver Producto
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <Link href="/tienda" onClick={handleNavigation}>
                                <Button size="lg" className="bg-[#5862f0] hover:bg-[#3c4ac6] px-8">
                                    Ver Toda la Tienda
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <SiteFooter />

            <RegistroModal
                isOpen={isRegistroModalOpen}
                onClose={() => setIsRegistroModalOpen(false)}
                onSwitchToLogin={() => { }}
            />
        </>
    )
}
