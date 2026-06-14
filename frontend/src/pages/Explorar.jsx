import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  Dumbbell,
  Calendar,
  Bookmark,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Dados simulados para o design inicial (sem integração com a API por enquanto)
const MOCK_PLANOS = [
  {
    _id: '1',
    nome: 'Treino de Força Full Body',
    usuarioId: { username: 'Augusto' },
    exercicios: [1, 2, 3, 4, 5],
    totalSalvamentos: 120,
    createdAt: '2026-06-12T10:00:00Z',
    nivel: 'Intermediário',
  },
  {
    _id: '2',
    nome: 'Hipertrofia - Peito e Tríceps',
    usuarioId: { username: 'Matheus' },
    exercicios: [1, 2, 3, 4, 5, 6],
    totalSalvamentos: 85,
    createdAt: '2026-06-10T14:30:00Z',
    nivel: 'Avançado',
  },
  {
    _id: '3',
    nome: 'Iniciante Adaptação',
    usuarioId: { username: 'Gabriel' },
    exercicios: [1, 2, 3],
    totalSalvamentos: 340,
    createdAt: '2026-06-01T08:15:00Z',
    nivel: 'Iniciante',
  },
]

export default function Explorar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [ordenacao, setOrdenacao] = useState('salvos') // 'salvos' ou 'recentes'

  return (
    <div className="flex flex-col space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-headline font-black text-white flex items-center gap-3">
          <Search className="text-[#cafd00]" size={32} />
          Explorar Comunidade
        </h1>
        <p className="text-muted-foreground text-lg">
          Descubra treinos criados por outros usuários e salve para a sua
          rotina.
        </p>
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

        <div className="flex gap-2 h-14 overflow-x-auto pb-1 md:pb-0 hide-scrollbar">
          {/* Ordenação Rápida */}
          <div className="flex bg-accent/20 rounded-xl p-1 border border-border/50 min-w-max">
            <button
              onClick={() => setOrdenacao('salvos')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${ordenacao === 'salvos' ? 'bg-[#cafd00] text-[#4a5e00] shadow-sm' : 'text-muted-foreground hover:text-white'}`}
            >
              Mais Salvos
            </button>
            <button
              onClick={() => setOrdenacao('recentes')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${ordenacao === 'recentes' ? 'bg-[#cafd00] text-[#4a5e00] shadow-sm' : 'text-muted-foreground hover:text-white'}`}
            >
              Mais Recentes
            </button>
          </div>

          <Button
            variant="outline"
            className="h-full px-5 bg-accent/20 border-border/50 rounded-xl text-white hover:text-[#cafd00] hover:border-[#cafd00]/50 transition-colors"
          >
            <Filter size={20} className="mr-2" />
            Filtros
          </Button>
        </div>
      </section>

      {/* Grade de Treinos da Comunidade */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_PLANOS.map((plano) => (
          <Link
            key={plano._id}
            to={`/treinos/${plano._id}`}
            className="group block h-full"
          >
            <div className="bg-accent/10 border border-border/50 rounded-2xl p-6 flex flex-col h-full hover:bg-accent/20 hover:border-[#cafd00]/50 transition-all duration-300 relative overflow-hidden">
              {/* Efeito Hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#cafd00] to-[#beee00] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="flex justify-between items-start mb-4">
                <span className="bg-background/80 text-muted-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-border/50">
                  {plano.nivel}
                </span>
                <div className="flex items-center gap-1.5 text-[#cafd00] bg-[#cafd00]/10 px-3 py-1.5 rounded-lg border border-[#cafd00]/20">
                  <Bookmark size={16} fill="currentColor" />
                  <span className="text-sm font-bold">
                    {plano.totalSalvamentos}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-headline font-black text-white mb-2 group-hover:text-[#cafd00] transition-colors line-clamp-2">
                {plano.nome}
              </h3>

              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center border border-border">
                  <User size={12} className="text-white" />
                </div>
                <span>
                  Criado por{' '}
                  <strong className="text-white hover:underline decoration-[#cafd00] decoration-2 underline-offset-2">
                    @{plano.usuarioId.username}
                  </strong>
                </span>
              </div>

              <div className="mt-auto flex items-center justify-between text-muted-foreground text-sm pt-5 border-t border-border/20">
                <div className="flex items-center gap-2">
                  <Dumbbell size={16} className="text-[#cafd00]/70" />
                  <span className="font-medium">
                    {plano.exercicios.length} exercícios
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-white/50" />
                  <span>
                    {new Date(plano.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}
