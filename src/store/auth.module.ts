import AuthService from '@/services/auth.service'
import type { AuthRequest } from '@/types/authRequest'
import type { AuthResponse } from '@/types/authResponse'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, authRequest: AuthRequest): Promise<AuthResponse> {
      return AuthService.login(authRequest).then(
        (authResponse: AuthResponse) => {
          commit('loginSuccess', authResponse)
          return Promise.resolve(authResponse)
        },
        (error) => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }): void {
      AuthService.logout()
      commit('logout')
    },
    refreshToken({ commit }, accessToken: string): void {
      commit('refreshToken', accessToken)
    }
  },
  mutations: {
    loginSuccess(state, user: AuthResponse) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
    refreshToken(state, accessToken: string) {
      state.status.loggedIn = true
      state.user = { ...state.user, accessToken: accessToken }
    }
  }
}
