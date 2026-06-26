import mongoose from 'mongoose'

const usernameRegex = /^[a-z0-9]+(?:[_-][a-z0-9]+)*$/

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
      lowercase: true,
      trim: true,
      match: [
        usernameRegex,
        'Username deve conter apenas letras minúsculas, números, _ e -, sem espaços ou caracteres especiais.',
      ],
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
      select: false,
    },
    reset_senha_token: {
      // Cria um token temporario para redefinir a senha
      type: String,
    },
    reset_senha_expiracao: {
      // tempo para expirar o token de redefinição de senha
      type: Date,
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  }
)

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario
