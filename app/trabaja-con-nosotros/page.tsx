"use client"

import { useState } from "react"
import Image from "next/image"
import { Video, Home as HomeIcon, User, Mail, Phone, ChevronRight, Sparkles, DollarSign, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function TrabajaConNosotrosPage() {
    const [selectedOption, setSelectedOption] = useState<'profesor' | 'alquiler' | null>(null)
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        tipoColaboracion: "",
        experiencia: "",
        propuesta: "",
        horarioPreferido: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState("")

    const opcionesColaboracion = [
        {
            id: 'profesor',
            titulo: "Profesor On-Demand",
            icono: <Video className="h-12 w-12" />,
            descripcion: "Grabá tus clases de yoga y compartí tu conocimiento con nuestra comunidad online",
            beneficios: [
                "Graba en nuestro estudio profesional",
                "Alcance a miles de estudiantes",
                "Flexibilidad total de horarios",
                "Ingresos por reproducciones"
            ],
            requisitos: [
                "Certificación como instructor de Yoga (200hs mínimo)",
                "Experiencia demostrable en enseñanza",
                "Buena presencia frente a cámara",
                "Propuesta de contenido original"
            ],
            costos: "AR$ 15.000/mes (acceso al estudio para grabación + plataforma)",
            imagen: "/f1.jpg"
        },
        {
            id: 'alquiler',
            titulo: "Alquiler de Espacio",
            icono: <HomeIcon className="h-12 w-12" />,
            descripcion: "Alquilá nuestro hermoso estudio para tus clases, talleres o eventos privados",
            beneficios: [
                "Espacio completamente equipado",
                "Ubicación céntrica y accesible",
                "Ambiente profesional y acogedor",
                "Sonido e iluminación incluidos"
            ],
            requisitos: [
                "Propuesta de uso del espacio",
                "Certificación o experiencia en la actividad",
                "Seguro de responsabilidad civil",
                "Reserva anticipada"
            ],
            costos: "Desde AR$ 8.000/hora (varía según día y horario)",
            imagen: "/f2.jpg"
        }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage("")

        try {
            // Aquí iría la lógica para enviar la consulta
            await new Promise(resolve => setTimeout(resolve, 2000))

            setSubmitMessage("¡Solicitud enviada! Nos contactaremos pronto para coordinar los detalles.")
            setFormData({
                nombre: "",
                apellido: "",
                email: "",
                telefono: "",
                tipoColaboracion: "",
                experiencia: "",
                propuesta: "",
                horarioPreferido: ""
            })
        } catch (error) {
            setSubmitMessage("Hubo un error al enviar la solicitud. Por favor, intenta nuevamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[70vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f4.jpg"
                            alt="Colaborá con Prana"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Colaborá con Prana
                        </h1>
                        <p className="text-xl md:text-2xl text-white/95 font-light mb-8">
                            Sé parte de nuestra plataforma o utilizá nuestro espacio para tus propias iniciativas
                        </p>
                    </div>
                </section>

                {/* Introducción */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-[#5862f0] mb-6">
                            Dos Formas de Colaborar
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            En Prana creemos en la colaboración y el crecimiento mutuo. Te ofrecemos dos opciones para que puedas expandir tu alcance como instructor o desarrollar tus propias actividades en nuestro espacio.
                        </p>
                    </div>
                </section>

                {/* Opciones de Colaboración */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {opcionesColaboracion.map((opcion) => (
                                <div
                                    key={opcion.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="relative h-64">
                                        <Image
                                            src={opcion.imagen}
                                            alt={opcion.titulo}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                            <div className="text-white">
                                                <div className="mb-3">{opcion.icono}</div>
                                                <h3 className="text-3xl font-bold">{opcion.titulo}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <p className="text-gray-700 mb-6 leading-relaxed">{opcion.descripcion}</p>

                                        {/* Beneficios */}
                                        <div className="mb-6">
                                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                <Sparkles className="h-5 w-5 text-[#5862f0]" />
                                                Beneficios:
                                            </h4>
                                            <ul className="space-y-2">
                                                {opcion.beneficios.map((beneficio, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                        <Star className="h-4 w-4 text-[#826597] shrink-0 mt-0.5" />
                                                        {beneficio}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Requisitos */}
                                        <div className="mb-6">
                                            <h4 className="font-bold text-gray-800 mb-3">Requisitos:</h4>
                                            <ul className="space-y-2">
                                                {opcion.requisitos.map((req, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Costos */}
                                        <div className="bg-[#F6F4F1] rounded-lg p-4 mb-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <DollarSign className="h-5 w-5 text-[#5862f0]" />
                                                <h4 className="font-bold text-gray-800">Inversión:</h4>
                                            </div>
                                            <p className="text-gray-700">{opcion.costos}</p>
                                        </div>

                                        <Button
                                            onClick={() => {
                                                setSelectedOption(opcion.id as 'profesor' | 'alquiler')
                                                setFormData(prev => ({ ...prev, tipoColaboracion: opcion.titulo }))
                                                document.getElementById('formulario-consulta')?.scrollIntoView({ behavior: 'smooth' })
                                            }}
                                            className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6"
                                        >
                                            Consultar sobre {opcion.titulo}
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Proceso */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-[#5862f0] mb-12">
                            ¿Cómo Funciona?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-[#5862f0]">1</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Enviá tu Consulta</h3>
                                <p className="text-sm text-gray-600">Completá el formulario con tu propuesta y preferencias</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-[#5862f0]">2</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Coordinamos una Reunión</h3>
                                <p className="text-sm text-gray-600">Nos contactamos para conocernos y ver cómo podemos colaborar</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-[#5862f0]">3</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Comenzamos a Trabajar</h3>
                                <p className="text-sm text-gray-600">Firmamos el acuerdo y empezás tu colaboración con Prana</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Formulario de Consulta */}
                <section id="formulario-consulta" className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#5862f0] mb-4">
                                Formulario de Consulta
                            </h2>
                            <p className="text-lg text-gray-600">
                                Completá tus datos y contanos sobre tu propuesta de colaboración
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
                            {/* Datos Personales */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <User className="h-6 w-6 text-[#5862f0]" />
                                    Datos de Contacto
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                                        <Input
                                            type="text"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                                        <Input
                                            type="text"
                                            name="apellido"
                                            value={formData.apellido}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Tu apellido"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                                        <Input
                                            type="tel"
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="11 1234-5678"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Información sobre la Colaboración */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Tu Propuesta</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Colaboración *</label>
                                        <select
                                            name="tipoColaboracion"
                                            value={formData.tipoColaboracion}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent"
                                        >
                                            <option value="">Seleccioná una opción...</option>
                                            <option value="Profesor On-Demand">Profesor On-Demand</option>
                                            <option value="Alquiler de Espacio">Alquiler de Espacio</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Clock className="inline h-4 w-4 mr-1" />
                                            Horario Preferido (para alquiler) o Disponibilidad (para grabación)
                                        </label>
                                        <Input
                                            type="text"
                                            name="horarioPreferido"
                                            value={formData.horarioPreferido}
                                            onChange={handleInputChange}
                                            placeholder="Ej: Lunes y Miércoles 18-20hs"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experiencia y Certificaciones</label>
                                        <Textarea
                                            name="experiencia"
                                            value={formData.experiencia}
                                            onChange={handleInputChange}
                                            placeholder="Contanos sobre tu experiencia, certificaciones y trayectoria..."
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cuéntanos tu Propuesta *</label>
                                        <Textarea
                                            name="propuesta"
                                            value={formData.propuesta}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Describí qué querés hacer: tipo de clases, temática, frecuencia, etc..."
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </div>

                            {submitMessage && (
                                <div className={`mb-6 p-4 rounded-lg ${
                                    submitMessage.includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                }`}>
                                    {submitMessage}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 text-lg font-semibold"
                            >
                                {isSubmitting ? "Enviando..." : "Enviar Consulta"}
                                <ChevronRight className="ml-2 h-6 w-6" />
                            </Button>

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                * Nos contactaremos dentro de las 48hs para coordinar una reunión.
                            </p>
                        </form>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            ¿Tenés dudas sobre los costos o condiciones?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 font-light">
                            Escribinos y te enviaremos toda la información detallada
                        </p>
                        <a href="mailto:colaboraciones@prana-om.com">
                            <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                                Contactar por Email
                            </Button>
                        </a>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
