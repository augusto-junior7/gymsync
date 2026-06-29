import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Compass, Dumbbell, User, Bell } from 'lucide-react'
import { obterNotificacoes, responderNotificacoes } from '@/services/api'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const location = useLocation()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notificacao, setNotificacao] = useState([])

  useEffect(() => {
    const carregandoNotificacoes = async () => {
      try {
        const resosta = await obterNotificacoes()
        setNotificacao(resosta.data)
      } catch (error) {
        console.error('Erro ao buscar notificações', error)
      }
    }
    carregandoNotificacoes()
  }, [])

  const handleResponder = async (id, status) => {
    try {
      await responderNotificacoes(id, status)
      setNotificacao((prev) => prev.filter((n) => n._id !== id))
      alert(
        status === 'aceito'
          ? 'Convite aceito com sucesso!'
          : 'Convite recusado.'
      )
    } catch (error) {
      console.error('Erro ao responder convite', error)
      alert('Erro ao processar a resposta.')
    }
  }

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Explorar', path: '/explorar', icon: Compass },
    { name: 'Treinos', path: '/treinos', icon: Dumbbell },
    { name: 'Perfil', path: '/perfil', icon: User },
  ]

  const checkIsActive = (path) => location.pathname === path

  // Encontra o índice numérico do link ativo para calcular o deslizamento
  const activeIndex = navLinks.findIndex((link) => checkIsActive(link.path))

  return (
    <>
      {/* =====================================================================
        CABEÇALHO (HEADER) - Fixo no topo
        =====================================================================
      */}

      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-8 py-4 bg-[#0e0e0e]/80 backdrop-blur-lg border-b border-[#484847]/15">
        {/* Logo (Esquerda) */}
        <div className="flex flex-1 justify-start">
          <Link
            to="/dashboard"
            className="font-headline font-black italic text-2xl md:text-3xl tracking-tighter text-[#cafd00] uppercase"
          >
            GymSync
          </Link>
        </div>

        {/* NAVEGAÇÃO DESKTOP & TABLET (Centro) */}
        <div className="hidden md:flex justify-center">
          <nav className="relative flex items-center bg-[#131313] p-1.5 rounded-full border border-[#484847]/15">
            {/* Fundo Deslizante Desktop (w-28 = 112px por item) */}
            <div
              className="absolute left-1.5 top-1.5 bottom-1.5 w-28 bg-white/10 rounded-full transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${activeIndex !== -1 ? activeIndex * 112 : 0}px)`,
                opacity: activeIndex !== -1 ? 1 : 0,
              }}
            />

            {navLinks.map((link) => {
              const isActive = checkIsActive(link.path)
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative z-10 w-28 text-center py-2 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-[#cafd00]'
                      : 'text-[#adaaaa] hover:text-[#f3ffca]'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* NOTIFICAÇÃO (Direita) */}
        <div className="flex flex-1 justify-end items-center">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
              isNotificationOpen
                ? 'text-[#cafd00] bg-transparent hover:bg-white/5'
                : 'text-[#adaaaa] bg-transparent hover:text-[#f3ffca] hover:bg-white/5'
            }`}
          >
            <Bell className="w-7 h-7 md:w-6 md:h-6" />

            {notificacao.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {notificacao.length}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div
              className="absolute top-full right-0 mt-2 w-72 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl shadow-xl p-4 z-50"
              onClick={(e) => e.stopPropagation()} // Impede que o clique feche o menu
            >
              <h4 className="text-white font-bold mb-3">Convites</h4>
              {notificacao.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Nenhum convite pendente.
                </p>
              ) : (
                notificacao.map((n) => (
                  <div
                    key={n._id}
                    className="mb-3 p-3 bg-white/5 rounded-lg border border-white/5"
                  >
                    <p className="text-xs text-white">
                      <strong>{n.remetente?.nome}</strong> compartilhou o treino
                      de "{n.planoId?.nome}" com você
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs font-bold bg-[#cafd00] text-black hover:bg-[#cafd00]/80 rounded-xl border-0"
                        onClick={() => handleResponder(n._id, 'aceito')}
                      >
                        Aceitar
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 h-8 text-xs font-bold bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5 rounded-xl"
                        onClick={() => handleResponder(n._id, 'recusado')}
                      >
                        Recusar
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </header>

      {/* =====================================================================
        NAVBAR MOBILE - Fixa na base
        =====================================================================
      */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-6 pt-2 bg-[#1a1a1a]/90 backdrop-blur-xl z-50 rounded-t-[24px] shadow-[0_-8px_32px_rgba(202,253,0,0.05)] border-t border-[#484847]/15">
        <div className="relative flex w-full items-center h-14">
          {/* Fundo Deslizante Mobile (1/4 da largura = 25% por item) */}
          <div
            className="absolute top-0 bottom-0 w-1/4 flex justify-center items-center transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${activeIndex !== -1 ? activeIndex * 100 : 0}%)`,
              opacity: activeIndex !== -1 ? 1 : 0,
            }}
          >
            <div className="w-12 h-12 bg-[#cafd00] rounded-xl shadow-[0_4px_16px_rgba(202,253,0,0.3)] transition-transform duration-300 -translate-y-2 scale-110" />
          </div>

          {navLinks.map((link) => {
            const isActive = checkIsActive(link.path)
            const Icon = link.icon

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative z-10 flex-1 flex flex-col items-center justify-center h-full transition-all duration-300 active:scale-90 ${
                  isActive
                    ? 'text-[#4a5e00] scale-110 -translate-y-2'
                    : 'text-[#f3ffca]/60 hover:text-[#cafd00]'
                }`}
              >
                <Icon className="w-6 h-6" />
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
