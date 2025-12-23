"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, AlignLeft, FolderOpen, X, Sparkles, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export interface FAQ {
  _id?: string
  question: string
  answer: string
  category: string
  createdAt: string
  active?: boolean
}

interface FAQModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (faq: FAQ) => void
  faq?: FAQ
  mode: "create" | "edit"
  categorias: string[]
}

export function FAQModal({ isOpen, onClose, onSave, faq, mode, categorias }: FAQModalProps) {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    active: true,
  })

  useEffect(() => {
    if (mode === "edit" && faq) {
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        active: faq.active ?? true,
      })
    } else {
      setFormData({
        question: "",
        answer: "",
        category: "",
        active: true,
      })
    }
  }, [mode, faq, isOpen])

  const handleSubmit = () => {
    if (!formData.question.trim() || !formData.answer.trim() || !formData.category) {
      alert("Por favor, completa todos los campos")
      return
    }

    const faqData: FAQ = {
      _id: mode === "edit" && faq ? faq._id : undefined,
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      category: formData.category,
      createdAt: mode === "edit" && faq ? faq.createdAt : new Date().toISOString(),
      active: formData.active,
    }

    onSave(faqData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden p-0 gap-0">
        <DialogTitle className="sr-only">
          {mode === "create" ? "Crear Nueva FAQ" : "Editar FAQ"}
        </DialogTitle>
        
        {/* Header con gradiente */}
        <div className="relative bg-gradient-to-br from-[#5862f0] via-[#6872fe] to-[#7d86ff] text-white p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <HelpCircle className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {mode === "create" ? "Crear Nueva FAQ" : "Editar FAQ"}
                </h3>
                <p className="text-white/90 text-sm">
                  {mode === "create" 
                    ? "Agrega una nueva pregunta frecuente" 
                    : "Modifica la pregunta frecuente"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
              type="button"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex flex-col max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {/* Categoría */}
            <div className="bg-gray-50 rounded-xl p-5">
              <Label htmlFor="categoria" className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-[#5862f0]" />
                Categoría *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-2">
                Agrupa la pregunta en una categoría específica
              </p>
            </div>

            {/* Pregunta */}
            <div className="bg-gray-50 rounded-xl p-5">
              <Label htmlFor="question" className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#5862f0]" />
                Pregunta *
              </Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="¿Cuál es la pregunta frecuente?"
                className="h-12 border-2 border-gray-300 focus:border-[#5862f0] bg-white text-base"
              />
              <p className="text-xs text-gray-500 mt-2">
                Escribe una pregunta clara y concisa
              </p>
            </div>

            {/* Respuesta */}
            <div className="bg-gray-50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="answer" className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <AlignLeft className="h-4 w-4 text-[#5862f0]" />
                  Respuesta *
                </Label>
                <span className="text-xs text-gray-500">
                  {formData.answer.length} caracteres
                </span>
              </div>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Escribe una respuesta completa y detallada..."
                rows={6}
                className="border-2 border-gray-300 focus:border-[#5862f0] bg-white resize-none text-base"
              />
              <p className="text-xs text-gray-500 mt-2">
                Proporciona una respuesta útil y fácil de entender
              </p>
            </div>

            {/* Preview de la FAQ */}
            {formData.question && formData.answer && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-5 border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h4 className="text-sm font-bold text-gray-900">Vista Previa</h4>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <h5 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-[#5862f0]" />
                    {formData.question}
                  </h5>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {formData.answer}
                  </p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
                    <Badge variant="outline" className="text-xs">
                      {formData.category || "Sin categoría"}
                    </Badge>
                    <Badge 
                      variant={formData.active ? "default" : "secondary"}
                      className={`text-xs ${formData.active ? "bg-green-500" : "bg-gray-400"}`}
                    >
                      {formData.active ? "Visible" : "Oculta"}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer fijo */}
          <div className="border-t-2 border-gray-200 bg-white px-6 py-4 flex-shrink-0">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-100 font-semibold"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex-1 h-12 bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] text-white font-semibold shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                {mode === "create" ? "Crear FAQ" : "Guardar Cambios"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}