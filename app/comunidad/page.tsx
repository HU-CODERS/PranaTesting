"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function ComunidadPage() {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-col min-h-screen">
        {/* Banner Principal */}
        <section className="relative w-full h-[50vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/parsvakonasana.jpg"
              alt="Comunidad Prana OM"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Somos Comunidad</h1>
            <p className="text-xl text-white font-light">Más que Yoga, Somos una Familia</p>
          </div>
        </section>

        {/* Nuestra Filosofía */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-6">Nuestra Filosofía</h2>
                <p className="text-lg mb-6 font-light leading-relaxed">
                  En Prana Om Yoga creemos en un yoga real, accesible y transformador.
                  No se trata solo de posturas: es un camino de autoconocimiento que se vive dentro y fuera del mat, en cada gesto, decisión y momento cotidiano
                </p>
                <p className="text-lg mb-6 font-light leading-relaxed">
                  Nuestro propósito es acompañarte para que puedas explorar tu práctica, conectar con vos mismo y alcanzar mayor plenitud en tu vida diaria
                </p>
                <p className="text-lg mb-8 font-light leading-relaxed">
                  Creamos una comunidad basada en el respeto, la inclusión y el acompañamiento. Un espacio donde cada persona puede ser auténtica, compartir su experiencia y crecer a su propio ritmo, en cuerpo, mente y espíritu.
                </p>
                <div className="flex flex-wrap gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#A9BBA3] flex items-center justify-center">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">Diversidad & Personalización</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#826597] flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium">Enfoque Integral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#B5A0CD] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-white"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="m7 10 5 5 5-5" />
                      </svg>
                    </div>
                    <span className="font-medium">Yoga para la vida</span>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image src="/ourfilosofy.jpg" alt="Comunidad Prana OM" fill className="object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F6F4F1]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-6 text-center">Testimonios</h2>
            <p className="text-lg text-center mb-16 max-w-3xl mx-auto font-light">
              Conoce las experiencias de quienes ya forman parte de nuestra comunidad.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Lorena",
                  testimonial:
                    "Romi, estoy eternamente agradecida. Tu manera de enseñar me ayudó a entender que el yoga va más allá de la práctica, es un camino hacia adentro, hacia el corazón... un hermoso viaje de ida.",
                  image: "/testimonials/community/Lore.jpeg",
                },
                {
                  name: "Claudia",
                  testimonial:
                    "Como alumna, siento que encontré un lugar donde puedo soltar, recargarme y crecer tanto física como emocionalmente. Recomiendo Prana para prácticas y formación, para quienes estén buscando un espacio de yoga auténtico, humano y lleno de energía positiva. Gracias, Prana ✨️",
                  image: "/testimonials/community/ClauI.jpeg",
                },
                {
                  name: "Marisa",
                  testimonial:
                    "¡Cuando la práctica la llevás con vos a todas partes! Pero sabés que tu espacio lo tenés en Prana Om Yoga 🙌🧘‍♀️❤️🙏",
                  image: "/testimonials/community/Marisa.jpeg",
                },
                {
                  name: "Brenda",
                  testimonial:
                    "Hace cuatro meses empecé Ashtanga con Romi, y la verdad, la elasticidad, la fuerza, la estabilidad y el equilibrio que gané son increíbles. Pero por sobre todo: la conexión cuerpo, mente y alma. Todo con total respeto y cuidado de mi propio cuerpo. Súper agradecida 🩷",
                  image: "/testimonials/community/Brenda.jpeg",
                },
                {
                  name: "Patricia",
                  testimonial:
                    "Prana Yoga 🧘. Un espacio donde puedo ser coherente con mi pensar, mi sentir y mi proceder. ¡¡¡Gracias a Romina, su directora, y a todas las hermosas profesoras que forman este espacio!!! 🙌  ¡Un lugar especial que me hace feliz! 🥰",
                  image: "/testimonials/community/Patricia.jpeg",
                },
                {
                  name: "Fabián",
                  testimonial:
                    "En Prana encontré un lugar muy propicio para la conexión entre cuerpo y mente... Muy útil para aumentar y equilibrar la energía en mi vida 💪🙏✨",
                  image: "/testimonials/community/Fabian.jpeg",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg transform transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#5862f0]">{testimonial.name}</h3>
                    </div>
                  </div>
                  <p className="text-base italic font-light leading-relaxed">"{testimonial.testimonial}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Galería */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5862f0] mb-6 text-center">Galería</h2>
            <p className="text-lg text-center mb-16 max-w-3xl mx-auto font-light">
              Momentos especiales compartidos en nuestra comunidad.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  photo: "/gallery/1.jpg",
                  alt: "Imagen comunidad 1"
                },
                {
                  photo: "/gallery/2.jpg",
                  alt: "Imagen comunidad 2"
                },
                {
                  photo: "/gallery/3.jpg",
                  alt: "Imagen comunidad 3"
                },
                {
                  photo: "/gallery/4.JPG",
                  alt: "Imagen comunidad 4"
                },
                {
                  photo: "/gallery/5.jpg",
                  alt: "Imagen comunidad 5"
                },
                {
                  photo: "/gallery/6.jpg",
                  alt: "Imagen comunidad 6"
                },
                {
                  photo: "/gallery/7.jpg",
                  alt: "Imagen comunidad 7"
                },
                {
                  photo: "/gallery/8.jpg",
                  alt: "Imagen comunidad 8"
                },
              ].map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-md group cursor-pointer"
                >
                  <Image
                    src={img.photo}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Únete */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#5862f0] rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 text-white">
                  <h2 className="text-3xl font-bold mb-6">Únete a Nuestra Comunidad</h2>
                  <p className="text-lg mb-8 font-light">
                    Formar parte de Prana OM es sencillo. Puedes comenzar de diferentes maneras según tus intereses y disponibilidad.
                  </p>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-[#5862f0] flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Recibe tu primer clase!</h3>
                        <p className="text-sm font-light">
                          La mejor manera de conocernos es experimentando una clase. Contactanos para recibir tu primer clase en forma gratuita y conocernos
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-[#5862f0] flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Participa en eventos comunitarios</h3>
                        <p className="text-sm font-light">
                          Muchos de nuestros eventos están abiertos al público. Es una excelente forma de conocer a la
                          comunidad.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-[#5862f0] flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Suscríbete a nuestro newsletter</h3>
                        <p className="text-sm font-light">
                          Mantente informado sobre clases, eventos y ofertas especiales para nuevos miembros.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link href="/registro">
                      <Button className="bg-white text-[#5862f0] hover:bg-white/90 group">
                        <span>Registrarse es gratis</span>
                        <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative hidden md:block">
                  <Image src="/joinus.jpg" alt="Únete a nuestra comunidad" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
