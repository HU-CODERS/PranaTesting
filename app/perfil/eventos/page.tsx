"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Loader from "@/components/loader"

export default function MisEventosPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [eventos, setEventos] = useState<any[]>([])

    useEffect(() => {
        const logged = localStorage.getItem('isLogged') === 'true'
        if (!logged) {
            router.push('/login')
            return
        }

        // Datos de ejemplo - en producción vendrían del backend
        const eventosReservados = [
            {
                id: 1,
                nombre: "Taller de Meditación y Mindfulness",
                categoria: "Taller",
                fecha: "15 ENE 2025",
                hora: "10:00 - 13:00",
                ubicacion: "Sede Moreno",
                profesor: "María González",
                precio: "AR$ 8.000",
                estado: "confirmado"
            },
            {
                id: 2,
                nombre: "Retiro de Yoga en las Sierras",
                categoria: "Retiro",
                fecha: "22-24 FEB 2025",
                hora: "Viernes 18:00 - Domingo 16:00",
                ubicacion: "Córdoba",
                profesor: "Juan Pérez y Laura Martínez",
                precio: "AR$ 85.000",
                estado: "confirmado"
            }
        ]

        setEventos(eventosReservados)
        setIsLoading(false)
    }, [router])

    const handleCancelar = (eventoId: number) => {
        if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            setEventos(eventos.filter(e => e.id !== eventoId))
            alert('Reserva cancelada correctamente')
        }
    }

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
                        <h1 className="text-3xl font-bold text-gray-800">Mis Eventos Reservados</h1>
                        <p className="text-gray-600 mt-2">Talleres, retiros y eventos especiales</p>
                    </div>
                </section>

                {/* Eventos */}
                <section className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        {eventos.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No tienes eventos reservados</h2>
                                <p className="text-gray-600 mb-6">Explora nuestros próximos talleres, retiros y eventos especiales</p>
                                <Link href="/eventos">
                                    <Button className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                        Ver Eventos
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {eventos.map((evento) => (
                                    <div key={evento.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="bg-[#5862f0]/10 text-[#5862f0] px-3 py-1 rounded-full text-sm font-semibold">
                                                        {evento.categoria}
                                                    </span>
                                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                        Confirmado
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-gray-800">{evento.nombre}</h3>
                                            </div>
                                            <Button
                                                onClick={() => handleCancelar(evento.id)}
                                                variant="ghost"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <X className="h-5 w-5" />
                                            </Button>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Calendar className="h-5 w-5 text-[#5862f0]" />
                                                <span><span className="font-medium">Fecha:</span> {evento.fecha}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Clock className="h-5 w-5 text-[#5862f0]" />
                                                <span><span className="font-medium">Horario:</span> {evento.hora}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MapPin className="h-5 w-5 text-[#5862f0]" />
                                                <span><span className="font-medium">Ubicación:</span> {evento.ubicacion}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Users className="h-5 w-5 text-[#5862f0]" />
                                                <span><span className="font-medium">Instructor:</span> {evento.profesor}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">Inversión:</span>
                                                <span className="ml-2 text-2xl font-bold text-[#5862f0]">{evento.precio}</span>
                                            </div>
                                            <Link href="/eventos">
                                                <Button variant="outline" className="border-[#5862f0] text-[#5862f0] hover:bg-[#5862f0]/10">
                                                    Ver más eventos
                                                </Button>
                                            </Link>
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
