export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                {/* Logo animado */}
                <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-[#5862f0]/20"></div>
                    <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-[#5862f0] animate-spin"></div>
                </div>

                {/* Texto */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-xl font-bold text-[#5862f0]">PRANA OM</h2>
                    <p className="text-sm text-gray-600 animate-pulse">Cargando...</p>
                </div>
            </div>
        </div>
    )
}
