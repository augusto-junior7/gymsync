import { useState, useEffect } from 'react'
import api from '@/services/api'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Activity, Calendar, Dumbbell, Flame, Plus, Search } from 'lucide-react'
import SessaoCard from '@/components/SessaoCard'
import ActionCard from '@/components/ActionCard'
import StatCard from '@/components/StatCard'

const historicoRecente = [
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

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem('gymsync_token')
        if (!token) {
          setError(
            'Token de autenticação não encontrado. Faça login novamente.'
          )
          setLoading(false)
          return
        }

        const response = await api.get('/usuarios/perfil')

        setUsuario(response.data)
      } catch (err) {
        setError(
          'Falha ao carregar os dados do painel. Tente recarregar a página.'
        )
        console.error('Erro no dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsuario()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-[#cafd00]/10 rounded-full blur-[120px]"></div>
        <div className="w-12 h-12 border-4 border-[#cafd00] border-t-transparent rounded-full animate-spin z-10"></div>
        <p className="mt-6 text-[#cafd00] font-headline font-bold text-lg animate-pulse tracking-widest uppercase z-10">
          Sincronizando...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="bg-accent/10 border border-red-500/30 p-8 rounded-2xl max-w-md w-full text-center space-y-4">
          <p className="text-red-500 font-bold">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full rounded-xl h-12"
          >
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  const primeiroNome = usuario?.nome?.split(' ')[0] || 'Atleta'

  const getSaudacao = () => {
    const horaAtual = new Date().getHours()
    if (horaAtual >= 6 && horaAtual < 12) {
      return 'Bom dia'
    } else if (horaAtual >= 12 && horaAtual < 18) {
      return 'Boa tarde'
    } else {
      return 'Boa noite'
    }
  }
  const saudacao = getSaudacao()

  return (
    <main className="min-h-screen p-6 lg:p-10 relative overflow-hidden bg-background">
      {/* Luzes de fundo decorativas */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-[#ece856]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col space-y-12 pb-20">
        {/* Cabeçalho */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-white">
              {saudacao}, <span className="text-[#cafd00]">{primeiroNome}</span>
              !
            </h1>
            <p className="text-muted-foreground font-medium text-lg">
              Pronto para superar seus limites hoje?
            </p>
          </div>
          <Link to="/treinos">
            <Button className="h-14 px-8 bg-gradient-to-br from-[#cafd00] to-[#beee00] hover:from-[#beee00] hover:to-[#cafd00] text-[#4a5e00] font-headline font-black text-base tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95 flex items-center gap-2">
              <Plus strokeWidth={3} size={20} />
              Iniciar Treino
            </Button>
          </Link>
        </header>

        {/* Grade de Estatísticas */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <StatCard
            icon={<Flame size={24} className="text-orange-500" />}
            title="Sequência Atual"
            value="0 dias"
            subtitle="Faça um treino hoje!"
          />
          <StatCard
            icon={<Dumbbell size={24} className="text-[#cafd00]" />}
            title="Treinos no Mês"
            value="0"
            subtitle="Sua meta é 12"
          />
          <StatCard
            icon={<Activity size={24} className="text-blue-400" />}
            title="Carga Movimentada"
            value="0 kg"
            subtitle="Volume total este mês"
          />
        </section>

        {/* Conteúdo Principal e Ações Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Atividades Recentes */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
              <Calendar className="text-[#cafd00]" size={24} />
              Últimos Treinos
            </h2>

            {historicoRecente.length > 0 ? (
              <div className="space-y-3">
                {historicoRecente.map((sessao) => (
                  <SessaoCard key={sessao.id} sessao={sessao} />
                ))}
              </div>
            ) : (
              <div className="bg-accent/10 border border-border/50 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-5 h-[300px]">
                <div className="w-20 h-20 bg-background/50 rounded-full flex items-center justify-center border border-border/50">
                  <Dumbbell className="text-muted-foreground/50" size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-headline">
                    Nenhum treino registrado
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm mt-2 mx-auto">
                    Você ainda não registrou nenhum treino. Inicie um treino
                    livre agora mesmo para começar a gerar estatísticas!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Explorar */}
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
              <Search className="text-[#cafd00]" size={24} />
              Explorar
            </h2>
            <div className="flex flex-col gap-4">
              <ActionCard
                title="Explorar a Comunidade"
                desc="Descubra novos treinos e desafie-se com a galera"
                to="/explorar"
              />
              <ActionCard
                title="Banco de Exercícios"
                desc="Filtre e descubra novos movimentos"
                to="/exercicios"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
