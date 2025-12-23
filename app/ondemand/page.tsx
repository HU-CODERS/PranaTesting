"use client"

import { useState, useTransition, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Clock, Star, Users, TrendingUp, BookOpen, Filter, ChevronRight, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function OnDemandPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedLevel, setSelectedLevel] = useState<string>("all")
    const [isPending, startTransition] = useTransition()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const logged = localStorage.getItem('isLogged') === 'true'
        setIsLoggedIn(logged)
    }, [])

    const cursos = [
        {
            id: 1,
            nombre: "Yoga para Principiantes",
            categoria: "Fundamentos",
            nivel: "Principiante",
            duracion: "8 semanas",
            clases: 16,
            rating: 4.9,
            estudiantes: 250,
            precio: "AR$ 12.000",
            profesor: "María González",
            descripcion: "Curso completo para comenzar tu práctica de yoga desde cero. Aprende las bases con confianza.",
            imagen: "/f1.jpg",
            destacado: true
        },
        {
            id: 2,
            nombre: "Vinyasa Flow Intermedio",
            categoria: "Práctica",
            nivel: "Intermedio",
            duracion: "6 semanas",
            clases: 12,
            rating: 4.8,
            estudiantes: 180,
            precio: "AR$ 15.000",
            profesor: "Juan Pérez",
            descripcion: "Profundiza tu práctica con secuencias dinámicas y desafiantes.",
            imagen: "/f2.jpg",
            destacado: false
        },
        {
            id: 3,
            nombre: "Meditación y Mindfulness",
            categoria: "Meditación",
            nivel: "Todos",
            duracion: "4 semanas",
            clases: 12,
            rating: 5.0,
            estudiantes: 320,
            precio: "AR$ 10.000",
            profesor: "Ana Fernández",
            descripcion: "Aprende técnicas de meditación para reducir el estrés y encontrar paz interior.",
            imagen: "/f3.jpg",
            destacado: true
        },
        {
            id: 4,
            nombre: "Pranayama Avanzado",
            categoria: "Pranayama",
            nivel: "Avanzado",
            duracion: "5 semanas",
            clases: 10,
            rating: 4.7,
            estudiantes: 95,
            precio: "AR$ 18.000",
            profesor: "Carlos Rodríguez",
            descripcion: "Domina técnicas avanzadas de respiración y control energético.",
            imagen: "/f4.jpg",
            destacado: false
        },
        {
            id: 5,
            nombre: "Yoga Restaurativo",
            categoria: "Bienestar",
            nivel: "Todos",
            duracion: "4 semanas",
            clases: 8,
            rating: 4.9,
            estudiantes: 210,
            precio: "AR$ 11.000",
            profesor: "Laura Martínez",
            descripcion: "Aprende a relajarte profundamente y a restaurar tu sistema nervioso.",
            imagen: "/f1.jpg",
            destacado: false
        },
        {
            id: 6,
            nombre: "Anatomía del Yoga",
            categoria: "Teoría",
            nivel: "Intermedio",
            duracion: "6 semanas",
            clases: 12,
            rating: 4.8,
            estudiantes: 150,
            precio: "AR$ 14.000",
            profesor: "Dr. Martín López",
            descripcion: "Comprende cómo funciona tu cuerpo en cada asana para practicar de forma segura.",
            imagen: "/f2.jpg",
            destacado: false
        }
    ]

    const categorias = ["Todas", "Fundamentos", "Práctica", "Meditación", "Pranayama", "Bienestar", "Teoría"]
    const niveles = ["Todos", "Principiante", "Intermedio", "Avanzado"]

    const filteredCursos = cursos.filter(curso => {
        const matchCategory = selectedCategory === "all" || curso.categoria === selectedCategory
        const matchLevel = selectedLevel === "all" || curso.nivel === selectedLevel
        return matchCategory && matchLevel
    })

    const cursosDestacados = cursos.filter(c => c.destacado)

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f3.jpg"
                            alt="Cursos On Demand Prana"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Cursos On Demand
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-light mb-8">
                            Aprende a tu ritmo, donde y cuando quieras
                        </p>
                        <div className="flex justify-center gap-8 text-white">
                            <div className="text-center">
                                <div className="text-3xl font-bold">150+</div>
                                <div className="text-sm">Horas de contenido</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">25+</div>
                                <div className="text-sm">Cursos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">500+</div>
                                <div className="text-sm">Estudiantes</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                            ¿Por qué elegir nuestros cursos?
                        </h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="bg-[#F6F4F1] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Play className="h-10 w-10 text-[#5862f0]" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Acceso Ilimitado</h3>
                                <p className="text-gray-600 text-sm">Ve las clases cuantas veces quieras</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-[#F6F4F1] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="h-10 w-10 text-[#5862f0]" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Tu Ritmo</h3>
                                <p className="text-gray-600 text-sm">Aprende según tu disponibilidad</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-[#F6F4F1] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-10 w-10 text-[#5862f0]" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Certificado</h3>
                                <p className="text-gray-600 text-sm">Obtén tu certificado al finalizar</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-[#F6F4F1] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-10 w-10 text-[#5862f0]" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Comunidad</h3>
                                <p className="text-gray-600 text-sm">Conecta con otros estudiantes</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cursos Destacados */}
                {cursosDestacados.length > 0 && (
                    <section className="py-16 px-4 bg-[#F6F4F1]">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl font-bold text-gray-800">Cursos Destacados</h2>
                                <TrendingUp className="h-8 w-8 text-[#5862f0]" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {cursosDestacados.map((curso) => (
                                    <div
                                        key={curso.id}
                                        className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className="relative h-64">
                                            <Image
                                                src={curso.imagen}
                                                alt={curso.nombre}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute top-4 left-4 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                                                DESTACADO
                                            </div>
                                            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                                <Play className="h-5 w-5" />
                                                <span className="font-semibold">{curso.clases} clases</span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="bg-[#5862f0]/10 text-[#5862f0] px-3 py-1 rounded-full text-sm font-semibold">
                                                    {curso.categoria}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-bold">{curso.rating}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#5862f0] mb-2">{curso.nombre}</h3>
                                            <p className="text-gray-600 mb-4 text-sm">{curso.descripcion}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    <span>{curso.duracion}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    <span>{curso.estudiantes} estudiantes</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <div>
                                                    <div className="text-sm text-gray-500">Profesor</div>
                                                    <div className="font-semibold text-gray-800">{curso.profesor}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold text-[#5862f0]">{curso.precio}</div>
                                                </div>
                                            </div>
                                            <Link href={`/ondemand/${curso.id}`} className="block w-full mt-6">
                                                <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] py-6">
                                                    Ver Curso
                                                    <ChevronRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Filtros */}
                <section className="py-8 px-4 bg-white border-t border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <Filter className="h-5 w-5 text-[#5862f0]" />
                            <h2 className="text-xl font-bold text-gray-800">Filtrar Cursos</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent"
                                >
                                    {categorias.map((cat) => (
                                        <option key={cat} value={cat === "Todas" ? "all" : cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nivel</label>
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent"
                                >
                                    {niveles.map((nivel) => (
                                        <option key={nivel} value={nivel === "Todos" ? "all" : nivel}>
                                            {nivel}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Todos los Cursos */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12">
                            Todos los Cursos
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {filteredCursos.map((curso) => (
                                <div
                                    key={curso.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={curso.imagen}
                                            alt={curso.nombre}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
                                            <BookOpen className="h-4 w-4" />
                                            <span>{curso.clases} clases</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="bg-[#826597]/10 text-[#826597] px-2 py-1 rounded text-xs font-semibold">
                                                {curso.nivel}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-bold">{curso.rating}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{curso.nombre}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{curso.descripcion}</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                            <span>{curso.duracion}</span>
                                            <span>•</span>
                                            <span>{curso.estudiantes} estudiantes</span>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <span className="text-xl font-bold text-[#5862f0]">{curso.precio}</span>
                                            <Link href={`/ondemand/${curso.id}`}>
                                                <Button size="sm" className="bg-[#5862f0] hover:bg-[#3c4ac6]">
                                                    Ver Curso
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredCursos.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    No se encontraron cursos con los filtros seleccionados
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                {isMounted && !isLoggedIn && (
                    <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                ¿Listo para comenzar tu transformación?
                            </h2>
                            <p className="text-xl text-white/90 mb-8 font-light">
                                Accede a todos nuestros cursos con una suscripción mensual
                            </p>
                            <Link href="/registro">
                                <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                                    Comenzar Ahora
                                </Button>
                            </Link>
                        </div>
                    </section>
                )}
            </div>
            <SiteFooter />
        </>
    )
}
