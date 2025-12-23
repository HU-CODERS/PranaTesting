"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, Calendar, Package, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Loader from "@/components/loader"

export default function MisComprasPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [compras, setCompras] = useState<any[]>([])

    useEffect(() => {
        const logged = localStorage.getItem('isLogged') === 'true'
        if (!logged) {
            router.push('/login')
            return
        }

        // Datos de ejemplo
        const historialCompras = [
            {
                id: 1,
                fecha: "10 ENE 2025",
                items: [
                    { nombre: "Curso: Yoga para Principiantes", tipo: "curso", precio: 12000 },
                    { nombre: "Taller: Meditación y Mindfulness", tipo: "evento", precio: 8000 }
                ],
                total: 20000,
                metodoPago: "MercadoPago",
                estado: "pagado"
            },
            {
                id: 2,
                fecha: "05 ENE 2025",
                items: [
                    { nombre: "Mat Premium Ecológico", tipo: "producto", precio: 28000 }
                ],
                total: 28000,
                metodoPago: "Transferencia",
                estado: "pagado"
            }
        ]

        setCompras(historialCompras)
        setIsLoading(false)
    }, [router])

    const handleDescargarFactura = (compraId: number) => {
        alert(`Descargando factura #${compraId}...`)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen bg-[#F6F4F1]">
                <section className="bg-white border-b py-8 px-4">
                    <div className="max-w-6xl mx-auto">
                        <Link href="/perfil" className="inline-flex items-center gap-2 text-[#5862f0] hover:text-[#3c4ac6] mb-4 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Volver a Mi Cuenta
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-800">Historial de Compras</h1>
                        <p className="text-gray-600 mt-2">Revisa tus compras y descarga facturas</p>
                    </div>
                </section>

                <section className="py-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        {compras.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-12 text-center">
                                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">No tienes compras registradas</h2>
                                <p className="text-gray-600 mb-6">Explora nuestra tienda y servicios</p>
                                <Link href="/tienda">
                                    <Button className="bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                        Ver Tienda
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {compras.map((compra) => (
                                    <div key={compra.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                        {/* Header */}
                                        <div className="bg-gradient-to-r from-[#5862f0] to-[#826597] p-4">
                                            <div className="flex items-center justify-between text-white">
                                                <div>
                                                    <p className="text-sm opacity-90">Orden #{compra.id.toString().padStart(6, '0')}</p>
                                                    <p className="font-bold">{compra.fecha}</p>
                                                </div>
                                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                                                    {compra.estado === 'pagado' ? 'Pagado' : 'Pendiente'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Items */}
                                        <div className="p-6">
                                            <div className="space-y-3 mb-4">
                                                {compra.items.map((item: any, idx: number) => (
                                                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                                                        <div className="flex items-center gap-3">
                                                            <Package className="h-5 w-5 text-[#5862f0]" />
                                                            <div>
                                                                <p className="font-medium text-gray-800">{item.nombre}</p>
                                                                <p className="text-xs text-gray-500 capitalize">{item.tipo}</p>
                                                            </div>
                                                        </div>
                                                        <p className="font-semibold text-gray-800">AR$ {item.precio.toLocaleString()}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Footer */}
                                            <div className="flex items-center justify-between pt-4 border-t">
                                                <div className="text-sm text-gray-600">
                                                    <p>Método de pago: <span className="font-medium">{compra.metodoPago}</span></p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">Total</p>
                                                    <p className="text-2xl font-bold text-[#5862f0]">AR$ {compra.total.toLocaleString()}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mt-4">
                                                <Button
                                                    onClick={() => handleDescargarFactura(compra.id)}
                                                    variant="outline"
                                                    className="flex-1 border-[#5862f0] text-[#5862f0] hover:bg-[#5862f0]/10"
                                                >
                                                    <Download className="h-4 w-4 mr-2" />
                                                    Descargar Factura
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="flex-1"
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Ver Detalles
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Stats */}
                        {compras.length > 0 && (
                            <div className="grid md:grid-cols-3 gap-6 mt-8">
                                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                                    <ShoppingBag className="h-8 w-8 text-[#5862f0] mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-gray-800">{compras.length}</p>
                                    <p className="text-sm text-gray-600">Compras realizadas</p>
                                </div>
                                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                                    <Package className="h-8 w-8 text-[#826597] mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-gray-800">
                                        {compras.reduce((acc, c) => acc + c.items.length, 0)}
                                    </p>
                                    <p className="text-sm text-gray-600">Productos/Servicios</p>
                                </div>
                                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                                    <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                    <p className="text-3xl font-bold text-gray-800">
                                        AR$ {compras.reduce((acc, c) => acc + c.total, 0).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">Total invertido</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
