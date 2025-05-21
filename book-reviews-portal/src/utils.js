import { z } from "zod";

export const schema = z.object({
  tituloReseña: z.string().min(1, { message: "requerido" }),
  autor: z.string().min(1, { message: "Se requiere el autor" }),
  resena: z.string().min(1, { message: "La reseña es obligatoria" }),
  categoria: z.string().min(1, { message: "La categoría es obligatoria" }),
  puntuacion: z.coerce.number(),
  tituloLibro: z.string().min(1, { message: "El título del libro es obligatorio" }),
});