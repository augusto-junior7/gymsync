import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  MoreVertical,
  Bookmark,
  BookmarkMinus,
  Share2,
  Lock,
  Globe,
  Info,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import TreinoModal from '@/components/TreinoModal'
import api from '@/services/api'

export default function TreinoCard({
  treino,
  isOwner = false,
  showVisibilityBadge = false,
  isSaved = false,
}) {
  const [visibilidade, setVisibilidade] = useState(treino.visibilidade)
  const [salvo, setSalvo] = useState(isSaved)
  const isPublic = visibilidade === 'publico'
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sincroniza o estado local caso os dados venham atualizados da API em novas requisições
  useEffect(() => {
    setSalvo(isSaved)
  }, [isSaved])

  useEffect(() => {
    setVisibilidade(treino.visibilidade)
  }, [treino.visibilidade])

  const handleToggleVisibility = async () => {
    try {
      const novaVisibilidade = isPublic ? 'privado' : 'publico'
      const id = treino.id || treino._id
      
      setVisibilidade(novaVisibilidade)
      
      await api.patch(`/planos/${id}`, { visibilidade: novaVisibilidade })
    } catch (error) {
      console.error('Erro ao atualizar visibilidade:', error)
      setVisibilidade(isPublic ? 'publico' : 'privado')
    }
  }

  const handleToggleSave = async () => {
    try {
      const novoSalvo = !salvo
      const id = treino.id || treino._id
      
      setSalvo(novoSalvo)
      
      await api.patch(`/planos/${id}/salvar`)
    } catch (error) {
      console.error('Erro ao salvar/remover treino:', error)
      setSalvo(salvo)
    }
  }

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div
        onClick={handleCardClick}
        className="cursor-pointer bg-accent/10 border border-border/50 rounded-2xl p-6 relative group overflow-hidden hover:bg-accent/20 hover:border-[#cafd00]/30 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
      >
      {/* Indicador de Status Colorido */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 ${isOwner && isPublic ? 'bg-[#cafd00]' : 'bg-[#cafd00]/50'}`}
      ></div>

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 flex-wrap">
            {showVisibilityBadge && (
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full font-headline uppercase tracking-wide ${isPublic ? 'bg-[#cafd00] text-[#4a5e00]' : 'bg-transparent border border-border/30 text-white'}`}
              >
                {visibilidade}
              </span>
            )}

            {treino.nivel && (
              <span className="bg-background/80 text-muted-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-border/50">
                {treino.nivel}
              </span>
            )}
          </div>

          {/* Envolvemos o Dropdown num div com stopPropagation para isolar o clique */}
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="text-muted-foreground hover:text-white transition-colors focus:outline-none">
                  <MoreVertical size={20} />
                </button>
              </DropdownMenuTrigger>

              {/* Removido o focus:outline-none daqui para você manter a sua borda azul! */}
              <DropdownMenuContent
                align="end"
                className="w-48 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg shadow-xl text-white p-1 z-50"
              >
                {!isOwner && (
                  <DropdownMenuItem 
                    className="cursor-pointer gap-2 focus:bg-white/5 focus:text-white focus:outline-none rounded-md"
                    onClick={handleToggleSave}
                  >
                    {salvo ? (
                      <>
                        <BookmarkMinus size={16} /> Remover dos Salvos
                      </>
                    ) : (
                      <>
                        <Bookmark size={16} /> Salvar Treino
                      </>
                    )}
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-white/5 focus:text-white focus:outline-none rounded-md">
                  <Share2 size={16} /> Compartilhar
                </DropdownMenuItem>

                {isOwner && (
                  <DropdownMenuItem 
                    className="cursor-pointer gap-2 focus:bg-white/5 focus:text-white focus:outline-none rounded-md"
                    onClick={handleToggleVisibility}
                  >
                    {isPublic ? (
                      <>
                        <Lock size={16} /> Tornar Privado
                      </>
                    ) : (
                      <>
                        <Globe size={16} /> Tornar Público
                      </>
                    )}
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator className="bg-[#2a2a2a]" />

                <DropdownMenuItem
                  className="cursor-pointer gap-2 focus:bg-white/5 focus:text-white focus:outline-none rounded-md"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Info size={16} /> Ver Detalhes
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Informações Principais */}
        <div className="mb-6">
          <h4 className="font-headline text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-[#cafd00] transition-colors">
            {treino.nome}
          </h4>

          {!isOwner && (treino.autor || treino.usuarioId?.username) && (
            <p className="text-muted-foreground text-sm flex items-center gap-1.5">
              <User size={14} />
              Criado por <strong className="text-white">@{treino.autor || treino.usuarioId?.username}</strong>
            </p>
          )}
        </div>
      </div>

    </div>

      <TreinoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        treino={treino}
      />
    </>
  )
}
