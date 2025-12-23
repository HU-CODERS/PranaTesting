"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, ShoppingBag, Video, Calendar, Dumbbell, Settings, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Loader from "@/components/loader"

export default function PerfilPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        const logged = localStorage.getItem('isLogged') === 'true'
        if (!logged) {
            router.push('/login')
            return
        }

        const email = localStorage.getItem('userEmail') || "usuario@prana.com"
        setUserEmail(email)
        setIsLoading(false)
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('isLogged')
        localStorage.removeItem('userEmail')
        router.push('/')
    }

    if (isLoading) {
        return <Loader />
    }

    const menuItems = [
        {
            icon: User,
            title: "Información Personal",
            description: "Editar nombre, email y datos de contacto",
            href: "/perfil/informacion",
            color: "text-[#5862f0]",
            bg: "bg-[#5862f0]/10"
        },
        {
            icon: Video,
            title: "Mis Cursos On Demand",
            description: "Cursos comprados y progreso",
            href: "/perfil/cursos",
            color: "text-[#826597]",
            bg: "bg-[#826597]/10"
        },
        {
            icon: Calendar,
            title: "Eventos Reservados",
            description: "Talleres, retiros y eventos especiales",
            href: "/perfil/eventos",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            icon: Dumbbell,
            title: "Clases Presenciales",
            description: "Reservas de clases en el estudio",
            href: "/perfil/clases",
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            icon: ShoppingBag,
            title: "Historial de Compras",
            description: "Productos y servicios adquiridos",
            href: "/perfil/compras",
            color: "text-orange-600",
            bg: "bg-orange-50"
        }
    ]

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen bg-[#F6F4F1]">
                {/* Hero */}
                <section className="bg-gradient-to-r from-[#5862f0] to-[#826597] py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="h-12 w-12 text-[#5862f0]" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2">Mi Cuenta</h1>
                        <p className="text-xl text-white/90">{userEmail}</p>
                    </div>
                </section>

                {/* Menu Grid */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`${item.bg} p-3 rounded-lg shrink-0`}>
                                            <item.icon className={`h-6 w-6 ${item.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#5862f0] transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#5862f0] transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Logout Button */}
                        <div className="mt-12 text-center">
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
