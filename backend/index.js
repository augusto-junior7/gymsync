import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import conectarBanco from './src/database/db.js'
import usuarioRoutes from './src/routes/usuario.routes.js'

dotenv.config()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

conectarBanco()

// Rotas
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo ao GymSync API!',
    serverTime: new Date().toISOString(),
    status: 'OK'
  })
})

app.use('/usuarios', usuarioRoutes)

app.listen(port, () => console.log(`Servidor ativo na porta ${port}`))
