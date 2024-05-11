<script lang="ts">
import CharacterService from '@/services/character.service'
import CharacterFormComponent from '@/components/forms/CharacterFormComponent.vue'
import CharacterCard from '@/components/cards/CharacterCard.vue'
import { defineComponent } from 'vue'
import { type Character } from '@/types/character'
import { type Influence } from '@/types/influence'
import { Clan } from '@/types/enums/clan'
import type { Herd } from '@/types/herd'
import type { MinimalUser } from '@/types/minimalUser'
import UserService from '@/services/user.service'
import InfluenceService from '@/services/influence.service'

export default defineComponent({
  name: 'CharactersComponent',
  components: {
    CharacterFormComponent,
    CharacterCard
  },
  data() {
    return {
      content: '',
      characters: [] as Character[],
      isModalOpen: false,
      character: {} as Character,
      users: [] as MinimalUser[],
      influences: [] as Influence[]
    }
  },
  mounted() {
    UserService.getMinimalUsers().then(
      (response) => {
        this.users = response
      },
      (error) => {
        this.content = error.response?.data?.message || error.message || error.toString()
      }
    )
    CharacterService.getAllCharacters().then(
      (response) => {
        this.characters = response
      },
      (error) => {
        this.content = error.response?.data?.message || error.message || error.toString()
      }
    )
  },
  methods: {
    openNewCharacter() {
      this.character = {
        id: '',
        name: '',
        clan: Clan[Symbol.hasInstance],
        competences: {
          INFORMATIQUE: 0,
          LANGUES: 0
        },
        assets: [],
        herd: {
          name: '',
          description: '',
          level: 0
        } as Herd,
        rituals: [],
        playerId: '',
        creationDate: new Date()
      }
      this.influences = [] as Influence[]
      this.isModalOpen = true
    },
    openEditCharacter(editableCharacter: Character) {
      InfluenceService.getInfluencesByCharacterId(editableCharacter.id).then(
        (response: Influence[]) => {
          this.influences = response
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
      this.character = { ...editableCharacter }
      this.isModalOpen = true
    },
    addCharacter(characterToAdd: Character) {
      CharacterService.addCharacter(characterToAdd).then(
        (response) => {
          this.characters.push(response)
          if (this.influences.length > 0) {
            InfluenceService.addInfluences(
              this.influences.map((influence) => {
                return { ...influence, characterId: response.id }
              })
            )
          }
          this.isModalOpen = false
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    editCharacter(characterToEdit: Character) {
      CharacterService.editCharacter(characterToEdit).then(
        (response) => {
          response.creationDate = new Date(response.creationDate)
          this.characters = this.characters.map((character) =>
            character.id === response.id ? response : character
          )
          const influencesToEdit = this.influences.map((influence) => ({
            ...influence,
            characterId: characterToEdit.id
          }))
          InfluenceService.editInfluences(influencesToEdit)
          this.isModalOpen = false
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    addInfluence(influence: Influence) {
      this.influences.push({ ...influence, id: '' })
      this.influences = [...this.influences]
    },
    editInfluence(influenceToEdit: Influence) {
      this.influences = this.influences.map((influence) =>
        influence.name === influenceToEdit.name ? influenceToEdit : influence
      )
    },
    deleteInfluence(influenceToDelete: Influence) {
      this.influences.splice(this.influences.indexOf(influenceToDelete), 1)
      this.influences = [...this.influences]
    },
    confirmDeleteCharacter(character: Character) {
      this.$buefy.dialog.confirm({
        title: 'Supprimer un personnage',
        message:
          'Etes-vous sûr de vouloir <b>supprimer</b> le personnage suivant? Cette action est irréversible. ' +
          '<br>' +
          '<br> ID: ' +
          '<b>' +
          character.id +
          '</b>' +
          '<br> nom: ' +
          '<b>' +
          character.name +
          '</b>' +
          '<br> clan: ' +
          '<b>' +
          character.clan +
          '</b>',
        confirmText: 'Supprimer',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteCharacter(character)
          this.$buefy.toast.open('Personnage supprimé!')
        }
      })
    },
    deleteCharacter(characterToDelete: Character) {
      CharacterService.deleteCharacter(characterToDelete).then(
        () => {
          this.characters = this.characters.filter(
            (character) => character.id !== characterToDelete.id
          )
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    getPlayer(playerId: string): MinimalUser {
      const user = this.users.find((user) => user.id === playerId)
      return user || { id: '', name: '' }
    }
  }
})
</script>

<template>
  <b-button @click="openNewCharacter" rounded type="is-primary">
    <b-icon icon="plus"></b-icon>
  </b-button>
  <div class="characters_list">
    <div class="characters_list__character" v-for="character in characters" :key="character.id">
      <character-card
        :character="character"
        :player="getPlayer(character.playerId)"
        @edit-character="openEditCharacter"
        @delete-character="confirmDeleteCharacter"
      />
    </div>
  </div>
  <b-modal v-model="isModalOpen" has-modal-card :destroy-on-hide="true">
    <template #default="props">
      <CharacterFormComponent
        :character="character"
        :influences="influences"
        @close="props.close()"
        @addCharacter="addCharacter"
        @addInfluence="addInfluence"
        @editCharacter="editCharacter"
        @editInfluence="editInfluence"
        @deleteInfluence="deleteInfluence"
      />
    </template>
  </b-modal>
</template>

<style scoped lang="scss">
.characters_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .characters_list__character {
    margin-top: 1rem;
  }
}
</style>
