<template>
  <div>
    <p>wesh</p>
    <h1>c'esy ici</h1>
    <div v-for="character in characters" :key="character.id">
      <PlayerCharacterCard :character="character" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Character } from '@/types/character'
import CharacterService from '@/services/character.service'
import type { MinimalUser } from '@/types/minimalUser'
import UserService from '@/services/user.service'
import PlayerCharacterCard from '@/components/cards/PlayerCharacterCard.vue'

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
    currentUser() {
      console.log('current user :', this.$store.state.auth.user)
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
    }
  }
})
</script>

<style scoped lang="scss"></style>
