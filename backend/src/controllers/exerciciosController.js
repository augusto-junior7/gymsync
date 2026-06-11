import Exercicio from "../models/exercicio.js"

export const exercicios = async (req, res) => {
    try{
        let filtro = {}

        // verificação para ver se o frontend mandou o parametro "grupo" na URL
        if (req.query.grupo) {
            
        // extraindo o pedido do filtro pela URL (GET com form HTML)
        filtro.musculosPrincipais = req.query.grupo;
        }

        // Busca no banco de dados os exercícios com esse filtro
        const exerciciosEncontrados = await Exercicio.find(filtro)
        return res.status(200).json({quantidade: exerciciosEncontrados.length, dados: exerciciosEncontrados})

    }catch(error) {
        res.status(500).json({mensagem: 'Erro interno ao buscar exercícios'})
    }
}