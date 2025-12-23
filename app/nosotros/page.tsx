"use client"

import Image from "next/image"
import { Heart, Users, Award, Target, Sparkles, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function NosotrosPage() {
    const equipo = [
        {
            nombre: "María González",
            rol: "Fundadora & Directora",
            especialidad: "Hatha Yoga & Meditación",
            imagen: "/f1.jpg",
            descripcion: "Con más de 15 años de experiencia, María fundó Prana con la visión de crear un espacio donde el yoga sea accesible para todos."
        },
        {
            nombre: "Juan Pérez",
            rol: "Instructor Principal",
            especialidad: "Vinyasa Flow & Ashtanga",
            imagen: "/f2.jpg",
            descripcion: "Certificado internacionalmente, Juan aporta energía y precisión a cada una de sus clases dinámicas."
        },
        {
            nombre: "Laura Martínez",
            rol: "Instructora Senior",
            especialidad: "Yoga Restaurativo & Terapéutico",
            imagen: "/f3.jpg",
            descripcion: "Especialista en anatomía aplicada al yoga, Laura guía prácticas profundas y sanadoras."
        },
        {
            nombre: "Ana Fernández",
            rol: "Instructora",
            especialidad: "Yoga para Niños & Prenatal",
            imagen: "/f4.jpg",
            descripcion: "Con formación en educación y yoga, Ana crea espacios seguros y amorosos para familias."
        }
    ]

    const valores = [
        {
            icon: <Heart className="h-8 w-8" />,
            titulo: "Inclusión",
            descripcion: "Creemos que el yoga es para todos, sin importar edad, condición física o experiencia previa."
        },
        {
            icon: <Users className="h-8 w-8" />,
            titulo: "Comunidad",
            descripcion: "Fomentamos conexiones auténticas entre nuestros estudiantes, creando una familia yóguica."
        },
        {
            icon: <Sparkles className="h-8 w-8" />,
            titulo: "Transformación",
            descripcion: "Acompañamos procesos de crecimiento personal que van más allá del mat."
        },
        {
            icon: <Award className="h-8 w-8" />,
            titulo: "Excelencia",
            descripcion: "Mantenemos altos estándares en nuestras enseñanzas y formación continua."
        }
    ]

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[70vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f2.jpg"
                            alt="Sobre Nosotros - Prana"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Sobre Nosotros
                        </h1>
                        <p className="text-xl md:text-2xl text-white/95 font-light">
                            Una comunidad dedicada a transformar vidas a través del yoga
                        </p>
                    </div>
                </section>

                {/* Nuestra Historia */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-[#5862f0] mb-6">Nuestra Historia</h2>
                                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                    Prana nació en 2010 con un sueño simple pero poderoso: crear un espacio donde las personas pudieran conectar con su esencia a través del yoga.
                                </p>
                                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                    Lo que comenzó como un pequeño estudio con una sola sala, hoy se ha convertido en una comunidad vibrante de cientos de practicantes que encuentran en Prana su segundo hogar.
                                </p>
                                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                    A lo largo de estos años, hemos acompañado a miles de personas en su camino de autoconocimiento, ofreciendo no solo clases de yoga, sino un verdadero espacio de transformación y crecimiento.
                                </p>
                                <div className="grid grid-cols-3 gap-6 mt-8">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-[#5862f0] mb-2">15+</div>
                                        <p className="text-sm text-gray-600">Años de experiencia</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-[#5862f0] mb-2">3000+</div>
                                        <p className="text-sm text-gray-600">Alumnos</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-[#5862f0] mb-2">20+</div>
                                        <p className="text-sm text-gray-600">Instructores</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/f1.jpg"
                                    alt="Historia de Prana"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Misión y Visión */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mb-6">
                                    <Target className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-3xl font-bold text-[#5862f0] mb-4">Nuestra Misión</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Hacer del yoga una herramienta accesible y transformadora para todas las personas, acompañándolas en su camino hacia el bienestar integral, la autoconciencia y la plenitud en su vida cotidiana.
                                </p>
                            </div>
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <div className="w-16 h-16 bg-[#826597]/10 rounded-full flex items-center justify-center mb-6">
                                    <Sparkles className="h-8 w-8 text-[#826597]" />
                                </div>
                                <h3 className="text-3xl font-bold text-[#826597] mb-4">Nuestra Visión</h3>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Ser un referente en la enseñanza del yoga, reconocidos por nuestra calidad humana, excelencia en la enseñanza y por cultivar una comunidad consciente que impacte positivamente en la sociedad.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Valores */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#5862f0] mb-4">Nuestros Valores</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Los principios que guían cada una de nuestras acciones y decisiones
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-8">
                            {valores.map((valor, index) => (
                                <div key={index} className="text-center p-6 rounded-xl hover:bg-[#F6F4F1] transition-colors duration-300">
                                    <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#5862f0]">
                                        {valor.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">{valor.titulo}</h3>
                                    <p className="text-sm text-gray-600">{valor.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Equipo */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-[#5862f0] mb-4">Nuestro Equipo</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Instructores certificados y apasionados por compartir el camino del yoga
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {equipo.map((miembro, index) => (
                                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                    <div className="relative h-64">
                                        <Image
                                            src={miembro.imagen}
                                            alt={miembro.nombre}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-[#5862f0] mb-1">{miembro.nombre}</h3>
                                        <p className="text-sm font-semibold text-[#826597] mb-2">{miembro.rol}</p>
                                        <p className="text-xs text-gray-500 mb-3 font-medium">{miembro.especialidad}</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">{miembro.descripcion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ubicación */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <MapPin className="h-12 w-12 text-[#5862f0] mb-6" />
                                <h2 className="text-4xl font-bold text-[#5862f0] mb-6">Visitanos</h2>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    Nuestro estudio está ubicado en el corazón de la ciudad, diseñado especialmente para crear un ambiente de paz y tranquilidad.
                                </p>
                                <div className="space-y-4 mb-8">
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">Dirección:</h4>
                                        <p className="text-gray-600">Calle Principal 1234, La Plata, Buenos Aires</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">Horarios:</h4>
                                        <p className="text-gray-600">Lunes a Viernes: 7:00 - 21:00</p>
                                        <p className="text-gray-600">Sábados: 9:00 - 14:00</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-2">Contacto:</h4>
                                        <p className="text-gray-600">info@prana-om.com</p>
                                        <p className="text-gray-600">+54 9 221 123-4567</p>
                                    </div>
                                </div>
                                <Button className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white px-8 py-6 text-lg">
                                    Agendar una Visita
                                </Button>
                            </div>
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/f4.jpg"
                                    alt="Nuestro Estudio"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            ¿Querés formar parte de Prana?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 font-light">
                            Unite a nuestra comunidad y comenzá tu práctica hoy mismo
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                                Clase de Prueba Gratis
                            </Button>
                            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                                Conocer Clases
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
