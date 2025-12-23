import { Suspense } from 'react'
import ResetPasswordClient from './reset-password-client'
import { Lock } from 'lucide-react'

// Loading component para Suspense
function ResetPasswordLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <Lock className="h-8 w-8 text-[#305891] animate-pulse" />
        </div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    </div>
  )
}

// Componente principal con Suspense
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordClient />
    </Suspense>
  )
}