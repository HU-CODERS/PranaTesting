"use client"

import { useState, useEffect } from "react"
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfesorDashboard() {
  const [profesorData, setProfessorData] = useState<any>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [particles, setParticles] = useState<Array<{
    width: number;
    height: number;
    background: string;
    boxShadow: string;
    left: string;
    top: string;
    animation: string;
    animationDelay: string;
  }>>([])

  useEffect(() => {
    // Generar partículas una sola vez en el cliente
    const generatedParticles = [...Array(40)].map((_, i) => {
      const width = Math.random() * 8 + 4;
      const height = Math.random() * 8 + 4;
      const opacity = Math.random() * 0.5 + 0.5;
      const glowSize = Math.random() * 20 + 10;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 10;
      
      return {
        width: width,
        height: height,
        background: `radial-gradient(circle, rgba(147, 197, 253, ${opacity}) 0%, rgba(147, 197, 253, 0) 70%)`,
        boxShadow: `0 0 ${glowSize}px rgba(147, 197, 253, 0.6)`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float-${i} ${duration}s infinite`,
        animationDelay: `${delay}s`
      };
    });
    
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    // Cargar datos del profesor desde localStorage
    try {
      const userProfile = localStorage.getItem("userProfile")
      if (userProfile && userProfile !== "undefined" && userProfile !== "null") {
        const parsedData = JSON.parse(userProfile)

        // Verificar que parsedData es un objeto válido
        if (parsedData && typeof parsedData === 'object') {
          const teacherData = parsedData.teacherProfile

          if (teacherData && typeof teacherData === 'object') {
            setProfessorData({
              firstName: teacherData.name || '',
              lastName: teacherData.lastname || '',
              biography: teacherData.biography || '',
              phone: teacherData.tel || '',
              picture: teacherData.picture || ''
            })
          }
        }
      }
    } catch (error) {
      console.error("Error al cargar perfil del profesor:", error)
      // Limpiar localStorage si está corrupto
      localStorage.removeItem("userProfile")
    }
  }, [])

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  // Preguntas frecuentes
  const preguntasFrecuentes = [
    {
      pregunta: "¿Cómo puedo agendar una clase?",
      respuesta: "En la seccion 'Semana de Clases' tenes un boton del lado superior derecho que dice 'Crear clase'. Rellená el formulario y tu clase ya estará disponible."
    },
    {
      pregunta: "¿Como veo los inscriptos a mis clases?",
      respuesta: "Cuando tenes una clase creada, en la seccion 'Semana de Clases', haces click en la clase que queres ver, en el boton 'Ver Detalles' y te va a aparecer un recuadro que incluye la informacion de los inscriptos."
    },
    {
      pregunta: "¿Cuándo recibo los pagos por mis clases?",
      respuesta: "Los pagos se procesan automáticamente después de cada clase completada y se transfieren a tu cuenta registrada dentro de 2-3 días hábiles."
    },
    {
      pregunta: "¿Por qué no me aparecen las clases de otros profesores?",
      respuesta: "Esa información solo esta disponible para estudiantes y administradores. Los profesores solo pueden ver y gestionar sus propias clases; para mayor comodidad con el uso de su propio panel."
    },
    {
      pregunta: "¿Como cambio mi contraseña?",
      respuesta: "En tu perfil, ve a la pestaña 'Seguridad', para poder cambiar tu contraseña. En caso de que la hayas olvidado, utiliza la opción 'Olvidé mi contraseña' en la página de inicio de sesión."
    },
    {
      pregunta: "¿Cómo contacto con el soporte técnico?",
      respuesta: "Puedes contactarnos a través del chat en vivo que se encuentra debajo de las preguntas frecuentes."
    }
  ]

  const obtenerSaludo = () => {
    const hora = new Date().getHours()
    if (hora < 12) return "Buenos días"
    if (hora < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header de bienvenida */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold">
                {obtenerSaludo()}, {profesorData?.firstName || "Profesor"}! 👋
              </h1>
              <p className="text-blue-100 text-sm md:text-base">
                Esperamos que tengas un excelente día enseñando y compartiendo tu conocimiento.
              </p>
            </div>
          </div>
        </div>

        {/* Preguntas frecuentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              Preguntas Frecuentes
            </CardTitle>
            <p className="text-sm text-gray-600">
              Encuentra respuestas rápidas a las consultas más comunes
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {preguntasFrecuentes.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{faq.pregunta}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.respuesta}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer de ayuda con partículas mágicas */}
        <Card className="bg-gray-800 text-white relative overflow-hidden">
          {/* Partículas mágicas flotantes - Solo se renderizan después de la hidratación */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  background: particle.background,
                  boxShadow: particle.boxShadow,
                  left: particle.left,
                  top: particle.top,
                  animation: particle.animation,
                  animationDelay: particle.animationDelay,
                }}
              />
            ))}
          </div>

          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-1">¿Necesitas ayuda adicional?</h3>
                <p className="text-gray-300 text-sm">
                  Nuestro equipo de soporte está aquí para ayudarte 24/7
                </p>
              </div>
              <div>
                <button
                  className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition hover:scale-105 transform duration-200'
                  onClick={() => {
                    window.open('https://api.whatsapp.com/send/?phone=%2B5491123951714&text="Hola, soy profesora de PRANA OM, necesito ayuda con respecto a mi panel de Profesor/a."&type=phone_number', '_blank');
                    return false;
                  }}
                >
                  Necesito Asistencia Tecnica
                </button>
              </div>
            </div>
          </CardContent>

          {/* Animaciones CSS dinámicas - Solo se generan después de la hidratación */}
          {particles.length > 0 && (
            <style jsx>{`
              ${particles.map((_, i) => `
                @keyframes float-${i} {
                  0% {
                    transform: translate(0, 0) scale(0);
                    opacity: 0;
                  }
                  ${10 + Math.random() * 10}% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1);
                    opacity: ${Math.random() * 0.7 + 0.3};
                  }
                  50% {
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${Math.random() * 0.5 + 0.8});
                    opacity: ${Math.random() * 0.5 + 0.2};
                  }
                  ${80 + Math.random() * 10}% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${Math.random() * 0.3 + 0.5});
                    opacity: ${Math.random() * 0.3 + 0.1};
                  }
                  100% {
                    transform: translate(0, 0) scale(0);
                    opacity: 0;
                  }
                }
              `).join('')}
            `}
          </style>
          )}
        </Card>
      </div>
    </div>
  )
}