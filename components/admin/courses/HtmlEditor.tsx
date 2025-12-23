// components/admin/courses/HtmlEditor.tsx
"use client"

import { useState, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Eye,
  Code,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface HtmlEditorProps {
  value: string
  onChange: (value: string) => void
}

export function HtmlEditor({ value, onChange }: HtmlEditorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const [textColor, setTextColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [fontSize, setFontSize] = useState("16")

  const insertTag = (tag: string, attributes: string = "") => {
    const textarea = document.getElementById("html-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    let newText = ""
    if (selectedText) {
      newText = `${beforeText}<${tag}${attributes}>${selectedText}</${tag}>${afterText}`
    } else {
      newText = `${beforeText}<${tag}${attributes}></${tag}>${afterText}`
    }

    onChange(newText)
  }

  const insertStyle = (style: string) => {
    const textarea = document.getElementById("html-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const beforeText = value.substring(0, start)
    const afterText = value.substring(end)

    if (selectedText) {
      const newText = `${beforeText}<span style="${style}">${selectedText}</span>${afterText}`
      onChange(newText)
    }
  }

  return (
    <div className="mt-2">
      {/* Toolbar */}
      <div className="border rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-2">
        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("h1")}
            title="Título 1"
          >
            H1
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("h2")}
            title="Título 2"
          >
            H2
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("h3")}
            title="Título 3"
          >
            H3
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("p")}
            title="Párrafo"
          >
            P
          </Button>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("strong")}
            title="Negrita"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("em")}
            title="Cursiva"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("u")}
            title="Subrayado"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("div", ' style="text-align: left;"')}
            title="Alinear izquierda"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("div", ' style="text-align: center;"')}
            title="Centrar"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("div", ' style="text-align: right;"')}
            title="Alinear derecha"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <div className="flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("ul")}
            title="Lista"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("ol")}
            title="Lista numerada"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => insertTag("li")}
            title="Elemento de lista"
          >
            LI
          </Button>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-1">
            <label className="text-xs text-gray-600">Tamaño:</label>
            <input
              type="number"
              min="8"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="w-16 px-2 py-1 border rounded text-sm"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => insertStyle(`font-size: ${fontSize}px;`)}
              title="Aplicar tamaño"
            >
              OK
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <label className="text-xs text-gray-600">Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-8 h-8 border rounded cursor-pointer"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => insertStyle(`color: ${textColor};`)}
              title="Aplicar color"
            >
              OK
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <label className="text-xs text-gray-600">Fondo:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-8 h-8 border rounded cursor-pointer"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => insertStyle(`background-color: ${bgColor};`)}
              title="Aplicar fondo"
            >
              OK
            </Button>
          </div>
        </div>

        <div className="h-6 w-px bg-gray-300" />

        <Button
          type="button"
          size="sm"
          variant={showPreview ? "default" : "outline"}
          onClick={() => setShowPreview(!showPreview)}
          className={showPreview ? "bg-[#6366f1]" : ""}
        >
          <Eye className="h-4 w-4 mr-1" />
          {showPreview ? "Editor" : "Preview"}
        </Button>
      </div>

      {/* Editor/Preview */}
      <div className="border border-t-0 rounded-b-lg">
        {!showPreview ? (
          <Textarea
            id="html-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={20}
            className="font-mono text-sm rounded-none rounded-b-lg border-0 focus:ring-0"
            placeholder="Escribe o usa los botones para dar formato..."
          />
        ) : (
          <div
            className="p-4 min-h-[400px] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <Code className="h-3 w-3" />
        <span>Puedes editar el HTML directamente o usar los botones de formato</span>
      </div>
    </div>
  )
}