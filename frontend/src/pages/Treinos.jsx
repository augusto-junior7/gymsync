import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Zap,
  PlusCircle,
  MoreVertical,
  Play,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ListOrdered,
} from 'lucide-react'

// Dados mockados para visualização do protótipo
const meusPlanos = [
  {
    id: '1',
    nome: 'Hipertrofia A - Peito e Tríceps',
    exercicios: 8,
    visibilidade: 'publico',
  },
  {
    id: '2',
    nome: 'Core & Mobilidade',
    exercicios: 5,
    visibilidade: 'privado',
  },
]

const treinosSalvosMock = [
  {
    id: '3',
    autor: '@marcos_fit',
    nome: 'Perna Destruidora 3000',
    nivel: 'Avançado',
    tempo: '60 min',
  },
  {
    id: '4',
    autor: '@juliana_cross',
    nome: 'WOD: Fogo no Core',
    nivel: 'Intermediário',
    tempo: '45 min',
  },
  {
    id: '5',
    autor: '@coach_leo',
    nome: 'Iniciante: Full Body',
    nivel: 'Iniciante',
    tempo: '30 min',
  },
  {
    id: '6',
    autor: '@ana_silva',
    nome: 'Costas e Bíceps',
    nivel: 'Intermediário',
    tempo: '50 min',
  },
  {
    id: '7',
    autor: '@pedro_power',
    nome: 'Força Bruta - Peito',
    nivel: 'Avançado',
    tempo: '75 min',
  },
]

const historico = [
  {
    id: 's1',
    nome: 'Hipertrofia A - Peito e Tríceps',
    data: 'Ontem',
    duracao: '55 min',
  },
  {
    id: 's2',
    nome: 'Costas & Bíceps Pesado',
    data: '12 Out 2026',
    duracao: '62 min',
  },
]

