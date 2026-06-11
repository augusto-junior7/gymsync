import mongoose from "mongoose";
import Exercicio from "../models/exercicio.js";

export const exercicios = async (req, res) => {
  try {
    let filtro = {};

    // verificação para ver se o frontend mandou o parametro "grupo" na URL
    if (req.query.grupo) {
      // extraindo o pedido do filtro pela URL (GET com form HTML)
      filtro.musculosPrincipais = req.query.grupo;
    }

    // Busca no banco de dados os exercícios com esse filtro
    const exerciciosEncontrados = await Exercicio.find(filtro);
    return res
      .status(200)
      .json({
        quantidade: exerciciosEncontrados.length,
        dados: exerciciosEncontrados,
      });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno ao buscar exercícios" });
  }
};

export const exerciciosId = async (req, res) => {
  try {
    const { id } = req.parms;

    // Verificação se o ID é valido antes da busca no banco
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: "Id no formato invalido." });
    }

    // Busca no banco de dados o exercício com o ID correspondente
    const exercicioEspecifico = await Exercicio.findById(id);

    // Se não encontrar nada no banco, devolver null
    if (!exercicioEspecifico) {
      // Devolve not found
      return res
        .status(404)
        .json({ mensagem: "Esse exercício não está mais disponível" });
    }

    // Se encontrar, devolve o exercício
    return res.status(200).json(exercicioEspecifico);
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar exercício.", erro: erro.mensagem });
  }
};
