import mongoose from "mongoose";

const exercicioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    forca: {
      type: String,
      default: null,
      trim: true,
    },
    nivel: {
      type: String,
      required: true,
      trim: true,
      enum: ['beginner', 'intermediate', 'expert']
    },
    mecanica: {
      type: String,
      default: null,
    },
    equipamento: {
        type: String,
        default: null
    },
    musculosPrincipais: {
        type: [String],
        required: true,
    },
    musculosSecundarios: {
        type: [String],
        default: [],
    },
    instrucoes: {
        type: [String],
        required: true,
    }
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  },
);

const Exercicio = mongoose.model("Exercicio", exercicioSchema);

export default Exercicio;
