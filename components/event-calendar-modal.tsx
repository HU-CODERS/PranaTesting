"use client"

import { useState } from "react"
import { X, Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  type: string
}

interface EventCalendarModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EventCalendarModal({ isOpen, onClose }: EventCalendarModalProps) {
  const [activeMonth, setActiveMonth] = useState("Mayo 2023")

  // Datos de ejemplo
  const events: Event[] = [
    {
      id: 1,
      title: "Círculo de Práctica Comunitaria",
      date: "4 Mayo, 2023",
      time: "18:00 - 19:30",
      location: "Sala Principal",
      description:
        "Sesión gratuita donde los miembros comparten su práctica y aprenden unos de otros en un ambiente relajado y colaborativo.",
      type: "Comunidad",
    },
    {
      id: 2,
      title: "Meditación Grupal",
      date: "10 Mayo, 2023",
      time: "20:00 - 21:00",
      location: "Sala de Meditación",
      description:
        "Experiencia de meditación guiada en grupo para potenciar la energía colectiva y profundizar en la práctica meditativa.",
      type: "Meditación",
    },
    {
      id: 3,
      title: "Celebración de Luna Llena",
      date: "15 Mayo, 2023",
      time: "19:30 - 21:30",
      location: "Terraza",
      description:
        "Práctica especial y ritual para conectar con la energía de la luna llena. Incluye meditación, mantras y compartir comunitario.",
      type: "Especial",
    },
    {
      id: 4,
      title: "Círculo de Práctica Comunitaria",
      date: "18 Mayo, 2023",
      time: "18:00 - 19:30",
      location: "Sala Principal",
      description:
        "Sesión gratuita donde los miembros comparten su práctica y aprenden unos de otros en un ambiente relajado y colaborativo.",
      type: "Comunidad",
    },
    {
      id: 5,
      title: "Meditación Grupal",
      date: "24 Mayo, 2023",
      time: "20:00 - 21:00",
      location: "Sala de Meditación",
      description:
        "Experiencia de meditación guiada en grupo para potenciar la energía colectiva y profundizar en la práctica meditativa.",
      type: "Meditación",
    },
    {
      id: 6,
      title: "Retiro de Fin de Semana",
      date: "27-28 Mayo, 2023",
      time: "Todo el día",
      location: "Sierra de los Padres",
      description:
        "Escapada a la naturaleza para desconectar, profundizar en la práctica y fortalecer los lazos comunitarios en un entorno natural.",
      type: "Retiro",
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl h-[80vh] rounded-lg bg-white shadow-lg flex flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-2xl font-bold text-[#305891]">Calendario de Eventos</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b">
          <button className="px-4 py-2 font-medium text-[#305891] border-b-2 border-[#305891]">{activeMonth}</button>
          <button className="px-4 py-2 font-medium text-gray-500 hover:text-[#305891]">Junio 2023</button>
          <button className="px-4 py-2 font-medium text-gray-500 hover:text-[#305891]">Julio 2023</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-[#F6F4F1] rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 ${
                        event.type === "Comunidad"
                          ? "bg-[#A9BBA3]/20 text-[#A9BBA3]"
                          : event.type === "Meditación"
                            ? "bg-[#826597]/20 text-[#826597]"
                            : event.type === "Especial"
                              ? "bg-[#B5A0CD]/20 text-[#B5A0CD]"
                              : "bg-[#305891]/20 text-[#305891]"
                      }`}
                    >
                      {event.type}
                    </span>
                    <h3 className="text-lg font-bold text-[#305891]">{event.title}</h3>
                  </div>
                  <Button size="sm" className="mt-2 md:mt-0 bg-[#305891] hover:bg-[#3D6CAC]">
                    Inscribirme
                  </Button>
                </div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-[#826597]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-[#826597]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-[#826597]" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
