import mongoose from 'mongoose'
import Exercicio from '../models/Exercicio.js'
import PlanoTreino from '../models/PlanoTreino.js'

export const exercicios = async (req, res) => {
  try {
    let filtro = {}
    const {
      grupo,
      q,
      limit: limitQuery,
      skip: skipQuery,
      ordem: ordemQuery,
    } = req.query

    // verificação para ver se o frontend mandou o parametro "grupo" na URL
    if (grupo) {
      // extraindo o pedido do filtro pela URL (GET com form HTML)
      filtro.musculosPrincipais = { $regex: new RegExp(grupo, 'i') }
    }

    if (q) {
      filtro.nome = { $regex: new RegExp(q, 'i') }
    }

    const limit = parseInt(limitQuery) || 8
    const skip = parseInt(skipQuery) || 0

    const ordem = ordemQuery === 'nome-desc' ? { nome: -1 } : { nome: 1 }

    // Busca no banco de dados os exercícios com esse filtro
    const exerciciosEncontrados = await Exercicio.find(filtro)
      .limit(limit)
      .skip(skip)
      .sort(ordem)

    const total = await Exercicio.countDocuments(filtro)

    return res.status(200).json({
      quantidade: exerciciosEncontrados.length,
      total,
      dados: exerciciosEncontrados,
      hasMore: skip + exerciciosEncontrados.length < total,
    })
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro interno ao buscar exercícios' })
  }
}

export const exerciciosId = async (req, res) => {
  try {
    // Captura do id atraves da URL
    const { id } = req.params

    // Verificação se o ID é valido antes da busca no banco
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'Id no formato invalido.' })
    }

    // Busca no banco de dados o exercício com o ID correspondente
    const exercicioEspecifico = await Exercicio.findById(id)

    // Se não encontrar nada no banco, devolver null
    if (!exercicioEspecifico) {
      // Devolve not found
      return res
        .status(404)
        .json({ mensagem: 'Esse exercício não está mais disponível' })
    }

    // Se encontrar, devolve o exercício
    return res.status(200).json(exercicioEspecifico)
  } catch (erro) {
    return res
      .status(500)
      .json({ mensagem: 'Erro ao buscar exercício.', erro: erro.mensagem })
  }
}
