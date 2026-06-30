import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, Plus, Dumbbell, Shield, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MobileSubpageBar from '@/components/MobileSubpageBar'
import ExercicioModal from '@/components/ExercicioModal'
import ExercicioConfigCard from '@/components/ExercicioConfigCard'
import api from '@/services/api'

export default function CriarTreino() {
  const navigate = useNavigate()

  // -- ESTADOS DO PLANO --
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [visibilidade, setVisibilidade] = useState('privado')
  const [exerciciosPlano, setExerciciosPlano] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // -- ESTADOS DA BUSCA (DRAWER) --
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // -- MANIPULAÇÃO DE EXERCÍCIOS NO PLANO --
  // Adiciona um exercício selecionado da busca ao plano atual, preenchendo com valores iniciais padrão
  const adicionarExercicio = (exercicioDb) => {
    const novoExercicio = {
      exercicioId: exercicioDb._id || exercicioDb.id,
      observacoes: '',
      series: [{ tipo: 'repeticao', repeticoes: 10, duracaoSegundos: null }],
      // Dados apenas para a UI
      uiNome: exercicioDb.nome,
      uiGrupo: exercicioDb.musculosPrincipais?.[0] || 'Geral',
    }
    setExerciciosPlano([...exerciciosPlano, novoExercicio])
    setIsSearchOpen(false)
  }

  const removerExercicio = (index) => {
    const atualizados = [...exerciciosPlano]
    atualizados.splice(index, 1)
    setExerciciosPlano(atualizados)
  }

  const atualizarObservacao = (index, obs) => {
    const atualizados = [...exerciciosPlano]
    atualizados[index].observacoes = obs
    setExerciciosPlano(atualizados)
  }

  // -- MANIPULAÇÃO DE SÉRIES --
  // Adiciona uma nova série (repetição ou tempo) ao final de um exercício específico
  const adicionarSerie = (exercicioIndex, tipo) => {
    const atualizados = [...exerciciosPlano]
    const novaSerie =
      tipo === 'repeticao'
        ? { tipo: 'repeticao', repeticoes: 10, duracaoSegundos: null }
        : { tipo: 'tempo', repeticoes: null, duracaoSegundos: 30 }

    atualizados[exercicioIndex].series.push(novaSerie)
    setExerciciosPlano(atualizados)
  }

  const removerSerie = (exercicioIndex, serieIndex) => {
    const atualizados = [...exerciciosPlano]
    atualizados[exercicioIndex].series.splice(serieIndex, 1)
    setExerciciosPlano(atualizados)
  }

  const atualizarSerie = (exercicioIndex, serieIndex, campo, valor) => {
    const atualizados = [...exerciciosPlano]
    atualizados[exercicioIndex].series[serieIndex][campo] = valor
      ? Number(valor)
      : null
    setExerciciosPlano(atualizados)
  }

  // -- REORDENAÇÃO DE EXERCÍCIOS --
  const moverExercicioCima = (index) => {
    if (index === 0) return
    const atualizados = [...exerciciosPlano]
    const temp = atualizados[index]
    atualizados[index] = atualizados[index - 1]
    atualizados[index - 1] = temp
    setExerciciosPlano(atualizados)
  }

  const moverExercicioBaixo = (index) => {
    if (index === exerciciosPlano.length - 1) return
    const atualizados = [...exerciciosPlano]
    const temp = atualizados[index]
    atualizados[index] = atualizados[index + 1]
    atualizados[index + 1] = temp
    setExerciciosPlano(atualizados)
  }

  // -- SALVAR PLANO --
  // Formata os dados para o padrão esperado pelo backend (payload) e faz a requisição de criação
  const salvarPlano = async () => {
    if (!nome.trim()) return alert('Dê um nome ao seu treino.')
    if (exerciciosPlano.length === 0)
      return alert('Adicione pelo menos um exercício.')

    // Formatando para o payload do Mongoose
    const payloadExercicios = exerciciosPlano.map((ex, idx) => ({
      exercicioId: ex.exercicioId,
      ordemExecucao: idx + 1,
      observacoes: ex.observacoes.trim() || null,
      series: ex.series.map((s) => ({
        tipo: s.tipo,
        repeticoes: s.tipo === 'repeticao' ? s.repeticoes : null,
        duracaoSegundos: s.tipo === 'tempo' ? s.duracaoSegundos : null,
      })),
    }))

    const payload = {
      nome,
      descricao: descricao.trim() || null,
      visibilidade,
      exercicios: payloadExercicios,
    }

    try {
      setIsLoading(true)
      await api.post('/planos/', payload)
      navigate('/treinos')
    } catch (error) {
      console.error('Erro ao salvar plano:', error)
      alert(error.response?.data?.mensagem || 'Erro ao salvar o treino.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-6 lg:p-10 relative overflow-hidden bg-background pb-32">
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col space-y-8">
        {/* Cabeçalho */}
        <section>
          <h2 className="font-headline text-3xl sm:text-4xl font-black tracking-tighter text-white uppercase leading-tight mb-2">
            Criar <span className="text-[#cafd00]">Treino</span>
          </h2>
          <p className="text-muted-foreground">
            Monte a sua rotina perfeita definindo exercícios, séries e métodos.
          </p>
        </section>

        {/* Informações Básicas */}
        <section className="bg-accent/10 border border-border/50 rounded-2xl p-6 space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="nome"
              className="text-white font-bold uppercase tracking-wider text-xs"
            >
              Nome do Treino
            </Label>
            <Input
              id="nome"
              placeholder="Ex: Treino A - Peito e Tríceps"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-[#1a1a1a] border-border/30 rounded-lg text-white h-12"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="descricao"
              className="text-white font-bold uppercase tracking-wider text-xs"
            >
              Descrição (Opcional)
            </Label>
            <Input
              id="descricao"
              placeholder="Ex: Foco em progressão de carga e amplitude"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="bg-[#1a1a1a] border-border/30 rounded-lg text-white h-12"
            />
          </div>

          <div className="space-y-2 pt-2">
            <Label className="text-white font-bold uppercase tracking-wider text-xs">
              Visibilidade
            </Label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setVisibilidade('privado')}
                className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border ${visibilidade === 'privado' ? 'bg-[#cafd00]/10 border-[#cafd00] text-[#cafd00]' : 'bg-background/50 border-border/50 text-muted-foreground'} font-bold transition-all`}
              >
                <ShieldAlert size={18} /> Privado
              </button>
              <button
                type="button"
                onClick={() => setVisibilidade('publico')}
                className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border ${visibilidade === 'publico' ? 'bg-[#cafd00]/10 border-[#cafd00] text-[#cafd00]' : 'bg-background/50 border-border/50 text-muted-foreground'} font-bold transition-all`}
              >
                <Shield size={18} /> Público
              </button>
            </div>
          </div>
        </section>

        {/* Lista de Exercícios Adicionados */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="font-headline text-xl font-bold text-white uppercase tracking-tight">
              Exercícios ({exerciciosPlano.length})
            </h3>
          </div>

          {exerciciosPlano.length === 0 ? (
            <div className="bg-background/30 border border-dashed border-border/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
              <Dumbbell size={40} className="text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground font-medium">
                Nenhum exercício adicionado ainda.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {exerciciosPlano.map((ex, exIdx) => (
                <ExercicioConfigCard
                  key={exIdx}
                  ex={ex}
                  exIdx={exIdx}
                  totalExercicios={exerciciosPlano.length}
                  moverExercicioCima={moverExercicioCima}
                  moverExercicioBaixo={moverExercicioBaixo}
                  removerExercicio={removerExercicio}
                  atualizarSerie={atualizarSerie}
                  removerSerie={removerSerie}
                  adicionarSerie={adicionarSerie}
                  atualizarObservacao={atualizarObservacao}
                />
              ))}
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => setIsSearchOpen(true)}
            className="w-full h-14 border-dashed border-2 border-border/50 hover:border-[#cafd00]/50 hover:bg-[#cafd00]/5 text-white font-bold rounded-2xl flex items-center gap-2"
          >
            <Plus size={18} /> Adicionar Novo Exercício
          </Button>
        </section>
      </div>

      {/* Floating Action Button para Salvar (Desktop Apenas) */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent z-40 pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <Button
            onClick={salvarPlano}
            disabled={isLoading}
            className="w-full bg-[#cafd00] hover:bg-[#beee00] text-[#4a5e00] font-headline font-black uppercase text-lg h-14 rounded-2xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {isLoading ? 'Salvando...' : 'Salvar Plano de Treino'}
          </Button>
        </div>
      </div>

      {/* Barra Inferior Mobile com botão Salvar */}
      <MobileSubpageBar
        rightAction={
          <Button
            onClick={salvarPlano}
            disabled={isLoading}
            className="bg-[#cafd00] hover:bg-[#beee00] text-[#4a5e00] font-headline font-bold uppercase rounded-xl h-12 px-6"
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        }
      />

      {/* Modal/Drawer de Busca de Exercícios */}
      <ExercicioModal
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        onAddExercicio={adicionarExercicio}
      />
    </main>
  )
}
