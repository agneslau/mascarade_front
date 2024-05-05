import type { AipSession } from '@/types/aipSession'
import AipApi from '@/api/aip.api'

class AipService {
  addAipSession(aipSession: AipSession): Promise<AipSession> {
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
  getOpenedSessions(): Promise<AipSession[]> {
    return AipApi.getOpenedSessions().then(
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
}

export default new AipService()
