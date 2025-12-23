"use client"

import Image from "next/image"
import { Cookie, Shield, Settings, Info } from "lucide-react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

export default function PoliticaCookiesPage() {
    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[50vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f1.jpg"
                            alt="Política de Cookies - Prana"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <Cookie className="h-16 w-16 text-white mx-auto mb-6" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Política de Cookies
                        </h1>
                        <p className="text-xl text-white/95 font-light">
                            Última actualización: Diciembre 2025
                        </p>
                    </div>
                </section>

                {/* Contenido */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        {/* ¿Qué son las cookies? */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-[#5862f0]/10 rounded-full flex items-center justify-center">
                                    <Info className="h-6 w-6 text-[#5862f0]" />
                                </div>
                                <h2 className="text-3xl font-bold text-[#5862f0]">¿Qué son las cookies?</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet o móvil) cuando visitas nuestro sitio web. Estas cookies nos ayudan a mejorar tu experiencia de navegación y a ofrecerte contenido personalizado.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                En Prana OM utilizamos cookies para garantizar el correcto funcionamiento de nuestro sitio web, analizar el tráfico y mejorar nuestros servicios.
                            </p>
                        </div>

                        {/* Tipos de cookies */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#5862f0]/10 rounded-full flex items-center justify-center">
                                    <Cookie className="h-6 w-6 text-[#5862f0]" />
                                </div>
                                <h2 className="text-3xl font-bold text-[#5862f0]">Tipos de cookies que utilizamos</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Cookies esenciales */}
                                <div className="bg-[#F6F4F1] rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">1. Cookies Esenciales</h3>
                                    <p className="text-gray-700 mb-3">
                                        Son necesarias para el funcionamiento básico del sitio web. Estas cookies permiten:
                                    </p>
                                    <ul className="space-y-2 ml-4">
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Mantener tu sesión iniciada</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Recordar tus preferencias de idioma y región</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Garantizar la seguridad de tu cuenta</span>
                                        </li>
                                    </ul>
                                    <p className="text-sm text-gray-600 mt-3 italic">
                                        Estas cookies no pueden ser desactivadas ya que son imprescindibles para el funcionamiento del sitio.
                                    </p>
                                </div>

                                {/* Cookies analíticas */}
                                <div className="bg-[#F6F4F1] rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">2. Cookies Analíticas</h3>
                                    <p className="text-gray-700 mb-3">
                                        Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web. Recopilamos información sobre:
                                    </p>
                                    <ul className="space-y-2 ml-4">
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Páginas visitadas y tiempo de navegación</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Enlaces en los que haces clic</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Información sobre el dispositivo y navegador</span>
                                        </li>
                                    </ul>
                                    <p className="text-sm text-gray-600 mt-3">
                                        Utilizamos Google Analytics para este propósito. Toda la información es anónima y agregada.
                                    </p>
                                </div>

                                {/* Cookies funcionales */}
                                <div className="bg-[#F6F4F1] rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">3. Cookies Funcionales</h3>
                                    <p className="text-gray-700 mb-3">
                                        Mejoran la funcionalidad del sitio y la experiencia del usuario:
                                    </p>
                                    <ul className="space-y-2 ml-4">
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Recordar tus preferencias de filtros en clases y eventos</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Guardar artículos en el carrito de compras</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span>Personalizar el contenido según tus intereses</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Cookies de terceros */}
                                <div className="bg-[#F6F4F1] rounded-xl p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3">4. Cookies de Terceros</h3>
                                    <p className="text-gray-700 mb-3">
                                        Algunos servicios externos que utilizamos pueden instalar sus propias cookies:
                                    </p>
                                    <ul className="space-y-2 ml-4">
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span><strong>Google Analytics:</strong> Para análisis de tráfico</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span><strong>MercadoPago:</strong> Para procesar pagos seguros</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-gray-700">
                                            <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
                                            <span><strong>Google OAuth:</strong> Para inicio de sesión con Google</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Gestión de cookies */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-[#5862f0]/10 rounded-full flex items-center justify-center">
                                    <Settings className="h-6 w-6 text-[#5862f0]" />
                                </div>
                                <h2 className="text-3xl font-bold text-[#5862f0]">Cómo gestionar las cookies</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Podés controlar y/o eliminar las cookies como desees. Para más información, consultá{" "}
                                <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#5862f0] hover:underline">
                                    aboutcookies.org
                                </a>.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Podés eliminar todas las cookies que ya están en tu dispositivo y configurar la mayoría de los navegadores para que no las acepten. Sin embargo, si hacés esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites nuestro sitio y que algunos servicios y funcionalidades no funcionen.
                            </p>

                            <div className="bg-blue-50 border-l-4 border-[#5862f0] p-4 rounded mt-6">
                                <h4 className="font-bold text-gray-800 mb-2">Configuración del navegador</h4>
                                <p className="text-sm text-gray-700 mb-2">Instrucciones para los navegadores más comunes:</p>
                                <ul className="space-y-1 text-sm">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full"></span>
                                        <a href="https://support.google.com/chrome/answer/95647" target="_blank" className="text-[#5862f0] hover:underline">Google Chrome</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full"></span>
                                        <a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" className="text-[#5862f0] hover:underline">Mozilla Firefox</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full"></span>
                                        <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" className="text-[#5862f0] hover:underline">Safari</a>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full"></span>
                                        <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" className="text-[#5862f0] hover:underline">Microsoft Edge</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Actualizaciones */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-[#5862f0]/10 rounded-full flex items-center justify-center">
                                    <Shield className="h-6 w-6 text-[#5862f0]" />
                                </div>
                                <h2 className="text-3xl font-bold text-[#5862f0]">Actualizaciones de esta política</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en las cookies que utilizamos o por otras razones operativas, legales o regulatorias.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Te recomendamos revisar esta política regularmente para estar informado sobre cómo utilizamos las cookies.
                            </p>
                        </div>

                        {/* Contacto */}
                        <div className="bg-gradient-to-r from-[#5862f0]/10 to-[#826597]/10 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-[#5862f0] mb-4">¿Tenés preguntas?</h3>
                            <p className="text-gray-700 mb-4">
                                Si tenés alguna pregunta sobre nuestra política de cookies, no dudes en contactarnos:
                            </p>
                            <div className="space-y-2">
                                <p className="text-gray-700">
                                    <strong>Email:</strong>{" "}
                                    <a href="mailto:privacidad@prana-om.com" className="text-[#5862f0] hover:underline">
                                        privacidad@prana-om.com
                                    </a>
                                </p>
                                <p className="text-gray-700">
                                    <strong>Teléfono:</strong> +54 9 221 123-4567
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
