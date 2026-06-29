import { Router } from 'express'
import {
  compartilhamento,
  listarNotificacoes,
  resNotificacao,
} from '../controllers/notificacaoController.js'
import autenticar from '../middlewares/autenticar.js'

const router = Router()

router.get('/', autenticar, listarNotificacoes)

router.post('/compartilhamento', autenticar, compartilhamento)

router.patch('/:id/responder/', autenticar, resNotificacao)

export default router
