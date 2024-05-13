import type { AipSession } from '@/types/aipSession'
import api from '@/api/api'
import type { AxiosResponse } from 'axios'
import type { Aip } from '@/types/aip'

const API_URL = '/aips'

class AipApi {
  addAipSession(aipSession: AipSession): Promise<AxiosResponse<AipSession>> {
    return api.post(`${API_URL}/sessions`, aipSession)
  }
  getAipSessions(): Promise<AxiosResponse<AipSession[]>> {
    return api.get(`${API_URL}/sessions`)
  }
  deleteAipSession(id: string): Promise<AxiosResponse<string>> {
    return api.delete(`${API_URL}/sessions/${id}`)
  }
  saveAipSession(aipSession: AipSession): Promise<AxiosResponse<AipSession>> {
    return api.put(`${API_URL}/sessions`, aipSession)
  }
  getOpenedSessionsByCharacter(characterId: string): Promise<AxiosResponse<AipSession[]>> {
    return api.get(`${API_URL}/sessions/opened/character/${characterId}`)
  }
  addAipToSession(aip: Aip, aipSessionId: string): Promise<AxiosResponse<Aip>> {
    return api.post(`${API_URL}/sessions/${aipSessionId}`, aip)
  }
  getAipSessionById(aipSessionId: string): Promise<AxiosResponse<AipSession>> {
    return api.get(`${API_URL}/sessions/${aipSessionId}`)
  }
}

export default new AipApi()
