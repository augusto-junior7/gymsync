import mongoose from 'mongoose'

// Sub-schema de uma série executada durante a sessão
// Aqui ficam os dados reais: peso, reps realizadas, descanso após a série.
const serieExecutadaSchema = new mongoose.Schema(
  {
    numeroSerie: {
      type: Number,
      required: true, // ex.: 1, 2, 3...
    },
    tipo: {
      type: String,
      required: true,
      enum: ['repeticao', 'tempo'],
    },
    pesoKg: {
      type: Number,
      default: null, // preenchido apenas quando tipo === 'repeticao'
    },
    repeticoes: {
      type: Number,
      default: null, // preenchido apenas quando tipo === 'repeticao'
    },
    duracaoSegundos: {
      type: Number,
      default: null, // preenchido apenas quando tipo === 'tempo'
    },
    // Tempo de descanso que o usuário tirou APÓS essa série específica
    descansoAposSerieSegundos: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
)

// Sub-schema de um exercício executado durante a sessão
const exercicioExecutadoSchema = new mongoose.Schema(
  {
    exercicioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercicio',
      required: true,
    },
    ordemExecucao: {
      type: Number,
      required: true, // ordem real em que foi executado (pode diferir do plano)
    },
    series: {
      type: [serieExecutadaSchema],
      default: [],
    },
    observacoes: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { _id: false }
)

const sessaoTreinoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true, // dono da sessão
    },
    // Referência opcional ao plano que deu origem a essa sessão.
    // null = treino instantâneo (livre), sem plano base.
    planoBaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlanoTreino',
      default: null,
    },
    dataInicio: {
      type: Date,
      required: true,
    },
    dataFim: {
      type: Date,
      default: null, // null enquanto o treino está em andamento
    },
    // Duração total em segundos (soma de ativo + descanso).
    // Calculado e salvo ao encerrar o treino para facilitar consultas.
    duracaoTotalSegundos: {
      type: Number,
      default: null,
    },
    exercicios: {
      type: [exercicioExecutadoSchema],
      default: [],
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  }
)

const SessaoTreino = mongoose.model('SessaoTreino', sessaoTreinoSchema)

export default SessaoTreino
