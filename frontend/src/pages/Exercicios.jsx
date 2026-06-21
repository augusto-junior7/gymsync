import { useState } from 'react'
import { Search, Filter, Dumbbell } from 'lucide-react'
import ExercicioCard from '@/components/ExercicioCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const MOCK_EXERCICIOS = [
  {
    id: 1,
    nome: 'Supino Reto com Barra',
    grupoMuscular: 'Peito',
    dificuldade: 'Intermediário',
  },
  {
    id: 2,
    nome: 'Agachamento Livre',
    grupoMuscular: 'Pernas',
    dificuldade: 'Avançado',
  },
  {
    id: 3,
    nome: 'Rosca Direta',
    grupoMuscular: 'Bíceps',
    dificuldade: 'Iniciante',
  },
  {
    id: 4,
    nome: 'Puxada Frontal',
    grupoMuscular: 'Costas',
    dificuldade: 'Iniciante',
  },
  {
    id: 5,
    nome: 'Levantamento Terra',
    grupoMuscular: 'Costas',
    dificuldade: 'Avançado',
  },
  {
    id: 6,
    nome: 'Desenvolvimento com Halteres',
    grupoMuscular: 'Ombros',
    dificuldade: 'Intermediário',
  },
  {
    id: 7,
    nome: 'Elevação Pélvica',
    grupoMuscular: 'Glúteos',
    dificuldade: 'Intermediário',
  },
  {
    id: 8,
    nome: 'Prancha Abdominal',
    grupoMuscular: 'Abdômen',
    dificuldade: 'Iniciante',
  },
]

export default function Exercicios() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredExercicios = MOCK_EXERCICIOS.filter((ex) =>
    ex.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            Consulte a execução correta, grupos musculares e adicione aos seus treinos.
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

          <Button
            variant="outline"
            className="w-full md:w-auto h-14 px-5 bg-accent/20 border-border/50 rounded-xl text-white hover:text-[#cafd00] hover:border-[#cafd00]/50 transition-colors font-bold"
          >
            <Filter size={20} className="mr-2" />
            Filtros
          </Button>
        </section>

        {/* Grade de Exercícios */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredExercicios.map((ex) => (
            <ExercicioCard key={ex.id} exercicio={ex} />
          ))}
        </section>
      </div>
    </main>
  )
}
