export interface Clase {
  teacher: any;
  id: number | string;
  titulo: string;
  tipo: string;
  dia: string;
  hora: string;
  profesor: string;
  duracion: number;
  capacidad: number;
  modalidad: string;
  precio: number;
  incluye: string;
  detalles: string;
  participants: any[]; // Cambiar de string[] a any[] para incluir objetos completos
  oldParticipants: any[]; // ✅ AGREGADO
  fechaInicio: string | undefined;
  fechaFin: string | undefined;
}
