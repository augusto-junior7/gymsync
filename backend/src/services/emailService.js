import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transportador = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const enviarEmailRec = async (emailDestino, token) => {
  const URL_BASE = process.env.FRONTEND_URL
  const linkRec = `${URL_BASE}/redefinir-senha/${token}`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailDestino,
    subject: 'GymSync - Recuperação de Senha',
    html: `
    <h2>Olá!</h2>
    <p>Recebemos seu pedido para redefinir a senha da sua conta.</p>
    <p>Clique no link abaixo para criar uma nova senha:</p>
    <a href="${linkRec}" target="_blank">Redefinir Senha</a>
    <p>Se você não fez esta solicitação, desconsidere este email</p>`,
  }
  try {
    const info = await transportador.sendMail(mailOptions)
    console.log('Email enviado com sucesso', info.response)
    return true
  } catch (error) {
    console.log('Erro ao enviar e-mail', error)
    throw new Error('Falha no envio do e-mail de recuperação')
  }
}
