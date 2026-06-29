import mongoose from 'mongoose'
import Notificacao from '../models/Notificacao.js'
import PlanoTreino from '../models/PlanoTreino.js'
import Usuario from '../models/Usuario.js'
import { enviarEmailNotificacao } from '../services/emailService.js'

export const compartilhamento = async (req, res) => {
  try {
    const id = req.usuarioId
    const { treinoId, destinatario } = req.body

    // verificação para ver se o treino foi criado
    const planoTreino = await PlanoTreino.findById(treinoId)
    if (!planoTreino) {
      return res.status(404).json({ message: 'Treino não encontrado' })
    }

    // Verificação para ver se o treino é proprio de quem está compartilhando
    if (planoTreino.usuarioId.toString() !== id.toString()) {
      return res
        .status(403)
        .json({ message: 'Somente treinos próprios podem ser compartilhados' })
    }

    // Verificação se o destinatário existe
    const verificacaoDest = await Usuario.findOne({ email: destinatario })
    if (!verificacaoDest) {
      return res.status(404).json({ message: 'Destinatário não existe' })
    }

    if (verificacaoDest._id.toString() === id.toString()) {
      return res
        .status(400)
        .json({ messga: 'Você não pode compartilhar um treino com você mesmo' })
    }

    // Verificação para ver se exite uma notificação com as mesmas info e com o status 'pendente
    const duplicidade = await Notificacao.findOne({
      remetente: id,
      destinatario: verificacaoDest._id,
      planoId: treinoId,
      status: 'pendente',
    })

    if (duplicidade) {
      return res.status(400).json({
        message:
          'Já existe um convite deste treino pendente para este destinatário',
      })
    }

    await Notificacao.create({
      remetente: id,
      destinatario: verificacaoDest._id,
      planoId: treinoId,
      tipo: 'compartilhamento_treino',
    })

    const remetente = await Usuario.findById(id)

    try {
      await enviarEmailNotificacao(
        verificacaoDest.email,
        remetente.nome,
        planoTreino.nome
      )
    } catch (error) {
      console.error('Erro ao enviar e-mail de compartilhamento', error.message)
    }

    res.status(201).json({ message: 'Notificação enviada com sucesso!' })
  } catch (error) {
    console.error('Erro em compartilhar', error)
    res.status(500).json({
      message: 'Erro ao processar o compartilhamento',
      error: error.message,
    })
  }
}

export const listarNotificacoes = async (req, res) => {
  try {
    const idDest = req.usuarioId

    const notificacoes = await Notificacao.find({
      destinatario: idDest,
      status: 'pendente',
    })
      .populate('remetente', 'nome')
      .populate('planoId', 'nome')

    res.status(200).json(notificacoes)
  } catch (error) {
    return res
      .status(500)
      .json({ messga: 'Erro ao buscar notificações', error: error.message })
  }
}

export const resNotificacao = async (req, res) => {
  try {
    const idNotificacao = req.params.id
    const idRes = req.usuarioId

    const notificacao = await Notificacao.findById(idNotificacao)
    if (!notificacao) {
      return res.status(404).json({ messga: 'Notificacao não existe' })
    }

    if (notificacao.destinatario.toString() !== idRes.toString()) {
      return res.status(403).json({ message: 'Convite invalido' })
    }

    if (notificacao.status !== 'pendente') {
      return res.status(400).json({ messga: 'Noificação já foi respondida' })
    }

    notificacao.status = req.body.status
    await notificacao.save()

    if (notificacao.status == 'aceito') {
      const plano = await PlanoTreino.findById(notificacao.planoId)

      if (!plano.compartilhadoCom.includes(idRes)) {
        plano.compartilhadoCom.push(idRes)
        await plano.save()
      }
    }

    return res.status(200).json({ message: 'Resposta enviada com sucesso' })
  } catch (error) {
    console.error('Erro em resnotificacao', error)
    return res.status(500).json({ messga: 'Erro ao responder convite' })
  }
}
