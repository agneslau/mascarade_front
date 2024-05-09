<script lang="ts">
import { defineComponent } from 'vue'
import type { AipSession } from '@/types/aipSession'
import { type Aip, createEmptyAip } from '@/types/aip'
import AipFormComponent from '@/components/forms/AipFormComponent.vue'
import type { Character } from '@/types/character'
import CharacterService from '@/services/character.service'
import AipService from '@/services/aip.service'
import { createEmptyExpenditure } from '@/types/expenditure'
import { createEmptyVampireAction } from '@/types/vampireAction'

export default defineComponent({
  name: 'AipSessionCard',
  components: { AipFormComponent },
  props: {
    aipSession: {
      type: Object as () => AipSession,
      required: true
    },
    characterId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isAipEditModalOpen: false,
      character: {} as Character,
      content: ''
    }
  },
  mounted() {
    CharacterService.getCharacterById(this.characterId).then(
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
    getAipToOpen(): Aip {
      if (!this.aipSession.aips.filter((aip: Aip) => aip.characterId === this.characterId)[0]) {
        this.aipSession.aips.push(createEmptyAip(this.characterId))
      }
      return this.aipSession.aips.filter((aip: Aip) => aip.characterId === this.characterId)[0]
    },
    saveAip(aip: Aip) {
      console.log('save')
      console.log(aip)
      AipService.addAipToSession(aip, this.aipSession.id).then(
        (response: Aip) => {
          console.log(response)
          this.aipSession.aips.push(response)
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    addExpenditure() {
      console.log(this.aipSession.aips[0])
      this.aipSession.aips[0].expenditures = this.aipSession.aips[0].expenditures
        ? [...this.aipSession.aips[0].expenditures, createEmptyExpenditure()]
        : [createEmptyExpenditure()]
    },
    addVampireAction() {
      this.aipSession.aips[0].vampireActions = [
        ...this.aipSession.aips[0].vampireActions,
        createEmptyVampireAction()
      ]
    }
  }
})
</script>

<template>
  <div class="aip_session_card">
    <div class="aip_session_card__info">
      <b-icon v-if="aipSession.aips.length > 0" icon="check-circle" type="is-success"></b-icon>
      <b-icon v-else icon="close-circle" type="is-danger"></b-icon>
      <p>
        <strong>{{ aipSession.name }} </strong> :
        {{ aipSession.beginDate.toLocaleDateString('fr-FR') }} -
        {{ aipSession.endDate.toLocaleDateString('fr-FR') }}
      </p>
    </div>
    <div class="aip_session_card__status">
      <div class="aip_session_card__status__tags">
        <b-tag type="is-info" v-if="aipSession.isRendered">Rendue</b-tag>
        <b-tag type="is-warning" v-if="aipSession.isClosed && !aipSession.isRendered">Fermée</b-tag>
        <b-tag type="is-success" v-if="!aipSession.isClosed">Ouverte</b-tag>
      </div>
      <div class="aip_session_card__status__actions">
        <b-icon
          v-if="!aipSession.isClosed"
          @click="openAipEditModal()"
          icon="chevron-right-box"
          type="is-success"
        ></b-icon>

        <b-icon
          v-if="aipSession.isClosed"
          @click="console.log('see')"
          icon="eye"
          type="is-info"
        ></b-icon>
      </div>
    </div>
  </div>
  <b-modal v-model="isAipEditModalOpen" has-modal-card :destroy-on-hide="true">
    <template #default="props">
      <AipFormComponent
        :character="character"
        :aip="getAipToOpen()"
        :aipSession="aipSession"
        @close="props.close()"
        @saveAip="saveAip"
        @add-expenditure="addExpenditure"
        @add-vampire-action="addVampireAction"
      />
    </template>
  </b-modal>
</template>

<style scoped lang="scss">
.aip_session_card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;

  &__info {
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__status {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;

    &__tags {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-right: 5px;
    }

    &__actions {
      cursor: pointer;
    }
  }
}
</style>
