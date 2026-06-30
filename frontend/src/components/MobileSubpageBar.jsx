import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * MobileSubpageBar
 * Componente que substitui a Navbar no mobile para telas internas.
 * Fica fixado na base.
 * @param {ReactNode} rightAction - Botão ou elemento extra (ex: Salvar Treino)
 * @param {Function} onBack - Opcional. Se não passado, faz navigate(-1)
 */
export default function MobileSubpageBar({ rightAction, onBack }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full px-4 pb-6 pt-3 bg-[#1a1a1a]/90 backdrop-blur-xl z-50 rounded-t-[24px] shadow-[0_-8px_32px_rgba(202,253,0,0.05)] border-t border-[#484847]/15 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="text-white hover:bg-white/5 font-bold h-12 rounded-xl px-4 flex items-center gap-1"
      >
        <ChevronLeft size={20} />
        Voltar
      </Button>

      {rightAction && <div>{rightAction}</div>}
    </div>
  )
}
