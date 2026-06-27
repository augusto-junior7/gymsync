import mongoose from 'mongoose'
import PlanoTreino from '../models/PlanoTreino.js'

// POST /planos
// Cria um novo plano de treino para o usuário autenticado
export const criarPlano = async (req, res) => {
  try {
    const { nome, descricao, visibilidade, exercicios } = req.body

    const novoPlano = await PlanoTreino.create({
      usuarioId: req.usuarioId, // vem do middleware de autenticação
      nome,
      descricao: descricao || null,
      visibilidade: visibilidade || 'privado',
      exercicios,
    })

    return res.status(201).json({
      mensagem: 'Plano de treino criado com sucesso.',
      dados: novoPlano,
    })
  } catch (erro) {
    console.error('Erro ao criar plano de treino:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao criar plano de treino.', erro: erro.message })
  }
}

// GET /planos/meus
// Lista todos os planos criados pelo usuário autenticado
export const meusPlanosf = async (req, res) => {
  try {
    const planos = await PlanoTreino.find({ usuarioId: req.usuarioId }).sort({
      createdAt: -1, // mais recentes primeiro
    })

    return res.status(200).json({
      quantidade: planos.length,
      dados: planos,
    })
  } catch (erro) {
    console.error('Erro ao buscar planos do usuário:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar seus planos.', erro: erro.message })
  }
}

// GET /planos/salvos
// Lista os planos que o usuário salvou de outros criadores
export const planosSalvos = async (req, res) => {
  try {
    const planos = await PlanoTreino.find({
      salvoPor: req.usuarioId,
    })
      .populate('usuarioId', 'nome username') // traz nome e username do criador
      .sort({ createdAt: -1 })

    return res.status(200).json({
      quantidade: planos.length,
      dados: planos,
    })
  } catch (erro) {
    console.error('Erro ao buscar planos salvos:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar planos salvos.', erro: erro.message })
  }
}

// GET /planos/compartilhados
// Lista os planos que o usuário tem acesso por compartilhamento
export const planosCompartilhados = async (req, res) => {
  try {
    const planos = await PlanoTreino.find({
      compartilhadoCom: req.usuarioId,
    })
      .populate('usuarioId', 'nome username') // traz nome e username do criador
      .sort({ createdAt: -1 })

    return res.status(200).json({
      quantidade: planos.length,
      dados: planos,
    })
  } catch (erro) {
    console.error('Erro ao buscar planos compartilhados:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar planos compartilhados.', erro: erro.message })
  }
}

// GET /planos/explorar
// Lista todos os planos públicos para a tela de comunidade.
// Suporta ordenação por ?ordem=recentes (padrão) ou ?ordem=salvos
export const explorarPlanos = async (req, res) => {
  try {
    const  {nome, ordem: ordemQuery} = req.query

    const ordem = req.query.ordem === 'salvos' ? { 'salvoPor': -1 } : { createdAt: -1 }


    const filtro = {visibilidade:'publico'}
    if (nome) {
      filtro.nome = {$regex: new RegExp(nome,'i')}
    }
    // Busca apenas planos públicos
    const planos = await PlanoTreino.find(filtro)
      .populate('usuarioId', 'nome username') // traz nome e username do criador
      .sort(ordem)

    // Adiciona a contagem de salvamentos em cada plano para exibição nos cards
    const planosComContagem = planos.map((plano) => ({
      ...plano.toObject(),
      totalSalvamentos: plano.salvoPor.length,
      isSaved: plano.salvoPor.some((uid) => uid.toString() === req.usuarioId),
      isOwner: plano.usuarioId?._id?.toString() === req.usuarioId
    }))

    return res.status(200).json({
      quantidade: planosComContagem.length,
      dados: planosComContagem,
    })
  } catch (erro) {
    console.error('Erro ao explorar planos:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar planos da comunidade.', erro: erro.message })
  }
}

