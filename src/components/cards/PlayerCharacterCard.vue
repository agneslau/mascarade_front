<template>
  <div class="character_card">
    <div class="character_card__info">
      <div class="character_card__info__name">
        <h3>{{ character.name }}</h3>
      </div>
      <div class="character_card__info__clan">
        <p>{{ character.clan }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Character } from '@/types/character'

export default defineComponent({
  name: 'PlayerCharacterCard.vue',
  props: {
    character: {
      type: Object as () => Character,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
.character_card {
  cursor: pointer;
  width: 300px;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  .character_card__info {
    display: flex;
    flex-direction: column;
    .character_card__info__name {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .character_card__info__clan {
      font-size: 1.2rem;
    }
  }
}
</style>
