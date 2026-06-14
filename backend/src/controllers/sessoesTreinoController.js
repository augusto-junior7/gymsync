import mongoose from 'mongoose'
import SessaoTreino from '../models/SessaoTreino.js'

// POST /sessoes
// Inicia uma nova sessão de treino (registra o momento de início).
// Pode ter um plano base (treino guiado) ou não (treino instantâneo).
export const iniciarSessao = async (req, res) => {
  try {
    const { planoBaseId } = req.body

    const novaSessao = await SessaoTreino.create({
      usuarioId: req.usuarioId, // vem do middleware de autenticação
      planoBaseId: planoBaseId || null,
      dataInicio: new Date(),
    })

    return res.status(201).json({
      mensagem: 'Sessão de treino iniciada.',
      dados: novaSessao,
    })
  } catch (erro) {
    console.error('Erro ao iniciar sessão de treino:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao iniciar sessão.', erro: erro.message })
  }
}

// PATCH /sessoes/:id/encerrar
// Encerra a sessão ativa: registra dataFim, calcula duração total e salva os exercícios realizados.
// É aqui que todos os dados da sessão (exercícios, séries, pesos, descansos) chegam do frontend.
export const encerrarSessao = async (req, res) => {
  try {
    const { id } = req.params
    const { exercicios } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'Id no formato inválido.' })
    }

    const sessao = await SessaoTreino.findById(id)

    if (!sessao) {
      return res.status(404).json({ mensagem: 'Sessão de treino não encontrada.' })
    }

    // Apenas o dono pode encerrar a própria sessão
    if (sessao.usuarioId.toString() !== req.usuarioId) {
      return res.status(403).json({ mensagem: 'Você não tem permissão para encerrar essa sessão.' })
    }

    // Impede encerrar uma sessão que já foi finalizada
    if (sessao.dataFim) {
      return res.status(400).json({ mensagem: 'Essa sessão já foi encerrada.' })
    }

    const dataFim = new Date()

    // Calcula duração total em segundos com base no horário real
    const duracaoTotalSegundos = Math.round(
      (dataFim.getTime() - sessao.dataInicio.getTime()) / 1000
    )

    const sessaoAtualizada = await SessaoTreino.findByIdAndUpdate(
      id,
      {
        dataFim,
        duracaoTotalSegundos,
        exercicios: exercicios || [],
      },
      { new: true }
    )

    return res.status(200).json({
      mensagem: 'Sessão de treino encerrada com sucesso.',
      dados: sessaoAtualizada,
    })
  } catch (erro) {
    console.error('Erro ao encerrar sessão de treino:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao encerrar sessão.', erro: erro.message })
  }
}

// GET /sessoes/historico
// Retorna o histórico de sessões encerradas do usuário autenticado, da mais recente para a mais antiga.
export const historico = async (req, res) => {
  try {
    const sessoes = await SessaoTreino.find({
      usuarioId: req.usuarioId,
      dataFim: { $ne: null }, // exclui sessões ainda em andamento
    })
      .populate('planoBaseId', 'nome') // traz apenas o nome do plano base, se houver
      .populate('exercicios.exercicioId', 'nome musculosPrincipais') // dados básicos do exercício
      .sort({ dataInicio: -1 })

    return res.status(200).json({
      quantidade: sessoes.length,
      dados: sessoes,
    })
  } catch (erro) {
    console.error('Erro ao buscar histórico de sessões:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar histórico.', erro: erro.message })
  }
}

// GET /sessoes/:id
// Retorna os detalhes completos de uma sessão específica.
export const sessaoPorId = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'Id no formato inválido.' })
    }

    const sessao = await SessaoTreino.findById(id)
      .populate('planoBaseId', 'nome descricao')
      .populate('exercicios.exercicioId') // dados completos do exercício

    if (!sessao) {
      return res.status(404).json({ mensagem: 'Sessão de treino não encontrada.' })
    }

    // Apenas o dono pode ver os detalhes da sua sessão
    if (sessao.usuarioId.toString() !== req.usuarioId) {
      return res.status(403).json({ mensagem: 'Você não tem acesso a essa sessão.' })
    }

    return res.status(200).json(sessao)
  } catch (erro) {
    console.error('Erro ao buscar sessão por ID:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar sessão.', erro: erro.message })
  }
}

// DELETE /sessoes/:id
// Remove uma sessão do histórico. Apenas o dono pode deletar.
export const deletarSessao = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'Id no formato inválido.' })
    }

    const sessao = await SessaoTreino.findById(id)

    if (!sessao) {
      return res.status(404).json({ mensagem: 'Sessão de treino não encontrada.' })
    }

    if (sessao.usuarioId.toString() !== req.usuarioId) {
      return res.status(403).json({ mensagem: 'Você não tem permissão para remover essa sessão.' })
    }

    await SessaoTreino.findByIdAndDelete(id)

    return res.status(200).json({ mensagem: 'Sessão removida do histórico com sucesso.' })
  } catch (erro) {
    console.error('Erro ao deletar sessão:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao remover sessão.', erro: erro.message })
  }
}
