import { Link } from 'react-router-dom'
import { CheckCircle2, ChevronRight } from 'lucide-react'

export default function SessaoCard({ sessao }) {
  return (
    <Link
      to={`/treinos/sessao/${sessao.id}`}
      className="block group"
    >
      <div className="bg-accent/10 border border-border/50 p-5 rounded-xl flex items-center justify-between hover:bg-accent/20 hover:border-[#cafd00]/30 transition-all duration-300">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-background border border-border/50 rounded-full flex items-center justify-center text-[#cafd00] group-hover:scale-110 transition-transform">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h5 className="font-headline font-bold text-white text-base sm:text-lg line-clamp-1">
              {sessao.nome}
            </h5>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
              {sessao.data} • {sessao.duracao}
            </p>
          </div>
        </div>
        <ChevronRight
          size={24}
          className="shrink-0 text-muted-foreground group-hover:text-[#cafd00] transition-colors"
        />
      </div>
    </Link>
  )
}
