import { Dumbbell, PlayCircle } from 'lucide-react'

export default function ExercicioCard({ exercicio }) {
  return (
    <div className="bg-accent/10 border border-border/50 rounded-2xl p-5 hover:bg-accent/20 hover:border-[#cafd00]/30 transition-all cursor-pointer group flex flex-col h-full">
      <div className="w-full h-32 bg-background/50 rounded-xl mb-4 flex items-center justify-center border border-border/50 group-hover:border-[#cafd00]/50 transition-colors relative overflow-hidden">
        <Dumbbell className="text-muted-foreground/30" size={48} />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayCircle className="text-[#cafd00]" size={40} />
        </div>
      </div>
      <h3 className="text-white font-headline font-bold text-lg leading-tight mb-2 line-clamp-2">
        {exercicio.nome}
      </h3>
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#cafd00] bg-[#cafd00]/10 px-2 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis">
          {exercicio.grupoMuscular ||
            (exercicio.musculosPrincipais && exercicio.musculosPrincipais[0]) ||
            'Músculo'}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-accent/30 px-2 py-1 rounded-md whitespace-nowrap overflow-hidden text-ellipsis">
          {exercicio.dificuldade || exercicio.nivel || 'Nível'}
        </span>
      </div>
    </div>
  )
}
