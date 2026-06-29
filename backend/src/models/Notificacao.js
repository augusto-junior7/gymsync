import mongoose from 'mongoose'

const notificacao = new mongoose.Schema(
  {
    remetente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    destinatario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    planoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlanoTreino',
      required: true,
    },
    tipo: {
      type: String,
      enum: ['compartilhamento_treino'],
      default: 'compartilhamento_treino',
    },
    status: {
      type: String,
      enum: ['pendente', 'aceito', 'recusado'],
      default: 'pendente',
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  }
)

const Notificacao = mongoose.model('Notificacao', notificacao)

export default Notificacao