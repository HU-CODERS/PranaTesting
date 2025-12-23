// types/schedule.ts
export interface Teacher {
  id: string
  name: string
}

export interface ClassType {
  id: string
  name: string
  description?: string
}

export interface ClassSchedule {
  id: string
  classTypeId: string
  classTypeName: string
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6
  startTime: string
  endTime: string
  teacherIds: string[]
  teachers: Teacher[]
  isActive: boolean
}

export interface UpdateScheduleDto {
  dayOfWeek?: number
  startTime?: string
  endTime?: string
  teacherIds?: string[]
  isActive?: boolean
}