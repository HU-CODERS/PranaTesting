"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Play, Clock, Star, Users, BookOpen, Award, CheckCircle2, Lock, FileText, Video, ChevronDown, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Loader from "@/components/loader"

interface Modulo {
    id: number
    titulo: string
    lecciones: {
        id: number
        titulo: string
        tipo: "video" | "texto"
        duracion?: string
        completada?: boolean
    }[]
}

export default function CursoDetallePage() {
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [hasCurso, setHasCurso] = useState(false)
    const [moduloExpandido, setModuloExpandido] = useState<number | null>(null)

    useEffect(() => {
        const logged = localStorage.getItem('isLogged') === 'true'
        setIsLoggedIn(logged)

        // Simular carga de datos
        setTimeout(() => {
            // Verificar si el usuario ya tiene este curso
            const cursosComprados = localStorage.getItem('cursosComprados')
            if (cursosComprados) {
                const cursosArray = JSON.parse(cursosComprados)
                setHasCurso(cursosArray.includes(params.id))
            }
            setIsLoading(false)
        }, 800)
    }, [params.id])

    // Datos del curso (en producción vendrían del backend)
    const curso = {
        id: Number(params.id),
        nombre: "Yoga para Principiantes",
        categoria: "Fundamentos",
        nivel: "Principiante",
        duracion: "8 semanas",
        clases: 16,
        rating: 4.9,
        estudiantes: 250,
        precio: "AR$ 12.000",
        precioNumerico: 12000,
        profesor: "María González",
        descripcion: "Curso completo para comenzar tu práctica de yoga desde cero. Aprende las bases con confianza y establece una práctica sólida que te acompañará toda la vida.",
        descripcionLarga: "Este curso está diseñado específicamente para personas que nunca han practicado yoga o que tienen muy poca experiencia. A lo largo de 8 semanas, aprenderás las posturas fundamentales (asanas), técnicas de respiración (pranayama), y los principios básicos de la meditación. Cada clase está cuidadosamente estructurada para que progreses de manera segura y efectiva, respetando los límites de tu cuerpo mientras desarrollas fuerza, flexibilidad y conciencia corporal.",
        imagen: "/f1.jpg",
        queAprenderas: [
            "Posturas fundamentales del Hatha Yoga",
            "Técnicas de respiración consciente",
            "Fundamentos de meditación y mindfulness",
            "Alineación correcta y segura en cada postura",
            "Secuencias completas para practicar en casa",
            "Filosofía básica del yoga"
        ],
        requisitos: [
            "No se requiere experiencia previa",
            "Mat de yoga (o superficie antideslizante)",
            "Ropa cómoda para movimiento",
            "Espacio tranquilo para practicar"
        ],
        modulos: [
            {
                id: 1,
                titulo: "Introducción al Yoga",
                lecciones: [
                    { id: 1, titulo: "Bienvenida al curso", tipo: "video" as const, duracion: "5 min", completada: hasCurso },
                    { id: 2, titulo: "¿Qué es el Yoga?", tipo: "video" as const, duracion: "12 min", completada: hasCurso },
                    { id: 3, titulo: "Historia y filosofía", tipo: "texto" as const, duracion: "8 min", completada: false },
                    { id: 4, titulo: "Preparando tu espacio de práctica", tipo: "video" as const, duracion: "6 min", completada: false }
                ]
            },
            {
                id: 2,
                titulo: "Fundamentos de Respiración",
                lecciones: [
                    { id: 5, titulo: "La importancia de la respiración", tipo: "video" as const, duracion: "10 min", completada: false },
                    { id: 6, titulo: "Respiración completa (Pranayama básico)", tipo: "video" as const, duracion: "15 min", completada: false },
                    { id: 7, titulo: "Ejercicios de respiración diaria", tipo: "texto" as const, duracion: "5 min", completada: false }
                ]
            },
            {
                id: 3,
                titulo: "Posturas de Pie",
                lecciones: [
                    { id: 8, titulo: "Tadasana - La Montaña", tipo: "video" as const, duracion: "12 min", completada: false },
                    { id: 9, titulo: "Trikonasana - El Triángulo", tipo: "video" as const, duracion: "15 min", completada: false },
                    { id: 10, titulo: "Virabhadrasana I - El Guerrero I", tipo: "video" as const, duracion: "18 min", completada: false },
                    { id: 11, titulo: "Guía de alineación en posturas de pie", tipo: "texto" as const, duracion: "10 min", completada: false }
                ]
            },
            {
                id: 4,
                titulo: "Posturas Sentadas y Suelo",
                lecciones: [
                    { id: 12, titulo: "Sukhasana - Postura Fácil", tipo: "video" as const, duracion: "8 min", completada: false },
                    { id: 13, titulo: "Paschimottanasana - Flexión hacia adelante", tipo: "video" as const, duracion: "12 min", completada: false },
                    { id: 14, titulo: "Secuencia de suelo completa", tipo: "video" as const, duracion: "25 min", completada: false }
                ]
            },
            {
                id: 5,
                titulo: "Saludos al Sol",
                lecciones: [
                    { id: 15, titulo: "Surya Namaskar A - Paso a paso", tipo: "video" as const, duracion: "20 min", completada: false },
                    { id: 16, titulo: "Surya Namaskar B - Variación", tipo: "video" as const, duracion: "22 min", completada: false },
                    { id: 17, titulo: "Práctica guiada de Saludos al Sol", tipo: "video" as const, duracion: "30 min", completada: false }
                ]
            },
            {
                id: 6,
                titulo: "Relajación y Meditación",
                lecciones: [
                    { id: 18, titulo: "Savasana - Postura del cadáver", tipo: "video" as const, duracion: "15 min", completada: false },
                    { id: 19, titulo: "Introducción a la meditación", tipo: "video" as const, duracion: "12 min", completada: false },
                    { id: 20, titulo: "Meditación guiada para principiantes", tipo: "video" as const, duracion: "10 min", completada: false },
                    { id: 21, titulo: "Técnicas de relajación profunda", tipo: "texto" as const, duracion: "8 min", completada: false }
                ]
            }
        ] as Modulo[]
    }

    const handleComprarCurso = () => {
        if (!isLoggedIn) {
            router.push('/login')
            return
        }

        // Simular compra
        alert('Redirigiendo a MercadoPago para completar el pago...')

        // Guardar en localStorage que el usuario compró el curso
        const cursosComprados = localStorage.getItem('cursosComprados')
        const cursosArray = cursosComprados ? JSON.parse(cursosComprados) : []
        cursosArray.push(params.id)
        localStorage.setItem('cursosComprados', JSON.stringify(cursosArray))

        setHasCurso(true)
    }

    const handleVerLeccion = (moduloId: number, leccionId: number) => {
        router.push(`/ondemand/${params.id}/leccion/${leccionId}`)
    }

    const totalLecciones = curso.modulos.reduce((acc, mod) => acc + mod.lecciones.length, 0)
    const leccionesCompletadas = curso.modulos.reduce((acc, mod) =>
        acc + mod.lecciones.filter(l => l.completada).length, 0
    )

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero con info del curso */}
                <section className="relative bg-gradient-to-br from-[#5862f0] to-[#826597] py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <Link href="/ondemand" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Volver a cursos
                        </Link>

                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            {/* Izquierda - Info */}
                            <div className="text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                                        {curso.categoria}
                                    </span>
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                                        {curso.nivel}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-4">{curso.nombre}</h1>
                                <p className="text-xl text-white/90 mb-6">{curso.descripcion}</p>

                                <div className="flex flex-wrap items-center gap-6 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                                        <span className="font-bold">{curso.rating}</span>
                                        <span className="text-white/70">({curso.estudiantes} estudiantes)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        <span>{totalLecciones} lecciones</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        <span>{curso.duracion}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-8">
                                    <Users className="h-5 w-5" />
                                    <span>Instructor: <span className="font-semibold">{curso.profesor}</span></span>
                                </div>

                                {hasCurso && (
                                    <div className="bg-green-500/20 backdrop-blur-sm border-2 border-green-300 rounded-xl p-4 mb-6">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="h-6 w-6 text-green-300" />
                                            <div>
                                                <p className="font-bold text-green-100">Ya tenés este curso</p>
                                                <p className="text-sm text-green-200">
                                                    Progreso: {leccionesCompletadas}/{totalLecciones} lecciones completadas
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Derecha - Imagen/Video */}
                            <div className="relative">
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={curso.imagen}
                                        alt={curso.nombre}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                                            <Play className="h-10 w-10 text-[#5862f0] ml-1" />
                                        </div>
                                    </div>
                                </div>

                                {/* Card de precio */}
                                <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-4xl font-bold text-[#5862f0]">{curso.precio}</span>
                                        <span className="text-gray-500 line-through text-lg">AR$ 18.000</span>
                                    </div>

                                    {hasCurso ? (
                                        <Button
                                            onClick={() => router.push(`/ondemand/${params.id}/leccion/1`)}
                                            className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 text-lg"
                                        >
                                            Continuar Aprendiendo
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={handleComprarCurso}
                                            className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 text-lg"
                                        >
                                            {isLoggedIn ? 'Comprar Curso' : 'Iniciar Sesión para Comprar'}
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    )}

                                    <p className="text-center text-sm text-gray-500 mt-4">
                                        Acceso de por vida • Certificado de finalización
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Descripción detallada */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sobre este curso</h2>
                        <p className="text-gray-700 leading-relaxed text-lg mb-8">
                            {curso.descripcionLarga}
                        </p>

                        {/* Qué aprenderás */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Qué aprenderás?</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {curso.queAprenderas.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-[#5862f0] shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Requisitos */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Requisitos</h3>
                            <ul className="space-y-2">
                                {curso.requisitos.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                                        <span className="w-2 h-2 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Contenido del curso (Módulos) */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Contenido del curso</h2>
                        <p className="text-gray-600 mb-8">
                            {curso.modulos.length} módulos • {totalLecciones} lecciones • {curso.duracion} de contenido
                        </p>

                        <div className="space-y-4">
                            {curso.modulos.map((modulo) => (
                                <div key={modulo.id} className="bg-white rounded-xl overflow-hidden border-2 border-gray-200">
                                    <button
                                        onClick={() => setModuloExpandido(moduloExpandido === modulo.id ? null : modulo.id)}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <ChevronDown
                                                className={`h-5 w-5 text-gray-600 transition-transform ${
                                                    moduloExpandido === modulo.id ? 'rotate-180' : ''
                                                }`}
                                            />
                                            <div className="text-left">
                                                <h3 className="font-bold text-gray-800">
                                                    Módulo {modulo.id}: {modulo.titulo}
                                                </h3>
                                                <p className="text-sm text-gray-500">{modulo.lecciones.length} lecciones</p>
                                            </div>
                                        </div>
                                    </button>

                                    {moduloExpandido === modulo.id && (
                                        <div className="border-t border-gray-200">
                                            {modulo.lecciones.map((leccion) => (
                                                <div
                                                    key={leccion.id}
                                                    className="px-6 py-4 border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3 flex-1">
                                                            {leccion.tipo === 'video' ? (
                                                                <Video className="h-4 w-4 text-[#5862f0]" />
                                                            ) : (
                                                                <FileText className="h-4 w-4 text-[#826597]" />
                                                            )}
                                                            <span className="text-gray-700">{leccion.titulo}</span>
                                                            {leccion.completada && (
                                                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            <span className="text-sm text-gray-500">{leccion.duracion}</span>

                                                            {hasCurso ? (
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleVerLeccion(modulo.id, leccion.id)}
                                                                    className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white"
                                                                >
                                                                    <Play className="h-3 w-3 mr-1" />
                                                                    Ver
                                                                </Button>
                                                            ) : (
                                                                <Lock className="h-4 w-4 text-gray-400" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Instructor */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Tu instructor</h2>
                        <div className="flex items-start gap-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
                                <Image
                                    src="/f1.jpg"
                                    alt={curso.profesor}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{curso.profesor}</h3>
                                <p className="text-[#5862f0] font-semibold mb-4">Instructora de Hatha Yoga certificada</p>
                                <p className="text-gray-700 leading-relaxed">
                                    Con más de 15 años de experiencia enseñando yoga, María se especializa en hacer que el yoga sea accesible para todos. Su enfoque cálido y paciente ha ayudado a miles de estudiantes a comenzar su viaje en el yoga con confianza.
                                </p>
                                <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-2">
                                        <Award className="h-4 w-4 text-[#5862f0]" />
                                        Certificada RYT-500
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-[#5862f0]" />
                                        3,500+ estudiantes
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
