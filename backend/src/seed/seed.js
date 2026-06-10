import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url' // Essencial para o __dirname
import path from 'path'
import Exercicio from '../models/exercicio.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Atlas conectado')


    const caminhoJson = path.resolve(__dirname, './data/exercicios.json');

    // Lendo o JSON de exercícios e transformando em arquivo json novamente
    const dadosBrutos = fs.readFileSync(caminhoJson, 'utf-8');
    const exerciciosIngles = JSON.parse(dadosBrutos);

    console.log(`Encontrados ${exerciciosIngles.length} exercícios. Traduzindo...`)

    // Traduzindo os nomes dos atributos do Json orighinal para o portugues
    const exerciciosPortugues = exerciciosIngles.map (ex => {
      return {
        nome: ex.name,
        forca: ex.force || null,
        nivel: ex.level,
        mecanica: ex.mechanic || null,
        equipamento: ex.equipment || null,
        musculosPrincipais: ex.primaryMuscles,
        musculosSecundarios: ex.secondaryMuscles || [],
        instrucoes: ex.instructions
      };
    });

    await Exercicio.deleteMany()

    await Exercicio.insertMany(exerciciosPortugues)
    console.log('Banco semeado com sucesso')
    console.log(`${exerciciosPortugues.length} exercícios inseridos`)

    await mongoose.disconnect();
    process.exit(0)
  } catch (error) {
    console.error("Erro ao semear o banco", error)
    process.exit(1)
  }
}

seed()
