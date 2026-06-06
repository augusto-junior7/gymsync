import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// POST /usuarios/registrar
export const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o email já existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: "Email já cadastrado." });
    }

    // Criptografar a senha (10 = nível de complexidade do hash)
    const senhaHash = await bcrypt.hash(senha, 10);

    // Criar o usuário no banco
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
    });

    // Responder sem expor a senha
    res.status(201).json({
      mensagem: "Usuário criado com sucesso.",
      usuario: {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao criar usuário.", erro: erro.message });
  }
};

// POST /usuarios/login
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const usuario = await Usuario.findOne({ email }).select("+senha");
    if (!usuario) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos." });
    }

    // Comparar a senha com o hash salvo
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: "Email ou senha inválidos." });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      { id: usuario._id }, // payload: o que vai dentro do token
      process.env.JWT_SECRET, // chave secreta do .env
      { expiresIn: "7d" }, // token/autenticação dura 7 dias
    );

    res.status(200).json({
      mensagem: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (erro) {
    res
      .status(500)
      .json({ mensagem: "Erro ao fazer login.", erro: erro.message });
  }
};

export const atualizar = async (req, res) => {
  try {
    const usuarioLogado = req.usuarioId; //  Pegando o usuario logado
    const camposAtualizaveis = ["nome", "email", "senha"];
    const dadosAtualizar = {};

    // Montando o obj de dadosAtualizar
    camposAtualizaveis.forEach((campo) => {
      if (req.body[campo]) {
        // verificando se o body tem o campo
        dadosAtualizar[campo] = req.body[campo]; // insirindo os campos que vieram
      }
    });

    // Se não vier nenhum campo, envia uma res de erro
    if (Object.keys(dadosAtualizar).length === 0) {
      return res.status(400).json({ mensagem: "Necessário ao menos um campo" });
    }

    // Verificar se o email já existe
    if (dadosAtualizar.email) {
      const emailEmUso = await Usuario.findOne({ email: dadosAtualizar.email });

      if (emailEmUso) {
        return res.status(400).json({ mensagem: "Email já cadastrado" });
      }
    }

    // criptografando nova senha
    if (dadosAtualizar.senha) {
      const novasenha = await bcrypt.hash(dadosAtualizar.senha, 10);
      dadosAtualizar.senha = novasenha;
    }

    // Atualizamos os campos que recebemos do usuario no banco de dados
    const updateUsuario = await Usuario.findByIdAndUpdate(
      usuarioLogado,
      dadosAtualizar,
    );
    res.status(200).json({ mensagem: "Atualização realizado com sucesso." });
  } catch (erro) {
    return res
      .status(500)
      .json({ mensagem: "Erro ao realizar atualização.", erro: erro.message });
  }
};
     