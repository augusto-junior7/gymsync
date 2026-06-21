export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-accent/30 border border-muted-foreground/20 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-[#cafd00]/50 hover:bg-accent/50 transition-all duration-300 group cursor-default">
      <div className="w-14 h-14 bg-[#cafd00]/10 rounded-full flex items-center justify-center text-[#cafd00] mb-2 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
