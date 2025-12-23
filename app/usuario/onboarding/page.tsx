"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState("intro") // intro, questions, loading, recommendation
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("Recopilando información...")
  const [recommendation, setRecommendation] = useState("")

  // Respuestas del usuario
  const [answers, setAnswers] = useState({
    step1: { q1: "", q2: "", q3: "" },
    step2: { q1: "", q2: "", q3: "" },
  })

  // Actualizar progreso cuando cambia de paso o respuestas
  useEffect(() => {
    if (step === "questions") {
      // Calcular cuántas preguntas se han respondido en total
      const totalQuestions = 8 // 3 preguntas por paso * 4 pasos
      let answeredQuestions = 0

      // Contar respuestas no vacías
      Object.values(answers).forEach((stepAnswers) => {
        Object.values(stepAnswers).forEach((answer) => {
          if (answer !== "") answeredQuestions++
        })
      })

      // Calcular progreso como porcentaje de preguntas respondidas
      const newProgress = Math.floor((answeredQuestions / totalQuestions) * 100)
      setProgress(newProgress)
    }
  }, [answers, step, currentStep])

  // Manejar cambio de respuestas
  const handleAnswerChange = (question: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`step${currentStep}`]: {
        ...prev[`step${currentStep}` as keyof typeof prev],
        [question]: value,
      },
    }))
  }

  // Verificar si el paso actual está completo
  const isCurrentStepComplete = () => {
    const currentStepAnswers = answers[`step${currentStep}` as keyof typeof answers]
    return Object.values(currentStepAnswers).every((answer) => answer !== "")
  }

  // Manejar inicio del cuestionario
  const handleStartQuestions = () => {
    setStep("questions")
    setCurrentStep(1)
    setProgress(0)
  }

  // Manejar siguiente paso
  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      handleFinish()
    }
  }

  // Manejar paso anterior
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Manejar finalización del onboarding
  const handleFinish = () => {
    setStep("loading")

    // Simulación de carga con mensajes cambiantes
    const loadingMessages = [
      "Recopilando información...",
      "Yoki está estirándose...",
      "Estamos definiendo tu modelo recomendado...",
      "Analizando tus preferencias...",
      "Preparando tu experiencia personalizada...",
      "Casi listo...",
    ]

    let messageIndex = 0
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length
      setLoadingMessage(loadingMessages[messageIndex])
    }, 2000)

    // Simulación de progreso de carga
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          clearInterval(messageInterval)

          determineRecommendation()

          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  const determineRecommendation = () => {
    const disponibilidad = answers.step1.q3
    const preferencia = answers.step2.q1

    let rec = ""

    if (disponibilidad === "mucho") {
      rec = "formaciones"
    } else if (disponibilidad === "poco") {
      rec = "cursos"
    } else if (preferencia === "grupo") {
      rec = "clases"
    } else {
      rec = "workshops"
    }

    setRecommendation(rec)
    setStep("recommendation")
  }

  // Manejar selección de recomendación
  const handleSelectRecommendation = () => {
    // Guardar que el usuario completó el onboarding
    localStorage.setItem("userOnboardingCompleted", "true")

    // Redirigir al dashboard
    router.push("/usuario/tienda")
  }

  // Manejar ver más opciones
  const handleSeeMoreOptions = () => {
    // Guardar que el usuario completó el onboarding
    localStorage.setItem("userOnboardingCompleted", "true")

    // Redirigir al dashboard
    router.push("/usuario/tienda")
  }

  // Verificar si el usuario ya completó el onboarding
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("userOnboardingCompleted") === "true"
    if (hasCompletedOnboarding) {
      router.push("/usuario/tienda")
    }
  }, [router])

  // Renderizar la pantalla de recomendación
  if (step === "recommendation") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#305891]">¡Tu recomendación está lista!</CardTitle>
            <CardDescription>Basado en tus respuestas, Yoki ha preparado la mejor opción para ti</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-[#f0f7ff] p-6 text-center">
              <h3 className="mb-4 text-xl font-bold text-[#305891]">
                {recommendation === "clases" && "Clases Presenciales"}
                {recommendation === "cursos" && "Cursos On-Demand"}
                {recommendation === "workshops" && "Workshops"}
                {recommendation === "formaciones" && "Formaciones"}
              </h3>

              <div className="mb-4">
                {recommendation === "clases" && (
                  <p>
                    Te recomendamos nuestras clases presenciales de Hatha Yoga, Yoga Aéreo o Vinyasa Flow. Perfectas
                    para practicar en grupo y con guía directa de nuestros profesores.
                  </p>
                )}
                {recommendation === "cursos" && (
                  <p>
                    Te recomendamos nuestros cursos on-demand de respiración y estiramientos. Ideales para practicar a
                    tu ritmo y en tu propio espacio.
                  </p>
                )}
                {recommendation === "workshops" && (
                  <p>
                    Te recomendamos nuestros workshops especiales. Eventos únicos y ocasionales para profundizar en
                    aspectos específicos del yoga.
                  </p>
                )}
                {recommendation === "formaciones" && (
                  <p>
                    Te recomendamos nuestras formaciones profesionales. Perfectas para quienes quieren convertirse en
                    profesores de yoga o profundizar seriamente en la práctica.
                  </p>
                )}
              </div>

              <Button onClick={handleSelectRecommendation} className="w-full bg-[#305891] hover:bg-[#3D6CAC]">
                ¡Me interesa esta opción!
              </Button>
            </div>

            <div className="text-center">
              <p className="mb-2 text-gray-600">También tienes otras opciones</p>
              <Button
                onClick={handleSeeMoreOptions}
                variant="outline"
                className="border-[#305891] text-[#305891] hover:bg-[#f0f7ff]"
              >
                Quiero saber más
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Renderizar la pantalla de carga
  if (step === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#305891]">Preparando tu experiencia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-gray-600">{loadingMessage}</p>
            <Progress value={loadingProgress} className="h-2 w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  // Renderizar la pantalla de introducción
  if (step === "intro") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
              <Image
                src="/yoki-assistant.png"
                alt="Yoki"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-[#305891]">¡Hola! Soy Yoki</CardTitle>
            <CardDescription className="text-base">
              Vengo a ayudarte a elegir lo mejor para vos. Te voy a hacer algunas preguntas para poder orientarte según
              lo que más te sirva, según tu rutina y horarios que tenés en tu día a día.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-gray-600">
              Soy tu asistente personal de yoga y mi objetivo es encontrar la práctica perfecta para ti. Con unas
              simples preguntas, podré recomendarte el tipo de clase, curso o formación que mejor se adapte a tus
              necesidades, horarios y objetivos.
            </p>
            <p className="mb-6 text-gray-600">¡Comencemos este viaje juntos hacia tu bienestar!</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleStartQuestions} className="bg-[#305891] hover:bg-[#3D6CAC]">
              Comenzar
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Renderizar el cuestionario - sin tabs visibles
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full">
            <Image src="/yoki-assistant.png" alt="Yoki" width={64} height={64} className="h-full w-full object-cover" />
          </div>
          <CardTitle className="text-xl font-bold text-[#305891]">Cuestionario de Yoki</CardTitle>
          <CardDescription>
            Responde estas preguntas para que pueda recomendarte la mejor opción para ti
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <Progress value={progress} className="h-2 w-full" />
            <p className="mt-2 text-right text-sm text-gray-500">{progress}% completado</p>
          </div>

          {/* Paso 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">¿Estudias o trabajas?</h3>
                <RadioGroup
                  value={answers.step1.q1}
                  onValueChange={(value) => handleAnswerChange("q1", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="estudio" id="q1-estudio" />
                    <Label htmlFor="q1-estudio">Estudio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trabajo" id="q1-trabajo" />
                    <Label htmlFor="q1-trabajo">Trabajo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ambos" id="q1-ambos" />
                    <Label htmlFor="q1-ambos">Ambos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ninguno" id="q1-ninguno" />
                    <Label htmlFor="q1-ninguno">Ninguno</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">¿En qué horario lo haces?</h3>
                <RadioGroup
                  value={answers.step1.q2}
                  onValueChange={(value) => handleAnswerChange("q2", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manana" id="q2-manana" />
                    <Label htmlFor="q2-manana">Mañana (8:00 - 12:00)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tarde" id="q2-tarde" />
                    <Label htmlFor="q2-tarde">Tarde (12:00 - 18:00)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="noche" id="q2-noche" />
                    <Label htmlFor="q2-noche">Noche (18:00 - 22:00)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="variable" id="q2-variable" />
                    <Label htmlFor="q2-variable">Horario variable</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">¿Cuánta disponibilidad podrías dedicarte a vos?</h3>
                <RadioGroup
                  value={answers.step1.q3}
                  onValueChange={(value) => handleAnswerChange("q3", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poco" id="q3-poco" />
                    <Label htmlFor="q3-poco">Poco (1-2 horas por semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medio" id="q3-medio" />
                    <Label htmlFor="q3-medio">Medio (3-5 horas por semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mucho" id="q3-mucho" />
                    <Label htmlFor="q3-mucho">Mucho (más de 5 horas por semana)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Paso 2 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">¿Prefieres practicar yoga solo o en grupo?</h3>
                <RadioGroup
                  value={answers.step2.q1}
                  onValueChange={(value) => handleAnswerChange("q1", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="solo" id="q4-solo" />
                    <Label htmlFor="q4-solo">Solo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grupo" id="q4-grupo" />
                    <Label htmlFor="q4-grupo">En grupo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ambos" id="q4-ambos" />
                    <Label htmlFor="q4-ambos">Ambos</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">¿En qué país de habla hispana vives?</h3>
                <RadioGroup
                  value={answers.step2.q2}
                  onValueChange={(value) => handleAnswerChange("q2", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="argentina" id="q5-argentina" />
                    <Label htmlFor="q5-argentina">Argentina</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="espana" id="q5-espana" />
                    <Label htmlFor="q5-espana">España</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mexico" id="q5-mexico" />
                    <Label htmlFor="q5-mexico">México</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="otro" id="q5-otro" />
                    <Label htmlFor="q5-otro">Otro país</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-medium">
                  ¿Tienes disponibilidad para viajar, y lo harías si pudieras?
                </h3>
                <RadioGroup
                  value={answers.step2.q3}
                  onValueChange={(value) => handleAnswerChange("q3", value)}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="q6-si" />
                    <Label htmlFor="q6-si">Sí, me encantaría</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quiza" id="q6-quiza" />
                    <Label htmlFor="q6-quiza">Quizá, depende del destino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="q6-no" />
                    <Label htmlFor="q6-no">No, prefiero quedarme en mi ciudad</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

        </CardContent>

        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevStep} variant="outline" disabled={currentStep === 1}>
            Anterior
          </Button>

          <Button
            onClick={handleNextStep}
            disabled={!isCurrentStepComplete()}
            className="bg-[#305891] hover:bg-[#3D6CAC]"
          >
            {currentStep === 2 ? "Finalizar" : "Siguiente"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
