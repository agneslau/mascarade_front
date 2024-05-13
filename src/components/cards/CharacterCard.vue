<script lang="ts">
import { defineComponent } from 'vue'
import type { Character } from '@/types/character'
import type { MinimalUser } from '@/types/minimalUser'

export default defineComponent({
  name: 'CharacterCard',
  props: {
    character: {
      type: Object as () => Character,
      required: true
    },
    player: {
      type: Object as () => MinimalUser,
      required: false
    }
  },
  methods: {
    openEditCharacter() {
      this.$emit('editCharacter', this.character)
    },
    confirmDeleteCharacter() {
      this.$emit('deleteCharacter', this.character)
    },
    getPlayerName() {
      return this.player?.name
    }
  },
  emits: ['editCharacter', 'deleteCharacter']
})
</script>

<template>
  <div class="character_card">
    <div class="character_card__info">
      <div class="character_card__info__name">
        <h3>{{ character.name }}</h3>
      </div>
      <div class="character_card__info__clan">
        <p>{{ character.clan }}</p>
      </div>
      <div class="character_card__info__player">
        <p>
          joueur : <strong>{{ getPlayerName() }}</strong>
        </p>
      </div>
    </div>
    <div class="charcacter_card__actions">
      <b-button @click="openEditCharacter">
        <b-icon icon="pencil"></b-icon>
      </b-button>
      <b-button @click="confirmDeleteCharacter">
        <b-icon icon="delete" type="is-danger"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.character_card {
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
    .character_card__info__player {
      font-size: 1rem;
    }
  }
  .charcacter_card__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .button {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
