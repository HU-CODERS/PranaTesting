"use client"

import { useState, useTransition, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Users, MapPin, Filter, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function ClasesPage() {
    const [selectedDay, setSelectedDay] = useState<string>("all")
    const [selectedStyle, setSelectedStyle] = useState<string>("all")
    const [isPending, startTransition] = useTransition()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        // Detectar si el usuario tiene sesión iniciada
        const logged = localStorage.getItem('isLogged') === 'true'
        setIsLoggedIn(logged)
    }, [])

    const clases = [
        {
            id: 1,
            nombre: "Hatha Yoga Matutino",
            tipo: "Hatha",
            profesor: "María González",
            dia: "Lunes",
            horario: "08:00 - 09:30",
            cupos: 15,
            descripcion: "Comenzá tu día con energía renovada. Práctica integral que combina asanas, pranayama y meditación."
        },
        {
            id: 2,
            nombre: "Vinyasa Flow",
            tipo: "Vinyasa",
            profesor: "Juan Pérez",
            dia: "Lunes",
            horario: "18:00 - 19:30",
            cupos: 12,
            descripcion: "Clase dinámica que sincroniza movimiento con respiración, creando una meditación en movimiento."
        },
        {
            id: 3,
            nombre: "Yoga Suave",
            tipo: "Suave",
            profesor: "Laura Martínez",
            dia: "Martes",
            horario: "10:00 - 11:00",
            cupos: 20,
            descripcion: "Práctica gentil perfecta para comenzar en el yoga o para quienes buscan una práctica más relajada."
        },
        {
            id: 4,
            nombre: "Ashtanga Vinyasa",
            tipo: "Ashtanga",
            profesor: "Carlos Rodríguez",
            dia: "Martes",
            horario: "18:30 - 20:00",
            cupos: 12,
            descripcion: "Serie tradicional de Ashtanga con énfasis en la respiración Ujjayi y el vinyasa."
        },
        {
            id: 5,
            nombre: "Power Yoga",
            tipo: "Power",
            profesor: "Carlos Rodríguez",
            dia: "Miércoles",
            horario: "19:00 - 20:30",
            cupos: 10,
            descripcion: "Clase intensa que combina fuerza, flexibilidad y resistencia cardiovascular."
        },
        {
            id: 6,
            nombre: "Yoga Restaurativo",
            tipo: "Restaurativo",
            profesor: "Ana Fernández",
            dia: "Jueves",
            horario: "20:00 - 21:30",
            cupos: 15,
            descripcion: "Práctica profundamente relajante que utiliza soportes para mantener posturas durante más tiempo."
        },
        {
            id: 7,
            nombre: "Hatha Yoga Vespertino",
            tipo: "Hatha",
            profesor: "María González",
            dia: "Viernes",
            horario: "17:00 - 18:30",
            cupos: 15,
            descripcion: "Cierra tu semana laboral con una práctica equilibrada que te ayudará a soltar tensiones."
        },
        {
            id: 8,
            nombre: "Yoga en Familia",
            tipo: "Familia",
            profesor: "Laura Martínez",
            dia: "Sábado",
            horario: "10:00 - 11:00",
            cupos: 20,
            descripcion: "Clase especial para compartir con tus hijos. Yoga lúdico y divertido para todas las edades."
        },
        {
            id: 9,
            nombre: "Vinyasa Flow Avanzado",
            tipo: "Vinyasa",
            profesor: "Juan Pérez",
            dia: "Sábado",
            horario: "11:30 - 13:00",
            cupos: 12,
            descripcion: "Exploración profunda de asanas avanzadas, inversiones y arm balances."
        }
    ]

    const tipos = ["Todos", "Hatha", "Ashtanga", "Vinyasa", "Suave", "Power", "Restaurativo", "Familia"]
    const dias = ["Todos", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

    const filteredClases = clases.filter(clase => {
        const matchDay = selectedDay === "all" || clase.dia === selectedDay
        const matchStyle = selectedStyle === "all" || clase.tipo === selectedStyle
        return matchDay && matchStyle
    })

    // Agrupar clases por día
    const diasOrdenados = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
    const clasesPorDia = diasOrdenados.reduce((acc, dia) => {
        const clasesDelDia = filteredClases.filter(clase => clase.dia === dia)
        if (clasesDelDia.length > 0) {
            acc[dia] = clasesDelDia
        }
        return acc
    }, {} as Record<string, typeof clases>)

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f1.jpg"
                            alt="Clases Presenciales Prana"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Clases Presenciales
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-light">
                            Encontrá tu práctica ideal en nuestra grilla semanal
                        </p>
                    </div>
                </section>

                {/* Información General */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center p-6 bg-[#F6F4F1] rounded-xl">
                                <MapPin className="h-12 w-12 text-[#5862f0] mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Ubicación</h3>
                                <p className="text-gray-600">General Manuel Belgrano 569, Moreno</p>
                            </div>
                            <div className="text-center p-6 bg-[#F6F4F1] rounded-xl">
                                <Users className="h-12 w-12 text-[#5862f0] mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Grupos Reducidos</h3>
                                <p className="text-gray-600">Máximo 20 personas por clase</p>
                            </div>
                            <div className="text-center p-6 bg-[#F6F4F1] rounded-xl">
                                <Calendar className="h-12 w-12 text-[#5862f0] mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Reservá Online</h3>
                                <p className="text-gray-600">Sistema de reservas 24/7</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filtros */}
                <section className="py-8 px-4 bg-[#F6F4F1] border-t border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <Filter className="h-5 w-5 text-[#5862f0]" />
                            <h2 className="text-xl font-bold text-gray-800">Filtrar Clases</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Día</label>
                                <select
                                    value={selectedDay}
                                    onChange={(e) => startTransition(() => setSelectedDay(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent transition-all duration-200"
                                >
                                    {dias.map((dia) => (
                                        <option key={dia} value={dia === "Todos" ? "all" : dia}>
                                            {dia}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                                <select
                                    value={selectedStyle}
                                    onChange={(e) => startTransition(() => setSelectedStyle(e.target.value))}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent transition-all duration-200"
                                >
                                    {tipos.map((tipo) => (
                                        <option key={tipo} value={tipo === "Todos" ? "all" : tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Grilla de Clases Agrupadas por Día */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                            Grilla Semanal
                        </h2>

                        <div className={`space-y-12 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                            {Object.entries(clasesPorDia).map(([dia, clasesDelDia]) => (
                                <div key={dia} className="animate-in fade-in slide-in-from-bottom-4">
                                    {/* Título del día */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <h3 className="text-2xl font-bold text-[#5862f0]">{dia}</h3>
                                        <div className="flex-1 h-px bg-gradient-to-r from-[#5862f0] to-transparent"></div>
                                    </div>

                                    {/* Cards de clases del día */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {clasesDelDia.map((clase) => (
                                            <div
                                                key={clase.id}
                                                className="bg-white rounded-xl border-2 border-gray-200 hover:border-[#5862f0] transition-all duration-300 hover:shadow-lg flex flex-col"
                                            >
                                                <div className="p-6 flex-1 flex flex-col">
                                                    {/* Header con tipo */}
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h4 className="text-xl font-bold text-gray-800 flex-1">{clase.nombre}</h4>
                                                        <span className="ml-2 px-3 py-1 bg-[#5862f0]/10 text-[#5862f0] text-xs font-semibold rounded-full shrink-0">
                                                            {clase.tipo}
                                                        </span>
                                                    </div>

                                                    {/* Descripción */}
                                                    <p className="text-gray-600 text-sm mb-4">{clase.descripcion}</p>

                                                    {/* Info */}
                                                    <div className="space-y-2 mb-6">
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <Clock className="h-4 w-4 text-[#5862f0] shrink-0" />
                                                            <span className="font-medium">{clase.horario}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <Users className="h-4 w-4 text-[#5862f0] shrink-0" />
                                                            <span>{clase.profesor}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                                            <span className="w-4 h-4 flex items-center justify-center text-[#5862f0] shrink-0">👥</span>
                                                            <span><span className="font-semibold text-[#5862f0]">{clase.cupos}</span> cupos disponibles</span>
                                                        </div>
                                                    </div>

                                                    {/* Botón siempre al final */}
                                                    <div className="mt-auto">
                                                        {!isMounted ? (
                                                            <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white" disabled>
                                                                Cargando...
                                                            </Button>
                                                        ) : isLoggedIn ? (
                                                            <Button
                                                                onClick={() => alert('Funcionalidad de reserva en desarrollo')}
                                                                className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white"
                                                            >
                                                                Reservar
                                                                <ChevronRight className="ml-2 h-4 w-4" />
                                                            </Button>
                                                        ) : (
                                                            <Link href="/login" className="block w-full">
                                                                <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                                                    Iniciar Sesión para Reservar
                                                                    <ChevronRight className="ml-2 h-4 w-4" />
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredClases.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    No se encontraron clases con los filtros seleccionados
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                {isMounted && !isLoggedIn && (
                    <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                ¿Primera vez en Prana?
                            </h2>
                            <p className="text-xl text-white/90 mb-8 font-light">
                                Tu primera clase es gratis. Vení a conocernos y experimentá la energía de nuestra comunidad.
                            </p>
                            <Link href="/registro">
                                <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                                    Reservar Primera Clase Gratis
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
