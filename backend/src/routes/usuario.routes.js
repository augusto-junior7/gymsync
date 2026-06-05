import { Router } from 'express'
import { registrar, entrar } from '../controllers/usuarioController.js'
import autenticar from '../middlewares/autenticar.js'
import Usuario from '../models/Usuario.js'

const router = Router()

router.post('/registrar', registrar)
router.post('/entrar', entrar)

router.get('/perfil', autenticar, async (req, res) => {
  const usuario = await Usuario.findById(req.usuarioId).select('-senha')
  res.json(usuario)
})

export default router
