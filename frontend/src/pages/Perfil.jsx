import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Perfil() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('gymsync_token')
    navigate('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20 space-y-8">
      <h1 className="text-3xl font-headline font-black text-white">
        Página de Perfil
      </h1>
      <Button
        onClick={handleLogout}
        className="h-12 px-8 bg-gradient-to-br from-[#ff4747] to-[#cc0000] hover:from-[#cc0000] hover:to-[#ff4747] text-white font-headline font-black tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(255,71,71,0.25)] transition-transform active:scale-95"
      >
        Desconectar
      </Button>
    </div>
  )
}
