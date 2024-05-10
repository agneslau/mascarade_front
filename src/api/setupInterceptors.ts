import axiosInstance from './api'
import TokenService from '@/services/token.service'

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token // for Spring Boot back-end
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      if (err.response?.status === 401) {
        store.dispatch('auth/logout')
      }

      /*if (originalConfig.url !== '/auth/authenticate' && err.response) {
        console.log('ici')
        // Access Token was expired
        if (err.response.status === 401 && originalConfig.url != '/auth/refresh-token') {
          originalConfig.retry = true
          console.log('retrying')
          console.log(err.response.status)

          try {
            console.log('tcici')
            console.log(TokenService.getLocalRefreshToken())
            const headers = { Authorization: 'Bearer ' + TokenService.getLocalRefreshToken() }
            const rs = await axios.post('auth/refresh-token', {}, { headers })
            console.log(rs.data)

            const { accessToken } = rs.data
            console.log(rs.data)

            store.dispatch('auth/refreshToken', accessToken)
            TokenService.updateLocalAccessToken(accessToken)

            return axiosInstance(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }*/

      return Promise.reject(err)
    }
  )
}

export default setup
