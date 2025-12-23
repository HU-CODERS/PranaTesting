'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function TokenVerifier() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || isVerifying) return
      setIsVerifying(true)
      try {
        const res = await fetch(`https://pranabackend.onrender.com/api/auth/verify?token=${token}`)
        const data = await res.json()
        if (res.ok) {
          toast.success("Cuenta verificada correctamente.")
        }
        const url = new URL(window.location.href)
        url.searchParams.delete("token")
        window.history.replaceState({}, '', url.toString())
      } catch (error) {
        toast.error("Error al conectar con el servidor de verificación.")
      } finally {
        setIsVerifying(false)
      }
    }

    verifyToken()
  }, [token, isVerifying])

  return null
}
