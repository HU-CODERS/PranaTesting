"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import Image from 'next/image';

// Definir interfaces para tipado
interface MessageOption {
  text: string;
  action: string;
  emoji: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  type?: string;
  options?: MessageOption[] | null;
  timestamp: Date;
}

interface WelcomeSequenceItem {
  delay: number;
  text: string;
  type: string;
  options?: MessageOption[];
}

const YoguiBotDashboard: React.FC = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [userName] = useState<string>('Bruno');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasWelcomedRef = useRef(false);

  useEffect(() => {
    if (messages.length === 0) return;

    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100); // Le da un pelín de aire al render

    return () => clearTimeout(timeout);
  }, [messages]);

  useEffect(() => {
    if (hasWelcomedRef.current) return; // ✅ Previene ejecución duplicada
    hasWelcomedRef.current = true;

    const welcomeSequence: WelcomeSequenceItem[] = [
      { delay: 800, text: `✨ ¡Namaste, ${userName}! 🌞`, type: 'text' },
      {
        delay: 2000, text: `¿Qué necesitas hoy para nutrir tu alma?`, type: 'options', options: [
          { text: '🧘 Reservar una clase presencial', action: 'book-class', emoji: '🧘' },
          { text: '🎓 ¿Cuándo estarán los cursos On Demand?', action: 'on-demand', emoji: '🎓' },
          { text: '👤 Quiero editar mi perfil', action: 'edit-profile', emoji: '👤' },
          { text: '📊 Ver mis estadísticas de progreso', action: 'stats', emoji: '📊' },
          { text: '🌟 Sorpréndeme con algo especial', action: 'surprise', emoji: '🌟' }
        ]
      }
    ];

    welcomeSequence.forEach(({ delay, text, type, options }) => {
      setTimeout(() => {
        setIsTyping(true);
        addBotMessage(text, type, options || null);
      }, delay);
    });
  }, []);

  // ✅ Versión sin timeout interno
  const addBotMessage = (
    text: string,
    type: string = 'text',
    options: MessageOption[] | null = null
  ): void => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text,
        sender: 'bot',
        type,
        options,
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false); // Puedes manejar esto aparte si querés
  };


  const addUserMessage = (text: string): void => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const handleOptionClick = (option: MessageOption): void => {
    addUserMessage(option.text);

    setTimeout(() => {
      switch (option.action) {
        case 'book-class':
          addBotMessage(`¡Perfecto! 🙏 Me encanta verte tan comprometido con tu práctica.`);
          setTimeout(() => {
            addBotMessage(`¿Qué tipo de experiencia te llama hoy?`, 'options', [
              { text: '🌅 Yoga Matutino - Despertar con el sol (7:00 AM)', action: 'morning-yoga', emoji: '🌅' },
              { text: '🌙 Yoga Nocturno - Relajación profunda (7:30 PM)', action: 'evening-yoga', emoji: '🌙' },
              { text: '🔥 Vinyasa Flow - Energía en movimiento (6:00 PM)', action: 'vinyasa', emoji: '🔥' },
              { text: '🕯️ Yoga Restaurativo - Sanación interior (8:00 PM)', action: 'restorative', emoji: '🕯️' },
              { text: '🧘‍♀️ Meditación Guiada - Mindfulness (5:30 PM)', action: 'meditation-class', emoji: '🧘‍♀️' }
            ]);
          }, 2000);
          break;

        case 'on-demand':
          addBotMessage(`🎓 ¡Qué hermosa pregunta! Los cursos On Demand están muy cerca...`);
          setTimeout(() => {
            addBotMessage(`Estamos puliendo cada detalle para ofrecerte una experiencia transformadora. Te prometo que serán cursos únicos, diseñados con mucho amor 💝`);
          }, 2500);
          setTimeout(() => {
            addBotMessage(`¿Te gustaría que te notifique cuando estén listos?`, 'options', [
              { text: '✨ Sí, avísame en cuanto estén disponibles', action: 'notify-courses', emoji: '✨' },
              { text: '📧 Envíame info por email cuando lancen', action: 'email-notify', emoji: '📧' },
              { text: '🔙 Mejor volvamos al menú principal', action: 'back-menu', emoji: '🔙' }
            ]);
          }, 4800);
          break;

        case 'edit-profile':
          addBotMessage(`👤 ¡Claro! Es importante mantener tu perfil actualizado para personalizar tu experiencia.`);
          setTimeout(() => {
            addBotMessage(`¿Qué te gustaría actualizar?`, 'options', [
              { text: '📱 Cambiar mis datos de contacto', action: 'contact-info', emoji: '📱' },
              { text: '🎯 Actualizar mis objetivos de bienestar', action: 'wellness-goals', emoji: '🎯' },
              { text: '⏰ Modificar mis horarios preferidos', action: 'schedule-prefs', emoji: '⏰' },
              { text: '🏥 Actualizar condiciones médicas/lesiones', action: 'medical-info', emoji: '🏥' }
            ]);
          }, 2200);
          break;

        case 'stats':
          addBotMessage(`📊 ¡Me emociona compartir tu hermoso progreso contigo!`);
          setTimeout(() => {
            addBotMessage(`✨ **Tu Viaje de Bienestar**\n\n🏆 **12 clases** completadas este mes\n⏰ **18.5 horas** de práctica total\n🌟 **120 puntos** de fidelidad\n💪 **Progreso:** Mejora notable en flexibilidad\n🧘‍♂️ **Nivel:** Principiante en ascenso\n\n¡Estás floreciendo beautifully! 🌸`);
          }, 2000);
          setTimeout(() => {
            addBotMessage(`¿Te gustaría profundizar en algún aspecto específico?`, 'options', [
              { text: '📈 Ver mi progreso detallado mes a mes', action: 'detailed-progress', emoji: '📈' },
              { text: '🎯 Establecer nuevas metas', action: 'set-goals', emoji: '🎯' },
              { text: '🏆 Ver mis logros y reconocimientos', action: 'achievements', emoji: '🏆' }
            ]);
          }, 4500);
          break;

        case 'surprise':
          addBotMessage(`🌟 ¡Oooh, me encanta sorprender! Déjame sentir tu energía por un momento... ✨`);
          setTimeout(() => {
            addBotMessage(`🔮 Percibo que hoy necesitas algo especial. Según tu vibración y progreso reciente, creo que sería perfecto para ti:`);
          }, 3000);
          setTimeout(() => {
            addBotMessage(`**🕯️ Meditación de Gratitud Cósmica** - 15 minutos\n\nUna práctica que conecta tu corazón con la abundancia del universo. Te guiaré paso a paso hacia un estado de profunda paz interior 🌙`, 'options', [
              { text: '✨ Sí, vamos a meditar juntos', action: 'guided-meditation', emoji: '✨' },
              { text: '🤸‍♀️ Prefiero una rutina de yoga energizante', action: 'yoga-routine', emoji: '🤸‍♀️' },
              { text: '🌿 Dame otra recomendación personalizada', action: 'another-surprise', emoji: '🌿' }
            ]);
          }, 5500);
          break;

        case 'morning-yoga':
        case 'evening-yoga':
        case 'vinyasa':
        case 'restorative':
        case 'meditation-class':
          const classNames: Record<string, string> = {
            'morning-yoga': 'Yoga Matutino',
            'evening-yoga': 'Yoga Nocturno',
            'vinyasa': 'Vinyasa Flow',
            'restorative': 'Yoga Restaurativo',
            'meditation-class': 'Meditación Guiada'
          };
          addBotMessage(`🎉 ¡Maravilloso! Tu lugar en ${classNames[option.action]} está reservado.`);
          setTimeout(() => {
            addBotMessage(`📅 **Confirmación de Reserva**\n\n✅ Clase: ${classNames[option.action]}\n📍 Estudio principal\n⏰ Mañana\n🧘‍♀️ Instructor: Sarah\n\n*Recibirás confirmación por email en unos minutos*`);
          }, 2000);
          setTimeout(() => {
            addBotMessage(`🌟 **Tip espiritual**: Llega 10 minutos antes para preparar tu mente y corazón. La transformación comienza antes de que empiece la clase 💫`, 'options', [
              { text: '🙏 Gracias, estoy listo/a', action: 'ready', emoji: '🙏' },
              { text: '❓ ¿Qué debo traer a la clase?', action: 'what-to-bring', emoji: '❓' },
              { text: '📅 Reservar otra clase para la semana', action: 'book-another', emoji: '📅' }
            ]);
          }, 4500);
          break;

        case 'guided-meditation':
          addBotMessage(`🕯️ Perfecto... Vamos a crear juntos un momento sagrado.`);
          setTimeout(() => {
            addBotMessage(`**🌙 Meditación de Gratitud Cósmica**\n\n1. 🪑 Encuentra tu lugar sagrado y siéntate cómodamente\n2. 👁️ Cierra suavemente los ojos\n3. 🌬️ Inhala por 4 segundos... exhala por 6\n4. 💫 Visualiza una luz dorada envolviendo tu corazón\n\n¿Estás preparado/a para comenzar este viaje interior?`, 'options', [
              { text: '✨ Sí, comencemos la meditación', action: 'start-meditation', emoji: '✨' },
              { text: '⏰ Necesito unos minutos más para prepararme', action: 'wait-meditation', emoji: '⏰' }
            ]);
          }, 3000);
          break;

        case 'back-menu':
          addBotMessage(`🔙 Por supuesto, volvamos a las opciones principales.`);
          setTimeout(() => {
            addBotMessage(`¿En qué más puedo acompañarte hoy?`, 'options', [
              { text: '🧘 Reservar una clase presencial', action: 'book-class', emoji: '🧘' },
              { text: '👤 Editar mi perfil', action: 'edit-profile', emoji: '👤' },
              { text: '📊 Ver mis estadísticas', action: 'stats', emoji: '📊' },
              { text: '🌟 Sorpréndeme con algo especial', action: 'surprise', emoji: '🌟' }
            ]);
          }, 1500);
          break;

        default:
          addBotMessage(`🙏 Entiendo tu interés. Estoy aquí para apoyarte en lo que necesites. ¿Hay algo más en lo que pueda ayudarte hoy?`);
          break;
      }
    }, 800 + Math.random() * 400);
  };

  const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isBot = message.sender === 'bot';

    return (
      <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 sm:mb-6 animate-slideIn`}>
        <div className={`max-w-[90%] sm:max-w-[85%] lg:max-w-[70%] px-3 py-3 sm:px-5 sm:py-4 rounded-2xl sm:rounded-3xl shadow-lg relative ${isBot
          ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-50 text-gray-800 rounded-bl-md border border-blue-100'
          : 'bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-500 text-white rounded-br-md'
          }`}>

          {isBot && (
            <div className="flex items-center mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-400 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md">
                <Image
                  src="/yoguibot.png"
                  alt="Yogui Bot Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                  />
              </div>
              <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Yogui Bot
              </span>
            </div>
          )}

          <div className="whitespace-pre-line text-sm sm:text-[15px] leading-relaxed font-medium">
            {message.text}
          </div>

          {message.options && (
            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
              {message.options.map((option: MessageOption, index: number) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="group flex items-center w-full text-left px-3 py-2 sm:px-4 sm:py-3 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md border border-blue-200 hover:border-blue-300"
                >
                  <span className="text-base sm:text-lg mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {option.emoji}
                  </span>
                  <span className="text-gray-700 group-hover:text-gray-900 text-left">
                    {option.text.replace(option.emoji, '').trim()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const TypingIndicator: React.FC = () => (
    <div className="flex justify-start mb-4 sm:mb-6 animate-slideIn">
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-indigo-50 rounded-2xl sm:rounded-3xl rounded-bl-md px-3 py-3 sm:px-5 sm:py-4 shadow-lg border border-blue-100">
        <div className="flex items-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-400 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-md">
            <span className="text-white text-xs sm:text-sm">🧘‍♀️</span>
          </div>
          <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mr-3 sm:mr-4">
            Yogui Bot está meditando tu respuesta
          </span>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ overflow: "hidden" }} className="min-h-screen rgb(242 224 200 / var(--tw-bg-opacity, 1)) relative">
      {/* Elementos decorativos místicos de fondo */}

      <div className="w-full flex flex-col items-center mt-8 mb-6 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center">
          ¡Charla con Yogui Bot!
        </h1>
        <h2 className="text-base sm:text-lg text-blue-600 mt-1 text-center">
          Tu asistente personal de Yoga.
        </h2>
      </div>
      {/* Elementos decorativos místicos de fondo - más pequeños en mobile */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-r from-indigo-200 to-rose-200 rounded-full blur-2xl opacity-50"></div>
      </div>

      {/* Chat principal - usa scroll natural de la página */}
      <div className="relative z-10 px-3 py-4 sm:px-6 sm:py-8 overflow-hidden" style={{ overflow: "hidden" }}>

        <div className="max-w-4xl mx-auto">
          {messages.map((message: Message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>


      {/* Botón flotante responsivo para reiniciar */}
      {messages.length > 5 && (
        <button
          onClick={() => {
            setMessages([]);
            setTimeout(() => {
              addBotMessage(`✨ ¡Hola de nuevo, ${userName}! 🌞 ¿En qué más puedo acompañarte?`, 'options', [
                { text: '🧘 Reservar una clase presencial', action: 'book-class', emoji: '🧘' },
                { text: '🎓 Cursos On Demand', action: 'on-demand', emoji: '🎓' },
                { text: '👤 Mi perfil', action: 'edit-profile', emoji: '👤' },
                { text: '📊 Mis estadísticas', action: 'stats', emoji: '📊' },
                { text: '🌟 Sorpréndeme', action: 'surprise', emoji: '🌟' }
              ]);
            }, 1000);
          }}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 border-2 sm:border-4 border-white z-50"
        >
          <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
        
        /* Scrollbar personalizado para la página */
        ::-webkit-scrollbar {
          width: 0px;
          height: 0px;
          background: transparent; /* Oculta la barra de desplazamiento */
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 0px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #ec4899);
          border-radius: 0px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #db2777);
        }
      `}</style>
    </div>
  );
};

export default YoguiBotDashboard;