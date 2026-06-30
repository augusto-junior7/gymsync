import { useState, useEffect } from 'react'
import { Search, Dumbbell, Loader2, ArrowDownUp } from 'lucide-react'
import ExercicioCard from '@/components/ExercicioCard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import api from '@/services/api'

export default function Exercicios() {
  const [searchTerm, setSearchTerm] = useState('')
  const [ordenacao, setOrdenacao] = useState('nome-asc')
  const [exercicios, setExercicios] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [skip, setSkip] = useState(0)

  const LIMIT = 8

  // Busca os exercícios no backend aplicando filtros de texto, ordenação e lidando com paginação
  const fetchExercicios = async (currentSkip, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const response = await api.get('/exercicios', {
        params: {
          q: searchTerm,
          ordem: ordenacao,
          limit: LIMIT,
          skip: currentSkip,
        },
      })

      const data = response.data

      if (isLoadMore) {
        // Ao carregar mais, concatena os itens novos verificando duplicatas pelo ID
        setExercicios((prev) => {
          const existingIds = new Set(prev.map((e) => e._id || e.id))
          const newExercicios = data.dados.filter(
            (e) => !existingIds.has(e._id || e.id)
          )
          return [...prev, ...newExercicios]
        })
      } else {
        setExercicios(data.dados)
      }

      setHasMore(data.hasMore)
    } catch (error) {
      console.error('Erro ao buscar exercícios:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    setSkip(0)
    setExercicios([])
    setHasMore(true)

    const timeoutId = setTimeout(() => {
      fetchExercicios(0)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, ordenacao])

  const handleCarregarMais = () => {
    const nextSkip = skip + LIMIT
    setSkip(nextSkip)
    fetchExercicios(nextSkip, true)
  }

  return (
    <main className="min-h-screen p-6 lg:p-10 relative overflow-hidden bg-background">
      {/* Luzes de fundo decorativas */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col space-y-12 pb-20">
        <header className="space-y-2 pt-4">
          <h1 className="text-3xl md:text-4xl font-headline font-black text-white flex items-center gap-3">
            <Dumbbell className="text-[#cafd00]" size={32} />
            Banco de Exercícios
          </h1>
          <p className="text-muted-foreground text-lg">
            Consulte a execução correta, grupos musculares e adicione aos seus
            treinos.
          </p>
        </header>

        {/* Barra de Busca e Filtros */}
        <section className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              placeholder="Buscar exercício (ex: Supino)..."
              className="pl-12 h-14 bg-accent/20 border-border/50 text-white rounded-xl focus-visible:ring-[#cafd00] text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto h-14 px-5 bg-accent/20 border-border/50 rounded-xl text-white hover:text-[#cafd00] hover:border-[#cafd00]/50 transition-colors font-bold"
              >
                <ArrowDownUp size={20} className="mr-2" />
                {ordenacao === 'nome-asc'
                  ? 'Organizar (A-Z)'
                  : 'Organizar (Z-A)'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#1e1e1e] border-border/50 text-white">
              <DropdownMenuLabel>Organizar por</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/30" />
              <DropdownMenuItem
                onClick={() => setOrdenacao('nome-asc')}
                className="focus:bg-white/10 focus:text-white"
              >
                Nome (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOrdenacao('nome-desc')}
                className="focus:bg-white/10 focus:text-white"
              >
                Nome (Z-A)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        {/* Grade de Exercícios */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#cafd00]" size={40} />
          </div>
        ) : (
          <>
            {exercicios.length > 0 ? (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {exercicios.map((ex) => (
                  <ExercicioCard key={ex._id || ex.id} exercicio={ex} />
                ))}
              </section>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Dumbbell className="text-muted-foreground/30 mb-4" size={64} />
                <h3 className="text-xl font-bold text-white mb-2">
                  Nenhum exercício encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente buscar por outro termo ou ajuste os filtros.
                </p>
              </div>
            )}

            {hasMore && exercicios.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleCarregarMais}
                  disabled={loadingMore}
                  className="bg-[#cafd00] text-[#4a5e00] hover:bg-[#beee00] font-headline font-bold rounded-xl h-12 px-8"
                >
                  {loadingMore ? (
                    <Loader2 className="animate-spin mr-2" size={20} />
                  ) : null}
                  {loadingMore ? 'Carregando...' : 'Carregar mais'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
