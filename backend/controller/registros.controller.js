import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { RegistroSchema } from "../schema/registerSchema.js";

// Obtener __dirname con módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo registros.json
const rutaArchivo = path.join(__dirname, "..", "schema", "registros.json");

// GET: Obtener registros
export const obtenerRegistros = async (req, res) => {
  try {
    const data = await fs.readFile(rutaArchivo, "utf-8");
    const registros = JSON.parse(data);
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: "Error al leer los registros" });
  }
};

// GET: Obtener registros por categoría
export const getRegistrosPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params;
    const data = await fs.readFile(rutaArchivo, "utf-8");
    const registros = JSON.parse(data);
    const filtrados = registros.filter(
      (r) => r.categoria?.toLowerCase() === categoria.toLowerCase()
    );
    res.json(filtrados);
  } catch (err) {
    res.status(500).json({ error: "Error al filtrar registros" });
  }
};

// POST: Crear un nuevo registro
export const createRegistro = async (req, res) => {
  const parsed = RegistroSchema.safeParse(req.body);
  console.log(req.body);

  if (!parsed.success) {
    console.log("Error de validación:", parsed.error.flatten());
    return res.status(400).json({
      error: "Error de validación",
      detalles: parsed.error.flatten(),
    });
  }

  try {
    const data = JSON.parse(await fs.readFile(rutaArchivo, "utf-8"));

    // Se agrega la fecha de creación al registro
    const nuevoRegistro = {
      ...parsed.data,
      id: Date.now(),
      fecha: new Date(), // Asignar la fecha actual
    };

    data.push(nuevoRegistro);
    await fs.writeFile(rutaArchivo, JSON.stringify(data, null, 2));
    res.status(201).json(nuevoRegistro);
  } catch (err) {
    console.error("Error al guardar:", err.message);
    res.status(500).json({ error: "Error al guardar el registro" });
  }
};
