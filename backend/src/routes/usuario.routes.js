import { Router } from 'express'
import {
  getPerfil,
  registrar,
  login,
  atualizar,
} from '../controllers/usuarioController.js'
import autenticar from '../middlewares/autenticar.js'
import Usuario from '../models/Usuario.js'

const router = Router()

router.put('/atualizar', autenticar, atualizar)

router.post('/registrar', registrar)
router.post('/login', login)

router.get('/perfil', autenticar, getPerfil)

export default router
