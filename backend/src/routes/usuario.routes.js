import { Router } from 'express'
import {
  getPerfil,
  registrar,
  login,
  atualizar,
  redefinirSenha,
  solicitarRecuperacaoSenha,
} from '../controllers/usuariosController.js'
import autenticar from '../middlewares/autenticar.js'

const router = Router()

router.post('/registrar', registrar)
router.post('/login', login)

router.put('/atualizar', autenticar, atualizar)
router.post('/recuperacao-senha', solicitarRecuperacaoSenha)
router.post('/redefinir-senha', redefinirSenha)

router.get('/perfil', autenticar, getPerfil)
router.patch('/perfil', autenticar, atualizar)
export default router
