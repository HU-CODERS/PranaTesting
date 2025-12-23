"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Users, MapPin, Tag, ChevronRight, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function EventosPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedMonth, setSelectedMonth] = useState<string>("all")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const logged = localStorage.getItem('isLogged') === 'true'
        setIsLoggedIn(logged)
    }, [])

    const eventos = [
        {
            id: 1,
            nombre: "Taller de Meditación y Mindfulness",
            categoria: "Taller",
            fecha: "15 ENE 2025",
            hora: "10:00 - 13:00",
            duracion: "3 horas",
            profesor: "María González",
            ubicacion: "Sede Moreno",
            precio: "AR$ 8.000",
            cupos: 20,
            destacado: true,
            descripcion: "Aprende técnicas de meditación y mindfulness para incorporar en tu vida diaria. Incluye prácticas guiadas y material de apoyo.",
            imagen: "/f1.jpg",
            mes: "Enero"
        },
        {
            id: 2,
            nombre: "Retiro de Yoga en las Sierras",
            categoria: "Retiro",
            fecha: "22-24 FEB 2025",
            hora: "Viernes 18:00 - Domingo 16:00",
            duracion: "3 días / 2 noches",
            profesor: "Juan Pérez y Laura Martínez",
            ubicacion: "Córdoba",
            precio: "AR$ 85.000",
            cupos: 15,
            destacado: true,
            descripcion: "Fin de semana de inmersión total en la práctica de yoga, meditación y conexión con la naturaleza. Incluye alojamiento y comidas.",
            imagen: "/f2.jpg",
            mes: "Febrero"
        },
        {
            id: 3,
            nombre: "Clase Especial: Yoga bajo las Estrellas",
            categoria: "Clase Especial",
            fecha: "10 MAR 2025",
            hora: "20:00 - 21:30",
            duracion: "1.5 horas",
            profesor: "Ana Fernández",
            ubicacion: "Plaza Moreno",
            precio: "AR$ 5.000",
            cupos: 30,
            destacado: false,
            descripcion: "Práctica de yoga al aire libre en un entorno mágico. Trae tu mat y disfruta de una clase bajo el cielo nocturno.",
            imagen: "/f3.jpg",
            mes: "Marzo"
        },
        {
            id: 4,
            nombre: "Workshop: Anatomía del Yoga",
            categoria: "Workshop",
            fecha: "28 MAR 2025",
            hora: "14:00 - 18:00",
            duracion: "4 horas",
            profesor: "Dr. Carlos Rodríguez",
            ubicacion: "Sede Moreno",
            precio: "AR$ 12.000",
            cupos: 25,
            destacado: false,
            descripcion: "Comprende la anatomía detrás de las posturas de yoga. Ideal para practicantes y profesores que quieran profundizar su conocimiento.",
            imagen: "/f4.jpg",
            mes: "Marzo"
        },
        {
            id: 5,
            nombre: "Círculo de Mujeres: Luna Nueva",
            categoria: "Círculo",
            fecha: "5 ABR 2025",
            hora: "19:00 - 21:00",
            duracion: "2 horas",
            profesor: "Laura Martínez",
            ubicacion: "Sede Moreno",
            precio: "AR$ 6.000",
            cupos: 18,
            destacado: false,
            descripcion: "Espacio sagrado para mujeres donde conectar con la energía lunar, compartir y realizar prácticas de yoga restaurativo.",
            imagen: "/f1.jpg",
            mes: "Abril"
        },
        {
            id: 6,
            nombre: "Concierto de Mantras en Vivo",
            categoria: "Evento",
            fecha: "20 ABR 2025",
            hora: "19:30 - 21:30",
            duracion: "2 horas",
            profesor: "Banda Nada Brahma",
            ubicacion: "Sede Moreno",
            precio: "AR$ 7.000",
            cupos: 50,
            destacado: true,
            descripcion: "Noche especial de música devocional con instrumentos en vivo. Experiencia de canto y meditación colectiva.",
            imagen: "/f2.jpg",
            mes: "Abril"
        },
        {
            id: 7,
            nombre: "Intensivo de Vinyasa Flow",
            categoria: "Intensivo",
            fecha: "10-11 MAY 2025",
            hora: "Sábado y Domingo 9:00 - 13:00",
            duracion: "2 días (8 horas)",
            profesor: "Juan Pérez",
            ubicacion: "Sede Moreno",
            precio: "AR$ 18.000",
            cupos: 15,
            destacado: false,
            descripcion: "Fin de semana intensivo para profundizar en la práctica de Vinyasa. Incluye asanas avanzadas, pranayama y filosofía.",
            imagen: "/f3.jpg",
            mes: "Mayo"
        },
        {
            id: 8,
            nombre: "Taller de Yoga para Niños",
            categoria: "Taller",
            fecha: "25 MAY 2025",
            hora: "16:00 - 17:30",
            duracion: "1.5 horas",
            profesor: "Laura Martínez",
            ubicacion: "Sede Moreno",
            precio: "AR$ 4.000",
            cupos: 20,
            destacado: false,
            descripcion: "Taller especial para niños de 6 a 12 años. Yoga lúdico y divertido con juegos, cuentos y posturas adaptadas.",
            imagen: "/f4.jpg",
            mes: "Mayo"
        }
    ]

    const categorias = ["Todos", "Taller", "Workshop", "Retiro", "Clase Especial", "Círculo", "Evento", "Intensivo"]
    const meses = ["Todos", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    const filteredEventos = eventos.filter(evento => {
        const matchCategory = selectedCategory === "all" || evento.categoria === selectedCategory
        const matchMonth = selectedMonth === "all" || evento.mes === selectedMonth
        return matchCategory && matchMonth
    })

    const eventosDestacados = eventos.filter(e => e.destacado)

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f2.jpg"
                            alt="Eventos Prana"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Eventos Prana
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-light">
                            Talleres, retiros y experiencias especiales para profundizar tu práctica
                        </p>
                    </div>
                </section>

                {/* Eventos Destacados */}
                {eventosDestacados.length > 0 && (
                    <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                                Próximos Eventos Destacados
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {eventosDestacados.map((evento) => (
                                    <div key={evento.id} className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Tag className="h-5 w-5 text-[#5862f0]" />
                                            <span className="text-sm font-semibold text-[#5862f0]">{evento.categoria}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">{evento.nombre}</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4 text-[#5862f0]" />
                                                {evento.fecha}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="h-4 w-4 text-[#5862f0]" />
                                                {evento.hora}
                                            </div>
                                        </div>
                                        <p className="text-2xl font-bold text-[#5862f0] mt-4">{evento.precio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Filtros */}
                <section className="py-8 px-4 bg-[#F6F4F1] border-t border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <Filter className="h-5 w-5 text-[#5862f0]" />
                            <h2 className="text-xl font-bold text-gray-800">Filtrar Eventos</h2>
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
                                        <option key={cat} value={cat === "Todos" ? "all" : cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent"
                                >
                                    {meses.map((mes) => (
                                        <option key={mes} value={mes === "Todos" ? "all" : mes}>
                                            {mes}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Grilla de Eventos */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                            Todos los Eventos
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {filteredEventos.map((evento) => (
                                <div
                                    key={evento.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={evento.imagen}
                                            alt={evento.nombre}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#5862f0] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            {evento.categoria}
                                        </div>
                                        {evento.destacado && (
                                            <div className="absolute top-4 right-4 bg-[#826597] text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                DESTACADO
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-[#5862f0] mb-3">{evento.nombre}</h3>
                                        <p className="text-gray-600 mb-4 text-sm">{evento.descripcion}</p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Calendar className="h-4 w-4 text-[#5862f0]" />
                                                <span className="font-medium">Fecha:</span> {evento.fecha}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Clock className="h-4 w-4 text-[#5862f0]" />
                                                <span className="font-medium">Horario:</span> {evento.hora}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Users className="h-4 w-4 text-[#5862f0]" />
                                                <span className="font-medium">Facilitador:</span> {evento.profesor}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <MapPin className="h-4 w-4 text-[#5862f0]" />
                                                <span className="font-medium">Ubicación:</span> {evento.ubicacion}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div>
                                                <p className="text-sm text-gray-500">Duración</p>
                                                <p className="text-sm font-bold text-gray-800">{evento.duracion}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Cupos disponibles</p>
                                                <p className="text-sm font-bold text-[#5862f0]">{evento.cupos}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Inversión</p>
                                                <p className="text-xl font-bold text-[#5862f0]">{evento.precio}</p>
                                            </div>
                                        </div>

                                        {!isMounted ? (
                                            <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 mt-6" disabled>
                                                Cargando...
                                            </Button>
                                        ) : isLoggedIn ? (
                                            <Button
                                                onClick={() => alert('Funcionalidad de reserva en desarrollo')}
                                                className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 mt-6"
                                            >
                                                Reservar Lugar
                                                <ChevronRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        ) : (
                                            <Link href="/login" className="block w-full mt-6">
                                                <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6">
                                                    Iniciar Sesión para Reservar
                                                    <ChevronRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredEventos.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    No se encontraron eventos con los filtros seleccionados
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Información Adicional */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            ¿Querés organizar un evento privado?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Organizamos eventos especiales para grupos, empresas y celebraciones. Contáctanos para diseñar una experiencia única.
                        </p>
                        <a href="mailto:eventos@prana-om.com">
                            <Button size="lg" className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white px-8 py-6 text-lg">
                                Solicitar Información
                            </Button>
                        </a>
                    </div>
                </section>

                {/* CTA Newsletter */}
                <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            No te pierdas ningún evento
                        </h2>
                        <p className="text-xl text-white/90 mb-8 font-light">
                            Suscribite a nuestro newsletter y recibí información sobre próximos talleres, retiros y eventos especiales.
                        </p>
                        <Link href="/">
                            <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                                Suscribirme al Newsletter
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
