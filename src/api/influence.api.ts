import axios, { type AxiosResponse } from 'axios'
import authHeader from '@/services/auth-header'
import type { Influence } from '@/types/influence'

const API_URL = 'http://localhost:8080/api/v1/influences'

class InfluenceApi {
  getInfluencesByCharacterId(characterId: string): Promise<AxiosResponse<Influence[]>> {
    return axios.get(API_URL + '/character/' + characterId, { headers: authHeader() })
  }
  addInfluences(influences: Influence[]): Promise<AxiosResponse<Influence[]>> {
    return axios.post(API_URL, influences, { headers: authHeader() })
  }
  editInfluences(influences: Influence[]): Promise<AxiosResponse<Influence[]>> {
    console.log(influences)
    return axios.put(API_URL, influences, { headers: authHeader() })
  }
}

export default new InfluenceApi()
