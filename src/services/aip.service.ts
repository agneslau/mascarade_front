import type { AipSession } from '@/types/aipSession'
import AipApi from '@/api/aip.api'
import type { Aip } from '@/types/aip'

class AipService {
  addAipSession(aipSession: AipSession): Promise<AipSession> {
    aipSession.aips = [] as Aip[]
    return AipApi.addAipSession(aipSession).then(
      (response: { data: AipSession }) => {
        return {
          ...response.data,
          beginDate: new Date(response.data.beginDate),
          endDate: new Date(response.data.endDate)
        }
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
  getAipSessions(): Promise<AipSession[]> {
    return AipApi.getAipSessions().then(
      (response: { data: AipSession[] }) => {
        return response.data.map((aipSession) => ({
          ...aipSession,
          beginDate: new Date(aipSession.beginDate),
          endDate: new Date(aipSession.endDate)
        }))
      },
      (error: any) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
  deleteAipSession(id: string): Promise<string> {
    return AipApi.deleteAipSession(id).then(
      (response: { data: string }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
  saveAipSession(aipSession: AipSession): Promise<AipSession> {
    aipSession.aips = aipSession.aips.map((aip: Aip) => ({
      ...aip,
      isOpen: aipSession.isOpen,
      isClosed: aipSession.isClosed,
      isRendered: aipSession.isRendered
    }))
    return AipApi.saveAipSession(aipSession).then(
      (response: { data: AipSession }) => {
        return {
          ...response.data,
          beginDate: new Date(response.data.beginDate),
          endDate: new Date(response.data.endDate)
        }
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
  getOpenedSessionsByCharacter(characterId: string): Promise<AipSession[]> {
    return AipApi.getOpenedSessionsByCharacter(characterId).then(
      (response: { data: AipSession[] }) => {
        return response.data.map((aipSession) => ({
          ...aipSession,
          beginDate: new Date(aipSession.beginDate),
          endDate: new Date(aipSession.endDate)
        }))
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
  addAipToSession(aip: Aip, aipSessionId: string): Promise<Aip> {
    return AipApi.addAipToSession(aip, aipSessionId).then(
      (response: { data: Aip }) => {
        return response.data
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
  getAipSessionById(aipSessionId: string): Promise<AipSession> {
    return AipApi.getAipSessionById(aipSessionId).then(
      (response: { data: AipSession }) => {
        return {
          ...response.data,
          beginDate: new Date(response.data.beginDate),
          endDate: new Date(response.data.endDate)
        }
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
}

export default new AipService()
