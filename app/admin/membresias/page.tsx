'use client';

import React, { JSX, useEffect, useState } from 'react';
import { Package, Plus, Edit, Trash2, DollarSign, Calendar, Sparkles, TrendingUp, X, CheckCircle2 } from 'lucide-react';
import { DeleteMembershipModal } from '@/components/admin/membership/deleteMembershipModal';

// Tipos
interface ClassType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ClassTypeAllocation {
  classTypeId: string;
  count: number;
}

interface Membership {
  description: string;
  _id: number;
  name: string;
  price: number;
  classCount: number;
  classTypes: string[];
  classTypeAllocations?: ClassTypeAllocation[];
  createdAt: string;
}

interface FormData {
  description: string;
  name: string;
  price: string;
  classCount: string;
  classTypes: string[];
  classTypeAllocations: { [key: string]: number };
}

export default function MembershipsPage(): JSX.Element {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [membershipToDelete, setMembershipToDelete] = useState<Membership | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    classCount: '',
    classTypes: [],
    classTypeAllocations: {}
  });

  const classTypeOptions: ClassType[] = [
    { id: 'hatha', name: 'Hatha', icon: '🧘', color: 'bg-blue-100 text-blue-700' },
    { id: 'ashtanga', name: 'Ashtanga', icon: '🔥', color: 'bg-red-100 text-red-700' },
    { id: 'aereo', name: 'Aéreo', icon: '✨', color: 'bg-purple-100 text-purple-700' },
    { id: 'prenatal', name: 'Prenatal', icon: '🤰', color: 'bg-pink-100 text-pink-700' },
    { id: 'intensivo', name: 'Intensivo', icon: '⚡', color: 'bg-orange-100 text-orange-700' },
    { id: 'curso', name: 'Curso', icon: '📚', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'formacion', name: 'Formación', icon: '🎓', color: 'bg-green-100 text-green-700' },
    { id: 'exclusivo', name: 'Exclusivo', icon: '💎', color: 'bg-amber-100 text-amber-700' },
    { id: 'meditacion', name: 'Meditación', icon: '🧘‍♂️', color: 'bg-teal-100 text-teal-700' },
    { id: 'respiracion', name: 'Respiración', icon: '😤', color: 'bg-cyan-100 text-cyan-700' },
    { id: 'pranayama', name: 'Pranayama', icon: '🏵️', color: 'bg-violet-100 text-violet-700' },
    { id: 'virtual', name: 'Clase Virtual', icon: '💻', color: 'bg-emerald-100 text-emerald-700' },
  ];

  const BASE_URL = 'https://pranabackend.onrender.com/api/membership';

  const fetchMemberships = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener membresías');
    return res.json();
  };

  useEffect(() => {
    fetchMemberships()
      .then(data => setMemberships(data))
      .catch(error => console.error('Error fetching memberships:', error));
  }, []);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClassTypeToggle = (classTypeId: string): void => {
    setFormData(prev => {
      const isCurrentlySelected = prev.classTypes.includes(classTypeId);
      const newClassTypes = isCurrentlySelected
        ? prev.classTypes.filter(id => id !== classTypeId)
        : [...prev.classTypes, classTypeId];

      const newAllocations = { ...prev.classTypeAllocations };
      if (isCurrentlySelected) {
        delete newAllocations[classTypeId];
      } else {
        newAllocations[classTypeId] = 1;
      }

      return {
        ...prev,
        classTypes: newClassTypes,
        classTypeAllocations: newAllocations
      };
    });
  };

  const handleClassTypeAllocationChange = (classTypeId: string, count: number): void => {
    setFormData(prev => ({
      ...prev,
      classTypeAllocations: {
        ...prev.classTypeAllocations,
        [classTypeId]: Math.max(0, count)
      }
    }));
  };

  const getTotalAllocatedClasses = (): number => {
    return Object.values(formData.classTypeAllocations).reduce((sum, count) => sum + count, 0);
  };

  const validateClassAllocations = (): boolean => {
    const totalClassCount = parseInt(formData.classCount) || 0;
    const totalAllocated = getTotalAllocatedClasses();
    return totalAllocated <= totalClassCount && totalAllocated > 0;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.price || !formData.classCount || formData.classTypes.length === 0) {
      alert('Por favor completa todos los campos');
      return;
    }

    const priceValue = parseFloat(formData.price);
    const classCountValue = parseInt(formData.classCount);

    if (isNaN(priceValue) || priceValue <= 0) {
      alert('Por favor ingresa un precio válido');
      return;
    }

    if (isNaN(classCountValue) || classCountValue <= 0) {
      alert('Por favor ingresa una cantidad de clases válida');
      return;
    }

    if (!validateClassAllocations()) {
      const totalAllocated = getTotalAllocatedClasses();
      if (totalAllocated === 0) {
        alert('Por favor asigna al menos 1 clase a los tipos seleccionados');
        return;
      }
    }

    const classTypeAllocations = Object.entries(formData.classTypeAllocations).map(([classTypeId, count]) => ({
      classTypeId,
      count
    }));

    const payload = {
      name: formData.name.trim(),
      description: formData.description,
      price: priceValue,
      classCount: classCountValue,
      classTypes: formData.classTypes,
      classTypeAllocations,
    };

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      let response, result: Membership;

      if (editingId) {
        response = await fetch(`${BASE_URL}/${editingId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Error al actualizar la membresía');
        result = await response.json();
        setMemberships(prev => prev.map(m => m._id === editingId ? result : m));
        setEditingId(null);
      } else {
        response = await fetch(BASE_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Error al crear la membresía');
        result = await response.json();
        setMemberships(prev => [...prev, result]);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Error al guardar la membresía');
    }
  };

  const resetForm = (): void => {
    setFormData({
      name: '',
      description: '',
      price: '',
      classCount: '',
      classTypes: [],
      classTypeAllocations: {}
    });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (membership: Membership): void => {
    const allocations: { [key: string]: number } = {};
    if (membership.classTypeAllocations) {
      membership.classTypeAllocations.forEach(allocation => {
        allocations[allocation.classTypeId] = allocation.count;
      });
    }

    setFormData({
      name: membership.name,
      description: membership.description,
      price: membership.price.toString(),
      classCount: membership.classCount.toString(),
      classTypes: membership.classTypes,
      classTypeAllocations: allocations
    });
    setEditingId(membership._id);
    setIsCreating(true);
  };

  const handleDelete = (membership: Membership) => {
    setMembershipToDelete(membership);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!membershipToDelete) return;

    const token = localStorage.getItem('token');
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const res = await fetch(`${BASE_URL}/${membershipToDelete._id}`, {
        method: 'DELETE',
        headers,
      });

      if (!res.ok) throw new Error('Error al eliminar la membresía');
      setMemberships(prev => prev.filter(m => m._id !== membershipToDelete._id));
      setIsDeleteModalOpen(false);
      setMembershipToDelete(null);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'No se pudo eliminar la membresía');
    }
  };

  const getClassTypeInfo = (typeId: string): ClassType | undefined => {
    return classTypeOptions.find(option => option.id === typeId);
  };

  const calculateAveragePrice = (): number => {
    if (memberships.length === 0) return 0;
    return memberships.reduce((acc, m) => acc + m.price, 0) / memberships.length;
  };

  const calculateAverageClasses = (): number => {
    if (memberships.length === 0) return 0;
    return Math.round(memberships.reduce((acc, m) => acc + m.classCount, 0) / memberships.length);
  };

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
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Package className="h-8 w-8 text-white" />
                  Planes de Abono
                </h1>
                <p className="text-white/90 text-base">Gestiona las membresías de tu estudio</p>
              </div>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="bg-white text-[#5862f0] hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-6 py-3 flex items-center gap-2 font-semibold"
              type="button"
            >
              <Plus className="h-5 w-5" />
              Nueva Membresía
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 ">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 -mt-8 mb-8 ">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">Total Membresías</p>
                <p className="text-4xl font-bold text-gray-900">{memberships.length}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-[#5862f0] to-[#7d86ff] rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">Precio Promedio</p>
                <p className="text-4xl font-bold text-gray-900">
                  ${calculateAveragePrice().toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#5862f0] hover:shadow-xl transition-shadow z-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wide">Clases Promedio</p>
                <p className="text-4xl font-bold text-gray-900">{calculateAverageClasses()}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Grid de Membresías */}
        <div className="pb-12">
          {memberships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {memberships.map((membership: Membership) => (
                <div
                  key={membership._id}
                  className="flex flex-col h-full justify-between bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:border-[#5862f0] transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Header de la card */}
                  <div className="relative bg-gradient-to-br from-[#6366f1] via-[#7c3aed] to-[#8b5cf6] p-6 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                          backgroundSize: '20px 20px',
                        }}
                      ></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white flex-1 line-clamp-2">
                          {membership.name}
                        </h3>
                      </div>
                      <p className="text-white/90 text-sm line-clamp-2 leading-relaxed">
                        {membership.description}
                      </p>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5 space-y-4 flex-1">
                    {/* Precio */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
                          Precio
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${membership.price.toLocaleString('es-AR')}
                        </p>
                      </div>
                    </div>

                    {/* Clases */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                          Clases incluidas
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {membership.classCount}
                        </p>
                      </div>
                    </div>

                    {/* Tipos de clase */}
                    <div>
                      <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-600" />
                        Tipos incluidos
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {membership.classTypes.map((typeId: string) => {
                          const typeInfo = getClassTypeInfo(typeId);
                          const allocation = membership.classTypeAllocations?.find(
                            (a) => a.classTypeId === typeId
                          );
                          return (
                            <span
                              key={typeId}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${typeInfo?.color || 'bg-gray-100 text-gray-800'
                                }`}
                              title={
                                allocation ? `${allocation.count} clases` : undefined
                              }
                            >
                              {typeInfo?.icon} {typeInfo?.name}
                              {allocation && ` (${allocation.count})`}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Footer con acciones */}
                  <div className="flex gap-3 p-5 border-t-2 border-gray-200 bg-gray-50 mt-auto">
                    <button
                      onClick={() => handleEdit(membership)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 rounded-xl transition-all duration-300 font-semibold"
                      type="button"
                    >
                      <Edit className="h-4 w-4" />
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(membership)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-xl transition-all duration-300 font-semibold"
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-16 border-2 border-gray-200 text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No hay membresías creadas
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
                Comienza creando tu primera membresía para tu estudio de yoga
              </p>
              <button
                onClick={() => setIsCreating(true)}
                type="button"
                className="bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] text-white px-8 py-4 rounded-xl flex items-center gap-3 mx-auto transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
              >
                <Plus className="h-5 w-5" />
                Crear Primera Membresía
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Modal de Creación/Edición */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header del modal */}
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
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {editingId ? 'Editar' : 'Crear Nueva'} Membresía
                    </h3>
                    <p className="text-white/90">Completa la información del plan</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                  type="button"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Contenido del modal scrolleable */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2  items-center gap-2">
                  Nombre de la Membresía
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="ej. Membresía Premium"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5862f0] focus:border-[#5862f0] transition-all"
                  maxLength={100}
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Descripción
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="ej. Ideal para quienes buscan..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5862f0] focus:border-[#5862f0] transition-all"
                  maxLength={100}
                />
              </div>

              {/* Precio y Cantidad */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 items-center gap-2">
                    Precio en pesos argentinos (ARS)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="25000"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5862f0] focus:border-[#5862f0] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2  items-center gap-2">
                    Cantidad total de Clases
                  </label>
                  <input
                    type="number"
                    value={formData.classCount}
                    onChange={(e) => handleInputChange('classCount', e.target.value)}
                    placeholder="4"
                    min="1"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5862f0] focus:border-[#5862f0] transition-all"
                  />
                </div>
              </div>

              {/* Indicador de clases asignadas */}
              {formData.classCount && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-900 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Clases asignadas: {getTotalAllocatedClasses()} / {formData.classCount}
                    </span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${getTotalAllocatedClasses() === parseInt(formData.classCount)
                      ? 'bg-green-100 text-green-700'
                      : getTotalAllocatedClasses() > parseInt(formData.classCount)
                        ? 'bg-red-100 text-red-700'
                        : 'bg-orange-100 text-orange-700'
                      }`}>
                      {getTotalAllocatedClasses() === parseInt(formData.classCount)
                        ? '✓ Completo'
                        : getTotalAllocatedClasses() > parseInt(formData.classCount)
                          ? '⚠ Excedido'
                          : `${parseInt(formData.classCount) - getTotalAllocatedClasses()} restantes`
                      }
                    </span>
                  </div>
                </div>
              )}

              {/* Tipos de Clase */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Tipos de Clase y Asignación *
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Selecciona los tipos y asigna cuántas clases de cada tipo incluye
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {classTypeOptions.map((option: ClassType) => {
                    const isSelected = formData.classTypes.includes(option.id);
                    const currentCount = formData.classTypeAllocations[option.id] || 0;

                    return (
                      <div
                        key={option.id}
                        className={`border-2 rounded-xl transition-all duration-300 ${isSelected
                          ? 'border-[#5862f0] bg-[#5862f0]/5 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <div
                          onClick={() => handleClassTypeToggle(option.id)}
                          className="p-4 cursor-pointer"
                          role="button"
                          tabIndex={0}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{option.icon}</span>
                            <div className="flex-1">
                              <span className="font-bold text-gray-900 block">
                                {option.name}
                              </span>
                              {isSelected && (
                                <div className="flex items-center gap-1 text-sm text-[#5862f0] font-bold mt-1">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Incluido
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="px-4 pb-4 border-t border-[#5862f0]/20">
                            <div className="flex items-center gap-2 mt-3">
                              <label className="text-sm font-bold text-[#5862f0]">
                                Clases:
                              </label>
                              <input
                                type="number"
                                min="0"
                                max={formData.classCount || 999}
                                value={currentCount}
                                onChange={(e) =>
                                  handleClassTypeAllocationChange(
                                    option.id,
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="flex-1 px-3 py-2 border-2 border-[#5862f0]/30 rounded-lg focus:ring-2 focus:ring-[#5862f0] focus:border-[#5862f0] text-sm"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer del modal */}
            <div className="border-t-2 border-gray-200 bg-white px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={resetForm}
                  type="button"
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="flex-1 bg-gradient-to-r from-[#5862f0] to-[#7d86ff] hover:from-[#4051d9] hover:to-[#6b75e8] text-white px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:scale-105"
                >
                  <Sparkles className="h-5 w-5" />
                  {editingId ? 'Actualizar' : 'Crear'} Membresía
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Eliminación */}
      <DeleteMembershipModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setMembershipToDelete(null);
        }}
        membership={membershipToDelete}
        onConfirm={confirmDelete}
        classTypeOptions={classTypeOptions}
      />
    </div>
  );
}