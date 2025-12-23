"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Home, GraduationCap, Calendar, Sparkles, ShoppingBag, HelpCircle, User, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginModal from "@/components/login-modal"
import RegistroModal from "@/components/registro-modal"

export default function SiteHeader() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegistroModalOpen, setIsRegistroModalOpen] = useState(false)
  const [isAcademiaOpen, setIsAcademiaOpen] = useState(false)
  const [isMiCuentaOpen, setIsMiCuentaOpen] = useState(false)
  const [isBottomNavSticky, setIsBottomNavSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [academiaClicked, setAcademiaClicked] = useState(false)
  const [miCuentaClicked, setMiCuentaClicked] = useState(false)
  const [academiaTimeout, setAcademiaTimeout] = useState<NodeJS.Timeout | null>(null)
  const [miCuentaTimeout, setMiCuentaTimeout] = useState<NodeJS.Timeout | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
    const logged = localStorage.getItem('isLogged') === 'true'
    setIsLoggedIn(logged)
  }, [])

  // Función para manejar el scroll al inicio cuando se navega
  const handleNavigation = () => {
    window.scrollTo(0, 0)
    setIsAcademiaOpen(false)
    setIsMiCuentaOpen(false)
    setAcademiaClicked(false)
    setMiCuentaClicked(false)
  }

  // Manejar dropdown Academia
  const handleAcademiaMouseEnter = () => {
    if (academiaTimeout) clearTimeout(academiaTimeout)
    setIsAcademiaOpen(true)
  }

  const handleAcademiaMouseLeave = () => {
    if (!academiaClicked) {
      const timeout = setTimeout(() => {
        setIsAcademiaOpen(false)
      }, 3000)
      setAcademiaTimeout(timeout)
    }
  }

  const handleAcademiaClick = () => {
    setAcademiaClicked(!academiaClicked)
    if (academiaTimeout) clearTimeout(academiaTimeout)
    setIsAcademiaOpen(!isAcademiaOpen)
  }

  // Manejar dropdown Mi Cuenta
  const handleMiCuentaMouseEnter = () => {
    if (miCuentaTimeout) clearTimeout(miCuentaTimeout)
    setIsMiCuentaOpen(true)
  }

  const handleMiCuentaMouseLeave = () => {
    if (!miCuentaClicked) {
      const timeout = setTimeout(() => {
        setIsMiCuentaOpen(false)
      }, 3000)
      setMiCuentaTimeout(timeout)
    }
  }

  const handleMiCuentaClick = () => {
    setMiCuentaClicked(!miCuentaClicked)
    if (miCuentaTimeout) clearTimeout(miCuentaTimeout)
    setIsMiCuentaOpen(!isMiCuentaOpen)
  }

  // Efecto para manejar el bottom nav sticky al footer
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer')
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Si el footer está visible en la ventana
        if (footerRect.top < windowHeight) {
          setIsBottomNavSticky(true)
        } else {
          setIsBottomNavSticky(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Manejar el clic en el icono de inicio de sesión
  const handleLoginClick = () => {
    setIsMobileMenuOpen(false)
    setIsMiCuentaOpen(false)
    router.push("/login")
  }

  const handleRegistroClick = () => {
    setIsMobileMenuOpen(false)
    setIsMiCuentaOpen(false)
    router.push("/registro")
  }

  const handleLogout = () => {
    localStorage.removeItem('isLogged')
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    setIsMobileMenuOpen(false)
    setIsMiCuentaOpen(false)
    router.push("/")
  }

  const handlePerfilClick = () => {
    setIsMobileMenuOpen(false)
    setIsMiCuentaOpen(false)
    router.push("/perfil")
  }

  const handleSwitchToLogin = () => {
    setIsLoginModalOpen(true)
  }

  const handleSwitchToRegister = () => {
    setIsRegistroModalOpen(true)
  }

  if (!isMounted) {
    return (
      <>
        <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-white shadow-sm">
          <div className="container flex h-16 items-center">
            <div className="flex items-center mr-8">
              <Link href="/" className="flex items-center">
                <h1 className="text-lg font-bold text-[#5862f0]">PRANA OM</h1>
              </Link>
            </div>
            <nav className="flex items-center space-x-1 lg:space-x-2 flex-1">
              <div className="flex items-center gap-2 text-gray-400">Cargando...</div>
            </nav>
          </div>
        </header>
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around items-center h-16 px-2">
            <div className="text-gray-400">Cargando...</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Header superior - Solo visible en desktop */}
      <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center">
          <div className="flex items-center mr-8">
            <Link href="/" className="flex items-center" onClick={handleNavigation}>
              <h1 className="text-lg font-bold text-[#5862f0]">PRANA OM</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-1 lg:space-x-2 flex-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-[#5862f0] hover:text-[#2d38ad] transition-colors duration-300"
              onClick={handleNavigation}
            >
              Inicio
            </Link>

            {/* Academia Dropdown */}
            <div className="relative group">
              <button
                className="px-3 py-2 text-sm font-medium text-[#5862f0] hover:text-[#2d38ad] transition-colors duration-300 flex items-center gap-1"
                onMouseEnter={handleAcademiaMouseEnter}
                onMouseLeave={handleAcademiaMouseLeave}
                onClick={handleAcademiaClick}
              >
                Academia
                <ChevronDown className="h-4 w-4" />
              </button>
              {isAcademiaOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 py-2 z-50"
                  onMouseEnter={handleAcademiaMouseEnter}
                  onMouseLeave={handleAcademiaMouseLeave}
                >
                  <Link
                    href="/clases"
                    className="block px-4 py-2 text-sm text-[#5862f0] hover:bg-[#f0f1ff] transition-colors"
                    onClick={handleNavigation}
                  >
                    Clases
                  </Link>
                  <Link
                    href="/ondemand"
                    className="block px-4 py-2 text-sm text-[#5862f0] hover:bg-[#f0f1ff] transition-colors"
                    onClick={handleNavigation}
                  >
                    On Demand
                  </Link>
                  <Link
                    href="/formaciones"
                    className="block px-4 py-2 text-sm text-[#5862f0] hover:bg-[#f0f1ff] transition-colors"
                    onClick={handleNavigation}
                  >
                    Formaciones
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/eventos"
              className="px-3 py-2 text-sm font-medium text-[#5862f0] hover:text-[#2d38ad] transition-colors duration-300"
              onClick={handleNavigation}
            >
              Viajes
            </Link>
            <Link
              href="/masajes"
              className="px-3 py-2 text-sm font-medium text-[#5862f0] hover:text-[#2d38ad] transition-colors duration-300"
              onClick={handleNavigation}
            >
              Masajes
            </Link>
            <Link
              href="/tienda"
              className="px-3 py-2 text-sm font-medium text-[#5862f0] hover:text-[#2d38ad] transition-colors duration-300"
              onClick={handleNavigation}
            >
              Tienda
            </Link>
            <Link
              href="/preguntas-frecuentes"
              className="px-3 py-2 text-sm font-medium text-[#5862f0] hover:text-[#2d38ad] transition-colors duration-300"
              onClick={handleNavigation}
            >
              FAQ
            </Link>
          </nav>

          {/* MI CUENTA Dropdown - Separado a la derecha */}
          <div className="ml-6">
            <div className="relative group">
              <button
                className="px-3 py-2 text-sm font-bold text-[#5862f0] hover:text-[#2d38ad] transition-colors duration-300 flex items-center gap-1"
                onMouseEnter={handleMiCuentaMouseEnter}
                onMouseLeave={handleMiCuentaMouseLeave}
                onClick={handleMiCuentaClick}
              >
                MI CUENTA
                <ChevronDown className="h-4 w-4" />
              </button>
              {isMiCuentaOpen && (
                <div
                  className="absolute top-full right-0 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-200 py-2 z-50"
                  onMouseEnter={handleMiCuentaMouseEnter}
                  onMouseLeave={handleMiCuentaMouseLeave}
                >
                  {!isMounted ? (
                    <div className="px-4 py-2 text-sm text-gray-500">Cargando...</div>
                  ) : isLoggedIn ? (
                    <>
                      <button
                        onClick={handlePerfilClick}
                        className="w-full text-left block px-4 py-2 text-sm text-[#5862f0] hover:bg-[#f0f1ff] transition-colors"
                      >
                        Mi Perfil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleLoginClick}
                        className="w-full text-left block px-4 py-2 text-sm text-[#5862f0] hover:bg-[#f0f1ff] transition-colors"
                      >
                        Iniciar Sesión
                      </button>
                      <button
                        onClick={handleRegistroClick}
                        className="w-full text-left block px-4 py-2 text-sm text-[#5862f0] hover:bg-[#f0f1ff] transition-colors"
                      >
                        Crear Cuenta
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar - Solo visible en móvil/tablet */}
      <nav
        className={`md:hidden fixed ${isBottomNavSticky ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-blue-700/60 shadow-lg transition-all duration-300`}
        style={isBottomNavSticky ? { position: 'absolute', bottom: 'auto' } : {}}
      >
        <div className="grid grid-cols-4 h-16">
          {/* Inicio */}
          <Link
            href="/"
            onClick={handleNavigation}
            className={`flex flex-col items-center justify-center gap-1 ${pathname === '/' ? 'text-[#2d38ad] bg-[#f0f1ff]' : 'text-[#5862f0]'} hover:bg-[#f0f1ff] transition-colors duration-200 active:bg-[#e0e2ff]`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Inicio</span>
          </Link>

          {/* Eventos */}
          <Link
            href="/eventos"
            onClick={handleNavigation}
            className={`flex flex-col items-center justify-center gap-1 ${pathname.startsWith('/eventos') ? 'text-[#2d38ad] bg-[#f0f1ff]' : 'text-[#5862f0]'} hover:bg-[#f0f1ff] transition-colors duration-200 active:bg-[#e0e2ff]`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs font-medium">Viajes</span>
          </Link>

          {/* Tienda */}
          <Link
            href="/tienda"
            onClick={handleNavigation}
            className={`flex flex-col items-center justify-center gap-1 ${pathname.startsWith('/tienda') ? 'text-[#2d38ad] bg-[#f0f1ff]' : 'text-[#5862f0]'} hover:bg-[#f0f1ff] transition-colors duration-200 active:bg-[#e0e2ff]`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs font-medium">Tienda</span>
          </Link>

          {/* Menú */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-1 text-[#5862f0] hover:bg-[#f0f1ff] transition-colors duration-200 active:bg-[#e0e2ff]"
          >
            <Menu className="h-5 w-5" />
            <span className="text-xs font-medium">Menú</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-[#5862f0]">Menú</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-[#5862f0]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
              <Link
                href="/"
                onClick={() => { handleNavigation(); setIsMobileMenuOpen(false) }}
                className="block px-4 py-3 text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors"
              >
                Inicio
              </Link>

              {/* Academia */}
              <div className="space-y-1">
                <p className="px-4 py-2 text-sm font-bold text-gray-700">Academia</p>
                <Link
                  href="/clases"
                  onClick={() => { handleNavigation(); setIsMobileMenuOpen(false) }}
                  className="block px-6 py-3 text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors"
                >
                  Clases
                </Link>
                <Link
                  href="/ondemand"
                  onClick={() => { handleNavigation(); setIsMobileMenuOpen(false) }}
                  className="block px-6 py-3 text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors"
                >
                  On Demand
                </Link>
                <Link
                  href="/formaciones"
                  onClick={() => { handleNavigation(); setIsMobileMenuOpen(false) }}
                  className="block px-6 py-3 text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors"
                >
                  Formaciones
                </Link>
              </div>

              <Link
                href="/eventos"
                onClick={() => { handleNavigation(); setIsMobileMenuOpen(false) }}
                className="block px-4 py-3 text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors"
              >
                Viajes
              </Link>

              <Link
                href="/masajes"
                onClick={() => { handleNavigation(); setIsMobileMenuOpen(false) }}
                className="block px-4 py-3 text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors"
              >
                Masajes
              </Link>

              <Link
                href="/tienda"
                onClick={() => { handleNavigation(); setIsMobileMenuOpen(false) }}
                className="block px-4 py-3 text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors"
              >
                Tienda
              </Link>

              <Link
                href="/preguntas-frecuentes"
                onClick={() => { handleNavigation(); setIsMobileMenuOpen(false) }}
                className="block px-4 py-3 text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors"
              >
                FAQ
              </Link>

              <div className="pt-4 mt-4 border-t space-y-2">
                {!isMounted ? (
                  <div className="px-4 py-3 text-center text-gray-500">Cargando...</div>
                ) : isLoggedIn ? (
                  <>
                    <button
                      onClick={() => { handlePerfilClick(); setIsMobileMenuOpen(false) }}
                      className="w-full px-4 py-3 text-left text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors font-semibold"
                    >
                      Mi Perfil
                    </button>
                    <button
                      onClick={() => { handleLogout(); setIsMobileMenuOpen(false) }}
                      className="w-full px-4 py-3 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-semibold"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { handleLoginClick(); setIsMobileMenuOpen(false) }}
                      className="w-full px-4 py-3 text-left text-[#5862f0] hover:bg-[#f0f1ff] rounded-lg transition-colors font-semibold"
                    >
                      Iniciar Sesión
                    </button>
                    <button
                      onClick={() => { handleRegistroClick(); setIsMobileMenuOpen(false) }}
                      className="w-full px-4 py-3 bg-[#5862f0] text-white hover:bg-[#3c4ac6] rounded-lg transition-colors font-semibold"
                    >
                      Crear Cuenta
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de inicio de sesión */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />

      {/* Modal de registro */}
      <RegistroModal
        isOpen={isRegistroModalOpen}
        onClose={() => setIsRegistroModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  )
}