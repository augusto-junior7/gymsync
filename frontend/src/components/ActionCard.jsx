import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function ActionCard({ title, desc, to }) {
  return (
    <Link to={to} className="block group">
      <div className="bg-accent/10 border border-border/50 rounded-2xl p-6 flex items-center justify-between gap-4 hover:bg-[#cafd00]/5 hover:border-[#cafd00]/50 transition-all duration-300 cursor-pointer">
        <div>
          <h4 className="text-white font-bold font-headline text-lg group-hover:text-[#cafd00] transition-colors">
            {title}
          </h4>
          <p className="text-muted-foreground text-sm mt-1">{desc}</p>
        </div>
        <div className="shrink-0 w-10 h-10 rounded-full bg-background border border-border/50 flex items-center justify-center group-hover:bg-[#cafd00]/20 group-hover:border-[#cafd00]/50 transition-all">
          <ChevronRight
            className="text-muted-foreground group-hover:text-[#cafd00]"
            size={20}
          />
        </div>
      </div>
    </Link>
  )
}
