import mongoose, { Schema } from 'mongoose'

const planoTreinoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario',
    },
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      default: null,
    },
    visibilidade: {
      type: String,
      enum: ['publico', 'privado'],
      default: 'privado',
      required: true,
    },
    compartilhadoCom: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
      },
    ],
    salvoPor: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
      },
    ],
    exercicios: [
      {
        exercicioId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Exercicio',
        },
        ordemExecucao: {
          type: Number,
          required: true,
        },
        observacoes: {
          type: String,
          default: null,
        },
        series: [
          {
            tipo: {
              type: String,
              enum: ['repeticao', 'tempo'],
              required: true,
            },
            repeticoes: {
              type: Number,
              default: null, // ← era required: true
            },
            duracaoSegundos: {
              type: Number,
              default: null,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
)

const PlanoTreino = mongoose.model('PlanoTreino', planoTreinoSchema)
export default PlanoTreino
