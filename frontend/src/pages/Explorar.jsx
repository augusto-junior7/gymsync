import { useState } from 'react'
import {
  Search,
  Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TreinoCard from '@/components/TreinoCard'

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
    <main className="min-h-screen p-6 lg:p-10 relative overflow-hidden bg-background">
      {/* Luzes de fundo decorativas (Efeito Verde padronizado) */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Container principal padronizado com as outras telas */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col space-y-12 pb-20">
        <header className="space-y-2 pt-4">
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
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MOCK_PLANOS.map((plano) => {
            // Adaptando o dado mockado para o formato que o card espera,
            // se o banco retornar formatos diferentes
            const treinoAdaptado = {
              ...plano,
              id: plano._id,
              autor: plano.usuarioId.username,
            }

            return (
              <TreinoCard
                key={treinoAdaptado.id}
                treino={treinoAdaptado}
                isOwner={false}
                showVisibilityBadge={false}
                isSaved={false} // Lógica sua para checar se o usuário atual já salvou
              />
            )
          })}
        </section>
      </div>
    </main>
  )
}
