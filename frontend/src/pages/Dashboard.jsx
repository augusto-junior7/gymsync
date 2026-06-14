import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Activity,
  Calendar,
  Dumbbell,
  Flame,
  Plus,
  Search,
  ChevronRight,
} from 'lucide-react'

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

        const response = await axios.get(
          'http://localhost:3000/usuarios/perfil',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

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
              Bem-vindo, <span className="text-[#cafd00]">{primeiroNome}</span>!
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

            <div className="bg-accent/10 border border-border/50 rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-5 h-[300px]">
              <div className="w-20 h-20 bg-background/50 rounded-full flex items-center justify-center border border-border/50">
                <Dumbbell className="text-muted-foreground/50" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-headline">
                  Nenhum treino registrado
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm mt-2 mx-auto">
                  Você ainda não registrou nenhum treino. Inicie um treino livre
                  agora mesmo para começar a gerar estatísticas!
                </p>
              </div>
            </div>
          </div>

          {/* Explorar */}
          <div className="space-y-6">
            <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
              <Search className="text-[#cafd00]" size={24} />
              Explorar
            </h2>
            <div className="flex flex-col gap-4">
              <ActionCard
                title="Banco de Exercícios"
                desc="Filtre e descubra novos movimentos"
                to="/exercicios"
              />
              <ActionCard
                title="Treinos da Comunidade"
                desc="Descubra o que a galera está treinando"
                to="/comunidade"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div className="bg-accent/10 border border-border/50 rounded-2xl p-6 flex flex-col space-y-3 relative overflow-hidden group hover:bg-accent/20 hover:border-[#cafd00]/30 transition-all duration-300">
      <div className="flex justify-between items-start z-10">
        <span className="text-muted-foreground font-bold text-xs tracking-widest uppercase">
          {title}
        </span>
        {icon}
      </div>
      <div className="pt-2 z-10">
        <h3 className="text-4xl font-black text-white font-headline tracking-tighter">
          {value}
        </h3>
        <p className="text-muted-foreground text-sm mt-1 font-medium">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

function ActionCard({ title, desc, to }) {
  return (
    <Link to={to} className="block group">
      <div className="bg-accent/10 border border-border/50 rounded-2xl p-6 flex items-center justify-between hover:bg-[#cafd00]/5 hover:border-[#cafd00]/50 transition-all duration-300 cursor-pointer">
        <div>
          <h4 className="text-white font-bold font-headline text-lg group-hover:text-[#cafd00] transition-colors">
            {title}
          </h4>
          <p className="text-muted-foreground text-sm mt-1">{desc}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center group-hover:bg-[#cafd00]/20 group-hover:border-[#cafd00]/50 transition-all">
          <ChevronRight
            className="text-muted-foreground group-hover:text-[#cafd00]"
            size={20}
          />
        </div>
      </div>
    </Link>
  )
}
