import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
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

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                Identificação
              </Label>
              <Input
                id="email-or-username"
                type="email"
                placeholder="E-mail ou usuário"
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
                <a
                  href="#"
                  className="text-xs font-bold text-[#cafd00] hover:text-[#beee00] transition-colors uppercase"
                >
                  Esqueceu?
                </a>
              </div>
              <Input
                id="password" 
                type="password"
                placeholder="••••••••"
                className="h-14 bg-accent/50 border-none rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-16 bg-gradient-to-br from-[#cafd00] to-[#beee00] hover:from-[#beee00] hover:to-[#cafd00] text-[#4a5e00] font-headline font-black text-lg tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95"
          >
            Entrar
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
