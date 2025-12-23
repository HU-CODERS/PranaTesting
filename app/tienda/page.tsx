"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart, Star, Filter, ChevronRight, Plus, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

interface Producto {
    id: number
    nombre: string
    categoria: string
    precio: string
    precioNumerico: number
    descripcion: string
    imagen: string
    rating: number
    stock: number
    destacado: boolean
}

interface CartItem extends Producto {
    cantidad: number
}

export default function TiendaPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const logged = localStorage.getItem('isLogged') === 'true'
        setIsLoggedIn(logged)
    }, [])

    const productos: Producto[] = [
        {
            id: 1,
            nombre: "Mat Premium Ecológico",
            categoria: "Mats",
            precio: "AR$ 28.000",
            precioNumerico: 28000,
            descripcion: "Mat de yoga premium ecológico, antideslizante, 5mm de espesor. Material biodegradable de caucho natural.",
            imagen: "/f1.jpg",
            rating: 4.9,
            stock: 15,
            destacado: true
        },
        {
            id: 2,
            nombre: "Bloque de Corcho Natural",
            categoria: "Accesorios",
            precio: "AR$ 12.500",
            precioNumerico: 12500,
            descripcion: "Bloque de yoga de corcho 100% natural. Ligero, resistente y sostenible. Ideal para apoyo en asanas.",
            imagen: "/f2.jpg",
            rating: 4.8,
            stock: 25,
            destacado: false
        },
        {
            id: 3,
            nombre: "Cinturón de Yoga Algodón",
            categoria: "Accesorios",
            precio: "AR$ 6.500",
            precioNumerico: 6500,
            descripcion: "Cinturón de algodón orgánico de 2.5m con hebilla metálica ajustable. Perfecto para estiramientos.",
            imagen: "/f3.jpg",
            rating: 4.7,
            stock: 30,
            destacado: false
        },
        {
            id: 4,
            nombre: "Set de Meditación Completo",
            categoria: "Meditación",
            precio: "AR$ 45.000",
            precioNumerico: 45000,
            descripcion: "Set completo: zafu, zabuton, incienso y cuenco tibetano. Todo lo necesario para tu práctica de meditación.",
            imagen: "/f4.jpg",
            rating: 5.0,
            stock: 8,
            destacado: true
        },
        {
            id: 5,
            nombre: "Bolso para Mat Artesanal",
            categoria: "Bolsos",
            precio: "AR$ 15.000",
            precioNumerico: 15000,
            descripcion: "Bolso artesanal de tela resistente con diseños únicos. Espacio para mat, botella y accesorios.",
            imagen: "/f1.jpg",
            rating: 4.6,
            stock: 20,
            destacado: false
        },
        {
            id: 6,
            nombre: "Aceite Esencial Lavanda",
            categoria: "Aromaterapia",
            precio: "AR$ 8.500",
            precioNumerico: 8500,
            descripcion: "Aceite esencial puro de lavanda orgánica 15ml. Ideal para relajación y aromaterapia.",
            imagen: "/f2.jpg",
            rating: 4.9,
            stock: 35,
            destacado: false
        },
        {
            id: 7,
            nombre: "Manta de Yoga Mexicana",
            categoria: "Mantas",
            precio: "AR$ 18.000",
            precioNumerico: 18000,
            descripcion: "Manta tejida tradicional mexicana. Multiuso: para savasana, apoyo en asanas o decoración.",
            imagen: "/f3.jpg",
            rating: 4.8,
            stock: 12,
            destacado: false
        },
        {
            id: 8,
            nombre: "Cojín de Meditación Zafu",
            categoria: "Meditación",
            precio: "AR$ 22.000",
            precioNumerico: 22000,
            descripcion: "Zafu relleno de espelta orgánica con funda de algodón lavable. Altura ideal para meditación.",
            imagen: "/f4.jpg",
            rating: 4.9,
            stock: 10,
            destacado: true
        },
        {
            id: 9,
            nombre: "Cuenco Tibetano 12cm",
            categoria: "Sonido",
            precio: "AR$ 35.000",
            precioNumerico: 35000,
            descripcion: "Cuenco tibetano artesanal de 12cm con mazo. Sonido profundo para meditación y limpieza energética.",
            imagen: "/f1.jpg",
            rating: 5.0,
            stock: 6,
            destacado: true
        },
        {
            id: 10,
            nombre: "Kit de Inciensos Naturales",
            categoria: "Aromaterapia",
            precio: "AR$ 7.500",
            precioNumerico: 7500,
            descripcion: "Set de 6 variedades de incienso natural: sándalo, palo santo, salvia, lavanda, rosa y jazmín.",
            imagen: "/f2.jpg",
            rating: 4.7,
            stock: 40,
            destacado: false
        },
        {
            id: 11,
            nombre: "Remera Prana Organic Cotton",
            categoria: "Ropa",
            precio: "AR$ 16.000",
            precioNumerico: 16000,
            descripcion: "Remera de algodón orgánico con logo Prana. Suave, transpirable y de comercio justo.",
            imagen: "/f3.jpg",
            rating: 4.8,
            stock: 22,
            destacado: false
        },
        {
            id: 12,
            nombre: "Botella de Vidrio con Funda",
            categoria: "Accesorios",
            precio: "AR$ 9.500",
            precioNumerico: 9500,
            descripcion: "Botella de vidrio borosilicato 750ml con funda protectora de neopreno. Libre de BPA.",
            imagen: "/f4.jpg",
            rating: 4.6,
            stock: 28,
            destacado: false
        }
    ]

    const categorias = ["Todos", "Mats", "Accesorios", "Meditación", "Bolsos", "Aromaterapia", "Mantas", "Sonido", "Ropa"]

    const filteredProductos = productos.filter(producto => {
        return selectedCategory === "all" || producto.categoria === selectedCategory
    })

    const productosDestacados = productos.filter(p => p.destacado)

    const addToCart = (producto: Producto) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === producto.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: Math.min(item.cantidad + 1, item.stock) }
                        : item
                )
            }
            return [...prevCart, { ...producto, cantidad: 1 }]
        })
        setIsCartOpen(true)
    }

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: number, delta: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? { ...item, cantidad: Math.max(1, Math.min(item.cantidad + delta, item.stock)) }
                    : item
            )
        )
    }

    const cartTotal = cart.reduce((total, item) => total + item.precioNumerico * item.cantidad, 0)
    const cartItemCount = cart.reduce((count, item) => count + item.cantidad, 0)

    return (
        <>
            <SiteHeader />
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center">
                    <div className="absolute inset-0">
                        <Image
                            src="/f4.jpg"
                            alt="Tienda Prana"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Tienda Prana
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-light">
                            Productos conscientes para tu práctica y bienestar
                        </p>
                    </div>
                </section>

                {/* Cart Button Floating */}
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-24 md:bottom-8 right-4 z-40 bg-[#5862f0] text-white p-4 rounded-full shadow-2xl hover:bg-[#3c4ac6] transition-all duration-300 hover:scale-110"
                >
                    <ShoppingBag className="h-6 w-6" />
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#826597] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                </button>

                {/* Cart Sidebar */}
                {isCartOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsCartOpen(false)}>
                        <div
                            className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-white shadow-2xl overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
                                <h2 className="text-2xl font-bold text-[#5862f0]">Tu Carrito</h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="text-gray-600 hover:text-[#5862f0]"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                {cart.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">Tu carrito está vacío</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-4 mb-6">
                                            {cart.map((item) => (
                                                <div key={item.id} className="bg-[#F6F4F1] rounded-lg p-4">
                                                    <div className="flex gap-4">
                                                        <div className="relative w-20 h-20 flex-shrink-0">
                                                            <Image
                                                                src={item.imagen}
                                                                alt={item.nombre}
                                                                fill
                                                                className="object-cover rounded"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-gray-800 text-sm mb-1">{item.nombre}</h3>
                                                            <p className="text-[#5862f0] font-bold text-sm">{item.precio}</p>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, -1)}
                                                                    className="w-6 h-6 bg-white rounded flex items-center justify-center hover:bg-gray-100"
                                                                >
                                                                    <Minus className="h-3 w-3" />
                                                                </button>
                                                                <span className="text-sm font-semibold w-8 text-center">{item.cantidad}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, 1)}
                                                                    className="w-6 h-6 bg-white rounded flex items-center justify-center hover:bg-gray-100"
                                                                >
                                                                    <Plus className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-gray-400 hover:text-red-500"
                                                        >
                                                            <X className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t pt-4 mb-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-lg font-bold text-gray-800">Total:</span>
                                                <span className="text-2xl font-bold text-[#5862f0]">
                                                    AR$ {cartTotal.toLocaleString('es-AR')}
                                                </span>
                                            </div>
                                            <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white py-6 text-lg">
                                                Finalizar Compra
                                                <ChevronRight className="ml-2 h-5 w-5" />
                                            </Button>
                                            <p className="text-xs text-gray-500 mt-3 text-center">
                                                Envío gratis en compras superiores a AR$ 50.000
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Productos Destacados */}
                {productosDestacados.length > 0 && (
                    <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                                Productos Destacados
                            </h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                {productosDestacados.map((producto) => (
                                    <div key={producto.id} className="bg-white rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="relative h-32 mb-3">
                                            <Image
                                                src={producto.imagen}
                                                alt={producto.nombre}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-sm mb-2">{producto.nombre}</h3>
                                        <p className="text-[#5862f0] font-bold text-lg">{producto.precio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Filtros */}
                <section className="py-8 px-4 bg-[#F6F4F1] border-t border-gray-200">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <Filter className="h-5 w-5 text-[#5862f0]" />
                            <h2 className="text-xl font-bold text-gray-800">Filtrar Productos</h2>
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-transparent"
                        >
                            {categorias.map((cat) => (
                                <option key={cat} value={cat === "Todos" ? "all" : cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                {/* Catálogo de Productos */}
                <section className="py-16 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                            Todos los Productos
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProductos.map((producto) => (
                                <div
                                    key={producto.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative h-48">
                                        <Image
                                            src={producto.imagen}
                                            alt={producto.nombre}
                                            fill
                                            className="object-cover"
                                        />
                                        {producto.destacado && (
                                            <div className="absolute top-2 right-2 bg-[#826597] text-white px-2 py-1 rounded text-xs font-semibold">
                                                DESTACADO
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-semibold text-gray-700">{producto.rating}</span>
                                            <span className="text-xs text-gray-500 ml-1">({producto.stock} disponibles)</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{producto.nombre}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{producto.descripcion}</p>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{producto.categoria}</span>
                                            <span className="text-xl font-bold text-[#5862f0]">{producto.precio}</span>
                                        </div>
                                        {!isMounted ? (
                                            <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white" disabled>
                                                Cargando...
                                            </Button>
                                        ) : isLoggedIn ? (
                                            <Button
                                                onClick={() => addToCart(producto)}
                                                className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white"
                                            >
                                                <ShoppingBag className="h-4 w-4 mr-2" />
                                                Agregar al Carrito
                                            </Button>
                                        ) : (
                                            <Link href="/login" className="block w-full">
                                                <Button className="w-full bg-[#5862f0] hover:bg-[#3c4ac6] text-white">
                                                    Iniciar Sesión para Comprar
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredProductos.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    No se encontraron productos en esta categoría
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Información de Envíos */}
                <section className="py-16 px-4 bg-[#F6F4F1]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            Información de Compra
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShoppingBag className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#5862f0] mb-3">Envío a Todo el País</h3>
                                <p className="text-sm text-gray-600">
                                    Realizamos envíos a todo Argentina. Gratis en compras superiores a AR$ 50.000.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#5862f0] mb-3">Productos Conscientes</h3>
                                <p className="text-sm text-gray-600">
                                    Seleccionamos cuidadosamente productos sostenibles y de comercio justo.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                                <div className="w-16 h-16 bg-[#5862f0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Star className="h-8 w-8 text-[#5862f0]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#5862f0] mb-3">Garantía de Calidad</h3>
                                <p className="text-sm text-gray-600">
                                    Todos nuestros productos tienen garantía. Devolución sin cargo en 30 días.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 px-4 bg-gradient-to-r from-[#5862f0] to-[#826597]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            ¿Necesitás Asesoramiento?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 font-light">
                            Nuestro equipo puede ayudarte a elegir los productos ideales para tu práctica.
                        </p>
                        <a href="mailto:tienda@prana-om.com">
                            <Button size="lg" className="bg-white text-[#5862f0] hover:bg-gray-100 px-8 py-6 text-lg">
                                Contactar Equipo de Ventas
                            </Button>
                        </a>
                    </div>
                </section>
            </div>
            <SiteFooter />
        </>
    )
}
