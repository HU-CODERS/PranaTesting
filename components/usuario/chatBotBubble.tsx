"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Flower, BotIcon } from "lucide-react"

type Message = {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  options?: string[]
}

type ChatOption = {
  label: string
  value: string
  response: string
  followUpOptions?: string[]
}

const chatOptions: Record<string, ChatOption> = {
  inicio: {
    label: "Inicio",
    value: "inicio",
    response: "¡Hola! 👋 Soy el asistente virtual de Prana. ¿En qué puedo ayudarte hoy?",
    followUpOptions: ["horarios", "precios", "tipos_clases", "reservar", "contacto"]
  },
  horarios: {
    label: "📅 Horarios",
    value: "horarios",
    response: "Nuestras clases están disponibles de Lunes a Sábado:\n\n• Lunes a Viernes: 7:00 AM - 9:00 PM\n• Sábados: 8:00 AM - 6:00 PM\n\nPuedes ver el cronograma completo en la sección 'Asistí al Espacio'.",
    followUpOptions: ["reservar", "tipos_clases", "inicio"]
  },
  precios: {
    label: "💳 Planes",
    value: "precios",
    response: "Tenemos varios abonos para que elijas el que mejor se adapte a tu práctica:\n\n✨ Abonos Regulares\n• Planes desde 4 hasta 12 clases mensuales\n• Acceso a diferentes tipos de yoga\n\n🎓 Formación de Profesores\n• Programas especializados\n• Certificación incluida\n\n¿Te gustaría ver todos nuestros planes?",
    followUpOptions: ["ver_planes", "tipos_clases", "inicio"]
  },
  tipos_clases: {
    label: "🧘 Tipos de clases",
    value: "tipos_clases",
    response: "En Prana ofrecemos diferentes estilos de yoga:\n\n💙 Hatha Yoga\nPerfecto para principiantes, enfocado en posturas básicas y respiración.\n\n⚡ Ashtanga Yoga\nMás dinámico y exigente, ideal para quienes buscan un reto físico.\n\n🌬️ Yoga Aéreo\nUna experiencia única usando hamacas, combina fuerza y flexibilidad.\n\n¿Cuál te gustaría probar?",
    followUpOptions: ["reservar", "precios", "inicio"]
  },
  reservar: {
    label: "✨ Reservar",
    value: "reservar",
    response: "¡Genial! Para reservar una clase:\n\n1. Ve a la sección 'Asistí al Espacio'\n2. Selecciona el día que prefieras\n3. Elige la clase que más te guste\n4. ¡Confirma tu reserva!\n\nSi aún no tienes un abono activo, puedes adquirir uno en la sección 'Abonos'.",
    followUpOptions: ["ver_planes", "horarios", "inicio"]
  },
  contacto: {
    label: "📞 Contacto",
    value: "contacto",
    response: "Puedes contactarnos por:\n\n📧 Email: info@pranayoga.com\n📱 WhatsApp: +54 9 11 1234-5678\n📍 Dirección: Carilló, Buenos Aires\n\nEstamos disponibles de Lunes a Sábado de 9:00 AM a 7:00 PM.",
    followUpOptions: ["horarios", "inicio"]
  },
  ver_planes: {
    label: "Ver planes",
    value: "ver_planes",
    response: "Te invito a ver todos nuestros planes en la sección 'Abonos'. Allí encontrarás opciones para todos los niveles y frecuencias de práctica. ¿Te gustaría saber algo más?",
    followUpOptions: ["horarios", "tipos_clases", "inicio"]
  }
}

export default function ChatbotFlotante() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [hasNewMessage, setHasNewMessage] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Mensaje de bienvenida inicial
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: chatOptions.inicio.response,
        isBot: true,
        timestamp: new Date(),
        options: chatOptions.inicio.followUpOptions
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const handleOptionClick = (optionValue: string) => {
    const option = chatOptions[optionValue]
    if (!option) return

    // Mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option.label,
      isBot: false,
      timestamp: new Date()
    }

    // LIMPIAR mensajes anteriores y solo mantener el nuevo
    setMessages([userMessage])
    setIsTyping(true)

    // Simular typing y respuesta del bot
    setTimeout(() => {
      setIsTyping(false)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: option.response,
        isBot: true,
        timestamp: new Date(),
        options: option.followUpOptions
      }
      // Solo mantener el mensaje del usuario y la respuesta del bot
      setMessages([userMessage, botMessage])
      
      // Si el chat está cerrado, mostrar notificación
      if (!isOpen) {
        setHasNewMessage(true)
      }
    }, 1000)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setHasNewMessage(false)
    }
  }

  return (
    <>
      {/* Overlay para mobile cuando el chat está abierto */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleChat}
        />
      )}

      {/* Burbuja flotante */}
      <button
        onClick={toggleChat}
        className={`
          fixed bottom-20 right-5 z-50
          w-16 h-16 rounded-full
          bg-gradient-to-r from-blue-500 to-blue-900
          text-white shadow-2xl
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110 hover:shadow-3xl
          ${isOpen ? 'rotate-0' : 'rotate-0 hover:rotate-12'}
        `}
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <>
          <BotIcon className="h-7 w-7" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </>
        )}
      </button>

      {/* Panel de chat - Dimensiones fijas con scroll interno */}
      <div
        className={`
          fixed z-40
          transition-all duration-300 ease-in-out
          
          /* Posición esquina inferior derecha */
          bottom-40 right-5
          
          ${isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
          }
        `}
        style={{ width: '375px' }}
      >
        <div 
          className="bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col h-[500px] max-h-[calc(100vh-10rem)] overflow-hidden"
          style={{ width: '375px' }}
        >
          {/* Header del chat */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center gap-3 flex-shrink-0" style={{ width: '375px' }}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Flower className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-base truncate">Asistente Prana</h3>
              <p className="text-white/80 text-xs truncate">Siempre disponible</p>
            </div>
            <button
              onClick={toggleChat}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Cerrar</span>
            </button>
          </div>

          {/* Mensajes - CON SCROLL INTERNO INDEPENDIENTE */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-slate-50 to-blue-50">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`
                    flex gap-2
                    ${message.isBot ? 'justify-start' : 'justify-end'}
                  `}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Flower className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`
                      max-w-[75%] rounded-2xl px-4 py-3 shadow-sm
                      ${message.isBot 
                        ? 'bg-white text-gray-800 rounded-tl-none' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none'
                      }
                    `}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {message.text}
                    </p>
                    <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-400' : 'text-white/60'}`}>
                      {message.timestamp.toLocaleTimeString('es-AR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>

                {/* Opciones de respuesta rápida */}
                {message.isBot && message.options && (
                  <div className="ml-10 mt-3 flex flex-wrap gap-2">
                    {message.options.map((optionValue) => {
                      const option = chatOptions[optionValue]
                      return (
                        <button
                          key={optionValue}
                          onClick={() => handleOptionClick(optionValue)}
                          className="
                            px-4 py-2 rounded-full text-sm font-medium
                            bg-white border-2 border-indigo-200
                            text-indigo-700 hover:bg-indigo-50
                            transition-all duration-200
                            active:scale-95 hover:scale-105 hover:border-indigo-300
                            shadow-sm hover:shadow-md
                          "
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Indicador de typing */}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Flower className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  )
}