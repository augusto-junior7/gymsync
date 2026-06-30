import {
  ChevronUp,
  ChevronDown,
  Dumbbell,
  Trash2,
  Clock,
  Plus,
} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ExercicioConfigCard({
  ex,
  exIdx,
  totalExercicios,
  moverExercicioCima,
  moverExercicioBaixo,
  removerExercicio,
  atualizarSerie,
  removerSerie,
  adicionarSerie,
  atualizarObservacao,
}) {
  return (
    <div className="bg-accent/5 border border-border/50 rounded-2xl overflow-hidden group">
      {/* Cabeçalho do Exercício */}
      <div className="p-4 bg-background/50 border-b border-border/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Botões de Reordenação */}
          <div className="flex flex-col gap-1 mr-1 shrink-0">
            <button
              onClick={() => moverExercicioCima(exIdx)}
              disabled={exIdx === 0}
              className="text-muted-foreground hover:text-[#cafd00] disabled:opacity-30 disabled:hover:text-muted-foreground p-0.5"
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={() => moverExercicioBaixo(exIdx)}
              disabled={exIdx === totalExercicios - 1}
              className="text-muted-foreground hover:text-[#cafd00] disabled:opacity-30 disabled:hover:text-muted-foreground p-0.5"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
            <Dumbbell size={16} className="text-[#cafd00]" />
          </div>
          <div className="truncate">
            <h4 className="text-white font-bold truncate">{ex.uiNome}</h4>
            <span className="text-[10px] text-[#cafd00] font-bold uppercase tracking-wider">
              {ex.uiGrupo}
            </span>
          </div>
        </div>
        <button
          onClick={() => removerExercicio(exIdx)}
          className="text-muted-foreground hover:text-red-400 p-2 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Corpo do Exercício (Séries e Obs) */}
      <div className="p-4 space-y-4">
        {/* Lista de Séries */}
        <div className="space-y-2">
          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Séries configuradas
          </Label>
          <div className="space-y-2">
            {ex.series.map((serie, serieIdx) => (
              <div
                key={serieIdx}
                className="flex items-center gap-3 bg-background/40 p-2 rounded-xl border border-border/30"
              >
                <span className="text-xs font-bold text-muted-foreground w-6 text-center">
                  {serieIdx + 1}
                </span>

                {serie.tipo === 'repeticao' ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      type="number"
                      value={serie.repeticoes || ''}
                      onChange={(e) =>
                        atualizarSerie(
                          exIdx,
                          serieIdx,
                          'repeticoes',
                          e.target.value
                        )
                      }
                      className="w-16 h-8 text-center bg-[#1a1a1a] border-border/30 rounded-lg text-white font-bold"
                    />
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Reps
                    </span>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      type="number"
                      value={serie.duracaoSegundos || ''}
                      onChange={(e) =>
                        atualizarSerie(
                          exIdx,
                          serieIdx,
                          'duracaoSegundos',
                          e.target.value
                        )
                      }
                      className="w-16 h-8 text-center bg-[#1a1a1a] border-border/30 rounded-lg text-white font-bold"
                    />
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1">
                      <Clock size={12} /> Segundos
                    </span>
                  </div>
                )}

                {ex.series.length > 1 && (
                  <button
                    onClick={() => removerSerie(exIdx, serieIdx)}
                    className="text-muted-foreground hover:text-red-400 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Botoes de Adicionar Serie */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => adicionarSerie(exIdx, 'repeticao')}
              className="flex-1 border-border/50 text-xs font-bold h-9 bg-background/30 hover:bg-white/5"
            >
              <Plus size={14} className="mr-1" /> REPETIÇÃO
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => adicionarSerie(exIdx, 'tempo')}
              className="flex-1 border-border/50 text-xs font-bold h-9 bg-background/30 hover:bg-white/5"
            >
              <Clock size={14} className="mr-1" /> TEMPO
            </Button>
          </div>
        </div>

        <div className="space-y-1.5 pt-2 border-t border-border/30">
          <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Observações
          </Label>
          <Input
            placeholder="Ex: Focar na contração excêntrica..."
            value={ex.observacoes || ''}
            onChange={(e) => atualizarObservacao(exIdx, e.target.value)}
            className="bg-[#1a1a1a] border-border/30 rounded-lg text-sm h-9"
          />
        </div>
      </div>
    </div>
  )
}
