import mongoose from 'mongoose'

const notificacao = new mongoose.Schema(
  {
    remetente: { // quem esta enviando 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    destinatario: { // quem vai receber
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    planoId: { // id do plano
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