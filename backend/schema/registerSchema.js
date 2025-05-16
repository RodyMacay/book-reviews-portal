import { z } from 'zod';

export const RegistroSchema = z.object({
  tituloReseña: z.string().min(1, { message: "El título es obligatorio" }),
  autor: z.string().min(1, { message: "El autor es obligatorio" }),
  resena: z.string().min(1, { message: "La reseña es obligatoria" }),
  categoria: z.string().min(1, { message: "La categoría es obligatoria" }),
  puntuacion: z.coerce.number(),
  tituloLibro: z.string().min(1, { message: "El título del libro es obligatorio" }),
  imagen: z.string().optional(),
  fecha: z.date().optional(), 
});