import { Router } from "express";
import Exercicio from "../models/exercicio.js";
import {
  exercicios,
  exerciciosId,
} from "../controllers/exerciciosController.js";

const router = Router();

router.get('/', exercicios);
router.get('/:id', exerciciosId);

export default router;
