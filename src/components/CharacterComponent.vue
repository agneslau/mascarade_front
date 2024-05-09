<script lang="ts">
import { defineComponent } from 'vue'
import type { Character } from '@/types/character'
import CharacterService from '@/services/character.service'
import type { AipSession } from '@/types/aipSession'
import AipService from '@/services/aip.service'
import AipSessionCard from './cards/AipSessionCard.vue'

export default defineComponent({
  name: 'Character.vue',
  components: { AipSessionCard },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      character: {} as Character,
      openSessions: [] as AipSession[],
      content: ''
    }
  },
  mounted() {
    CharacterService.getCharacterById(this.id).then(
      (response: Character) => {
        this.character = response
        AipService.getOpenedSessionsByCharacter(this.character.id).then(
          (response: AipSession[]) => {
            this.openSessions = response
            console.log(this.openSessions)
          },
          (error) => {
            this.content = error.response?.data?.message || error.message || error.toString()
          }
        )
      },
      (error) => {
        this.content = error.response?.data?.message || error.message || error.toString()
      }
    )
  }
})
</script>

<template>
  <h1>character : {{ id }}</h1>
  <h2>{{ character.name }}</h2>

  <div v-for="aipSession in openSessions">
    <AipSessionCard :aipSession="aipSession" :characterId="id" />
  </div>
</template>

<style scoped lang="scss"></style>
