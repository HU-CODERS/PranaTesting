"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, DollarSign, Star, Users, Video } from "lucide-react"

export default function Cursos() {
  const router = useRouter()
  const [filter, setFilter] = useState("todos")

  // Datos de ejemplo para los cursos
  const cursosData = [
    {
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
      categorias: [
        {
          id: 1,
          titulo: "Introducción al Yoga",
          descripcion: "Conceptos básicos y filosofía del yoga.",
          indices: [
            {
              id: 1,
              titulo: "¿Qué es el yoga?",
              descripcion: "Historia y filosofía del yoga.",
              duracion: "15 min",
            },
            {
              id: 2,
              titulo: "Beneficios del yoga",
              descripcion: "Cómo el yoga mejora tu salud física y mental.",
              duracion: "20 min",
            },
            {
              id: 3,
              titulo: "Equipamiento necesario",
              descripcion: "Todo lo que necesitas para comenzar tu práctica.",
              duracion: "10 min",
            },
          ],
        },
        {
          id: 2,
          titulo: "Posturas Básicas",
          descripcion: "Aprende las asanas fundamentales del yoga.",
          indices: [
            {
              id: 4,
              titulo: "Postura de la montaña",
              descripcion: "Base para todas las posturas de pie.",
              duracion: "15 min",
            },
            {
              id: 5,
              titulo: "Postura del perro boca abajo",
              descripcion: "Una de las posturas más importantes del yoga.",
              duracion: "20 min",
            },
            {
              id: 6,
              titulo: "Postura del guerrero",
              descripcion: "Serie de posturas para fortalecer piernas y core.",
              duracion: "25 min",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      titulo: "Yoga para la Flexibilidad",
      descripcion: "Mejora tu flexibilidad con secuencias específicas para cada parte del cuerpo.",
      instructor: "Carlos Mendoza",
      duracion: "6 horas",
      nivel: "Intermedio",
      precio: 69,
      estudiantes: 215,
      valoracion: 4.7,
      imagen: "/curso-flexibilidad.png",
      categoria: "flexibilidad",
      categorias: [
        {
          id: 3,
          titulo: "Flexibilidad de Columna",
          descripcion: "Secuencias para mejorar la movilidad de la columna vertebral.",
          indices: [
            {
              id: 7,
              titulo: "Flexiones hacia adelante",
              descripcion: "Posturas para estirar la parte posterior del cuerpo.",
              duracion: "20 min",
            },
            {
              id: 8,
              titulo: "Flexiones hacia atrás",
              descripcion: "Posturas para abrir el pecho y fortalecer la espalda.",
              duracion: "25 min",
            },
          ],
        },
        {
          id: 4,
          titulo: "Flexibilidad de Caderas",
          descripcion: "Secuencias para abrir las caderas y mejorar la movilidad.",
          indices: [
            {
              id: 9,
              titulo: "Posturas sentadas",
              descripcion: "Asanas para abrir las caderas desde posición sentada.",
              duracion: "20 min",
            },
            {
              id: 10,
              titulo: "Posturas de pie",
              descripcion: "Asanas para abrir las caderas desde posición de pie.",
              duracion: "20 min",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      titulo: "Meditación para Principiantes",
      descripcion: "Aprende a meditar desde cero con técnicas sencillas y efectivas.",
      instructor: "Laura Sánchez",
      duracion: "4 horas",
      nivel: "Principiante",
      precio: 49,
      estudiantes: 520,
      valoracion: 4.9,
      imagen: "/curso-meditacion.png",
      categoria: "meditacion",
      categorias: [
        {
          id: 5,
          titulo: "Fundamentos de la Meditación",
          descripcion: "Conceptos básicos y beneficios de la meditación.",
          indices: [
            {
              id: 11,
              titulo: "¿Qué es la meditación?",
              descripcion: "Introducción a la práctica meditativa.",
              duracion: "15 min",
            },
            {
              id: 12,
              titulo: "Beneficios científicos",
              descripcion: "Estudios que respaldan la práctica de la meditación.",
              duracion: "20 min",
            },
          ],
        },
        {
          id: 6,
          titulo: "Técnicas de Meditación",
          descripcion: "Diferentes métodos para meditar.",
          indices: [
            {
              id: 13,
              titulo: "Meditación con la respiración",
              descripcion: "Usando la respiración como ancla para la atención.",
              duracion: "15 min",
            },
            {
              id: 14,
              titulo: "Meditación de escaneo corporal",
              descripcion: "Técnica para relajar el cuerpo y la mente.",
              duracion: "20 min",
            },
            {
              id: 15,
              titulo: "Meditación de atención plena",
              descripcion: "Práctica de mindfulness en la vida cotidiana.",
              duracion: "25 min",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      titulo: "Yoga para la Fuerza",
      descripcion: "Desarrolla fuerza y resistencia con secuencias de yoga dinámicas.",
      instructor: "Miguel Torres",
      duracion: "7 horas",
      nivel: "Intermedio-Avanzado",
      precio: 89,
      estudiantes: 178,
      valoracion: 4.6,
      imagen: "/curso-yoga-fuerza.png",
      categoria: "fuerza",
      categorias: [
        {
          id: 7,
          titulo: "Fuerza de Core",
          descripcion: "Secuencias para fortalecer el centro del cuerpo.",
          indices: [
            {
              id: 16,
              titulo: "Activación del core",
              descripcion: "Ejercicios para activar los músculos abdominales profundos.",
              duracion: "20 min",
            },
            {
              id: 17,
              titulo: "Secuencia de planchas",
              descripcion: "Variaciones de planchas para fortalecer todo el cuerpo.",
              duracion: "25 min",
            },
          ],
        },
        {
          id: 8,
          titulo: "Fuerza de Brazos y Hombros",
          descripcion: "Secuencias para desarrollar fuerza en la parte superior del cuerpo.",
          indices: [
            {
              id: 18,
              titulo: "Posturas de equilibrio sobre manos",
              descripcion: "Progresiones para posturas avanzadas.",
              duracion: "30 min",
            },
            {
              id: 19,
              titulo: "Transiciones dinámicas",
              descripcion: "Vinyasas y transiciones que fortalecen brazos y hombros.",
              duracion: "25 min",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      titulo: "Pranayama: El Arte de la Respiración",
      descripcion: "Domina las técnicas de respiración yóguica para mejorar tu energía y concentración.",
      instructor: "Ana García",
      duracion: "5 horas",
      nivel: "Todos los niveles",
      precio: 59,
      estudiantes: 230,
      valoracion: 4.8,
      imagen: "/curso-pranayama.png",
      categoria: "respiracion",
      categorias: [
        {
          id: 9,
          titulo: "Fundamentos del Pranayama",
          descripcion: "Conceptos básicos de la respiración yóguica.",
          indices: [
            {
              id: 20,
              titulo: "Anatomía de la respiración",
              descripcion: "Cómo funciona la respiración a nivel fisiológico.",
              duracion: "20 min",
            },
            {
              id: 21,
              titulo: "Respiración completa yóguica",
              descripcion: "La base de todas las técnicas de pranayama.",
              duracion: "15 min",
            },
          ],
        },
        {
          id: 10,
          titulo: "Técnicas de Pranayama",
          descripcion: "Diferentes técnicas de respiración y sus beneficios.",
          indices: [
            {
              id: 22,
              titulo: "Ujjayi Pranayama",
              descripcion: "La respiración oceánica para calmar la mente.",
              duracion: "20 min",
            },
            {
              id: 23,
              titulo: "Nadi Shodhana",
              descripcion: "Respiración alterna por las fosas nasales para equilibrar.",
              duracion: "20 min",
            },
            {
              id: 24,
              titulo: "Kapalabhati",
              descripcion: "Respiración de fuego para energizar el cuerpo.",
              duracion: "15 min",
            },
          ],
        },
      ],
    },
    {
      id: 6,
      titulo: "Yoga para el Estrés y la Ansiedad",
      descripcion: "Secuencias y técnicas específicas para reducir el estrés y la ansiedad.",
      instructor: "Laura Sánchez",
      duracion: "6 horas",
      nivel: "Todos los niveles",
      precio: 69,
      estudiantes: 410,
      valoracion: 4.9,
      imagen: "/curso-yoga-estres.png",
      categoria: "bienestar",
      categorias: [
        {
          id: 11,
          titulo: "Comprendiendo el Estrés",
          descripcion: "Cómo el estrés afecta al cuerpo y la mente.",
          indices: [
            {
              id: 25,
              titulo: "Fisiología del estrés",
              descripcion: "Qué ocurre en tu cuerpo cuando estás estresado.",
              duracion: "20 min",
            },
            {
              id: 26,
              titulo: "Patrones de pensamiento",
              descripcion: "Identificar y cambiar patrones de pensamiento negativos.",
              duracion: "25 min",
            },
          ],
        },
        {
          id: 12,
          titulo: "Prácticas para la Calma",
          descripcion: "Secuencias y técnicas para reducir el estrés y la ansiedad.",
          indices: [
            {
              id: 27,
              titulo: "Secuencia calmante",
              descripcion: "Práctica suave para activar el sistema nervioso parasimpático.",
              duracion: "30 min",
            },
            {
              id: 28,
              titulo: "Yoga Nidra",
              descripcion: "Relajación profunda guiada para reducir el estrés.",
              duracion: "25 min",
            },
            {
              id: 29,
              titulo: "Meditaciones para la ansiedad",
              descripcion: "Prácticas específicas para momentos de ansiedad.",
              duracion: "20 min",
            },
          ],
        },
      ],
    },
  ]

  const filteredCursos =
    filter === "todos"
      ? cursosData
      : cursosData.filter((curso) => curso.categoria === filter || curso.nivel.toLowerCase().includes(filter))

  interface Indice {
    id: number
    titulo: string
    descripcion: string
    duracion: string
  }

  interface Categoria {
    id: number
    titulo: string
    descripcion: string
    indices: Indice[]
  }

  interface Curso {
    id: number
    titulo: string
    descripcion: string
    instructor: string
    duracion: string
    nivel: string
    precio: number
    estudiantes: number
    valoracion: number
    imagen: string
    categoria: string
    categorias: Categoria[]
  }

  const verDetalleCurso = (cursoId: number) => {
    router.push(`/usuario/ondemand/${cursoId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#305891]">Cursos Online</h1>
          <p className="text-gray-500">Aprende a tu ritmo con nuestros cursos en línea.</p>
        </div>
      </div>

      {/* Filtros */}
      <Tabs defaultValue="todos" value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-6">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="principiante">Principiantes</TabsTrigger>
          <TabsTrigger value="flexibilidad">Flexibilidad</TabsTrigger>
          <TabsTrigger value="fuerza">Fuerza</TabsTrigger>
          <TabsTrigger value="meditacion">Meditación</TabsTrigger>
          <TabsTrigger value="respiracion">Respiración</TabsTrigger>
          <TabsTrigger value="bienestar">Bienestar</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Lista de cursos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCursos.map((curso) => (
          <Card key={curso.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image
                src={curso.imagen || "/placeholder.svg"}
                alt={curso.titulo}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-[#305891]">{curso.nivel}</Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{curso.titulo}</CardTitle>
              <CardDescription>{curso.descripcion}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{curso.estudiantes} estudiantes</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{curso.duracion} de contenido</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>{curso.valoracion} (valoración)</span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{curso.categorias.length} módulos</span>
                </div>
                <div className="flex items-center text-sm">
                  <Video className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{curso.categorias.reduce((total, cat) => total + cat.indices.length, 0)} lecciones</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center border-t">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-[#305891]" />
                <span className="font-bold text-[#305891]">€{curso.precio}</span>
              </div>
              <Button onClick={() => verDetalleCurso(curso.id)} className="bg-[#305891] hover:bg-[#3D6CAC]">
                Ver detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
