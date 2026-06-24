import { useState, useEffect } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Dumbbell, PlayCircle, Clock, Info, Shield, User, X } from 'lucide-react'

// Componente interno para mostrar o exercício com suas séries
function ExercicioPlanoCard({ exercicioPlano }) {
  // Considerando que 'exercicioId' esteja populado com os dados do exercício
  const exercicio = exercicioPlano.exercicioId || {}

  return (
    <div className="bg-accent/10 border border-border/50 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 bg-background/50 rounded-xl flex items-center justify-center border border-border/50 shrink-0">
          <Dumbbell className="text-muted-foreground/30" size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-headline font-bold text-base leading-tight truncate">
            {exercicio.nome || 'Exercício Desconhecido'}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#cafd00] bg-[#cafd00]/10 px-2 py-1 rounded-md">
              {exercicio.grupoMuscular || 'Geral'}
            </span>
          </div>
        </div>
      </div>

      {exercicioPlano.observacoes && (
        <div className="text-sm text-muted-foreground bg-background/30 p-2 rounded-lg flex gap-2 items-start">
          <Info size={16} className="shrink-0 mt-0.5 text-blue-400" />
          <p>{exercicioPlano.observacoes}</p>
        </div>
      )}

      {/* Lista de séries */}
      <div className="mt-2 space-y-2">
        <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Séries ({exercicioPlano.series?.length || 0})
        </h5>
        <div className="flex flex-col gap-1.5">
          {exercicioPlano.series?.map((serie, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-background/50 p-2 rounded-lg text-sm"
            >
              <span className="text-muted-foreground font-medium">
                Série {index + 1}
              </span>
              <span className="text-white font-bold">
                {serie.tipo === 'repeticao' ? (
                  `${serie.repeticoes} Repetições`
                ) : (
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {serie.duracaoSegundos}s
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TreinoModal({ isOpen, onClose, treino }) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  if (!treino) return null

  // Ordena os exercícios pela ordem de execução
  const exerciciosOrdenados = [...(treino.exercicios || [])].sort(
    (a, b) => a.ordemExecucao - b.ordemExecucao
  )

  return (
    <Drawer 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
      dismissible={!isDesktop}
    >
      <DrawerContent className="bg-[#1e1e1e] border-[#2a2a2a] max-h-[90vh]">
        <div className="mx-auto w-full max-w-md flex flex-col overflow-hidden">
          <DrawerHeader className="text-left relative flex-shrink-0">
            <DrawerTitle className="font-headline text-2xl font-black text-white uppercase pr-8">
              {treino.nome}
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground mt-2">
              {treino.descricao || 'Sem descrição.'}
            </DrawerDescription>

            <button 
              onClick={onClose}
              className="absolute right-0 top-0 opacity-70 hover:opacity-100 text-white rounded-full p-2 hover:bg-white/10 transition-colors cursor-pointer z-10"
            >
              <X size={20} />
            </button>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              {treino.visibilidade && (
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-accent/30 px-2.5 py-1.5 rounded-md">
                  <Shield size={14} />
                  {treino.visibilidade}
                </div>
              )}
              {treino.usuarioId?.nome && (
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#cafd00] bg-[#cafd00]/10 px-2.5 py-1.5 rounded-md">
                  <User size={14} />
                  {treino.usuarioId.nome}
                </div>
              )}
            </div>
          </DrawerHeader>

          {/* Área com scroll para a lista de exercícios */}
          <div className="p-4 overflow-y-auto flex-1 custom-scrollbar space-y-4">
            <h3 className="font-headline text-lg font-bold text-white uppercase tracking-tight flex items-center gap-2">
              <Dumbbell size={20} className="text-[#cafd00]" />
              Exercícios do Treino
            </h3>
            
            {exerciciosOrdenados.length > 0 ? (
              <div className="flex flex-col gap-3 pb-6">
                {exerciciosOrdenados.map((exercicioPlano, index) => (
                  <ExercicioPlanoCard key={index} exercicioPlano={exercicioPlano} />
                ))}
              </div>
            ) : (
              <div className="text-center p-8 text-muted-foreground">
                <p>Nenhum exercício cadastrado neste treino.</p>
              </div>
            )}
          </div>

          <DrawerFooter className="pt-2 pb-6 border-t border-border/50 flex-shrink-0">
            <Button className="w-full bg-[#cafd00] hover:bg-[#beee00] text-[#4a5e00] font-headline font-black uppercase text-base h-12 rounded-xl flex items-center justify-center gap-2">
              <PlayCircle size={24} />
              Iniciar Treino
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-border/50 text-white hover:bg-white/5"
            >
              Fechar
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
