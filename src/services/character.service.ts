import axios from 'axios'
import authHeader from '@/services/auth-header.js'
import CharacterApi from '@/api/character.api'
import { Clan } from '@/types/enums/clan'
import type { Character } from '@/types/character'

const API_URL = 'http://localhost:8080/api/v1/characters'

class CharacterService {
  getAllCharacters() {
    return CharacterApi.getCharacters().then(
      (response: { data: Character[] }) => {
        return response.data.map((character) => {
          return { ...character, creationDate: new Date(character.creationDate) }
        })
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }

  getCharacter(id: string): Promise<Character> {
    return axios.get(API_URL + '/' + id, { headers: authHeader() })
  }

  isTaken(name: string, clan: Clan) {
    return CharacterApi.isTaken(name, clan)
  }

  addCharacter(character: Character): Promise<Character> {
    return CharacterApi.addCharacter(character).then(
      (response: { data: Character }) => {
        return { ...response.data, creationDate: new Date(response.data.creationDate) }
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }

  editCharacter(character: Character): Promise<Character> {
    console.log(character)
    return CharacterApi.editCharacter(character).then(
      (response: { data: Character }) => {
        return { ...response.data, creationDate: new Date(response.data.creationDate) }
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }

  deleteCharacter(character: Character) {
    return CharacterApi.deleteCharacter(character.id).then(
      (response: void) => {
        return response
      },
      (error) => {
        return error.response?.data?.message || error.message || error.toString()
      }
    )
  }
}

export default new CharacterService()
