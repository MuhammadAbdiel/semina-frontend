import axios from 'axios'
import { config } from '../configs'

const handleError = (error) => {
  const originalRequest = error.config
  if (error.response.data.msg === 'jwt expired') {
    originalRequest._retry = true
    const session = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {}

    return axios
      .get(
        `${config.api_host_dev}/cms/refresh-token/${session.refreshToken}/${session.email}`,
      )
      .then((res) => {
        localStorage.setItem(
          'auth',
          JSON.stringify({
            ...session,
            token: res.data.data.token,
            refreshToken: res.data.data.refreshToken,
          }),
        )
        originalRequest.headers.Authorization = `Bearer ${res.data.data.token}`

        return axios(originalRequest)
      })
      .catch(() => {
        window.location.href = '/signin'
        localStorage.removeItem('auth')
      })
  }

  return error
}

export default handleError
