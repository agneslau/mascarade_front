import type { Character } from '@/types/character'
import { type AxiosResponse } from 'axios'
import { Clan } from '@/types/enums/clan'
import api from './api'

const API_URL = '/characters'

class CharacterApi {
  getCharacters(): Promise<AxiosResponse<Character[]>> {
    return api.get(API_URL)
  }
  getCharacter(id: string): Promise<Character> {
    return api.get(API_URL + '/' + id)
  }
  getCharactersByPlayerId(id: string): Promise<AxiosResponse<Character[]>> {
    return api.get(API_URL + '/id/' + id)
  }

  isTaken(name: string, clan: Clan) {
    return api.get(API_URL + '/isTaken?name=' + name + '&clan=' + clan)
  }

  addCharacter(character: Character): Promise<AxiosResponse<Character>> {
    return api.post(API_URL, character)
  }

  editCharacter(character: Character): Promise<AxiosResponse<Character>> {
    return api.put(API_URL + '/' + character.id, character)
  }

  deleteCharacter(id: string): Promise<void> {
    return api.delete(API_URL + '/' + id)
  }
}

export default new CharacterApi()
