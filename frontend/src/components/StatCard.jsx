export default function StatCard({ icon, title, value, subtitle }) {
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
