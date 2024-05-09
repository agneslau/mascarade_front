<template>
  <div>Character</div>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <b-icon icon="bat" type="is-info" size="is-large"> </b-icon>
        <p class="modal-card-title">{{ getTitle() }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <p v-if="!isEdition()">
          Attention : le nom du personnsage ne pourra plus être modifié après la création
        </p>
        <div class="model-card-body__section">
          <b-field v-if="isEdition()" label="ID">
            <b-input
              type="text"
              placeholder="Id généré automatiquement"
              autocomplete="off"
              :value="character.id"
              disabled
            >
            </b-input>
          </b-field>

          <b-field
            label="Nom"
            :type="nameAttributes.nameType"
            :message="nameAttributes.nameMessage"
          >
            <b-input
              type="text"
              v-model="character.name"
              placeholder="Nom du personnage"
              autocomplete="off"
              required
              :disabled="isEdition()"
            >
            </b-input>
          </b-field>
          <b-field label="Date de création">
            <b-datepicker
              placeholder="Clique pour sélectionner une date"
              trap-focus
              required
              v-model="character.creationDate"
            >
            </b-datepicker>
          </b-field>
          <b-field
            label="Clan"
            :type="clanAttributes.clanType"
            :message="clanAttributes.clanMessage"
          >
            <b-select
              placeholder="Choisis un clan"
              :model-value="character.clan"
              required
              @update:model-value="updateClan"
            >
              <option v-for="clan in clanAttributes.clans" :key="clan.key" :value="clan.key">
                {{ clan.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="model-card-body__section">
          <b-field label="Rituels">
            <b-checkbox v-model="ritualsAttributes.isAmeDeLHomoncule" @change="updateRituels">
              Ame de l'Homoncule
            </b-checkbox>
          </b-field>
          <b-field label="Atouts">
            <b-checkbox
              v-model="assetAttributes.isMarionnettiste"
              @change="updateAssetMarionnettiste"
              >marionnettiste</b-checkbox
            >
            <b-checkbox v-model="assetAttributes.isMonopoliste" @change="updateAssetMonopoliste"
              >monopoliste</b-checkbox
            >
            <b-checkbox v-model="assetAttributes.isParangon" @change="updateAssetParangon"
              >parangon</b-checkbox
            >
          </b-field>
        </div>
        <div class="model-card-body__section">
          <b-field label="Compétences">
            <b-field
              v-for="competence in competencesAttributes.competences"
              :key="competence.key"
              :label="competence.name"
            >
              <b-numberinput
                size="is-small"
                v-model="competence.value"
                :min="0"
                :max="7"
                :step="1"
                controls-position="compact"
                required
                @update:model-value="updateCompetence(competence)"
              />
            </b-field>
          </b-field>

          <b-field
            label="Troupeau"
            :type="herdAttributes.herdType"
            :message="herdAttributes.herdMessage"
          >
            <b-field label="Nom" :type="herdAttributes.herdType">
              <b-input
                type="text"
                v-model="character.herd.name"
                placeholder="Nom du troupeau"
                autocomplete="off"
              >
              </b-input>
            </b-field>
            <b-field label="Description" :type="herdAttributes.herdType">
              <b-input
                type="textarea"
                maxlength="250"
                v-model="character.herd.description"
                placeholder="Description du troupeau"
                autocomplete="off"
              >
              </b-input>
            </b-field>
            <b-field label="Niveau" :type="herdAttributes.herdType">
              <b-numberinput
                size="is-small"
                v-model="character.herd.level"
                :min="0"
                :max="7"
                :step="1"
                controls-position="compact"
                required
              />
            </b-field>
          </b-field>
        </div>
        <div class="model-card-body__section">
          <div v-if="influences">
            <InfluenceTable
              @addInfluence="addInfluence"
              @editInfluence="editInfluence"
              @deleteInfluence="deleteInfluence"
              :influences="influences"
            />
          </div>
        </div>
        <div class="model-card-body__section">
          <b-field label="Joueur">
            <b-select
              placeholder="Choisis un joueur"
              :model-value="getPlayerName(character.playerId)"
              @update:model-value="updatePlayer"
            >
              <option v-for="user in users" :key="user.id" :value="user.name">
                {{ user.name }}
              </option>
            </b-select>
          </b-field>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button v-if="!isEdition()" label="Ajouter" type="is-primary" @click="addCharacter" />
        <b-button v-if="isEdition()" label="Modifier" type="is-primary" @click="editCharacter" />
      </footer>
    </div>
  </form>
</template>

<script lang="ts">
import UserService from '@/services/user.service'
import { defineComponent } from 'vue'
import { type Character } from '@/types/character'
import InfluenceTable from '@/components/table/InfluenceTable.vue'
import type { Influence } from '@/types/influence'
import { Clan } from '@/types/enums/clan'
import { Ritual } from '@/types/enums/ritual'
import { Asset } from '@/types/enums/asset'
import CharacterService from '@/services/character.service'
import { type MinimalUser } from '@/types/minimalUser'

export default defineComponent({
  emits: [
    'close',
    'addCharacter',
    'editCharacter',
    'canCancel',
    'editInfluence',
    'addInfluence',
    'deleteInfluence'
  ],
  name: 'CharacterFormComponent',
  components: {
    InfluenceTable
  },
  props: {
    character: {
      type: Object as () => Character,
      required: true
    },
    influences: {
      type: Array as () => Influence[],
      required: false
    }
  },
  data() {
    return {
      selected: new Date(),
      users: [] as MinimalUser[],
      minimalUser: {} as MinimalUser,
      nameAttributes: {
        nameType: '',
        nameMessage: '',
        isNameTaken: false,
        isNameValid: true
      },
      clanAttributes: {
        isClanSet: false,
        clanType: '',
        clanMessage: '',
        clans: [
          { key: 'BRUJAH', name: 'Brujah' },
          { key: 'GANGREL', name: 'Gangrel' },
          {
            key: 'MALKAVIAN',
            name: 'Malkavian'
          },
          { key: 'NOSFERATU', name: 'Nosferatu' },
          { key: 'TOREADOR', name: 'Toreador' },
          {
            key: 'TREMERE',
            name: 'Tremere'
          },
          { key: 'VENTRUE', name: 'Ventrue' },
          { key: 'CAITIFF', name: 'Caitiff' },
          {
            key: 'ASSAMITE',
            name: 'Assamite'
          },
          { key: 'SETHITE', name: 'Sethite' },
          { key: 'GIOVANNI', name: 'Giovanni' },
          {
            key: 'LASOMBRA',
            name: 'Lasombra'
          },
          { key: 'TZIMISCE', name: 'Tzimisce' },
          { key: 'RAVNOS', name: 'Ravnos' }
        ]
      },
      competencesAttributes: {
        competences: [{ key: 'INFORMATIQUE', value: 0, name: 'informatique' }]
      },
      assetAttributes: {
        //assetList: [{key: 'MONOPOLISTE', value:1, name:'monopoliste'}, {key:'MARIONNETTISTE', value:2, name:'marionnettiste'}, {key: 'PARANGON', value:3, name:'parangon'}],
        isMarionnettiste: false,
        isParangon: false,
        isMonopoliste: false
      },
      ritualsAttributes: {
        isAmeDeLHomoncule: false
      },
      herdAttributes: {
        herdType: '',
        herdMessage: '',
        isHerdValid: true
      }
    }
  },
  mounted() {
    UserService.getMinimalUsers().then(
      (response) => {
        this.users = response
        this.minimalUser = {
          ...(this.users.find((user) => user.id == this.character.playerId) || {
            id: '',
            name: '',
            email: ''
          })
        }
      },
      (error) => {
        this.users = error.response?.data?.message || error.message || error.toString()
      }
    )
    this.updateFormProps()
  },
  methods: {
    isEdition() {
      return !!this.character.id
    },
    updateClan(clan: string) {
      this.character.clan = clan as Clan
    },
    updateRituels() {
      //updateFormProps() works here and this method is not useful but kept for future refactoring
      if (this.ritualsAttributes.isAmeDeLHomoncule) {
        this.character.rituals.push(Ritual.AME_DE_L_HOMONCULE)
      } else {
        this.character.rituals = this.character.rituals.filter(
          (ritual) => ritual !== Ritual.AME_DE_L_HOMONCULE
        )
      }
    },
    //TODO : refactor code to put all assets in a separate component
    updateAssetMarionnettiste() {
      if (this.assetAttributes.isMarionnettiste) {
        this.character.assets.push(Asset.MARIONNETTISTE)
      } else {
        this.character.assets = this.character.assets.filter(
          (asset) => asset !== Asset.MARIONNETTISTE
        )
      }
    },
    updateAssetMonopoliste() {
      if (this.assetAttributes.isMonopoliste) {
        this.character.assets.push(Asset.MONOPOLISTE)
      } else {
        this.character.assets = this.character.assets.filter((asset) => asset !== Asset.MONOPOLISTE)
      }
    },
    updateAssetParangon() {
      if (this.assetAttributes.isParangon) {
        this.character.assets.push(Asset.PARANGON)
      } else {
        this.character.assets = this.character.assets.filter((asset) => asset !== Asset.PARANGON)
      }
    },

    updateCompetence(competence) {
      this.character.competences[competence.key] = competence.value
    },

    updatePlayer(playerName: string) {
      const player = this.users.find((user) => user.name == playerName)
      if (player) {
        this.character.playerId = player.id
      } else {
        this.character.playerId = ''
      }
    },
    getPlayerName(playerId: string) {
      return this.users.find((user) => user.id == playerId)?.name
    },

    updateFormProps() {
      this.competencesAttributes.competences.map((competence) => {
        competence.value = this.character.competences[competence.key]
        return competence
      })
      this.assetAttributes.isMonopoliste = this.character.assets?.includes(Asset.MONOPOLISTE)
      this.assetAttributes.isMarionnettiste = this.character.assets?.includes(Asset.MARIONNETTISTE)
      this.assetAttributes.isParangon = this.character.assets?.includes(Asset.PARANGON)
      this.ritualsAttributes.isAmeDeLHomoncule = this.character.rituals?.includes(
        Ritual.AME_DE_L_HOMONCULE
      )
    },
    async addCharacter() {
      this.checkClan()
      await this.checkName()
      this.checkHerd()
      if (
        this.nameAttributes.isNameValid &&
        this.herdAttributes.isHerdValid &&
        this.clanAttributes.isClanSet
      ) {
        this.$emit('addCharacter', this.character)
      }
    },
    async editCharacter() {
      this.checkClan()
      this.checkHerd()
      if (
        this.nameAttributes.isNameValid &&
        this.herdAttributes.isHerdValid &&
        this.clanAttributes.isClanSet
      ) {
        this.$emit('editCharacter', this.character)
      }
    },
    addInfluence(influenceToAdd: Influence) {
      this.$emit('addInfluence', influenceToAdd)
    },
    editInfluence(influenceToEdit: Influence) {
      this.$emit('editInfluence', influenceToEdit)
    },
    deleteInfluence(influenceToDelete: Influence) {
      this.$emit('deleteInfluence', influenceToDelete)
    },
    getTitle() {
      return this.isEdition() ? 'Modifier un personnage' : 'Ajouter un personnage'
    },
    setNameTypeInfo(message, type) {
      this.nameAttributes.nameMessage = message
      this.nameAttributes.nameType = type
    },
    setHerdInfo(message, type) {
      this.herdAttributes.herdMessage = message
      this.herdAttributes.herdType = type
    },
    async checkName() {
      this.nameAttributes.isNameValid = true
      this.setNameTypeInfo('', '')

      if (this.clanAttributes.isClanSet && this.character.name !== '') {
        await CharacterService.isTaken(this.character.name, this.character.clan).then(
          (response) => {
            this.nameAttributes.isNameTaken = response.data
          },
          (error) => {
            this.nameAttributes.isNameTaken = false
            this.nameAttributes.isNameValid = false
            this.nameAttributes.nameMessage =
              error.response?.data?.message || error.message || error.toString()
          }
        )
      }

      if (this.character.name === '') {
        this.setNameTypeInfo('Le nom est obligatoire', 'is-danger')
        this.nameAttributes.isNameValid = false
      } else if (this.nameAttributes.isNameTaken) {
        this.setNameTypeInfo(
          'Ce nom est déjà pris dans le clan ' + this.character.clan,
          'is-danger'
        )
        this.nameAttributes.isNameValid = false
      }
    },
    checkHerd() {
      if (
        this.character.herd.name === '' &&
        this.character.herd.description === '' &&
        !(this.character.herd.level > 0)
      ) {
        this.setHerdInfo('', '')
        this.herdAttributes.isHerdValid = true
        this.setHerdInfo('', '')
      } else if (
        this.character.herd.name !== '' &&
        this.character.herd.description !== '' &&
        this.character.herd.level > 0
      ) {
        this.herdAttributes.isHerdValid = true
        this.setHerdInfo('', 'is-success')
      } else {
        this.setHerdInfo(
          'Pour enregitrer un troupeau, tous les champs doivent être remplis',
          'is-danger'
        )
        this.herdAttributes.isHerdValid = false
      }
    },
    checkClan() {
      if (Object.values(Clan).includes(this.character.clan)) {
        this.clanAttributes.isClanSet = true
        this.clanAttributes.clanType = 'is-success'
        this.clanAttributes.clanMessage = ''
      } else {
        this.clanAttributes.isClanSet = false
        this.clanAttributes.clanType = 'is-danger'
        this.clanAttributes.clanMessage = 'Le clan est obligatoire'
      }
    }
  }
})
</script>

<style scoped lang="scss">
.model-card-body {
  &__section {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    > * {
      margin: 5px;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
      padding: 10px;
    }

    &__section-column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
