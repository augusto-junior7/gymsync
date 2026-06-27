import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url' // Essencial para o __dirname
import path from 'path'
import Exercicio from '../models/Exercicio.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Atlas conectado')

    const caminhoJson = path.resolve(__dirname, './data/exercicios.json')

    // Lendo o JSON de exercícios
    const dadosBrutos = fs.readFileSync(caminhoJson, 'utf-8')
    const exerciciosJson = JSON.parse(dadosBrutos)

    console.log(
      `Encontrados ${exerciciosJson.length} exercícios. Formatando dados...`
    )

    // Mapeando os nomes dos atributos do JSON para o formato do Schema (em português)
    const exerciciosFormatados = exerciciosJson.map((ex) => {
      // Garantir que os níveis tenham acento conforme o enum do Schema
      let nivelAjustado = ex.level;
      if (nivelAjustado === 'intermediario') nivelAjustado = 'intermediário';
      if (nivelAjustado === 'avancado') nivelAjustado = 'avançado';

      return {
        nome: ex.name,
        forca: ex.force || null,
        nivel: nivelAjustado,
        mecanica: ex.mechanic || null,
        equipamento: ex.equipment || null,
        musculosPrincipais: ex.primaryMuscles,
        musculosSecundarios: ex.secondaryMuscles || [],
        instrucoes: ex.instructions,
        categoria: ex.category || null,
        imagens: ex.images || [],
      }
    })

    await Exercicio.deleteMany()

    await Exercicio.insertMany(exerciciosFormatados)
    console.log('Banco semeado com sucesso')
    console.log(`${exerciciosFormatados.length} exercícios inseridos`)

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('Erro ao semear o banco', error)
    process.exit(1)
  }
}

seed()
