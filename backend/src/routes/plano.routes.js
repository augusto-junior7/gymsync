import { Router } from 'express'
import {
  criarPlano,
  meusPlanosf,
  planosSalvos,
  planosCompartilhados,
  explorarPlanos,
  planoPorId,
  atualizarPlano,
  deletarPlano,
  toggleSalvarPlano,
} from '../controllers/planosTreinoController.js'
import autenticar from '../middlewares/autenticar.js'

const router = Router()

// Todas as rotas de planos exigem autenticação
router.use(autenticar)

// Rotas de listagem específica (devem vir antes de /:id para não conflitar)
router.get('/meus', meusPlanosf)
router.get('/salvos', planosSalvos)
router.get('/compartilhados', planosCompartilhados)
router.get('/explorar', explorarPlanos)

// Rotas de criação
router.post('/', criarPlano)

// Rotas por ID
router.get('/:id', planoPorId)
router.patch('/:id', atualizarPlano)
router.delete('/:id', deletarPlano)

// Ação de salvar/remover um plano da lista do usuário (toggle)
router.patch('/:id/salvar', toggleSalvarPlano)

export default router
