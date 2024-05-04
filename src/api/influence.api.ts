import { type AxiosResponse } from 'axios'
import type { Influence } from '@/types/influence'
import api from '@/api/api'

const API_URL = '/influences'

class InfluenceApi {
  getInfluencesByCharacterId(characterId: string): Promise<AxiosResponse<Influence[]>> {
    return api.get(API_URL + '/character/' + characterId)
  }
  addInfluences(influences: Influence[]): Promise<AxiosResponse<Influence[]>> {
    return api.post(API_URL, influences)
  }
  editInfluences(influences: Influence[]): Promise<AxiosResponse<Influence[]>> {
    console.log(influences)
    return api.put(API_URL, influences)
  }
}

export default new InfluenceApi()
