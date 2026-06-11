import { Router } from 'express'
import Exercicio from '../models/exercicio.js'
import { exercicios } from '../controllers/exerciciosController.js'

const router = Router()

router.get('/exercicios', exercicios)

export default router
