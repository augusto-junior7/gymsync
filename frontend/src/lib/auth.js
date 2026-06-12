export function isTokenValid(token) {
  if (!token) return false

  try {
    const parts = token.split('.')
    if (parts.length !== 3) return false

    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(payload)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
    const data = JSON.parse(jsonPayload)
    if (!data.exp) return false

    const now = Math.floor(Date.now() / 1000)
    return data.exp > now
  } catch {
    return false
  }
}

export function getStoredToken(key = 'gymsync_token') {
  return localStorage.getItem(key)
}
