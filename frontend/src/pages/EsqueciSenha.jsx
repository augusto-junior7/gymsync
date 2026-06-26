import { useState } from 'react'
import api from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleEsqueciSenha = async (e) => {
    e.preventDefault()

    setLoading(true)
    setErro('')

    try {
      await api.post(
        '/usuarios/recuperacao-senha',
        { email },
        { timeout: 5000 }
      )
      setMensagem('Ação realizada com sucesso!')
      setErro('')
    } catch {
      setErro('Erro no servidor ao tentar enviar e-mail')
      setMensagem('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ece856]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="w-full max-w-md flex flex-col space-y-12 relative z-10">
        <form onSubmit={handleEsqueciSenha} className="space-y-8">
          <header className="flex flex-col items-center space-y-2">
            <h1 className="font-headline font-black text-3xl tracking-tighter text-white">
              Recuperar Senha
            </h1>
          </header>

          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase">
                E-mail cadastrado
              </Label>
              <Input
                type="email"
                value={email}
                placeholder="Digite seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 bg-accent/50 border-none rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
              />
            </div>
          </div>

          {mensagem && (
            <p className="text-green-500 text-sm font-medium text-center">
              {mensagem}
            </p>
          )}
          {erro && (
            <p className="text-red-500 text-sm font-medium text-center">
              {erro}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className={`w-full h-16 bg-gradient-to-br from-[#cafd00] to-[#beee00] hover:from-[#beee00] hover:to-[#cafd00] text-[#4a5e00] font-headline font-black text-lg tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95`}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </Button>
        </form>
      </section>
    </main>
  )
}
