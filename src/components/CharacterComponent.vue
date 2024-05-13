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
  <div class="title">
    <h1>{{ character.name }}</h1>
    -
    <h2>{{ character.clan }}</h2>
  </div>

  <div v-for="aipSession in openSessions">
    <AipSessionCard :aipSession="aipSession" :characterId="id" />
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
  h2 {
    font-size: 1.5rem;
    margin-left: 10px;
  }
}
</style>
