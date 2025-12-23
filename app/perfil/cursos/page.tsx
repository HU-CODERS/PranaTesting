"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Video, Play, Clock, CheckCircle2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Loader from "@/components/loader"

export default function MisCursosPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [cursos, setCursos] = useState<any[]>([])

    useEffect(() => {
        const logged = localStorage.getItem('isLogged') === 'true'
        if (!logged) {
            router.push('/login')
            return
        }

        // Obtener cursos comprados
        const cursosComprados = localStorage.getItem('cursosComprados')
        if (cursosComprados) {
            const cursosIds = JSON.parse(cursosComprados)
            // Datos de ejemplo - en producción vendrían del backend
            const cursosData = cursosIds.map((id: string) => ({
                id,
                nombre: "Yoga para Principiantes",
                imagen: "/f1.jpg",
                profesor: "María González",
                progreso: 25,
                totalLecciones: 21,
                leccionesCompletadas: 5,
                ultimaLeccion: "Respiración completa (Pranayama básico)",
                duracion: "8 semanas"
            }))
            setCursos(cursosData)
        }

        setIsLoading(false)
    }, [router])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen bg-[#F6F4F1]">
                {/* Header */}
                <section className="bg-white border-b py-8 px-4">
                    <div className="max-w-6xl mx-auto">
                        <Link href="/perfil" className="inline-flex items-center gap-2 text-[#5862f0] hover:text-[#3c4ac6] mb-4 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Volver a Mi Cuenta
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Mis Cursos On Demand</h1>
                        <p className="text-gray-600 mt-2">Continúa aprendiendo donde lo dejaste</p>
                    </div>
                </section>

                {/* Cursos */}
                <section className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        {cursos.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No tienes cursos aún</h2>
                                <p className="text-gray-600 mb-6">Explora nuestra biblioteca de cursos y comienza tu viaje de aprendizaje</p>
                                <Link href="/ondemand">
                                    <Button className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                        Explorar Cursos
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {cursos.map((curso) => (
                                    <div key={curso.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                        <div className="md:flex">
                                            {/* Imagen */}
                                            <div className="relative md:w-80 h-48 md:h-auto shrink-0">
                                                <Image
                                                    src={curso.imagen}
                                                    alt={curso.nombre}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            </div>

                                            {/* Contenido */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{curso.nombre}</h3>
                                                    <p className="text-gray-600 mb-4">Instructor: {curso.profesor}</p>

                                                    {/* Progreso */}
                                                    <div className="mb-4">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm font-medium text-gray-700">Progreso del curso</span>
                                                            <span className="text-sm font-bold text-[#5862f0]">{curso.progreso}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-[#5862f0] h-2 rounded-full transition-all duration-300"
                                                                style={{ width: `${curso.progreso}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                                                        <span className="flex items-center gap-1">
                                                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                            {curso.leccionesCompletadas}/{curso.totalLecciones} lecciones
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {curso.duracion}
                                                        </span>
                                                    </div>

                                                    {curso.ultimaLeccion && (
                                                        <div className="bg-[#F6F4F1] rounded-lg p-3 mb-4">
                                                            <p className="text-xs text-gray-500 mb-1">Última lección vista:</p>
                                                            <p className="text-sm font-medium text-gray-800">{curso.ultimaLeccion}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-3">
                                                    <Link href={`/ondemand/${curso.id}`} className="flex-1">
                                                        <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                                            <Play className="h-4 w-4 mr-2" />
                                                            Continuar Aprendiendo
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/ondemand/${curso.id}`}>
                                                        <Button variant="outline" className="border-[#5862f0] text-[#5862f0] hover:bg-[#5862f0]/10">
                                                            <BookOpen className="h-4 w-4 mr-2" />
                                                            Ver Detalles
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
