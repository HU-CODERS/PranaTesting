import { AlertTriangle, Trash2, Package, DollarSign, Calendar, X, TrendingUp } from "lucide-react"

interface DeleteMembershipModalProps {
  isOpen: boolean
  onClose: () => void
  membership: any
  onConfirm: () => void
  classTypeOptions: any[]
}

export function DeleteMembershipModal({
  isOpen,
  onClose,
  membership,
  onConfirm,
  classTypeOptions
}: DeleteMembershipModalProps) {
  if (!isOpen || !membership) return null

  const getClassTypeInfo = (typeId: string) => {
    return classTypeOptions.find(option => option.id === typeId)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-[550px] w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header con gradiente rojo */}
        <div className="relative bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white p-5 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg animate-pulse flex-shrink-0">
                <AlertTriangle className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white mb-0.5">
                  Eliminar Membresía
                </h3>
                <p className="text-white/90 text-sm">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Alert principal */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 mb-1 text-sm">Membresía a eliminar</h4>
                <p className="text-xs text-gray-600">
                  Se eliminará permanentemente toda la información del plan
                </p>
              </div>
            </div>

            {/* Info de la membresía */}
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-3 border-2 border-gray-200">
                {/* Nombre */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-md flex-shrink-0">
                    <Package className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-semibold uppercase">Plan</p>
                    <p className="text-base font-bold text-gray-900 truncate">{membership.name}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-3 pb-3 border-b border-gray-200 line-clamp-2">
                  {membership.description}
                </p>

                {/* Detalles en grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {/* Precio */}
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-2.5 border border-emerald-200">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs text-emerald-700 font-semibold uppercase">Precio</span>
                    </div>
                    <p className="text-base font-bold text-gray-900">
                      ${membership.price.toLocaleString('es-AR')}
                    </p>
                  </div>

                  {/* Clases */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2.5 border border-blue-200">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Calendar className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                      <span className="text-xs text-blue-700 font-semibold uppercase">Clases</span>
                    </div>
                    <p className="text-base font-bold text-gray-900">
                      {membership.classCount}
                    </p>
                  </div>
                </div>

                {/* Tipos de clase */}
                {membership.classTypes && membership.classTypes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <TrendingUp className="h-3.5 w-3.5 text-gray-600 flex-shrink-0" />
                      <span className="text-xs text-gray-600 font-semibold uppercase">Tipos incluidos</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {membership.classTypes.map((typeId: string) => {
                        const typeInfo = getClassTypeInfo(typeId)
                        const allocation = membership.classTypeAllocations?.find(
                          (a: any) => a.classTypeId === typeId
                        )
                        return (
                          <span
                            key={typeId}
                            className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                              typeInfo?.color || 'bg-gray-100 text-gray-800 border-gray-300'
                            }`}
                          >
                            {typeInfo?.icon} {typeInfo?.name}
                            {allocation && ` (${allocation.count})`}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Warning adicional */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-md animate-pulse">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-amber-900 mb-1.5 flex items-center gap-2 text-sm">
                  ⚠️ Advertencia Importante
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Esta membresía será eliminada <strong className="font-bold">permanentemente</strong>. 
                  Los usuarios que actualmente tengan este plan <strong className="font-bold">no se verán afectados</strong>, 
                  pero no podrán renovar ni adquirir este plan en el futuro.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmación final */}
          <div className="bg-gray-50 rounded-2xl p-3 border-2 border-gray-200">
            <p className="text-xs text-gray-700 text-center">
              ¿Estás seguro de que deseas eliminar esta membresía?
            </p>
          </div>
        </div>

        {/* Footer - fijo en la parte inferior */}
        <div className="border-t-2 border-gray-200 bg-white px-5 py-3 flex-shrink-0">
          <div className="flex flex-col-reverse sm:flex-row gap-2 justify-end">
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300 font-semibold text-sm"
            >
              <X className="h-4 w-4" />
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-sm"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar Definitivamente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}