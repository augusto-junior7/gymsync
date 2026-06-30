import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import api from '@/services/api'

export default function ExercicioModal({
  isSearchOpen,
  setIsSearchOpen,
  onAddExercicio,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const fetchExercicios = async () => {
    setIsSearching(true)
    try {
      const response = await api.get('/exercicios', {
        params: {
          q: searchTerm,
          limit: 50, // Limite maior para garantir que exiba vários resultados no modal
        },
      })

      const data = response.data.dados || []
      setSearchResults(data)
    } catch (error) {
      console.error('Erro ao buscar exercícios:', error)
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (!isSearchOpen) return

    // Aplica debounce na busca para evitar múltiplas requisições
    const timeoutId = setTimeout(() => {
      fetchExercicios()
    }, 500)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, isSearchOpen])

  return (
    <Drawer open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DrawerContent className="bg-[#1e1e1e] border-[#2a2a2a] max-h-[90vh]">
        <div className="mx-auto w-full max-w-lg flex flex-col overflow-hidden h-[80vh]">
          <DrawerHeader className="text-left border-b border-border/50 pb-4">
            <DrawerTitle className="font-headline text-xl font-bold text-white uppercase">
              Catálogo de Exercícios
            </DrawerTitle>
            <DrawerDescription>
              Pesquise e selecione o exercício desejado.
            </DrawerDescription>

            <div className="relative mt-4">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Buscar por nome ou músculo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 text-white h-12 rounded-xl"
              />
            </div>
          </DrawerHeader>

          <div className="p-4 overflow-y-auto flex-1 custom-scrollbar space-y-2">
            {isSearching ? (
              <div className="text-center py-10 text-muted-foreground font-medium">
                Buscando...
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((ex) => (
                <div
                  key={ex._id || ex.id}
                  onClick={() => onAddExercicio(ex)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-border/30 group"
                >
                  <div>
                    <h4 className="text-white font-bold">{ex.nome}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] bg-accent/30 text-muted-foreground px-2 py-0.5 rounded-md font-bold uppercase">
                        {ex.musculosPrincipais?.[0] || 'Geral'}
                      </span>
                      {ex.equipamento && (
                        <span className="text-[10px] bg-background text-muted-foreground px-2 py-0.5 rounded-md font-bold uppercase border border-border/30">
                          {ex.equipamento}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 text-[#cafd00] hover:text-[#cafd00] hover:bg-[#cafd00]/10"
                  >
                    Adicionar
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground font-medium">
                Nenhum exercício encontrado.
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
