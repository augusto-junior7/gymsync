import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'
import crypto from 'crypto'
import { enviarEmailRec } from '../services/emailService.js'

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
        return res.status(400).json({ message: 'Email já cadastrado.' })
      }
      if (usuarioExistente.username === username) {
        return res.status(400).json({ message: 'Nome de usuário já em uso.' })
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
      message: 'Usuário criado com sucesso.',
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
      .json({ message: 'Erro ao criar usuário.', erro: erro.message })
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
        .json({ message: 'Identificação ou senha inválidos.' })
    }

    // Comparar a senha com o hash salvo
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
      return res
        .status(401)
        .json({ message: 'Identificação ou senha inválidos.' })
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: usuario._id }, // payload: o que vai dentro do token
      process.env.JWT_SECRET, // chave secreta do .env
      { expiresIn: '7d' } // token/autenticação dura 7 dias
    )

    res.status(200).json({
      message: 'Login realizado com sucesso.',
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
      .json({ message: 'Erro ao fazer login.', erro: erro.message })
  }
}

// GET /usuarios/perfil
export const getPerfil = async (req, res) => {
  try {
    // O ID do usuário é adicionado ao req pelo middleware de autenticação
    const usuario = await Usuario.findById(req.usuarioId).select('-senha')

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    res.status(200).json(usuario)
  } catch (erro) {
    console.error('Erro ao buscar perfil do usuário:', erro)
    res
      .status(500)
      .json({ message: 'Erro interno do servidor ao buscar perfil.' })
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
      return res.status(400).json({ message: 'Necessário ao menos um campo' })
    }

    // Verificar se o email já existe
    if (dadosAtualizar.email) {
      const emailEmUso = await Usuario.findOne({
        email: dadosAtualizar.email,
        _id: { $ne: usuarioLogado },
      })

      if (emailEmUso) {
        return res.status(400).json({ message: 'Email já cadastrado' })
      }
    }

    // Verificar se o username já existe
    if (dadosAtualizar.username) {
      const usernameEmUso = await Usuario.findOne({
        username: dadosAtualizar.username,
        _id: { $ne: usuarioLogado },
      })

      if (usernameEmUso) {
        return res.status(400).json({ message: 'Nome de usuário já em uso' })
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
    res.status(200).json({ message: 'Atualização realizado com sucesso.' })
  } catch (erro) {
    return res
      .status(500)
      .json({ message: 'Erro ao realizar atualização.', erro: erro.message })
  }
}

export const solicitarRecuperacaoSenha = async (req, res) => {
  try {
    const { email } = req.body

    const usuario = await Usuario.findOne({ email: email })

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }

    // geração de um token em formato string
    const tokenTemporario = crypto.randomBytes(32).toString('hex')

    // a validade do token no banco de dados é de 1 hora a partir do envio do email
    const validadeToken = new Date(Date.now() + 3600000)

    // atualiza os atributos no cadastro do usuario
    usuario.reset_senha_token = tokenTemporario
    usuario.reset_senha_expiracao = validadeToken
    await usuario.save()

    await enviarEmailRec(usuario.email, tokenTemporario)

    res.status(200).json({ message: 'Link de recuperação enviado com sucesso' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao realizar recuperação.', erro: error.message })
  }
}

export const redefinirSenha = async (req, res) => {
  try {
    const { token, novaSenha } = req.body

    const usuario = await Usuario.findOne({
      reset_senha_token: token,
      reset_senha_expiracao: { $gt: Date.now() },
    })

    if (!usuario) {
      return res.status(400).json({ message: 'Token invalido ou expirado.' })
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10)

    usuario.senha = senhaHash
    usuario.reset_senha_expiracao = undefined
    usuario.reset_senha_token = undefined
    await usuario.save()
    res.status(200).json({ message: 'Senha redefinida com sucesso!' })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao redefinir senha', erro: error.message })
  }
}
