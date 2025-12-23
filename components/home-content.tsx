'use client'
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsappButton } from "@/components/whatsapp-button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import RegistroModal from "@/components/registro-modal"

export default function HomeContent() {
    const purposeRef = useRef<HTMLDivElement>(null)
    const formacionesRef = useRef<HTMLDivElement>(null)
    const equipoRef = useRef<HTMLDivElement>(null)
    const horariosRef = useRef<HTMLDivElement>(null)
    const blogRef = useRef<HTMLDivElement>(null)
    const comunidadRef = useRef<HTMLDivElement>(null)

    const [isRegistroModalOpen, setIsRegistroModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    useEffect(() => {
        const animationTypes = [
            "animate-fade-up",
            "animate-fade-down",
            "animate-fade-left",
            "animate-fade-right",
            "animate-fade-in",
        ]

        const refs = [
            purposeRef,
            formacionesRef,
            equipoRef,
            horariosRef,
            blogRef,
            comunidadRef,
        ]
        const animationClasses: Record<string, string> = {}

        refs.forEach((ref) => {
            const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)]
            if (ref.current) {
                animationClasses[ref.current.id] = randomAnimation
            }
        })

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        entry.target.classList.add(animationClasses[entry.target.id])
                        entry.target.classList.remove("opacity-0")
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        refs.forEach((ref, index) => {
            if (ref.current) {
                ref.current.id = `section-${index}`
                observer.observe(ref.current)
            }
        })

        return () => {
            refs.forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current)
                }
            })
        }
    }, [])

    const handleNavigation = () => {
        window.scrollTo(0, 0)
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative w-full h-[90vh] flex items-center justify-center">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/serene-studio-flow.png"
                            alt="Prana OM Yoga - Espacio de práctica"
                            fill
                            className="object-cover brightness-[0.75]"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            PRANA OM
                        </h1>
                        <p className="text-xl md:text-3xl text-white mb-10 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                            La yoga no es solo un arte, es una forma de conectar con los demás, con tu entorno; y con vos mismo.
                        </p>
                        <Link href="/formaciones" onClick={handleNavigation}>
                            <Button
                                size="lg"
                                className="bg-[#305891] hover:bg-[#3D6CAC] text-white text-lg px-8 py-6 transition-all duration-300 hover:scale-[1.03] shadow-md"
                            >
                                Conoce Nuestras Propuestas
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Nuestro Propósito */}
                <section
                    ref={purposeRef}
                    className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1] opacity-0 transition-all duration-700"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold text-[#305891] mb-8 leading-tight">Nuestro Propósito</h2>
                                <p className="text-lg mb-6 font-light leading-relaxed text-gray-700">
                                    En Prana OM creemos en el poder transformador del yoga como un camino hacia el bienestar integral.
                                    Somos más que un estudio; somos un espacio donde cada persona encuentra su propio ritmo de crecimiento
                                    personal, espiritual y físico.
                                </p>
                                <p className="text-lg mb-10 font-light leading-relaxed text-gray-700">
                                    Nuestra misión es crear un puente entre la práctica tradicional del yoga y las necesidades de la vida
                                    contemporánea, ofreciendo un espacio inclusivo donde todos son bienvenidos, independientemente de su
                                    nivel o experiencia.
                                </p>
                                <Link href="/comunidad" onClick={handleNavigation}>
                                    <Button className="group bg-transparent hover:bg-transparent text-[#305891] hover:text-[#3D6CAC] p-0 flex items-center gap-2 text-lg transition-all duration-300">
                                        Conoce Más
                                        <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-500">
                                <Image src="/focused-flow.png" alt="Espacio Prana OM Yoga" fill className="object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Formaciones */}
                <section ref={formacionesRef} className="py-24 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#305891] mb-4 text-center">Propuestas para Todos</h2>
                        <p className="text-lg text-center mb-16 max-w-3xl mx-auto font-light text-gray-700">
                            Tenemos una gama de propuestas que incluyen clases, y formaciones para todo público.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                            <div className="relative overflow-hidden group rounded-xl shadow-lg h-[400px]">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#305891]/90 z-10"></div>
                                <Image
                                    src="/community-flow.png"
                                    alt="Clases Presenciales"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Clases Presenciales
                                    </h3>
                                    <p className="text-white/90 mb-4 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Experimenta la energía única de practicar en comunidad con nuestros instructores certificados.
                                    </p>
                                </div>
                            </div>

                            <div className="relative overflow-hidden group rounded-xl shadow-lg h-[400px]">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#826597]/90 z-10"></div>
                                <Image
                                    src="/blog-dolor-espalda.png"
                                    alt="Clases On-Demand"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Clases On-Demand
                                    </h3>
                                    <p className="text-white/90 mb-4 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Practica a tu ritmo y en tu espacio con nuestras clases grabadas de alta calidad.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative overflow-hidden group rounded-xl shadow-lg h-[400px]">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#A9BBA3]/90 z-10"></div>
                                <Image
                                    src="/focused-yoga-workshop.png"
                                    alt="Formaciones Pre-grabadas"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Formaciones Pre-grabadas
                                    </h3>
                                    <p className="text-white/90 mb-4 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Profundiza en tu práctica con nuestros cursos completos de formación a distancia.
                                    </p>
                                </div>
                            </div>

                            <div className="relative overflow-hidden group rounded-xl shadow-lg h-[400px]">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#B5A0CD]/90 z-10"></div>
                                <Image
                                    src="/sunlit-studio.png"
                                    alt="Workshops Especiales"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Workshops Especiales
                                    </h3>
                                    <p className="text-white/90 mb-4 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                        Eventos únicos para explorar aspectos específicos del yoga y expandir tu práctica.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <Link href="/formaciones" onClick={handleNavigation}>
                                <Button
                                    size="lg"
                                    className="bg-[#305891] hover:bg-[#3D6CAC] group px-8 transition-all duration-300 hover:scale-[1.03] shadow-md"
                                >
                                    <span>Ver propuestas</span>
                                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Nuestro Equipo */}
                <section
                    ref={equipoRef}
                    className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1] opacity-0 transition-all duration-700"
                >
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#305891] mb-4 text-center">Nuestro Equipo</h2>
                        <p className="text-lg text-center mb-16 max-w-3xl mx-auto font-light text-gray-700">
                            Conoce a los profesionales que guiarán tu práctica con experiencia, dedicación y pasión.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    name: "Ana García",
                                    role: "Hatha & Vinyasa Yoga",
                                    bio: "Con más de 10 años de experiencia, Ana combina la tradición del yoga con un enfoque moderno y accesible.",
                                    image: "/ana-garcia-yoga-instructor.png",
                                },
                                {
                                    name: "Carlos Mendoza",
                                    role: "Yoga Restaurativo",
                                    bio: "Especialista en técnicas de relajación profunda y yoga terapéutico para todos los niveles.",
                                    image: "/carlos-mendoza-restorative-yoga.png",
                                },
                                {
                                    name: "Laura Sánchez",
                                    role: "Ashtanga & Meditación",
                                    bio: "Formada en India, Laura trae la autenticidad de la práctica tradicional a cada una de sus clases.",
                                    image: "/laura-sanchez-meditation.png",
                                },
                                {
                                    name: "Miguel Torres",
                                    role: "Yoga para Deportistas",
                                    bio: "Ex atleta profesional que ha desarrollado métodos específicos para integrar el yoga en la rutina deportiva.",
                                    image: "/miguel-torres-sports-yoga.png",
                                },
                            ].map((teacher, index) => (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-500 hover:-translate-y-2 h-[400px]"
                                >
                                    <div className="relative h-full">
                                        <Image
                                            src={teacher.image || "/placeholder.svg"}
                                            alt={teacher.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                        <div className="absolute inset-0 bg-black/20"></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                            <h3 className="text-xl font-bold mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{teacher.name}</h3>
                                            <p className="text-sm text-white/80 mb-2 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                                                {teacher.role}
                                            </p>
                                            <p className="text-sm font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">{teacher.bio}</p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-white group-hover:opacity-0 transition-opacity duration-500">
                                        <h3 className="text-xl font-bold text-[#305891] mb-1">{teacher.name}</h3>
                                        <p className="text-sm text-[#826597] font-medium">{teacher.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Horarios Destacados */}
                <section ref={horariosRef} className="py-24 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#305891] mb-4 md:mb-0">Horarios Destacados</h2>
                            <div className="text-[#305891] flex items-center self-start md:self-auto">
                                <Calendar className="mr-2 h-5 w-5" />
                                Esta Semana
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    day: "Lunes",
                                    classes: [
                                        {
                                            time: "08:00 - 09:15",
                                            name: "Vinyasa Flow",
                                            teacher: "Ana García",
                                            level: "Todos los niveles",
                                        },
                                        {
                                            time: "18:30 - 19:45",
                                            name: "Hatha Yoga",
                                            teacher: "Carlos Mendoza",
                                            level: "Principiante",
                                        },
                                    ],
                                },
                                {
                                    day: "Miércoles",
                                    classes: [
                                        {
                                            time: "07:30 - 08:45",
                                            name: "Yoga Matutino",
                                            teacher: "Laura Sánchez",
                                            level: "Intermedio",
                                        },
                                        {
                                            time: "19:00 - 20:15",
                                            name: "Yoga Restaurativo",
                                            teacher: "Carlos Mendoza",
                                            level: "Todos los niveles",
                                        },
                                    ],
                                },
                                {
                                    day: "Viernes",
                                    classes: [
                                        {
                                            time: "08:00 - 09:15",
                                            name: "Ashtanga",
                                            teacher: "Laura Sánchez",
                                            level: "Avanzado",
                                        },
                                        {
                                            time: "17:30 - 18:45",
                                            name: "Yoga para Deportistas",
                                            teacher: "Miguel Torres",
                                            level: "Intermedio",
                                        },
                                    ],
                                },
                            ].map((day, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="bg-[#305891] text-white p-6">
                                        <h3 className="text-2xl font-bold">{day.day}</h3>
                                    </div>
                                    <div className="divide-y">
                                        {day.classes.map((yogaClass, idx) => (
                                            <div key={idx} className="p-6">
                                                <p className="text-sm font-medium text-[#826597]">{yogaClass.time}</p>
                                                <h4 className="text-xl font-bold text-[#305891] mt-1">{yogaClass.name}</h4>
                                                <p className="text-sm mt-1 font-light text-gray-700">
                                                    {yogaClass.teacher} • {yogaClass.level}
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="mt-3 text-[#305891] hover:text-[#3D6CAC] group p-0 h-auto transition-all duration-300"
                                                >
                                                    <span>Reservar</span>
                                                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Button
                                size="lg"
                                className="bg-[#305891] hover:bg-[#3D6CAC] group px-8 transition-all duration-300 hover:scale-[1.03] shadow-md"
                                onClick={() => setIsRegistroModalOpen(true)}
                            >
                                <span>Regístrate para ver toda la agenda</span>
                                <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Blog Preview */}
                <section
                    ref={blogRef}
                    className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1] opacity-0 transition-all duration-700"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#305891] mb-4 md:mb-0">Blog</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Yoga para Principiantes: Por Dónde Empezar",
                                    excerpt:
                                        "Guía completa para dar tus primeros pasos en el mundo del yoga de manera segura y efectiva.",
                                    date: "15 Abril, 2023",
                                    slug: "yoga-para-principiantes",
                                },
                                {
                                    title: "Beneficios del Yoga en Embarazadas",
                                    excerpt:
                                        "Descubre cómo el yoga puede ser tu mejor aliado durante el embarazo, beneficiando tanto a la madre como al bebé.",
                                    date: "28 Marzo, 2023",
                                    slug: "yoga-embarazadas",
                                },
                                {
                                    title: "Meditación: Guía Práctica para Integrarla en tu Día a Día",
                                    excerpt:
                                        "Técnicas sencillas para incorporar la meditación en tu rutina diaria y transformar tu bienestar mental.",
                                    date: "10 Marzo, 2023",
                                    slug: "meditacion-guia-practica",
                                },
                            ].map((post, index) => (
                                <Link key={index} href={`/blog/${post.slug}`} className="group" onClick={handleNavigation}>
                                    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full transform transition-all duration-500 group-hover:-translate-y-2">
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={`/abstract-geometric-shapes.png?height=400&width=600&query=${encodeURIComponent(post.title)}`}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/10"></div>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-sm text-[#826597] mb-2">{post.date}</p>
                                            <h3 className="text-xl font-bold text-[#305891] mb-3 group-hover:text-[#3D6CAC] transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm mb-4 font-light">{post.excerpt}</p>
                                            <div className="text-[#305891] group-hover:text-[#3D6CAC] transition-colors flex items-center text-sm font-medium">
                                                <span>Leer Más</span>
                                                <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link href="/blog" onClick={handleNavigation}>
                                <Button
                                    size="lg"
                                    className="bg-[#305891] hover:bg-[#3D6CAC] group px-8 transition-all duration-300 hover:scale-[1.03] shadow-md"
                                >
                                    <span>Visitar Blog</span>
                                    <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Nuestra Comunidad */}
                <section ref={comunidadRef} className="py-24 px-4 sm:px-6 lg:px-8 opacity-0 transition-all duration-700">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#305891] mb-4 text-center">Nuestra Comunidad</h2>
                        <p className="text-lg text-center mb-16 max-w-3xl mx-auto font-light text-gray-700">
                            Somos más que un estudio de yoga, somos una familia que crece y evoluciona junta.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                                    <Image
                                        src={`/yoga-community-practice.png?height=400&width=400&query=yoga community event with people practicing together ${index + 1}`}
                                        alt={`Comunidad Prana OM ${index + 1}`}
                                        fill
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/10"></div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            {[
                                {
                                    name: "María Rodríguez",
                                    testimonial:
                                        "Prana OM cambió mi vida. No solo mejoré físicamente, sino que encontré una comunidad que me apoya en mi crecimiento personal.",
                                },
                                {
                                    name: "Javier López",
                                    testimonial:
                                        "Como principiante, tenía miedo de no encajar, pero desde el primer día me sentí bienvenido. Los profesores son increíbles y pacientes.",
                                },
                                {
                                    name: "Elena Martínez",
                                    testimonial:
                                        "Después de probar varios estudios, finalmente encontré mi hogar en Prana OM. La calidad de las clases y el ambiente son incomparables.",
                                },
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                            <Image
                                                src={`/abstract-geometric-shapes.png?height=200&width=200&query=${encodeURIComponent(testimonial.name)} yoga student testimonial`}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#305891]">{testimonial.name}</h3>
                                            <p className="text-sm text-[#826597]">Miembro desde 2022</p>
                                        </div>
                                    </div>
                                    <p className="text-base italic font-light leading-relaxed text-gray-700">
                                        "{testimonial.testimonial}"
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <Button
                                size="lg"
                                className="bg-[#305891] hover:bg-[#3D6CAC] group px-8 transition-all duration-300 hover:scale-[1.03] shadow-md"
                                onClick={() => setIsRegistroModalOpen(true)}
                            >
                                <Users className="mr-2 h-5 w-5" />
                                <span>Registrarse es gratis</span>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* WhatsApp Button */}
                <WhatsappButton />
            </div>
            <SiteFooter />

            {/* Modal de registro */}
            <RegistroModal
                isOpen={isRegistroModalOpen}
                onClose={() => setIsRegistroModalOpen(false)}
                onSwitchToLogin={() => setIsLoginModalOpen(true)}
            />
        </>
    )
}
