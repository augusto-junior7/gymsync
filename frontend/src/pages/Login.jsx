import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Importando o useNavigate
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff } from 'lucide-react' // Importando os ícones

export default function Login() {
  const [identificacao, setIdentificacao] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false) // Estado para visualizar a senha
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e?.preventDefault?.()

    console.log('handleLogin called', { identificacao })

    if (!navigator.onLine) {
      setLoginError('Sem conexão. Verifique sua internet.')
      return
    }

    setLoading(true)
    setLoginError('')

    try {
      const response = await axios.post(
        'http://localhost:3000/usuarios/login',
        { identificacao, senha: password },
        { timeout: 5000 }
      )

      const token = response.data.token
      localStorage.setItem('gymsync_token', token)
      navigate('/dashboard')
    } catch (error) {
      if (error.response) {
        setLoginError(error.response.data?.message || 'Erro no servidor')
      } else if (error.code === 'ECONNABORTED') {
        setLoginError('Tempo de resposta esgotado. Tente novamente.')
      } else if (error.request) {
        setLoginError('Servidor indisponível. Tente novamente mais tarde.')
      } else {
        setLoginError('Erro na requisição. Verifique sua conexão.')
      }

      console.error('Falha no login:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ece856]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="w-full max-w-md flex flex-col space-y-12 relative z-10">
        <header className="flex flex-col items-center space-y-2">
          <h1 className="font-headline font-black italic text-4xl tracking-tighter text-[#cafd00]">
            GYMSYNC
          </h1>
        </header>

        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin(e)
          }}
        >
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="email-or-username"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                Identificação
              </Label>
              <Input
                id="email-or-username"
                type="text"
                placeholder="E-mail ou usuário"
                value={identificacao}
                onChange={(e) => setIdentificacao(e.target.value)}
                className="h-14 bg-accent/50 border-none rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold text-muted-foreground tracking-widest uppercase"
                >
                  Senha
                </Label>
                {/*<a
                  href="#"
                  className="text-xs font-bold text-[#cafd00] hover:text-[#beee00] transition-colors uppercase"
                >
                  Esqueceu?
                </a>*/}
              </div>

              {/* Container da Senha com Botão de Visualização */}
              <div className="relative">
                <Input
                  id="password"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 bg-accent/50 border-none rounded-xl pl-4 pr-12 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
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
            </div>
          </div>

          {loginError && (
            <p className="text-sm text-red-500 text-center">{loginError}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className={`w-full h-16 bg-gradient-to-br from-[#cafd00] to-[#beee00] hover:from-[#beee00] hover:to-[#cafd00] text-[#4a5e00] font-headline font-black text-lg tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95 ${
              loading ? 'opacity-70 pointer-events-none' : ''
            }`}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <footer className="pt-4 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Novo no GymSync?
            <Link
              to="/registrar"
              className="text-[#cafd00] font-bold hover:underline underline-offset-4 ml-2"
            >
              Criar Conta
            </Link>
          </p>
        </footer>
      </section>
    </main>
  )
}
