<script lang="ts">
import { defineComponent } from 'vue'
import type { Aip } from '@/types/aip'
import type { Character } from '@/types/character'
import CharacterService from '@/services/character.service'
import AipFormComponent from '@/components/forms/AipFormComponent.vue'
import type { AipSession } from '@/types/aipSession'
import AipService from '@/services/aip.service'

export default defineComponent({
  name: 'AipCard.vue',
  components: { AipFormComponent },
  props: {
    aip: {
      type: Object as () => Aip,
      required: true
    },
    aipSession: {
      type: Object as () => AipSession,
      required: true
    }
  },
  data() {
    return {
      character: {} as Character,
      content: '',
      isAipEditModalOpen: false,
      isAipOpen: this.aip.isOpen,
      isAipClosed: this.aip.isClosed,
      isAipRendered: this.aip.isRendered
    }
  },

  mounted() {
    CharacterService.getCharacterById(this.aip.characterId).then(
      (response: Character) => {
        this.character = response
      },
      (error) => {
        this.content = error.response?.data?.message || error.message || error.toString()
      }
    )
  },
  methods: {
    openAipEditModal() {
      this.isAipEditModalOpen = true
    },
    saveAip(aip: Aip) {
      AipService.addAipToSession(aip, this.aipSession.id).then(
        () => {},
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    saveStatus() {
      this.aip.isOpen = this.isAipOpen
      this.aip.isClosed = this.isAipClosed
      this.aip.isRendered = this.isAipRendered

      this.saveAip(this.aip)
    }
  }
})
</script>

<template>
  <div class="aip_card">
    <div class="aip_card__info">
      <b-tag type="is-info" v-if="aip.isRendered">Rendue</b-tag>
      <b-tag type="is-warning" v-if="aip.isClosed && !aip.isRendered">Fermée</b-tag>
      <b-tag type="is-success" v-if="!aip.isClosed">Ouverte</b-tag>
      <p>
        <strong>{{ character?.name }}</strong>
      </p>
    </div>
    <div class="aip_card__status">
      <b-field label="Ouvrir">
        <b-switch :disabled="isAipClosed" v-model="isAipOpen" />
      </b-field>
      <b-field label="Fermer">
        <b-switch
          :disabled="!aipSession.isClosed || !isAipOpen || isAipRendered"
          v-model="isAipClosed"
        />
      </b-field>
      <b-field label="Rendre">
        <b-switch :disabled="!isAipClosed" v-model="isAipRendered" />
      </b-field>
      <b-button>
        <b-icon icon="content-save" @click="saveStatus" />
      </b-button>
    </div>
    <div class="aip_card__actions">
      <b-button v-if="aip.isClosed && !aip.isRendered" @click="openAipEditModal">
        <b-icon icon="pencil" />
      </b-button>
      <b-button v-if="!aip.isClosed || (aip.isClosed && aip.isRendered)" @click="openAipEditModal">
        <b-icon type="is-info" icon="eye" />
      </b-button>
    </div>
  </div>
  <b-modal v-model="isAipEditModalOpen" has-modal-card :destroy-on-hide="true">
    <template #default="props">
      <AipFormComponent
        :character="character"
        :aip="aip"
        :aipSession="aipSession"
        :isStoryTeller="true"
        @close="props.close()"
        @saveAip="saveAip"
      />
    </template>
  </b-modal>
</template>

<style scoped lang="scss">
.aip_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;

  &__info {
    display: flex;
    justify-content: space-between;

    p {
      margin-right: 10px;
      margin-left: 10px;
    }
  }

  &__status {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
