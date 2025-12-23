"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Dumbbell, Calendar, Clock, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Loader from "@/components/loader"

export default function MisClasesPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [clases, setClases] = useState<any[]>([])

    useEffect(() => {
        const logged = localStorage.getItem('isLogged') === 'true'
        if (!logged) {
            router.push('/login')
            return
        }

        // Datos de ejemplo
        const clasesReservadas = [
            {
                id: 1,
                nombre: "Hatha Yoga Matutino",
                tipo: "Hatha",
                profesor: "María González",
                dia: "Lunes",
                fecha: "20 ENE 2025",
                horario: "08:00 - 09:30",
                ubicacion: "Sede Moreno",
                estado: "confirmada"
            },
            {
                id: 2,
                nombre: "Vinyasa Flow",
                tipo: "Vinyasa",
                profesor: "Juan Pérez",
                dia: "Miércoles",
                fecha: "22 ENE 2025",
                horario: "18:00 - 19:30",
                ubicacion: "Sede Moreno",
                estado: "confirmada"
            }
        ]

        setClases(clasesReservadas)
        setIsLoading(false)
    }, [router])

    const handleCancelar = (claseId: number) => {
        if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            setClases(clases.filter(c => c.id !== claseId))
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
                <section className="bg-white border-b py-8 px-4">
                    <div className="max-w-6xl mx-auto">
                        <Link href="/perfil" className="inline-flex items-center gap-2 text-[#5862f0] hover:text-[#3c4ac6] mb-4 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Volver a Mi Cuenta
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Mis Clases Presenciales</h1>
                        <p className="text-gray-600 mt-2">Clases reservadas en el estudio</p>
                    </div>
                </section>

                <section className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        {clases.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <Dumbbell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No tienes clases reservadas</h2>
                                <p className="text-gray-600 mb-6">Reserva tu lugar en nuestras clases presenciales</p>
                                <Link href="/clases">
                                    <Button className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                        Ver Grilla de Clases
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {clases.map((clase) => (
                                    <div key={clase.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <span className="bg-[#5862f0]/10 text-[#5862f0] px-3 py-1 rounded-full text-xs font-semibold">
                                                    {clase.tipo}
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-800 mt-2">{clase.nombre}</h3>
                                            </div>
                                            <Button
                                                onClick={() => handleCancelar(clase.id)}
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="space-y-2 text-sm text-gray-700">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-[#5862f0]" />
                                                <span>{clase.dia}, {clase.fecha}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-[#5862f0]" />
                                                <span>{clase.horario}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-[#5862f0]" />
                                                <span>Profesor: {clase.profesor}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t">
                                            <span className="inline-flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                                                ✓ Confirmada
                                            </span>
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