// GET /planos/:id
// Retorna os detalhes de um plano específico.
// Regra de acesso: público → qualquer um | privado → apenas o dono ou compartilhados
export const planoPorId = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'Id no formato inválido.' })
    }

    const plano = await PlanoTreino.findById(id)
      .populate('usuarioId', 'nome username')
      .populate('exercicios.exercicioId') // traz os dados completos de cada exercício

    if (!plano) {
      return res.status(404).json({ mensagem: 'Plano de treino não encontrado.' })
    }

    // Verifica permissão de acesso para planos privados
    const ehDono = plano.usuarioId._id.toString() === req.usuarioId
    const estaCompartilhado = plano.compartilhadoCom
      .map((uid) => uid.toString())
      .includes(req.usuarioId)

    if (plano.visibilidade === 'privado' && !ehDono && !estaCompartilhado) {
      return res.status(403).json({ mensagem: 'Você não tem acesso a esse plano.' })
    }

    return res.status(200).json(plano)
  } catch (erro) {
    console.error('Erro ao buscar plano por ID:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar plano de treino.', erro: erro.message })
  }
}

// PATCH /planos/:id
// Atualiza campos de um plano. Apenas o dono pode editar.
export const atualizarPlano = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'Id no formato inválido.' })
    }

    const plano = await PlanoTreino.findById(id)

    if (!plano) {
      return res.status(404).json({ mensagem: 'Plano de treino não encontrado.' })
    }

    // Apenas o criador pode editar o plano
    if (plano.usuarioId.toString() !== req.usuarioId) {
      return res.status(403).json({ mensagem: 'Você não tem permissão para editar esse plano.' })
    }

    const camposPermitidos = ['nome', 'descricao', 'visibilidade', 'exercicios']
    const dadosAtualizar = {}

    camposPermitidos.forEach((campo) => {
      if (req.body[campo] !== undefined) {
        dadosAtualizar[campo] = req.body[campo]
      }
    })

    if (Object.keys(dadosAtualizar).length === 0) {
      return res.status(400).json({ mensagem: 'Necessário ao menos um campo para atualizar.' })
    }

    const planoAtualizado = await PlanoTreino.findByIdAndUpdate(id, dadosAtualizar, {
      new: true, // retorna o documento já atualizado
    })

    return res.status(200).json({
      mensagem: 'Plano atualizado com sucesso.',
      dados: planoAtualizado,
    })
  } catch (erro) {
    console.error('Erro ao atualizar plano:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao atualizar plano.', erro: erro.message })
  }
}

// DELETE /planos/:id
// Remove um plano. Apenas o dono pode deletar.
export const deletarPlano = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'Id no formato inválido.' })
    }

    const plano = await PlanoTreino.findById(id)

    if (!plano) {
      return res.status(404).json({ mensagem: 'Plano de treino não encontrado.' })
    }

    if (plano.usuarioId.toString() !== req.usuarioId) {
      return res.status(403).json({ mensagem: 'Você não tem permissão para deletar esse plano.' })
    }

    await PlanoTreino.findByIdAndDelete(id)

    return res.status(200).json({ mensagem: 'Plano de treino removido com sucesso.' })
  } catch (erro) {
    console.error('Erro ao deletar plano:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao deletar plano.', erro: erro.message })
  }
}

// PATCH /planos/:id/salvar
// Salva ou remove um plano da lista do usuário (toggle).
// Um usuário não pode salvar o próprio plano.
export const toggleSalvarPlano = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'Id no formato inválido.' })
    }

    const plano = await PlanoTreino.findById(id)

    if (!plano) {
      return res.status(404).json({ mensagem: 'Plano não encontrado.' })
    }

    // O dono não precisa salvar o próprio plano
    if (plano.usuarioId.toString() === req.usuarioId) {
      return res.status(400).json({ mensagem: 'Você não pode salvar o seu próprio plano.' })
    }

    const jaSalvou = plano.salvoPor.map((uid) => uid.toString()).includes(req.usuarioId)

    if (jaSalvou) {
      // Remove da lista (unsave)
      await PlanoTreino.findByIdAndUpdate(id, {
        $pull: { salvoPor: req.usuarioId },
      })
      return res.status(200).json({ mensagem: 'Plano removido dos salvos.' })
    } else {
      // Adiciona na lista (save)
      await PlanoTreino.findByIdAndUpdate(id, {
        $addToSet: { salvoPor: req.usuarioId },
      })
      return res.status(200).json({ mensagem: 'Plano salvo com sucesso.' })
    }
  } catch (erro) {
    console.error('Erro ao salvar/remover plano:', erro)
    return res
      .status(500)
      .json({ mensagem: 'Erro ao salvar plano.', erro: erro.message })
  }
}
