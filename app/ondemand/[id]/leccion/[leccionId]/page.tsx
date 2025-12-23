"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft, PlayCircle, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import Loader from "@/components/loader"

export default function LeccionPage() {
    const params = useParams()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [hasCurso, setHasCurso] = useState(false)
    const [leccionCompletada, setLeccionCompletada] = useState(false)

    useEffect(() => {
        // Verificar si el usuario tiene el curso
        const cursosComprados = localStorage.getItem('cursosComprados')
        if (cursosComprados) {
            const cursosArray = JSON.parse(cursosComprados)
            setHasCurso(cursosArray.includes(params.id))
        }

        // Si no tiene el curso, redirigir al detalle
        if (!hasCurso && !isLoading) {
            router.push(`/ondemand/${params.id}`)
            return
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [params.id, hasCurso, isLoading, router])

    const handleMarcarCompletada = () => {
        setLeccionCompletada(true)
        // Aquí iría la lógica para guardar el progreso
        alert('Lección marcada como completada')
    }

    const handleSiguienteLeccion = () => {
        const siguienteId = Number(params.leccionId) + 1
        router.push(`/ondemand/${params.id}/leccion/${siguienteId}`)
    }

    const handleAnteriorLeccion = () => {
        const anteriorId = Number(params.leccionId) - 1
        if (anteriorId > 0) {
            router.push(`/ondemand/${params.id}/leccion/${anteriorId}`)
        }
    }

    // Datos de ejemplo (en producción vendrían del backend)
    const leccion = {
        id: Number(params.leccionId),
        titulo: "Bienvenida al curso",
        tipo: "video",
        duracion: "5 min",
        modulo: "Introducción al Yoga",
        descripcion: "En esta lección te doy la bienvenida al curso y te explico qué esperar en las próximas semanas. Conocerás la estructura del curso, cómo sacarle el máximo provecho y algunos consejos importantes antes de comenzar tu práctica.",
        videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE",
        contenidoTexto: null,
        recursos: [
            "Guía de bienvenida PDF",
            "Calendario de práctica",
            "Lista de materiales recomendados"
        ]
    }

    if (isLoading) {
        return <Loader />
    }

    if (!hasCurso) {
        return null // Se redirigirá automáticamente
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen bg-black">
                {/* Video/Contenido principal */}
                <div className="flex-1 flex flex-col">
                    {leccion.tipo === 'video' ? (
                        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src={leccion.videoUrl}
                                title={leccion.titulo}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="flex-1 bg-white p-8">
                            <div className="max-w-4xl mx-auto">
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-gray-700 leading-relaxed">
                                        {leccion.contenidoTexto || "Contenido de texto de la lección..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Barra de info y navegación */}
                    <div className="bg-white border-t">
                        <div className="max-w-7xl mx-auto px-4 py-6">
                            {/* Navegación superior */}
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    href={`/ondemand/${params.id}`}
                                    className="flex items-center gap-2 text-gray-600 hover:text-[#5862f0] transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Volver al curso
                                </Link>

                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={handleAnteriorLeccion}
                                        disabled={Number(params.leccionId) === 1}
                                        variant="outline"
                                        className="flex items-center gap-2"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Anterior
                                    </Button>

                                    {!leccionCompletada ? (
                                        <Button
                                            onClick={handleMarcarCompletada}
                                            className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white"
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Marcar como completada
                                        </Button>
                                    ) : (
                                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                                            <CheckCircle2 className="h-5 w-5" />
                                            Completada
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleSiguienteLeccion}
                                        className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white flex items-center gap-2"
                                    >
                                        Siguiente
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Info de la lección */}
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            {leccion.modulo}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {leccion.tipo === 'video' ? (
                                                <span className="flex items-center gap-1">
                                                    <PlayCircle className="h-4 w-4" />
                                                    Video
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <FileText className="h-4 w-4" />
                                                    Lectura
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-sm text-gray-500">{leccion.duracion}</span>
                                    </div>

                                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                        {leccion.titulo}
                                    </h1>

                                    <p className="text-gray-700 leading-relaxed">
                                        {leccion.descripcion}
                                    </p>
                                </div>

                                {/* Recursos */}
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-[#5862f0]" />
                                        Recursos de la lección
                                    </h3>
                                    <ul className="space-y-2">
                                        {leccion.recursos.map((recurso, idx) => (
                                            <li key={idx}>
                                                <button className="w-full text-left px-4 py-3 bg-[#F6F4F1] hover:bg-[#5862f0]/10 rounded-lg transition-colors text-sm text-gray-700 hover:text-[#5862f0]">
                                                    <span className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4" />
                                                        {recurso}
                                                    </span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
