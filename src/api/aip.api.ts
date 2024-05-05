import type { AipSession } from '@/types/aipSession'
import api from '@/api/api'
import type { AxiosResponse } from 'axios'

const API_URL = '/aips/sessions'

class AipApi {
  addAipSession(aipSession: AipSession): Promise<AxiosResponse<AipSession>> {
    return api.post(API_URL, aipSession)
  }
  getAipSessions(): Promise<AxiosResponse<AipSession[]>> {
    return api.get(API_URL)
  }
  deleteAipSession(id: string): Promise<AxiosResponse<string>> {
    return api.delete(`${API_URL}/${id}`)
  }
  saveAipSession(aipSession: AipSession): Promise<AxiosResponse<AipSession>> {
    return api.put(API_URL, aipSession)
  }
  getOpenedSessions(): Promise<AxiosResponse<AipSession[]>> {
    return api.get(`${API_URL}/opened`)
  }
}

export default new AipApi()
