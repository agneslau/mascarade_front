import type { Character } from '@/types/character'
import axios, { type AxiosResponse } from 'axios'
import authHeader from '@/services/auth-header.js'
import { Clan } from '@/types/enums/clan'

const API_URL = 'http://localhost:8080/api/v1/characters'

class CharacterApi {
  getCharacters(): Promise<AxiosResponse<Character[]>> {
    return axios.get(API_URL, { headers: authHeader() })
  }
  getCharacter(id: string): Promise<Character> {
    return axios.get(API_URL + '/' + id, { headers: authHeader() })
  }

  isTaken(name: string, clan: Clan) {
    return axios.get(API_URL + '/isTaken?name=' + name + '&clan=' + clan, { headers: authHeader() })
  }

  addCharacter(character: Character): Promise<AxiosResponse<Character>> {
    return axios.post(API_URL, character, { headers: authHeader() })
  }

  editCharacter(character: Character): Promise<AxiosResponse<Character>> {
    return axios.put(API_URL + '/' + character.id, character, { headers: authHeader() })
  }

  deleteCharacter(id: string): Promise<void> {
    return axios.delete(API_URL + '/' + id, { headers: authHeader() })
  }
}

export default new CharacterApi()
