import mongoose from 'mongoose'

// Sub-schema de uma série dentro de um exercício do plano
// O plano define estrutura (séries, reps, tempo) — nunca pesos,
// pois eles variam por pessoa e progridem com o tempo.
const seriePlanoSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: ['repeticao', 'tempo'], // "repeticao" = peso + reps | "tempo" = prancha, wall-sit, etc.
    },
    repeticoes: {
      type: Number,
      default: null, // preenchido apenas quando tipo === 'repeticao'
    },
    duracaoSegundos: {
      type: Number,
      default: null, // preenchido apenas quando tipo === 'tempo'
    },
  },
  { _id: false } // séries não precisam de ID próprio dentro do plano
)

// Sub-schema de um exercício dentro do plano
const exercicioPlanoSchema = new mongoose.Schema(
  {
    exercicioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercicio',
      required: true,
    },
    ordemExecucao: {
      type: Number,
      required: true, // define a sequência dos exercícios no plano
    },
    series: {
      type: [seriePlanoSchema],
      required: true,
      validate: {
        validator: (series) => series.length > 0,
        message: 'Um exercício deve ter ao menos uma série.',
      },
    },
    observacoes: {
      type: String,
      default: null,
      trim: true, // ex.: "descer controlado", "foco na contração"
    },
  },
  { _id: false }
)

const planoTreinoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true, // criador do plano
    },
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      default: null,
      trim: true,
    },
    visibilidade: {
      type: String,
      required: true,
      enum: ['publico', 'privado'],
      default: 'privado',
    },
    // Usuários com quem o plano foi compartilhado individualmente
    // (só relevante quando visibilidade === 'privado')
    compartilhadoCom: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Usuario',
      default: [],
    },
    // Usuários que salvaram esse plano na sua lista
    salvoPor: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Usuario',
      default: [],
    },
    exercicios: {
      type: [exercicioPlanoSchema],
      required: true,
      validate: {
        validator: (exercicios) => exercicios.length > 0,
        message: 'Um plano deve ter ao menos um exercício.',
      },
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  }
)

const PlanoTreino = mongoose.model('PlanoTreino', planoTreinoSchema)

export default PlanoTreino
