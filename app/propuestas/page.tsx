"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function FormacionesPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentEventImageIndex, setCurrentEventImageIndex] = useState(0)

  // Imágenes para el loop del espacio
  const espacioImages = [
    "/espacio-prana-1.png",
    "/espacio-prana-2.png",
    "/espacio-prana-3.png",
    "/espacio-prana-4.png",
    "/espacio-prana-5.png",
  ]

  // Imágenes para el loop de eventos
  const eventoImages = ["/evento-retiro-1.png", "/evento-retiro-2.png", "/evento-retiro-3.png"]

  // Loop de imágenes del espacio (cada 3 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === espacioImages.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [espacioImages.length])

  // Loop de imágenes de eventos (cada 4 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventImageIndex((prevIndex) => (prevIndex === eventoImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [eventoImages.length])

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col min-h-screen">
        {/* Banner Principal */}
        <section className="relative w-full h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/bannerpropuestas.jpg"
              alt="Propuestas Prana OM"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Propuestas
            </h1>
            <p className="text-xl text-white font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              Transformá tu día a día a través de una <br />
              práctica de yoga que va con vos
            </p>
          </div>
        </section>

        {/* Nueva Sección: Nuestras Disciplinas */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1]">
          <div className="max-w-6xl mx-auto">
            {/* Título Principal */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-[#5862f0] mb-4 tracking-wide">
                Nuestras propuestas
              </h2>
              <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                Aquí el yoga deviene en una herramienta de conexión, crecimiento <br />y plenitud en la vida cotidiana.
              </p>
            </div>

            {/* Yoga General */}
            <div className="mb-20">
              <div className="border-l-2 border-[#5862f0] pl-8 mb-12">
                <h3 className="text-3xl font-light text-[#5862f0] mb-4">Yoga</h3>
                <p className="text-lg text-gray-700 font-light leading-relaxed">
                  Entendemos el yoga como un camino de escucha, de encuentro y de bienestar interno. <br /> Dentro de este camino infinitas formas de practicar y estilos.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {/* Hatha Yoga */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl font-medium text-[#5862f0] mb-3">Hatha Yoga</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Una invitación a conectar con tu cuerpo, emoción y respiración. Ofrecemos clases dinámicas, restaurativas o fusionadas con terapias sonoras y ejercicios funcionales.
                    </p>
                  </div>

                  <div className="space-y-3 pl-4 border-l border-gray-200">
                    <div>
                      <h5 className="font-medium text-[#5862f0]">Dinámico</h5>
                      <p className="text-sm text-gray-600">
                        Para yoguis y no tan yoguis que buscan un trabajo físico y mental desafiante.<br />
                        Secuencias activas que combinan Hatha Yoga y entrenamiento funcional.<br />
                        Mejora tu fuerza, movilidad, respiración y equilibrio<br />
                        con asanas dinámicas y movimiento consciente.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-[#5862f0]">Hatha + Funcional</h5>
                      <p className="text-sm text-gray-600">Estas clases combinan la fluidez del yoga con el entrenamiento funcional para potenciar tu fuerza, resistencia y equilibrio. A través del movimiento consciente y las asanas dinámicas, aprenderás a escuchar tu cuerpo, expandir tus límites de manera segura y mejorar tu bienestar integral. Ideal para quienes buscan una práctica desafiante y transformadora.</p>
                    </div>

                    <div>
                      <h5 className="font-medium text-[#5862f0]">Suave</h5>
                      <p className="text-sm text-gray-600">Avanzamos despacio para reconocer y respetar los límites del cuerpo, explorándolos con amor y gratitud. <br />
                        Se ofrecen alternativas y elementos para adaptar las posturas según las necesidades de cada persona.
                        No es una clase personalizada ni terapéutica, pero sí es un espacio personal, presente y consciente.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Yoga Aéreo */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl font-medium text-[#5862f0] mb-3">Yoga Aéreo</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Una práctica que combina la tradición del yoga con el sostén de una hamaca suspendida. El Yoga Aéreo permite trabajar fuerza, flexibilidad y alineación desde un enfoque lúdico y profundo. <br />
                      Al liberar la columna, invertir el cuerpo y desafiar el equilibrio, se estimulan tanto el sistema nervioso como la confianza personal.
                      Ideal para quienes buscan una experiencia diferente, con mayor conciencia corporal y liviandad mental.
                      No es necesario tener experiencia previa: la hamaca acompaña, sostiene y transforma.

                    </p>
                  </div>
                </div>

                {/* Ashtanga Vinyasa */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl font-medium text-[#5862f0] mb-3">Ashtanga Vinyasa</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Es una práctica de yoga dinámica, energética y profundamente transformadora.
                      <br />
                      A través de la repetición, la práctica constante y el conocimiento progresivo de sus series, se genera calor interno, silencio mental y una poderosa transformación, especialmente a nivel interior.
                      <br /><br />
                      Esta práctica integra desde el inicio diversos aspectos del yoga como los bandhas, drishti, mudras, meditación, pranayama y asanas, en una experiencia integral.
                      Su característica esencial es la respiración sincronizada con el movimiento, que da origen a las vinyasas: secuencias fluidas que enlazan cada postura y nos conducen a través de las series.
                      <br /><br />
                      En Ashtanga, la respiración es guía, ancla y generadora de Prana. Es ella la que marca el ritmo, sostiene el enfoque y expande la energía vital
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Línea Separadora */}
            <div className="w-24 h-px bg-gray-300 mx-auto mb-20"></div>

            {/* Talleres Especializados */}
            <div>
              <div className="border-l-2 border-[#5862f0] pl-8 mb-12">
                <h3 className="text-3xl font-light text-[#5862f0] mb-4">Propuestas Especializadas</h3>
                <p className="text-lg text-gray-700 font-light leading-relaxed">
                  Programas diseñados específicamente para diferentes etapas de la vida y necesidades particulares,
                  creando espacios seguros y adaptados para cada grupo.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {/* Mamás Embarazadas */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-medium text-[#5862f0]">Yoga y Mindfulness en la Infancia</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Descubrir una nueva conciencia de unidad comienza desde que somos pequeños y jóvenes. Nuestra misión brindar a través del Yoga y el Mindfulness la oportunidad de conocerse y reconocerse en la integridad que son.
                    <br /><br />
                    Esta propuesta integra yoga, juegos, atención plena, respiración consciente, vínculos afectivos y el manejo de las emociones. Herramientas que se convierten en pilares poderosos para el crecimiento y desarrollo integral del ser
                    <br /><br />
                    Un espacio para que los más pequeños crezcan desde la conexión, la autoestima y el disfrute.
                  </p>
                </div>

                {/* Niños */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-medium text-[#5862f0]">Yoga Prenatal</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Clases diseñadas para acompañar cada etapa del embarazo, favoreciendo el bienestar físico, mental y emocional de la futura mamá y su bebé.
                    Nuestras clases de yoga prenatal están cuidadosamente diseñadas para acompañarte en este momento tan especial de la vida. Durante el embarazo, el yoga se convierte en una herramienta valiosa para transitar cada etapa con mayor conciencia, serenidad y bienestar, tanto físico como emocional.
                    <br /><br />
                    Clases grupales, personalizadas, o grabadas a través del programas “Gestar”
                  </p>
                </div>

                {/* Adolescentes */}
                <div className="space-y-4">
                  <h4 className="text-2xl font-medium text-[#5862f0]">Yoga para Adolescentes</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Talleres diseñados para acompañar a los jóvenes en esta etapa de cambios, ofreciendo herramientas
                    para gestionar el estrés, mejorar la autoconfianza y desarrollar una relación saludable con su
                    cuerpo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clases Presenciales */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-6">Clases Presenciales</h2>
                <p className="text-lg font-light text-gray-700 leading-relaxed">
                  Hacer yoga de forma presencial es mucho más que tomar una clase. <br />
                  Es regalarte un tiempo real, en un espacio que invita a la presencia y a la conexión con vos misma/o. <br />
                  La energía grupal sostiene, inspira y acompaña. <br />
                  La práctica se vuelve más constante, profunda y comprometida cuando se comparte. <br /><br />
                  Prana nace en el año 2014 y desde 2018, contamos con un espacio /hogar propio: un lugar de encuentro, cuidado y transformación, acompañado por un equipo de profesionales apasionados que comparten una misma misión: ofrecer experiencias auténticas, conscientes y personalizadas.

                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/ppresencialess.JPG"
                  alt={`Espacio Prana OM ${currentImageIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Cursos On-Demand */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* <div className="relative h-80 rounded-xl overflow-hidden shadow-lg"> */}
              <div style={{ maxWidth: '300px', aspectRatio: '9 / 16', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                <iframe
                  className="w-full h-full object-cover"
                  src="https://www.youtube.com/embed/yiq27ofne3o?autoplay=0&controls=0&mute=0"
                  title="YouTube Short"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-6">Yoga On Demand</h2>
                <p className="text-lg font-light text-gray-700 leading-relaxed">
                  Tenemos cursos para todo; todos hechos con el propósito de que puedas mejorar tu estilo de vida, que
                  logres sentirte mejor y alcanzar un bienestar completo. Practica a tu ritmo, en tu espacio, con la
                  flexibilidad que necesitas para integrar el yoga en tu rutina diaria.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Eventos Exclusivos */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-6">Exclusivo Prana</h2>
                <p className="text-lg font-light text-gray-700 leading-relaxed">
                  Retiros, viajes y experiencias únicas
                  <br />
                  Cada 30, 60 o 90 días, desde Prana Om te invitamos a vivir espacios distintos: retiros, jornadas,  encuentros y Workshops especiales creados para salir de la rutina. <br />
                  Una experiencia íntima, transformadora y con el sello de Prana: conexión, propósito y presencia.

                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={"/evento-exclsv.jpg"}
                  alt={`Evento exclusivo ${currentEventImageIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Formaciones */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* <div className="relative h-80 rounded-xl overflow-hidden shadow-lg"> */}
              <div style={{ maxWidth: '300px', aspectRatio: '9 / 16', margin: '0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
                <iframe
                  className="w-full h-full object-cover"
                  src="https://www.youtube.com/embed/OIwYBP5LNiQ?autoplay=0&controls=0&mute=0"
                  title="YouTube Short"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-6">Formaciones</h2>
                <p className="text-lg font-light text-gray-700 leading-relaxed">
                  Conocer nuestras formaciones y capacitaciones, diseñadas para acompañarte en cada etapa de tu práctica y enseñanza.
                  Tanto en modalidad presencial como virtual, vas a acceder a nuestro campus online, donde encontrarás: <br />
                  <br />
                  * Material teórico completo
                  <br />
                  * Videos de práctica guiada
                  <br />
                  * Recursos exclusivos
                  <br />
                  * Espacios de intercambio con tus profes y compañeros
                  <br /> <br />
                  Una experiencia formativa integral, para crecer en comunidad, con acompañamiento real y herramientas que transforman.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
