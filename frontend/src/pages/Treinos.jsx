import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  PlusCircle,
  Dumbbell,
  Loader2,
  Bookmark,
  Share2,
} from 'lucide-react'
import TreinoCard from '@/components/TreinoCard'
import api from '@/services/api'

export default function Treinos() {
  const [meusPlanos, setMeusPlanos] = useState([])
  const [treinosSalvos, setTreinosSalvos] = useState([])
  const [treinosCompartilhados, setTreinosCompartilhados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarTreinos = async () => {
      try {
        setLoading(true)
        
        const [meusPlanosRes, salvosRes, compartilhadosRes] = await Promise.all([
          api.get('/planos/meus'),
          api.get('/planos/salvos'),
          api.get('/planos/compartilhados'),
        ])
        
        setMeusPlanos(meusPlanosRes.data.dados || [])
        setTreinosSalvos(salvosRes.data.dados || [])
        setTreinosCompartilhados(compartilhadosRes.data.dados || [])
      } catch (error) {
        console.error('Erro ao buscar treinos:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarTreinos()
  }, [])

  return (
    <main className="min-h-screen p-6 lg:p-10 relative overflow-hidden bg-background">
      {/* Luzes de fundo decorativas */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col space-y-12 pb-20">
        {/* Seção B: Gerenciamento de Treinos com TABS */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h3 className="font-headline text-2xl font-bold tracking-tight text-white uppercase">
              Biblioteca de Treinos
            </h3>
            <Link to="/criar-treino">
              <Button className="bg-[#cafd00] text-[#4a5e00] hover:bg-[#beee00] font-headline font-bold flex items-center gap-2 rounded-xl w-full sm:w-auto border-none">
                <PlusCircle size={20} />
                <span>CRIAR NOVO</span>
              </Button>
            </Link>
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
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin text-[#cafd00]" size={32} />
                </div>
              ) : meusPlanos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {meusPlanos.map((plano) => (
                    <TreinoCard
                      key={plano._id || plano.id}
                      treino={plano}
                      isOwner={true}
                      showVisibilityBadge={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-accent/5 border border-border/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <Dumbbell size={48} className="text-muted-foreground/50 mb-4" />
                  <h4 className="text-white font-headline font-bold text-xl mb-2">Nenhum plano criado</h4>
                  <p className="text-muted-foreground max-w-md">
                    Você ainda não criou nenhum plano de treino. Crie o seu primeiro agora mesmo!
                  </p>
                </div>
              )}
            </TabsContent>

            {/* CONTEÚDO: Salvos */}
            <TabsContent
              value="salvos"
              className="focus-visible:outline-none focus-visible:ring-0 mt-0"
            >
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin text-[#cafd00]" size={32} />
                </div>
              ) : treinosSalvos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treinosSalvos.map((treino) => (
                    <TreinoCard
                      key={treino._id || treino.id}
                      treino={treino}
                      isOwner={false}
                      showVisibilityBadge={false}
                      isSaved={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-accent/5 border border-border/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <Bookmark className="text-muted-foreground/50 mb-4" size={48} />
                  <h4 className="text-white font-headline font-bold text-xl mb-2">Nenhum treino salvo</h4>
                  <p className="text-muted-foreground max-w-md">
                    Explore a comunidade e salve treinos interessantes para acessá-los aqui.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* CONTEÚDO: Compartilhados */}
            <TabsContent
              value="compartilhados"
              className="focus-visible:outline-none focus-visible:ring-0 mt-0"
            >
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin text-[#cafd00]" size={32} />
                </div>
              ) : treinosCompartilhados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treinosCompartilhados.map((treino) => (
                    <TreinoCard
                      key={treino._id || treino.id}
                      treino={treino}
                      isOwner={false}
                      showVisibilityBadge={false}
                      isSaved={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-accent/5 border border-border/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <Share2
                    size={48}
                    className="text-muted-foreground/50 mb-4"
                  />
                  <h4 className="text-white font-headline font-bold text-xl mb-2">
                    Nenhum treino compartilhado com você
                  </h4>
                  <p className="text-muted-foreground max-w-md">
                    Os treinos que os seus amigos enviarem aparecerão aqui.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

      </div>
    </main>
  )
}
