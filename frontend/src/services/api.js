import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('gymsync_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const compartilhamentoTreino = async (dados) => {
  return await api.post('/notificacoes/compartilhamento', dados)
}

export const obterNotificacoes = async () => {
  return await api.get('/notificacoes')
}

export const responderNotificacoes = async (id, status) => {
  return await api.patch(`/notificacoes/${id}/responder`, { status })
}

export default api
