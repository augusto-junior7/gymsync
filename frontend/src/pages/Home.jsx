import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Dumbbell, Search, LineChart, Users } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Efeitos de iluminação de fundo (mesmos do Login) */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ece856]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Cabeçalho / Navbar Simples */}
      <header className="w-full flex justify-between items-center p-6 relative z-10 max-w-7xl mx-auto">
        <h1 className="font-headline font-black italic text-3xl tracking-tighter text-[#cafd00]">
          GYMSYNC
        </h1>
        <nav className="flex space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-foreground font-bold">
              Entrar
            </Button>
          </Link>
          <Link to="/registrar">
            <Button className="bg-[#cafd00] hover:bg-[#beee00] text-[#4a5e00] font-bold transition-colors">
              Cadastrar
            </Button>
          </Link>
        </nav>
      </header>

      {/* Seção Principal (Hero Section) */}
      <section className="py-20 lg:py-32 flex flex-col items-center justify-center text-center px-6 relative z-10 max-w-4xl mx-auto space-y-8">
        <h2 className="text-5xl md:text-7xl font-headline font-black tracking-tight text-white">
          Sincronize seus treinos. <br />
          <span className="text-[#cafd00] italic">Supere seus limites.</span>
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          A plataforma definitiva para amadores, entusiastas e profissionais do
          fitness. Gerencie suas rotinas, acompanhe seu progresso e faça parte
          da nossa comunidade.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
          <Link to="/registrar" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-14 px-8 bg-gradient-to-br from-[#cafd00] to-[#beee00] hover:from-[#beee00] hover:to-[#cafd00] text-[#4a5e00] font-headline font-black text-lg tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95">
              Comece Agora
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-14 px-8 border-2 border-muted-foreground/30 hover:border-[#cafd00] hover:text-[#cafd00] hover:bg-transparent text-white font-headline font-bold text-lg tracking-widest uppercase rounded-xl transition-all"
            >
              Já tenho conta
            </Button>
          </Link>
        </div>
      </section>

      {/* Seção de Funcionalidades (Cards) */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-accent/30 border border-muted-foreground/20 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-[#cafd00]/50 hover:bg-accent/50 transition-all duration-300 group cursor-default">
            <div className="w-14 h-14 bg-[#cafd00]/10 rounded-full flex items-center justify-center text-[#cafd00] mb-2 group-hover:scale-110 transition-transform">
              <Dumbbell size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">
              Registre seus Treinos
            </h3>
            <p className="text-muted-foreground text-sm">
              Anote séries, repetições e cargas. Inicie treinos com cronômetro
              integrado.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-accent/30 border border-muted-foreground/20 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-[#cafd00]/50 hover:bg-accent/50 transition-all duration-300 group cursor-default">
            <div className="w-14 h-14 bg-[#cafd00]/10 rounded-full flex items-center justify-center text-[#cafd00] mb-2 group-hover:scale-110 transition-transform">
              <Search size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">Explore Exercícios</h3>
            <p className="text-muted-foreground text-sm">
              Filtre por grupo muscular e descubra novos movimentos para a sua
              rotina.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-accent/30 border border-muted-foreground/20 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-[#cafd00]/50 hover:bg-accent/50 transition-all duration-300 group cursor-default">
            <div className="w-14 h-14 bg-[#cafd00]/10 rounded-full flex items-center justify-center text-[#cafd00] mb-2 group-hover:scale-110 transition-transform">
              <LineChart size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">
              Acompanhe Progresso
            </h3>
            <p className="text-muted-foreground text-sm">
              Visualize sua evolução de cargas e frequência com dashboards
              intuitivos.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-accent/30 border border-muted-foreground/20 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-[#cafd00]/50 hover:bg-accent/50 transition-all duration-300 group cursor-default">
            <div className="w-14 h-14 bg-[#cafd00]/10 rounded-full flex items-center justify-center text-[#cafd00] mb-2 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-white">Comunidade</h3>
            <p className="text-muted-foreground text-sm">
              Compartilhe rotinas e descubra os treinos de outros usuários
              facilmente.
            </p>
          </div>
        </div>
      </section>

      <footer className="w-full p-6 text-center relative z-10 mt-auto">
        <p className="text-sm text-muted-foreground font-medium">
          © 2026 GymSync. Trabalho Prático - Programação para Web.
        </p>
      </footer>
    </main>
  )
}
