import { Router } from 'express'
import {
  iniciarSessao,
  encerrarSessao,
  historico,
  sessaoPorId,
  deletarSessao,
} from '../controllers/sessoesTreinoController.js'
import autenticar from '../middlewares/autenticar.js'

const router = Router()

// Todas as rotas de sessões exigem autenticação
router.use(autenticar)

// Rota de listagem específica (deve vir antes de /:id para não conflitar)
router.get('/historico', historico)

// Rota de criação (inicia uma nova sessão)
router.post('/', iniciarSessao)

// Rotas por ID
router.get('/:id', sessaoPorId)
router.patch('/:id/encerrar', encerrarSessao)
router.delete('/:id', deletarSessao)

export default router
