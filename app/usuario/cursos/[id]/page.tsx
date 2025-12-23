"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Clock, Users, Star, BookOpen, Video, CheckCircle, Lock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/use-media-query"

// Datos de ejemplo del curso
const cursoData = {
  id: 1,
  titulo: "Fundamentos de Yoga",
  descripcion: "Aprende las bases del yoga desde cero con este curso completo para principiantes.",
  instructor: "Ana García",
  duracion: "8 horas",
  nivel: "Principiante",
  precio: 79,
  estudiantes: 342,
  valoracion: 4.8,
  imagen: "/curso-fundamentos-yoga.png",
  categoria: "principiantes",
  introduccion:
    "Este curso está diseñado para introducirte al maravilloso mundo del yoga. Aprenderás desde los conceptos más básicos hasta posturas fundamentales que te permitirán desarrollar una práctica sólida y segura.",
  objetivos: [
    "Comprender los principios fundamentales del yoga",
    "Dominar las posturas básicas (asanas)",
    "Aprender técnicas de respiración (pranayama)",
    "Desarrollar una práctica personal consistente",
    "Mejorar la flexibilidad y fuerza corporal",
  ],
  requisitos: [
    "No se requiere experiencia previa",
    "Mat de yoga (recomendado)",
    "Ropa cómoda para practicar",
    "Mente abierta y ganas de aprender",
  ],
  categorias: [
    {
      id: 1,
      titulo: "Introducción al Yoga",
      descripcion: "Conceptos básicos y filosofía del yoga.",
      duracionTotal: "45 min",
      indices: [
        {
          id: 1,
          titulo: "¿Qué es el yoga?",
          descripcion: "Historia y filosofía del yoga.",
          duracion: "15 min",
          completado: true,
          tipo: "video",
        },
        {
          id: 2,
          titulo: "Beneficios del yoga",
          descripcion: "Cómo el yoga mejora tu salud física y mental.",
          duracion: "20 min",
          completado: true,
          tipo: "video",
        },
        {
          id: 3,
          titulo: "Equipamiento necesario",
          descripcion: "Todo lo que necesitas para comenzar tu práctica.",
          duracion: "10 min",
          completado: false,
          tipo: "lectura",
        },
      ],
    },
    {
      id: 2,
      titulo: "Posturas Básicas",
      descripcion: "Aprende las asanas fundamentales del yoga.",
      duracionTotal: "60 min",
      indices: [
        {
          id: 4,
          titulo: "Postura de la montaña",
          descripcion: "Base para todas las posturas de pie.",
          duracion: "15 min",
          completado: false,
          tipo: "video",
        },
        {
          id: 5,
          titulo: "Postura del perro boca abajo",
          descripcion: "Una de las posturas más importantes del yoga.",
          duracion: "20 min",
          completado: false,
          tipo: "video",
        },
        {
          id: 6,
          titulo: "Postura del guerrero",
          descripcion: "Serie de posturas para fortalecer piernas y core.",
          duracion: "25 min",
          completado: false,
          tipo: "video",
        },
      ],
    },
    {
      id: 3,
      titulo: "Respiración y Meditación",
      descripcion: "Técnicas de pranayama y meditación básica.",
      duracionTotal: "40 min",
      indices: [
        {
          id: 7,
          titulo: "Respiración completa",
          descripcion: "La base de todas las técnicas de respiración.",
          duracion: "15 min",
          completado: false,
          tipo: "video",
        },
        {
          id: 8,
          titulo: "Meditación guiada",
          descripcion: "Introducción a la práctica meditativa.",
          duracion: "25 min",
          completado: false,
          tipo: "audio",
        },
      ],
    },
  ],
}

