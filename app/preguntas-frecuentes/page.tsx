"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, Search, HelpCircle, MessageCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

interface Faq {
  _id: string
  category: string
  question: string
  answer: string
}

export default function PreguntasFrecuentesPage() {
  const [activeCategory, setActiveCategory] = useState("todas")
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Traer FAQs desde backend
  useEffect(() => {
    fetch("https://pranabackend.onrender.com/api/faq")
      .then((res) => res.json())
      .then((data: Faq[]) => {
        setFaqs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Extraer categorías únicas (ordenadas)
  const categories = [
    { id: "todas", name: "Todas" },
    ...Array.from(new Set(faqs.map((faq) => faq.category)))
      .sort()
      .map((cat) => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, " "),
      })),
  ]

  // Filtrar FAQs por categoría y búsqueda
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "todas" || faq.category === activeCategory
    const matchesSearch = searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Renderiza texto con saltos de línea y listas simples
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n").filter(Boolean)

    const isList = lines.every(
      (line) => line.trim().startsWith("- ") || line.trim().startsWith("* ")
    )

    if (isList) {
      return (
        <ul className="list-none space-y-2 text-gray-700">
          {lines.map((line, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-[#5862f0] rounded-full mt-2 shrink-0"></span>
              <span>{line.trim().slice(2)}</span>
            </li>
          ))}
        </ul>
      )
    }

    return lines.map((line, i) => (
      <p key={i} className="mb-2 text-gray-700 leading-relaxed">
        {line}
      </p>
    ))
  }

  const toggleQuestion = (id: string) => {
    setOpenQuestion(openQuestion === id ? null : id)
  }

  return (
    <>
      <SiteHeader />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/f1.jpg"
              alt="Preguntas Frecuentes - Prana"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <HelpCircle className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-light">
              Encontrá respuestas a las consultas más comunes sobre Prana
            </p>
          </div>
        </section>

        {/* Buscador */}
        <section className="py-8 px-4 bg-white border-b sticky top-0 z-30 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscá tu pregunta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg border-2 border-gray-200 focus:border-[#5862f0] rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="py-8 px-4 bg-[#F6F4F1]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300",
                    activeCategory === cat.id
                      ? "bg-[#5862f0] text-white shadow-lg scale-105"
                      : "bg-white text-[#5862f0] hover:bg-[#5862f0]/10"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#5862f0] border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Cargando preguntas...</p>
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchTerm ? "No se encontraron preguntas que coincidan con tu búsqueda" : "No hay preguntas disponibles en esta categoría"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={faq._id}
                    className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#5862f0]/50 transition-all duration-300 hover:shadow-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <button
                      onClick={() => toggleQuestion(faq._id)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F6F4F1] transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          openQuestion === faq._id ? "bg-[#5862f0]" : "bg-[#5862f0]/10"
                        )}>
                          <MessageCircle className={cn(
                            "h-5 w-5",
                            openQuestion === faq._id ? "text-white" : "text-[#5862f0]"
                          )} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {faq.question}
                          </h3>
                          <span className="text-xs text-[#5862f0] font-medium uppercase tracking-wide">
                            {faq.category.replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-6 w-6 text-[#5862f0] transition-transform duration-300 shrink-0",
                          openQuestion === faq._id && "rotate-180"
                        )}
                      />
                    </button>
                    {openQuestion === faq._id && (
                      <div className="px-6 pb-6 pt-2 pl-20 animate-in slide-in-from-top-2 duration-300">
                        <div className="bg-[#F6F4F1] rounded-lg p-6">
                          {renderFormattedText(faq.answer)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Estadísticas */}
        <section className="py-16 px-4 bg-[#F6F4F1]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-[#5862f0] mb-2">{faqs.length}+</div>
                <p className="text-gray-600">Preguntas Respondidas</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-[#5862f0] mb-2">{categories.length - 1}</div>
                <p className="text-gray-600">Categorías</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-[#5862f0] mb-2">24hs</div>
                <p className="text-gray-600">Tiempo de Respuesta</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Nuestro equipo está disponible para responder tus consultas personalizadas
            </p>
            <a href="mailto:info@prana-om.com">
              <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                Contactar Soporte
              </Button>
            </a>
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