export default function Treinos() {
  // Estado para controlar quantos treinos salvos são exibidos (inicia com 3)
  const [visibleSalvos, setVisibleSalvos] = useState(3)

  const handleCarregarMais = () => {
    setVisibleSalvos((prev) => prev + 3)
  }

  return (
    <main className="min-h-screen p-6 lg:p-10 relative overflow-hidden bg-background">
      {/* Luzes de fundo decorativas */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col space-y-12 pb-20">
        {/* Seção A: Treino Instantâneo (Hero) */}
        <section className="relative rounded-2xl overflow-hidden bg-accent/10 border border-border/50 p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#cafd00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="z-10 relative max-w-xl space-y-4 w-full">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white uppercase break-words leading-tight">
              Domine o treino <br className="hidden sm:block" /> de hoje.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-[90%] sm:max-w-full">
              Pule a teoria. Vá direto para a ação com um treino instantâneo
              baseado no seu histórico.
            </p>

            <Link to="/treino" className="block w-full md:w-auto mt-4">
              <Button className="h-auto min-h-[56px] py-3 px-6 sm:px-8 bg-gradient-to-br from-[#cafd00] to-[#beee00] hover:from-[#beee00] hover:to-[#cafd00] text-[#4a5e00] font-headline font-black text-sm sm:text-base tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95 flex items-center justify-center gap-2 w-full flex-wrap whitespace-normal text-center">
                <Zap strokeWidth={3} size={20} className="shrink-0" />
                <span>Iniciar Treino Instantâneo</span>
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/3 items-center justify-center opacity-10 transform -skew-x-12 translate-x-8 pointer-events-none">
            <Zap size={200} className="text-[#cafd00]" />
          </div>
        </section>

        {/* Seção B: Meus Planos de Treino */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-white">
              MEUS PLANOS
            </h3>
            {/* Ajuste do botão Criar Novo: Fundo neon, texto contrastante */}
            <Button className="bg-[#cafd00] text-[#4a5e00] hover:bg-[#beee00] font-headline font-bold flex items-center gap-2 rounded-xl">
              <PlusCircle size={20} />
              <span className="hidden sm:inline">CRIAR NOVO</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meusPlanos.map((plano) => (
              <div
                key={plano.id}
                className="bg-accent/10 border border-border/50 rounded-2xl p-6 relative group overflow-hidden hover:bg-accent/20 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
              >
                {/* Indicador de Status Colorido */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1.5 ${plano.visibilidade === 'publico' ? 'bg-[#cafd00]' : 'bg-muted-foreground/30'}`}
                ></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full font-headline uppercase tracking-wide ${plano.visibilidade === 'publico' ? 'bg-[#cafd00] text-[#4a5e00]' : 'bg-muted-foreground/20 text-muted-foreground'}`}
                    >
                      {plano.visibilidade}
                    </span>
                    <button className="text-muted-foreground hover:text-white transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  <h4 className="font-headline text-xl font-bold text-white mb-2 line-clamp-2">
                    {plano.nome}
                  </h4>
                  <p className="text-muted-foreground text-sm flex items-center gap-2 mb-6">
                    <ListOrdered size={16} />
                    {plano.exercicios} Exercícios
                  </p>
                </div>

                <Link to={`/treino?plano=${plano.id}`}>
                  <Button
                    variant="outline"
                    className="w-full border-border/50 hover:border-[#cafd00] hover:text-[#cafd00] hover:bg-[#cafd00]/5 text-white font-headline font-bold flex justify-center items-center gap-2 transition-all"
                  >
                    <Play size={16} fill="currentColor" />
                    INICIAR
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Seção C: Treinos Salvos (Comunidade) */}
        <section className="bg-accent/5 -mx-6 lg:-mx-10 px-6 lg:px-10 py-12 border-y border-border/30">
          <h3 className="font-headline text-2xl font-bold tracking-tight text-white mb-6">
            TREINOS SALVOS (COMUNIDADE)
          </h3>

          {/* Container alterado para flex-col para empilhar verticalmente */}
          <div className="flex flex-col gap-4">
            {treinosSalvosMock.slice(0, visibleSalvos).map((treino, index) => (
              <div
                key={treino.id}
                className={`w-full bg-background border border-border/50 rounded-2xl p-6 border-l-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-accent/10 transition-colors ${index === 0 ? 'border-l-[#cafd00]' : 'border-l-muted-foreground/30'}`}
              >
                <div>
                  <p className="text-xs font-headline text-muted-foreground mb-1 uppercase tracking-wider">
                    Por {treino.autor}
                  </p>
                  <h4 className="font-headline text-lg font-bold text-white mb-3 sm:mb-2 line-clamp-1">
                    {treino.nome}
                  </h4>
                  <div className="flex gap-2">
                    <span className="text-xs bg-accent/20 px-2 py-1 rounded text-muted-foreground">
                      {treino.nivel}
                    </span>
                    <span className="text-xs bg-accent/20 px-2 py-1 rounded text-muted-foreground">
                      {treino.tempo}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/treinos/${treino.id}`}
                  className="shrink-0 text-[#cafd00] font-headline text-sm font-bold flex items-center gap-1 hover:text-[#beee00] transition-colors mt-2 sm:mt-0"
                >
                  VER DETALHES
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          {/* Botão de carregar mais, renderizado dinamicamente */}
          {visibleSalvos < treinosSalvosMock.length && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                onClick={handleCarregarMais}
                className="border-border/50 hover:border-[#cafd00] hover:text-[#cafd00] text-muted-foreground font-headline font-bold uppercase tracking-widest rounded-xl transition-all"
              >
                Carregar Mais Treinos
              </Button>
            </div>
          )}
        </section>

        {/* Seção D: Histórico de Sessões */}
        <section className="space-y-6">
          <h3 className="font-headline text-2xl font-bold tracking-tight text-white">
            HISTÓRICO DE SESSÕES
          </h3>
          <div className="space-y-3">
            {historico.map((sessao) => (
              <Link
                key={sessao.id}
                to={`/treinos/sessao/${sessao.id}`}
                className="block group"
              >
                <div className="bg-accent/10 border border-border/50 p-5 rounded-xl flex items-center justify-between hover:bg-accent/20 hover:border-[#cafd00]/30 transition-all duration-300">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-background border border-border/50 rounded-full flex items-center justify-center text-[#cafd00] group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h5 className="font-headline font-bold text-white text-base sm:text-lg line-clamp-1">
                        {sessao.nome}
                      </h5>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                        {sessao.data} • {sessao.duracao}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    size={24}
                    className="shrink-0 text-muted-foreground group-hover:text-[#cafd00] transition-colors"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
