<script lang="ts">
import { defineComponent } from 'vue'
import type { Character } from '@/types/character'
import CharacterService from '@/services/character.service'
import type { MinimalUser } from '@/types/minimalUser'
import UserService from '@/services/user.service'
import PlayerCharacterCard from '@/components/cards/PlayerCharacterCard.vue'
import type { AuthResponse } from '@/types/authResponse'

export default defineComponent({
  name: 'PlayerCharactersComponent.vue',
  components: { PlayerCharacterCard },
  data() {
    return {
      characters: [] as Character[],
      user: {} as MinimalUser,
      content: ''
    }
  },
  computed: {
    currentUser(): AuthResponse {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    if (this.currentUser) {
      UserService.getMinimalUserByEmail(this.currentUser.email).then(
        (response: MinimalUser) => {
          this.user = response
          this.getUserCharacters(this.user.id)
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    }
  },
  methods: {
    getUserCharacters(id: string) {
      CharacterService.getCharactersByPlayerId(id).then(
        (response: Character[]) => {
          this.characters = response
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    openCharacter(character: Character) {
      this.$router.push({ path: 'character/' + character.id })
    }
  }
})
</script>

<template>
  <div>
    <h1 class="title">Tes personnages</h1>
    <div v-for="character in characters" :key="character.id">
      <PlayerCharacterCard @click="openCharacter(character)" :character="character" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  border: 1px solid black;
  padding: 1rem;
  border-radius: 10px;
  background-color: lightyellow;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 10px;
  }
}
</style>
