import axios, { type AxiosResponse } from 'axios'
import authHeader from '@/services/auth-header.js'
import type { AipSession } from '@/types/aipSession'

const API_URL = 'http://localhost:8080/api/v1/aips/sessions'

class AipApi {
  addAipSession(aipSession: AipSession): Promise<AxiosResponse<AipSession>> {
    return axios.post(API_URL, aipSession, { headers: authHeader() })
  }
  getAipSessions(): Promise<AxiosResponse<AipSession[]>> {
    return axios.get(API_URL, { headers: authHeader() })
  }
  deleteAipSession(id: string): Promise<AxiosResponse<string>> {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() })
  }
}

export default new AipApi()
