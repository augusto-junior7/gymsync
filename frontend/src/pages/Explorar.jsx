import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Dumbbell,
  ChevronRight,
  Loader2,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TreinoCard from '@/components/TreinoCard'
import api from '@/services/api'

export default function Explorar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [ordenacao, setOrdenacao] = useState('salvos') // 'salvos' ou 'recentes'
  const [planos, setPlanos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlanos = async () => {
      setLoading(true)
      try {
        const response = await api.get(
          `/planos/explorar?ordem=${ordenacao}&nome=${searchTerm}`
        )
        setPlanos(response.data.dados || [])
      } catch (error) {
        console.error('Erro ao buscar planos:', error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce para evitar muitas requisições enquanto o usuário digita
    const timer = setTimeout(() => {
      fetchPlanos()
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, ordenacao])

  return (
    <main className="min-h-screen p-6 lg:p-10 relative overflow-hidden bg-background">
      {/* Luzes de fundo decorativas (Efeito Verde padronizado) */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Container principal padronizado com as outras telas */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col space-y-12 pb-20">
        <header className="pt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-headline font-black text-white flex items-center gap-3">
              <Search className="text-[#cafd00]" size={32} />
              Explorar Comunidade
            </h1>
            <p className="text-muted-foreground text-lg">
              Descubra treinos criados por outros usuários e salve para a sua
              rotina.
            </p>
          </div>

          <Link to="/exercicios" className="block group w-full md:w-auto shrink-0">
            <div className="bg-accent/10 border border-border/50 rounded-2xl p-4 sm:p-5 flex items-center justify-between hover:bg-[#cafd00]/5 hover:border-[#cafd00]/50 transition-all duration-300 gap-4 md:min-w-[300px]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background border border-border/50 flex items-center justify-center group-hover:bg-[#cafd00]/20 group-hover:border-[#cafd00]/50 transition-all shrink-0">
                  <Dumbbell className="text-muted-foreground group-hover:text-[#cafd00]" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold font-headline text-lg group-hover:text-[#cafd00] transition-colors">
                    Banco de Exercícios
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Consulte o nosso catálogo
                  </p>
                </div>
              </div>
              <ChevronRight className="text-muted-foreground group-hover:text-[#cafd00] shrink-0" size={20} />
            </div>
          </Link>
        </header>

        {/* Barra de Busca e Ações Rápidas */}
        <section className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              placeholder="Buscar por nome do treino..."
              className="pl-12 h-14 bg-accent/20 border-border/50 text-white rounded-xl focus-visible:ring-[#cafd00] text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Container refatorado para o mobile (quebra de linha automática) */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Ordenação Rápida */}
            <div className="flex bg-accent/20 rounded-xl p-1 border border-border/50 w-full sm:w-max">
              <button
                onClick={() => setOrdenacao('salvos')}
                className={`flex-1 sm:flex-none flex items-center justify-center px-2 sm:px-4 py-2.5 rounded-lg text-[13px] sm:text-sm font-bold transition-all whitespace-nowrap ${
                  ordenacao === 'salvos'
                    ? 'bg-[#cafd00] text-[#4a5e00] shadow-sm'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                Mais Salvos
              </button>
              <button
                onClick={() => setOrdenacao('recentes')}
                className={`flex-1 sm:flex-none flex items-center justify-center px-2 sm:px-4 py-2.5 rounded-lg text-[13px] sm:text-sm font-bold transition-all whitespace-nowrap ${
                  ordenacao === 'recentes'
                    ? 'bg-[#cafd00] text-[#4a5e00] shadow-sm'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                Mais Recentes
              </button>
            </div>

            {/* Filtros agora ocupa a largura toda no mobile e alinha-se à direita no desktop */}
            <Button
              variant="outline"
              className="w-full sm:w-auto h-auto min-h-[48px] md:h-14 px-5 bg-accent/20 border-border/50 rounded-xl text-white hover:text-[#cafd00] hover:border-[#cafd00]/50 transition-colors font-bold"
            >
              <Filter size={20} className="mr-2" />
              Filtros
            </Button>
          </div>
        </section>

        {/* Grade de Treinos da Comunidade */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#cafd00]" size={32} />
          </div>
        ) : planos.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {planos.map((plano) => (
              <TreinoCard
                key={plano._id}
                treino={plano}
                isOwner={plano.isOwner || false}
                showVisibilityBadge={false}
                isSaved={plano.isSaved || false}
              />
            ))}
          </section>
        ) : (
          <div className="bg-accent/5 border border-border/30 rounded-2xl p-12 flex flex-col items-center justify-center text-center mt-8">
            <Compass size={48} className="text-muted-foreground/50 mb-4" />
            <h4 className="text-white font-headline font-bold text-xl mb-2">
              Nenhum treino encontrado
            </h4>
            <p className="text-muted-foreground max-w-md">
              Não encontramos treinos públicos com os critérios de busca
              atuais. Tente uma busca diferente ou verifique mais tarde!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
