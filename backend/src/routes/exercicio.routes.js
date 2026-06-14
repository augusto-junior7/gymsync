import { Router } from 'express'
import {
  exercicios,
  exerciciosId,
} from '../controllers/exerciciosController.js'

const router = Router()

router.get('/', exercicios)
router.get('/:id', exerciciosId)

export default router
