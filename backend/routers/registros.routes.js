import { Router } from 'express';
import { createRegistro, getRegistrosPorCategoria, obtenerRegistros } from '../controller/registros.controller.js';

const router = Router();

router.get('/list', obtenerRegistros);
router.post('/create', createRegistro);
router.get('/categoria/:categoria', getRegistrosPorCategoria);

export default router;
