import { Router } from 'express';
import { createRegistro, getRegistrosPorCategoria, obtenerRegistros } from '../controller/registros.controller.js';

const router = Router();

router.get('/list', obtenerRegistros);

export default router;
