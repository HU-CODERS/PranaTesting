"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react"

export default function Eventos() {
  const [filter, setFilter] = useState("todos")

  // Datos de ejemplo para los eventos
  const eventosData: any[] = [
  ]

  interface Evento {
    id: number
    titulo: string
    descripcion: string
    instructor: string
    fecha: string
    horario: string
    ubicacion: string
    modalidad: "presencial" | "virtual"
    precio: number
    cupos: number
    disponibles: number
    imagen: string
    categoria: string
  }

  const handleReservar = (evento: Evento): void => {
    alert(`Has reservado tu plaza para "${evento.titulo}". Se te cobrará €${evento.precio}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#305891]">Eventos</h1>
          <p className="text-gray-500">Workshops, retiros y actividades especiales.</p>
        </div>
      </div>

      {/* Filtros */}

      {/* Lista de eventos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {eventosData?.map((evento) => (
          <Card key={evento.id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48 w-full">
              <Image
                src={evento.imagen || "/placeholder.svg"}
                alt={evento.titulo}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute top-2 right-2">
                <Badge className={evento.modalidad === "presencial" ? "bg-[#305891]" : "bg-purple-600"}>
                  {evento.modalidad === "presencial" ? "Presencial" : "Virtual"}
                </Badge>
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant="outline" className="bg-white/80 text-black border-0">
                  {evento.categoria.charAt(0).toUpperCase() + evento.categoria.slice(1)}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{evento.titulo}</CardTitle>
              <CardDescription>{evento.descripcion}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{evento.fecha}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{evento.horario}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{evento.ubicacion}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <span>
                    {evento.disponibles} plazas disponibles de {evento.cupos}
                  </span>
                </div>
                <div className="flex items-center text-sm font-medium">
                  <span>Instructor: {evento.instructor}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between items-center border-t">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-[#305891]" />
                <span className="font-bold text-[#305891]">€{evento.precio}</span>
              </div>
              <Button
                onClick={() => handleReservar(evento)}
                className="bg-[#305891] hover:bg-[#3D6CAC]"
                disabled={evento.disponibles === 0}
              >
                {evento.disponibles === 0 ? "Sin plazas" : "Reservar plaza"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
