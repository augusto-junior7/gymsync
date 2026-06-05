import { Router } from 'express'
import { registrar, login, atualizar } from '../controllers/usuarioController.js'
import autenticar from '../middlewares/autenticar.js'
import Usuario from '../models/Usuario.js'

const router = Router()

router.put('/atualizar', autenticar, atualizar)

router.post('/registrar', registrar)
router.post('/login', login)

router.get('/perfil', autenticar, async (req, res) => {
  const usuario = await Usuario.findById(req.usuarioId)
  res.json(usuario)
})

export default router
