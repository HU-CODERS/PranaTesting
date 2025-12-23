"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Loader from "@/components/loader"

export default function InformacionPersonalPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        fechaNacimiento: ""
    })

    useEffect(() => {
        const logged = localStorage.getItem('isLogged') === 'true'
        if (!logged) {
            router.push('/login')
            return
        }

        // Cargar datos guardados o usar valores por defecto
        const savedData = localStorage.getItem('userProfile')
        if (savedData) {
            setFormData(JSON.parse(savedData))
        } else {
            const email = localStorage.getItem('userEmail') || ""
            setFormData(prev => ({ ...prev, email }))
        }

        setIsLoading(false)
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Simular guardado
        await new Promise(resolve => setTimeout(resolve, 1000))

        localStorage.setItem('userProfile', JSON.stringify(formData))
        localStorage.setItem('userEmail', formData.email)

        setIsSaving(false)
        alert('Información actualizada correctamente')
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
                    <div className="max-w-4xl mx-auto">
                        <Link href="/perfil" className="inline-flex items-center gap-2 text-[#5862f0] hover:text-[#3c4ac6] mb-4 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Volver a Mi Cuenta
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Información Personal</h1>
                        <p className="text-gray-600 mt-2">Actualiza tus datos personales y de contacto</p>
                    </div>
                </section>

                {/* Form */}
                <section className="py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Nombre */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <User className="h-4 w-4 inline mr-2 text-[#5862f0]" />
                                        Nombre
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                                        placeholder="Tu nombre"
                                        className="w-full"
                                    />
                                </div>

                                {/* Apellido */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Apellido
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.apellido}
                                        onChange={(e) => setFormData(prev => ({ ...prev, apellido: e.target.value }))}
                                        placeholder="Tu apellido"
                                        className="w-full"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Mail className="h-4 w-4 inline mr-2 text-[#5862f0]" />
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="tu@email.com"
                                        className="w-full"
                                        required
                                    />
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Phone className="h-4 w-4 inline mr-2 text-[#5862f0]" />
                                        Teléfono
                                    </label>
                                    <Input
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                                        placeholder="+54 9 11 1234-5678"
                                        className="w-full"
                                    />
                                </div>

                                {/* Fecha de Nacimiento */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Calendar className="h-4 w-4 inline mr-2 text-[#5862f0]" />
                                        Fecha de Nacimiento
                                    </label>
                                    <Input
                                        type="date"
                                        value={formData.fechaNacimiento}
                                        onChange={(e) => setFormData(prev => ({ ...prev, fechaNacimiento: e.target.value }))}
                                        className="w-full"
                                    />
                                </div>

                                {/* Ciudad */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="h-4 w-4 inline mr-2 text-[#5862f0]" />
                                        Ciudad
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.ciudad}
                                        onChange={(e) => setFormData(prev => ({ ...prev, ciudad: e.target.value }))}
                                        placeholder="Buenos Aires"
                                        className="w-full"
                                    />
                                </div>

                                {/* Dirección - Full width */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Dirección
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.direccion}
                                        onChange={(e) => setFormData(prev => ({ ...prev, direccion: e.target.value }))}
                                        placeholder="Calle y número"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white px-8"
                                >
                                    {isSaving ? (
                                        "Guardando..."
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-2" />
                                            Guardar Cambios
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
