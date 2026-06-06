import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    senha: {
      type: String,
      required: true,
      minlength: 8, // senha deve ter pelo menos 8 caracteres
      select: false
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  },
)

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario
