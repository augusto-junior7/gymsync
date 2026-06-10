import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Exercise from '../models/Exercise.js'
import exercicios from '../data/exercicios.json' with { type: 'json' }

dotenv.config()

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('Mongo conectado')

    await Exercise.deleteMany()

    await Exercise.insertMany(exercicios)

    console.log(`${exercicios.length} exercícios inseridos`)

    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed()
