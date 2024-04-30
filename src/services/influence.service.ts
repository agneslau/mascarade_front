import type { Influence } from '@/types/influence'
import InfluenceApi from '@/api/influence.api'
import type { AxiosResponse } from 'axios'

class InfluenceService {
  getInfluencesByCharacterId(characterId: string): Promise<Influence[]> {
    return InfluenceApi.getInfluencesByCharacterId(characterId).then(
      (response: { data: Influence[] }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
  addInfluences(influences: Influence[]): Promise<AxiosResponse<Influence[]>> {
    console.log(influences)
    return InfluenceApi.addInfluences(influences)
  }

  editInfluences(influences: Influence[]): Promise<AxiosResponse<Influence[]>> {
    console.log(influences)
    return InfluenceApi.editInfluences(influences)
  }
}

export default new InfluenceService()