export default function CursoDetallePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false) // Simulamos si el usuario está inscrito o no
  const [columnas, setColumnas] = useState(1)

  useEffect(() => {
    // Determinar si el curso está reservado basado en el ID
    // Esto es solo para simulación, en una app real vendría de una API
    setIsEnrolled(params.id === "4")

    // Ajustar el número de columnas basado en el tamaño de la pantalla
    setColumnas(isDesktop ? 2 : 1)
  }, [params.id, isDesktop])

  const totalLecciones = cursoData.categorias.reduce((total, cat) => total + cat.indices.length, 0)
  const leccionesCompletadas = cursoData.categorias.reduce(
    (total, cat) => total + cat.indices.filter((indice) => indice.completado).length,
    0,
  )
  const progreso = Math.round((leccionesCompletadas / totalLecciones) * 100)

  const handleReservar = () => {
    setShowPaymentModal(true)
    // Simular redirección después de 2 segundos
    setTimeout(() => {
      window.location.href = "https://uala.com.ar/payment"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header del curso */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Badge className="mb-2">{cursoData.nivel}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{cursoData.titulo}</h1>
              <p className="text-gray-600 mb-6">{cursoData.introduccion}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{cursoData.estudiantes} estudiantes</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{cursoData.duracion} de contenido</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-500 mr-2" />
                  <span>{cursoData.valoracion} valoración</span>
                </div>
                <div className="flex items-center text-sm">
                  <Video className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{totalLecciones} lecciones</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-[#305891]">€{cursoData.precio}</div>
                {!isEnrolled ? (
                  <Button onClick={handleReservar} size="lg" className="bg-[#305891] hover:bg-[#264a77]">
                    Reservar Curso
                  </Button>
                ) : (
                  <Button disabled size="lg" className="bg-green-100 text-green-800 hover:bg-green-100 cursor-default">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    CURSO RESERVADO
                  </Button>
                )}
              </div>
            </div>

            <div className="relative h-64 md:h-auto">
              <Image
                src={cursoData.imagen || "/placeholder.svg"}
                alt={cursoData.titulo}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido del curso */}
      <div className="container mx-auto px-6 py-8">
        <div className={`grid ${isDesktop ? "md:grid-cols-2" : ""} gap-8`}>
          {/* Columna principal */}
          <div className="space-y-8">
            {/* Objetivos del curso */}
            <Card>
              <CardHeader>
                <CardTitle>Lo que aprenderás</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cursoData.objetivos.map((objetivo, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{objetivo}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contenido del curso */}
            <Card>
              <CardHeader>
                <CardTitle>Contenido del curso</CardTitle>
                <CardDescription>
                  {cursoData.categorias.length} módulos • {totalLecciones} lecciones • {cursoData.duracion}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {cursoData.categorias.map((categoria) => (
                    <AccordionItem key={categoria.id} value={`categoria-${categoria.id}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex justify-between items-center w-full pr-4">
                          <div className="text-left">
                            <h3 className="font-medium">{categoria.titulo}</h3>
                            <p className="text-sm text-gray-600">{categoria.descripcion}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {categoria.indices.filter((i) => i.completado).length}/{categoria.indices.length} •{" "}
                            {categoria.duracionTotal}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          {categoria.indices.map((indice) => (
                            <div
                              key={indice.id}
                              className={`flex items-center justify-between p-3 rounded-lg border ${
                                indice.completado ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {indice.completado ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : isEnrolled ? (
                                  <Play className="h-5 w-5 text-[#305891]" />
                                ) : (
                                  <Lock className="h-5 w-5 text-gray-400" />
                                )}
                                <div>
                                  <h4 className="font-medium">{indice.titulo}</h4>
                                  <p className="text-sm text-gray-600">{indice.descripcion}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {indice.tipo === "video" && <Video className="h-4 w-4 text-gray-500" />}
                                {indice.tipo === "lectura" && <BookOpen className="h-4 w-4 text-gray-500" />}
                                <span className="text-sm text-gray-500">{indice.duracion}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Requisitos */}
            <Card>
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {cursoData.requisitos.map((requisito, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#305891] mr-2">•</span>
                      <span className="text-sm">{requisito}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Tu instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-8 w-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{cursoData.instructor}</h3>
                    <p className="text-sm text-gray-600">Instructor de Yoga</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progreso del curso (si está inscrito) */}
            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle>Tu progreso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completado</span>
                      <span className="font-medium">{progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#305891] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progreso}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {leccionesCompletadas} de {totalLecciones} lecciones completadas
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modal de pago */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Procesando pago</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#305891] mb-4"></div>
            <p className="text-center text-gray-600">Enviándote a UALA para completar el pago...</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
