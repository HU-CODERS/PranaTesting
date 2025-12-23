"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  // Función para manejar el scroll al inicio cuando se navega
  const handleNavigation = () => {
    window.scrollTo(0, 0)
  }

  // Manejar el envío del formulario de newsletter
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      // Aquí iría la lógica para suscribir el email a la newsletter
      // Por ahora simularemos una respuesta exitosa
      await new Promise(resolve => setTimeout(resolve, 1000))

      setMessage("¡Gracias por suscribirte a nuestra newsletter!")
      setEmail("")
    } catch (error) {
      setMessage("Hubo un error. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-[#3941a5] text-white">
      <div className="container px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo y Newsletter */}
          <div>
            <Link href="/" className="inline-block mb-6" onClick={handleNavigation}>
              <div className="flex items-center gap-3">
                <Image
                  src="/Logo-Prana.png"
                  alt="Logo Prana Om"
                  width={48}
                  height={48}
                />
                <span className="text-2xl font-bold">PRANA OM</span>
              </div>
            </Link>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">Newsletter</h3>
              <p className="text-sm mb-4 text-white/90">
                Recibí novedades, promociones y contenido exclusivo
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#5862f0] hover:bg-[#2d38ad] shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {message && (
                  <p className="text-xs text-white/90">{message}</p>
                )}
              </form>
            </div>

            {/* Redes Sociales */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Síguenos en Redes</h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/pranaomyoga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#9098fd] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/pranaomyoga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#9098fd] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@pranaomyoga7825/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#9098fd] transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Sobre Prana */}
          <div>
            <h3 className="text-lg font-bold mb-6">Sobre Prana</h3>
            <nav className="space-y-3">
              <Link
                href="/propuestas"
                className="block text-sm hover:text-[#bdc2ff] transition-colors duration-300"
                onClick={handleNavigation}
              >
                Propuestas
              </Link>
              <Link
                href="/comunidad"
                className="block text-sm hover:text-[#bdc2ff] transition-colors duration-300"
                onClick={handleNavigation}
              >
                Nuestra Comunidad
              </Link>
              <Link
                href="/nosotros"
                className="block text-sm hover:text-[#bdc2ff] transition-colors duration-300"
                onClick={handleNavigation}
              >
                Sobre Nosotros
              </Link>
              <Link
                href="/trabaja-con-nosotros"
                className="block text-sm hover:text-[#bdc2ff] transition-colors duration-300"
                onClick={handleNavigation}
              >
                Trabaja con Nosotros
              </Link>
            </nav>
          </div>

          {/* Links Legales */}
          <div>
            <h3 className="text-lg font-bold mb-6">Legal</h3>
            <nav className="space-y-3">
              <Link
                href="/terminos"
                className="block text-sm hover:text-[#bdc2ff] transition-colors duration-300"
                onClick={handleNavigation}
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/privacidad"
                className="block text-sm hover:text-[#bdc2ff] transition-colors duration-300"
                onClick={handleNavigation}
              >
                Política de Privacidad
              </Link>
              <Link
                href="/cookies"
                className="block text-sm hover:text-[#bdc2ff] transition-colors duration-300"
                onClick={handleNavigation}
              >
                Política de Cookies
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left">© 2025 Prana OM. Todos los derechos reservados.</p>
            <p className="text-center">
              Desarrollado con dedicación por{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.hucoders.com"
                className="font-bold hover:text-[#bdc2ff] transition-colors"
                style={{ color: '#ffF877' }}
              >
                HUCODERS STUDIO
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
