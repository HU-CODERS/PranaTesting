"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, HelpCircle, CheckCircle, XCircle, BarChart3 } from "lucide-react"
import { FAQModal, type FAQ } from "@/components/admin/faq/faq-modal"
import { CategoriaModal } from "@/components/admin/faq/categoria-modal"
import { ConfirmarEliminacionFAQModal } from "@/components/admin/faq/confirmar-eliminacion-faq-modal"

const categoriasIniciales = [
  "Clases y modalidades",
  "Horarios y asistencias",
  "Formaciones",
  "Pagos y membresías",
  "Acerca del espacio y ubicación",
  "Contacto y formulario de contacto",
  "Beneficios y condiciones",
  "Políticas del espacio",
  "Otros",
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState("")
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [categorias, setCategorias] = useState<string[]>(categoriasIniciales)

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("https://pranabackend.onrender.com/api/faq", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!res.ok) throw new Error("Error al cargar FAQs")
        const data = await res.json()

        const faqsAdaptadas: FAQ[] = data.map((f: any) => ({
          _id: f._id,
          question: f.question,
          answer: f.answer,
          category: f.category,
          createdAt: f.createdAt,
          active: true,
        }))

        setFaqs(faqsAdaptadas)
      } catch (err) {
        console.error("Error cargando FAQs:", err)
      }
    }

    fetchFaqs()
  }, [])

  useEffect(() => {
    if (categorias.length > 0 && selectedCategoria === "") {
      setSelectedCategoria(categorias[0])
    }
  }, [categorias, selectedCategoria])

  const [faqModal, setFaqModal] = useState<{
    isOpen: boolean
    faq?: FAQ
    mode: "create" | "edit"
  }>({
    isOpen: false,
    mode: "create",
  })

  const [categoriaModal, setCategoriaModal] = useState(false)

  const [eliminarModal, setEliminarModal] = useState<{
    isOpen: boolean
    faq?: FAQ
  }>({
    isOpen: false,
  })

  // Calcular estadísticas
  const stats = {
    total: faqs.length,

    porCategoria: categorias.length
  }

  // Filtrar FAQs
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq?.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq?.answer?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategoria = selectedCategoria === "" || faq.category.toLowerCase() === selectedCategoria.toLowerCase()

    return matchesSearch && matchesCategoria
  })

  const currentCategoryFaqs = filteredFaqs.filter(
    (faq) => selectedCategoria === "" || faq.category.toLowerCase() === selectedCategoria.toLowerCase(),
  )

  const handleNuevaFAQ = () => {
    setFaqModal({
      isOpen: true,
      mode: "create",
    })
  }

  const handleEditarFAQ = (faq: FAQ) => {
    setFaqModal({
      isOpen: true,
      faq,
      mode: "edit",
    })
  }

  const handleEliminarFAQ = (faq: FAQ) => {
    setEliminarModal({
      isOpen: true,
      faq,
    })
  }

  const confirmarEliminarFAQ = async () => {
    if (!eliminarModal.faq) return

    try {
      const res = await fetch(`https://pranabackend.onrender.com/api/faq/${eliminarModal.faq._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!res.ok) throw new Error("Error al eliminar FAQ")

      setFaqs(faqs.filter((f) => f._id !== eliminarModal.faq!._id))
      setEliminarModal({ isOpen: false })
    } catch (err) {
      console.error("Error eliminando FAQ:", err)
      alert("No se pudo eliminar la FAQ.")
    }
  }

  const handleGuardarFAQ = async (faq: FAQ) => {
    try {
      const endpoint = faqModal.mode === "create"
        ? "https://pranabackend.onrender.com/api/faq"
        : `https://pranabackend.onrender.com/api/faq/${faq._id}`

      const method = faqModal.mode === "create" ? "POST" : "PUT"

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(faq),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Error del backend:", data)
        alert(`Error: ${data.error || "Desconocido"}\nDetalles: ${JSON.stringify(data.detalles || {})}`)
        return
      }

      if (faqModal.mode === "create") {
        setFaqs([...faqs, { ...data, active: faq.active }])
      } else {
        setFaqs(faqs.map((f) => (f._id === faq._id ? { ...data, active: faq.active } : f)))
      }

      setFaqModal({ ...faqModal, isOpen: false })
    } catch (err) {
      console.error("Error de red:", err)
      alert("Hubo un error al guardar la FAQ.")
    }
  }



  const handleNuevaCategoria = (categoria: string) => {
    if (!categorias.includes(categoria)) {
      setCategorias([...categorias, categoria])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header con gradiente */}
      <div className="relative bg-gradient-to-br from-[#5862f0] via-[#6872fe] to-[#7d86ff] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <HelpCircle className="h-10 w-10" />
                Gestión de FAQ
              </h1>
              <p className="text-white/90 text-lg">
                Administra las preguntas frecuentes que ven los usuarios en el sitio web
              </p>
            </div>
            <Button
              onClick={handleNuevaFAQ}
              className="bg-white text-[#5862f0] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-12 px-6"
            >
              <Plus className="mr-2 h-5 w-5" />
              Nueva FAQ
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 -mt-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">Total FAQs</p>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#5862f0] to-[#7d86ff] rounded-2xl flex items-center justify-center shadow-lg">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">Categorías</p>
                <p className="text-4xl font-bold text-gray-900">{stats.porCategoria}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar en preguntas y respuestas..."
              className="pl-12 h-12 border-2 border-gray-200 focus:border-[#5862f0] transition-colors rounded-lg text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tabs de categorías */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Categorías</h3>
              <Badge variant="outline" className="bg-gray-50">
                {currentCategoryFaqs.length} FAQ{currentCategoryFaqs.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => setSelectedCategoria(categoria)}
                  className={`
                    px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm
                    ${selectedCategoria === categoria
                      ? 'bg-gradient-to-r from-[#5862f0] to-[#7d86ff] text-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de FAQs */}
        <div className="pb-12">
          {currentCategoryFaqs.length > 0 ? (
            <div className="space-y-4">
              {currentCategoryFaqs.map((faq) => (
                <div
                  key={faq._id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-[#5862f0] transition-all duration-300 overflow-hidden"
                >
                  {/* Header de la FAQ */}
                  <div className="relative bg-gradient-to-br from-[#6366f1]/10 via-[#7c3aed]/10 to-[#8b5cf6]/10 p-5 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5862f0] to-[#6973f9] flex items-center justify-center shadow-md flex-shrink-0">
                            <HelpCircle className="h-5 w-5 text-white" />
                          </div>
                          <h4 className="font-bold text-lg text-gray-900">
                            {faq.question}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contenido de la FAQ */}
                  <div className="p-5">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {faq.answer}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Creada el {new Date(faq.createdAt).toLocaleDateString("es-AR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>

                      {/* Botones de acción */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditarFAQ(faq)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
                        >
                          <Edit2 className="h-4 w-4" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminarFAQ(faq)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 font-medium transition-colors text-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-16 border-2 border-gray-200 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <HelpCircle className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No se encontraron FAQs
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
                {searchTerm
                  ? "No hay preguntas que coincidan con tu búsqueda"
                  : `No hay FAQs en la categoría "${selectedCategoria}"`}
              </p>
              <Button
                onClick={handleNuevaFAQ}
                className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] text-white px-8 py-4 rounded-xl flex items-center gap-3 mx-auto transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus className="h-5 w-5" />
                Crear Primera FAQ
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      <FAQModal
        isOpen={faqModal.isOpen}
        onClose={() => setFaqModal({ ...faqModal, isOpen: false })}
        onSave={handleGuardarFAQ}
        faq={faqModal.faq}
        mode={faqModal.mode}
        categorias={categorias}
      />

      <CategoriaModal
        isOpen={categoriaModal}
        onClose={() => setCategoriaModal(false)}
        onSave={handleNuevaCategoria}
      />

      <ConfirmarEliminacionFAQModal
        isOpen={eliminarModal.isOpen}
        onClose={() => setEliminarModal({ isOpen: false })}
        onConfirm={confirmarEliminarFAQ}
        pregunta={eliminarModal.faq?.question || ""}
      />
    </div>
  )
}