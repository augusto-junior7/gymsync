import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Zap,
  PlusCircle,
  Dumbbell,
} from 'lucide-react'
import TreinoCard from '@/components/TreinoCard'
import SessaoCard from '@/components/SessaoCard'

// --- DADOS MOCKADOS ---

const meusPlanos = [
  {
    id: '1',
    nome: 'Hipertrofia A - Peito e Tríceps',
    visibilidade: 'publico',
    nivel: 'Intermediário',
  },
  {
    id: '2',
    nome: 'Core & Mobilidade',
    visibilidade: 'privado',
    nivel: 'Iniciante',
  },
]

const treinosSalvosMock = [
  {
    id: '3',
    autor: 'marcos_fit',
    nome: 'Perna Destruidora 3000',
    nivel: 'Avançado',
  },
  {
    id: '4',
    autor: 'juliana_cross',
    nome: 'WOD: Fogo no Core',
    nivel: 'Intermediário',
  },
  {
    id: '5',
    autor: 'coach_leo',
    nome: 'Iniciante: Full Body',
    nivel: 'Iniciante',
  },
]

const treinosCompartilhadosMock = [
  {
    id: '6',
    autor: 'personal_carlos',
    nome: 'Ficha de Adaptação - Mês 1',
    nivel: 'Iniciante',
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

        {/* Seção B: Gerenciamento de Treinos com TABS */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-white uppercase">
              Biblioteca de Treinos
            </h3>
            <Button className="bg-[#cafd00] text-[#4a5e00] hover:bg-[#beee00] font-headline font-bold flex items-center gap-2 rounded-xl w-full sm:w-auto border-none">
              <PlusCircle size={20} />
              <span>CRIAR NOVO</span>
            </Button>
          </div>

          <Tabs defaultValue="meus-planos" className="w-full block">
            {/* TabsList refatorado com GRID para quebrar em 2 linhas no mobile e 1 linha no desktop */}
            <TabsList className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-row bg-accent/20 border border-border/50 p-1.5 rounded-xl mb-6 w-full sm:w-max h-auto">
              <TabsTrigger
                value="meus-planos"
                // col-span-1 no mobile (ocupa metade), flex no desktop
                className="col-span-1 sm:flex-none rounded-lg data-[state=active]:bg-[#cafd00] data-[state=active]:text-[#4a5e00] font-bold text-muted-foreground bg-transparent data-[state=inactive]:hover:bg-white/5 py-2 sm:py-2.5 px-1 sm:px-5 transition-all border-none text-[13px] sm:text-base whitespace-nowrap"
              >
                Meus Planos
              </TabsTrigger>
              <TabsTrigger
                value="salvos"
                // col-span-1 no mobile (ocupa metade), flex no desktop
                className="col-span-1 sm:flex-none rounded-lg data-[state=active]:bg-[#cafd00] data-[state=active]:text-[#4a5e00] font-bold text-muted-foreground bg-transparent data-[state=inactive]:hover:bg-white/5 py-2 sm:py-2.5 px-1 sm:px-5 transition-all border-none text-[13px] sm:text-base whitespace-nowrap"
              >
                Salvos
              </TabsTrigger>
              <TabsTrigger
                value="compartilhados"
                // col-span-2 no mobile (ocupa a linha inteira embaixo), flex no desktop
                className="col-span-2 sm:flex-none rounded-lg data-[state=active]:bg-[#cafd00] data-[state=active]:text-[#4a5e00] font-bold text-muted-foreground bg-transparent data-[state=inactive]:hover:bg-white/5 py-2 sm:py-2.5 px-1 sm:px-5 transition-all border-none text-[13px] sm:text-base whitespace-nowrap"
              >
                Compartilhados comigo
              </TabsTrigger>
            </TabsList>

            {/* CONTEÚDO: Meus Planos */}
            <TabsContent
              value="meus-planos"
              className="focus-visible:outline-none focus-visible:ring-0 mt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meusPlanos.map((plano) => (
                  <TreinoCard
                    key={plano.id}
                    treino={plano}
                    isOwner={true}
                    showVisibilityBadge={true}
                  />
                ))}
              </div>
            </TabsContent>

            {/* CONTEÚDO: Salvos */}
            <TabsContent
              value="salvos"
              className="focus-visible:outline-none focus-visible:ring-0 mt-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {treinosSalvosMock.map((treino) => (
                  <TreinoCard
                    key={treino.id}
                    treino={treino}
                    isOwner={false}
                    showVisibilityBadge={false}
                    isSaved={true}
                  />
                ))}
              </div>
            </TabsContent>

            {/* CONTEÚDO: Compartilhados */}
            <TabsContent
              value="compartilhados"
              className="focus-visible:outline-none focus-visible:ring-0 mt-0"
            >
              {treinosCompartilhadosMock.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treinosCompartilhadosMock.map((treino) => (
                    <TreinoCard
                      key={treino.id}
                      treino={treino}
                      isOwner={false}
                      showVisibilityBadge={false}
                      isSaved={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-accent/5 border border-border/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <Dumbbell
                    size={48}
                    className="text-muted-foreground/50 mb-4"
                  />
                  <h4 className="text-white font-headline font-bold text-xl mb-2">
                    Nenhum treino partilhado
                  </h4>
                  <p className="text-muted-foreground max-w-md">
                    Os treinos que os seus amigos enviarem diretamente para si
                    aparecerão aqui.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Seção C: Histórico de Sessões */}
        <section className="space-y-6 pt-6 border-t border-border/30">
          <h3 className="font-headline text-2xl font-bold tracking-tight text-white uppercase">
            HISTÓRICO DE SESSÕES
          </h3>
          <div className="space-y-3">
            {historico.map((sessao) => (
              <SessaoCard key={sessao.id} sessao={sessao} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
