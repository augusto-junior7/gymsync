import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

// POST /usuarios/registrar
export const registrar = async (req, res) => {
  try {
    const { nome, username, email, senha } = req.body

    // Verificar se o email ou username já existe
    const usuarioExistente = await Usuario.findOne({
      $or: [{ email }, { username }],
    })
    if (usuarioExistente) {
      if (usuarioExistente.email === email) {
        return res.status(400).json({ mensage: 'Email já cadastrado.' })
      }
      if (usuarioExistente.username === username) {
        return res.status(400).json({ mensage: 'Nome de usuário já em uso.' })
      }
    }

    // Criptografar a senha (10 = nível de complexidade do hash)
    const senhaHash = await bcrypt.hash(senha, 10)

    // Criar o usuário no banco
    const novoUsuario = await Usuario.create({
      nome,
      username,
      email,
      senha: senhaHash,
    })

    // Responder sem expor a senha
    res.status(201).json({
      mensage: 'Usuário criado com sucesso.',
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        username: novoUsuario.username,
        email: novoUsuario.email,
      },
    })
  } catch (erro) {
    res
      .status(500)
      .json({ mensage: 'Erro ao criar usuário.', erro: erro.message })
  }
}

// POST /usuarios/login
export const login = async (req, res) => {
  try {
    const { identificacao, senha } = req.body

    // Verificar se o usuário existe por email ou username
    const usuario = await Usuario.findOne({
      $or: [{ email: identificacao }, { username: identificacao }],
    }).select('+senha')
    if (!usuario) {
      return res
        .status(401)
        .json({ mensage: 'Email, usuário ou senha inválidos.' })
    }

    // Comparar a senha com o hash salvo
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
      return res
        .status(401)
        .json({ mensage: 'Email, usuário ou senha inválidos.' })
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: usuario._id }, // payload: o que vai dentro do token
      process.env.JWT_SECRET, // chave secreta do .env
      { expiresIn: '7d' } // token/autenticação dura 7 dias
    )

    res.status(200).json({
      mensage: 'Login realizado com sucesso.',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        username: usuario.username,
        email: usuario.email,
      },
    })
  } catch (erro) {
    res
      .status(500)
      .json({ mensage: 'Erro ao fazer login.', erro: erro.message })
  }
}

// GET /usuarios/perfil
export const getPerfil = async (req, res) => {
  try {
    // O ID do usuário é adicionado ao req pelo middleware de autenticação
    const usuario = await Usuario.findById(req.usuarioId).select('-senha')

    if (!usuario) {
      return res.status(404).json({ mensage: 'Usuário não encontrado.' })
    }

    res.status(200).json(usuario)
  } catch (erro) {
    console.error('Erro ao buscar perfil do usuário:', erro)
    res
      .status(500)
      .json({ mensage: 'Erro interno do servidor ao buscar perfil.' })
  }
}

export const atualizar = async (req, res) => {
  try {
    const usuarioLogado = req.usuarioId //  Pegando o usuario logado
    const camposAtualizaveis = ['nome', 'username', 'email', 'senha']
    const dadosAtualizar = {}

    // Montando o obj de dadosAtualizar
    camposAtualizaveis.forEach((campo) => {
      if (req.body[campo]) {
        // verificando se o body tem o campo
        dadosAtualizar[campo] = req.body[campo] // insirindo os campos que vieram
      }
    })

    // Se não vier nenhum campo, envia uma res de erro
    if (Object.keys(dadosAtualizar).length === 0) {
      return res.status(400).json({ mensage: 'Necessário ao menos um campo' })
    }

    // Verificar se o email já existe
    if (dadosAtualizar.email) {
      const emailEmUso = await Usuario.findOne({
        email: dadosAtualizar.email,
        _id: { $ne: usuarioLogado },
      })

      if (emailEmUso) {
        return res.status(400).json({ mensage: 'Email já cadastrado' })
      }
    }

    // Verificar se o username já existe
    if (dadosAtualizar.username) {
      const usernameEmUso = await Usuario.findOne({
        username: dadosAtualizar.username,
        _id: { $ne: usuarioLogado },
      })

      if (usernameEmUso) {
        return res.status(400).json({ mensage: 'Nome de usuário já em uso' })
      }
    }

    // criptografando nova senha
    if (dadosAtualizar.senha) {
      const novasenha = await bcrypt.hash(dadosAtualizar.senha, 10)
      dadosAtualizar.senha = novasenha
    }

    // Atualizamos os campos que recebemos do usuario no banco de dados
    const updateUsuario = await Usuario.findByIdAndUpdate(
      usuarioLogado,
      dadosAtualizar
    )
    res.status(200).json({ mensage: 'Atualização realizado com sucesso.' })
  } catch (erro) {
    return res
      .status(500)
      .json({ mensage: 'Erro ao realizar atualização.', erro: erro.message })
  }
}
