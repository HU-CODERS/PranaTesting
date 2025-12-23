// lib/api/schedule.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
import { ClassSchedule, Teacher, UpdateScheduleDto } from "@/app/types/schedule"

export const scheduleAPI = {
  getAll: async (): Promise<ClassSchedule[]> => {
    const response = await fetch(`${API_URL}/schedules`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) throw new Error('Error al obtener horarios')
    return response.json()
  },

  update: async (id: string, data: UpdateScheduleDto): Promise<ClassSchedule> => {
    const response = await fetch(`${API_URL}/schedules/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Error al actualizar horario')
    return response.json()
  },

  toggleActive: async (id: string): Promise<ClassSchedule> => {
    const response = await fetch(`${API_URL}/schedules/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) throw new Error('Error al cambiar estado')
    return response.json()
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/schedules/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) throw new Error('Error al eliminar horario')
  },
}

export const teachersAPI = {
  getAll: async (): Promise<Teacher[]> => {
    const response = await fetch(`${API_URL}/teachers`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    if (!response.ok) throw new Error('Error al obtener profesores')
    return response.json()
  },
}
