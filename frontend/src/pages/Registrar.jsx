import api from '@/services/api'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'

export default function Registrar() {
  const navigate = useNavigate()

  // Estados dos campos
  const [nome, setNome] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  // Estados de erro em tempo real
  const [usernameError, setUsernameError] = useState('')
  const [senhaError, setSenhaError] = useState('')
  const [confirmarSenhaError, setConfirmarSenhaError] = useState('')
  const [registerError, setRegisterError] = useState('')

  // Estados de UI
  const [loading, setLoading] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)

  // Efeito para verificar se o usuário já está logado e redirecioná-lo
  useEffect(() => {
    try {
      const token = localStorage.getItem('gymsync_token')
      import('@/lib/auth').then(({ isTokenValid }) => {
        if (isTokenValid(token)) navigate('/perfil')
      })
    } catch {
      // ignore
    }
  }, [navigate])

  // --- Handlers com Validação em Tempo Real ---

  // Valida o nome de usuário em tempo real para garantir o formato correto
  const handleUsernameChange = (e) => {
    const val = e.target.value
    setUsername(val)

    // Validação: apenas minúsculas, números, _ e -
    if (val.length > 0 && !/^[a-z0-9_-]+$/.test(val)) {
      setUsernameError(
        'Apenas letras minúsculas, números, _ e - são permitidos.'
      )
    } else {
      setUsernameError('')
    }
  }

  // Valida a força da senha e a correspondência com a confirmação em tempo real
  const handleSenhaChange = (e) => {
    const val = e.target.value
    setSenha(val)

    // Validação: min 8 caracteres, pelo menos 1 número
    if (val.length > 0 && (val.length < 8 || !/\d/.test(val))) {
      setSenhaError(
        'A senha deve ter no mínimo 8 caracteres e pelo menos 1 número.'
      )
    } else {
      setSenhaError('')
    }

    // Re-valida a confirmação se o usuário alterar a primeira senha depois de já ter preenchido a segunda
    if (confirmarSenha && val !== confirmarSenha) {
      setConfirmarSenhaError('As senhas não coincidem.')
    } else if (confirmarSenha) {
      setConfirmarSenhaError('')
    }
  }

  // Valida se a senha de confirmação corresponde à senha original
  const handleConfirmarSenhaChange = (e) => {
    const val = e.target.value
    setConfirmarSenha(val)

    // Validação: idêntica à primeira senha
    if (val.length > 0 && val !== senha) {
      setConfirmarSenhaError('As senhas não coincidem.')
    } else {
      setConfirmarSenhaError('')
    }
  }

  // --- Submissão do Formulário ---

  // Função principal para lidar com o registro do usuário
  const handleRegister = async (e) => {
    e?.preventDefault?.()

    // Bloqueia o envio se houver erros de validação pendentes ou campos vazios
    if (usernameError || senhaError || confirmarSenhaError) {
      setRegisterError('Por favor, corrija os erros nos campos acima.')
      return
    }

    if (senha !== confirmarSenha) {
      setConfirmarSenhaError('As senhas não coincidem.')
      return
    }

    if (!navigator.onLine) {
      setRegisterError('Sem conexão. Verifique sua internet.')
      return
    }

    setLoading(true)
    setRegisterError('')

    // Tentativa de chamada à API para registrar o novo usuário
    try {
      await api.post(
        '/usuarios/registrar',
        { nome, username, email, senha },
        { timeout: 5000 }
      )

      navigate('/login')
    } catch (error) {
      // Tratamento de diferentes tipos de erro (resposta do servidor, timeout, etc.)
      if (error.response) {
        setRegisterError(error.response.data?.message || 'Erro no servidor')
      } else if (error.code === 'ECONNABORTED') {
        setRegisterError('Tempo de resposta esgotado. Tente novamente.')
      } else if (error.request) {
        setRegisterError('Servidor indisponível. Tente novamente mais tarde.')
      } else {
        setRegisterError('Erro na requisição. Verifique sua conexão.')
      }
      console.error('Falha no registro:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Efeitos de iluminação de fundo */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ece856]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="w-full max-w-md flex flex-col space-y-12 relative z-10">
        <header className="flex flex-col items-center space-y-2">
          <h1 className="font-headline font-black italic text-4xl tracking-tighter text-[#cafd00]">
            GYMSYNC
          </h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            Crie sua conta e comece a sincronizar.
          </p>
        </header>

        <form className="space-y-8" onSubmit={handleRegister}>
          <div className="space-y-6">
            {/* Campo Nome */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="nome"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                Nome
              </Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="h-14 bg-accent/50 border-none rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
              />
            </div>

            {/* Campo Username */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="username"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                Nome de Usuário
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="ex: joao_123"
                value={username}
                onChange={handleUsernameChange}
                required
                className={`h-14 bg-accent/50 border ${usernameError ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]`}
              />
              {usernameError && (
                <p className="text-xs text-red-500 font-medium px-1">
                  {usernameError}
                </p>
              )}
            </div>

            {/* Campo E-mail */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 bg-accent/50 border-none rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
              />
            </div>

            {/* Campo Senha */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="senha"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Mínimo de 8 caracteres e 1 número"
                  value={senha}
                  onChange={handleSenhaChange}
                  required
                  className={`h-14 bg-accent/50 border ${senhaError ? 'border-red-500' : 'border-transparent'} rounded-xl pl-4 pr-12 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]`}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#cafd00] transition-colors focus:outline-none"
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {senhaError && (
                <p className="text-xs text-red-500 font-medium px-1">
                  {senhaError}
                </p>
              )}
            </div>

            {/* Campo Confirmar Senha */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="confirmarSenha"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                Confirme sua Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmarSenha"
                  type={mostrarConfirmarSenha ? 'text' : 'password'}
                  placeholder="Digite a senha novamente"
                  value={confirmarSenha}
                  onChange={handleConfirmarSenhaChange}
                  required
                  className={`h-14 bg-accent/50 border ${confirmarSenhaError ? 'border-red-500' : 'border-transparent'} rounded-xl pl-4 pr-12 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]`}
                />
                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors focus:outline-none"
                  aria-label={
                    mostrarConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'
                  }
                >
                  {mostrarConfirmarSenha ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {confirmarSenhaError && (
                <p className="text-xs text-red-500 font-medium px-1">
                  {confirmarSenhaError}
                </p>
              )}
            </div>
          </div>

          {registerError && (
            <p className="text-sm text-red-500 text-center font-medium bg-red-500/10 py-2 rounded-lg">
              {registerError}
            </p>
          )}

          <Button
            type="submit"
            disabled={
              loading ||
              !!usernameError ||
              !!senhaError ||
              !!confirmarSenhaError
            }
            className={`w-full h-16 bg-gradient-to-br from-[#cafd00] to-[#beee00] hover:from-[#beee00] hover:to-[#cafd00] text-[#4a5e00] font-headline font-black text-lg tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95 ${
              loading || usernameError || senhaError || confirmarSenhaError
                ? 'opacity-70 cursor-not-allowed'
                : ''
            }`}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        <footer className="pt-4 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Já possui uma conta?
            <Link
              to="/login"
              className="text-[#cafd00] font-bold hover:underline underline-offset-4 ml-2"
            >
              Fazer Login
            </Link>
          </p>
        </footer>
      </section>
    </main>
  )
}
