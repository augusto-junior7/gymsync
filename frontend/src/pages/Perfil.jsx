import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User, Save, LogOut, Loader2 } from 'lucide-react'
import api from '@/services/api'

export default function Perfil() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({
    nome: '',
    username: '',
    email: '',
  })
  const [senhaAtual, setSenhaAtual] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const { data } = await api.get('/usuarios/perfil')
        setUsuario({
          nome: data.nome,
          username: data.username,
          email: data.email,
        })
      } catch (err) {
        setError('Falha ao carregar dados do perfil.')
      } finally {
        setLoading(false)
      }
    }
    fetchUsuario()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUsuario((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (senha && senha !== confirmarSenha) {
      setError('As senhas não coincidem.')
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    const dadosAtualizar = { ...usuario }
    if (senha) {
      dadosAtualizar.senha = senha
      dadosAtualizar.senhaAtual = senhaAtual
    }

    try {
      await api.patch('/usuarios/perfil', dadosAtualizar)
      setSuccess('Perfil atualizado com sucesso!')
      // Limpa os campos de senha após o sucesso
      setSenha('')
      setSenhaAtual('')
      setConfirmarSenha('')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar o perfil.')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('gymsync_token')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader2 className="animate-spin text-[#cafd00]" size={40} />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <h1 className="text-3xl font-headline font-black text-white flex items-center gap-3">
          <User className="text-[#cafd00]" size={28} />
          Meu Perfil
        </h1>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="text-red-400 hover:bg-red-500/10 hover:text-red-400 font-bold flex items-center gap-2 self-start md:self-center"
        >
          <LogOut size={16} />
          Desconectar
        </Button>
      </header>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              name="nome"
              value={usuario.nome}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input
              id="username"
              name="username"
              value={usuario.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={usuario.email}
            onChange={handleChange}
          />
        </div>

        <div className="pt-4 border-t border-border/50 space-y-4">
          <p className="text-sm text-muted-foreground">
            Para alterar sua senha, preencha os campos abaixo. Sua senha atual é
            necessária para confirmação.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="senhaAtual">
                Senha Atual{' '}
                {(senha || confirmarSenha) && (
                  <span className="text-red-500 text-xs font-normal">
                    (obrigatório para alterar a senha)
                  </span>
                )}
              </Label>
              <Input
                id="senhaAtual"
                type="password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                required={!!senha || !!confirmarSenha}
                placeholder="Sua senha atual"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Nova Senha</Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <Button type="submit" disabled={saving} className="w-full md:w-auto">
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </div>
  )
}
