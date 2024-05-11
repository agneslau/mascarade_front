<script lang="ts">
import { type Influence } from '@/types/influence'
import { defineComponent } from 'vue'
import { Category } from '@/types/enums/category'
import { Specialty } from '@/types/enums/specialty'

export default defineComponent({
  props: {
    influence: {
      type: Object as () => Influence,
      required: true
    }
  },
  computed: {},
  data() {
    return {
      specialtyAttributes: {
        isSpecialtySet: false,
        specialtyType: '',
        specialtyMessage: '',
        specialties: [
          'FINANCE',
          'LOI',
          'MEDIA',
          'SANTE',
          'POLICE',
          'OCCULTE',
          'CRIME',
          'RUE',
          'EDUCATION',
          'TRANSPORT',
          'INDUSTRIE',
          'HAUTE_SOCIETE',
          'BUREAUCRATIE',
          'RELIGION',
          'POLITIQUE'
        ]
      },
      categoryAttributes: {
        isCategorySet: false,
        categoryType: '',
        categoryMessage: ''
      },
      nameAttributes: {
        isNameSet: false,
        nameType: '',
        nameMessage: ''
      },
      levelAttributes: {
        isLevelSet: false,
        levelType: '',
        levelMessage: ''
      }
    }
  },
  emits: ['close', 'addInfluence', 'editInfluence', 'canCancel'],
  methods: {
    isEdition() {
      return !!this.influence.id
    },
    addInfluence(): void {
      this.checkName()
      this.checkCategory()
      this.checkSpecialty()
      this.checkLevel()
      if (
        this.nameAttributes.isNameSet &&
        this.categoryAttributes.isCategorySet &&
        this.specialtyAttributes.isSpecialtySet &&
        this.levelAttributes.isLevelSet
      ) {
        this.$emit('addInfluence', this.influence)
        this.$emit('close')
      }
    },
    editInfluence(): void {
      this.checkCategory()
      this.checkSpecialty()
      this.checkLevel()
      if (
        this.categoryAttributes.isCategorySet &&
        this.specialtyAttributes.isSpecialtySet &&
        this.levelAttributes.isLevelSet
      ) {
        this.$emit('editInfluence', this.influence)
        this.$emit('close')
      }
    },
    getTitle(): string {
      return this.isEdition() ? 'Modifier une influence' : 'Ajouter une influence'
    },
    checkName(): void {
      if (!(this.influence.name.length > 0)) {
        this.nameAttributes.isNameSet = false
        this.nameAttributes.nameMessage = "Merci d'indiquer le nom de l'influence"
        this.nameAttributes.nameType = 'is-danger'
      } else {
        this.nameAttributes.isNameSet = true
        this.nameAttributes.nameMessage = ''
        this.nameAttributes.nameType = 'is-success'
      }
    },
    checkCategory(): void {
      if (!Object.values(Category).includes(this.influence.category)) {
        this.categoryAttributes.isCategorySet = false
        this.categoryAttributes.categoryMessage = 'Merci de choisir une catégorie'
        this.categoryAttributes.categoryType = 'is-danger'
      } else {
        this.categoryAttributes.isCategorySet = true
        this.categoryAttributes.categoryMessage = ''
        this.categoryAttributes.categoryType = 'is-success'
      }
    },
    checkSpecialty(): void {
      if (!Object.values(Specialty).includes(this.influence.specialty)) {
        this.specialtyAttributes.isSpecialtySet = false
        this.specialtyAttributes.specialtyMessage = 'Merci de choisir une spécialité'
        this.specialtyAttributes.specialtyType = 'is-danger'
      } else {
        this.specialtyAttributes.isSpecialtySet = true
        this.specialtyAttributes.specialtyMessage = ''
        this.specialtyAttributes.specialtyType = 'is-success'
      }
    },
    checkLevel(): void {
      if (!(this.influence.level > 0 && this.influence.level <= 7)) {
        this.levelAttributes.isLevelSet = false
        this.levelAttributes.levelMessage =
          "Le niveau de l'influence doit être compris entre 0 et 7"
        this.levelAttributes.levelType = 'is-danger'
      } else {
        this.levelAttributes.isLevelSet = true
        this.levelAttributes.levelMessage = ''
        this.levelAttributes.levelType = 'is-success'
      }
    }
  },
  name: 'InfluenceFormComponent'
})
</script>

<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <b-icon icon="account-supervisor" type="is-info" size="is-large"> </b-icon>
        <p class="modal-card-title">{{ getTitle() }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <p v-if="!isEdition()">
          Attention : le nom de l'influence ne pourra plus être modifié après la création
        </p>
        <b-field v-if="isEdition()" label="ID">
          <b-input
            type="text"
            :value="influence.id"
            placeholder="Id généré automatiquement"
            autocomplete="off"
            disabled
          >
          </b-input>
        </b-field>
        <b-field label="Nom" :type="nameAttributes.nameType" :message="nameAttributes.nameMessage">
          <b-input
            type="text"
            v-model="influence.name"
            placeholder="Nom de l'influence"
            autocomplete="off"
            required
            :disabled="isEdition()"
          >
          </b-input>
        </b-field>
        <b-field
          label="Catégorie"
          :type="categoryAttributes.categoryType"
          :message="categoryAttributes.categoryMessage"
        >
          <b-select placeholder="pègre ou gotha ?" v-model="influence.category" required>
            <option value="PEGRE">Pègre</option>
            <option value="GOTHA">Gotha</option>
          </b-select>
        </b-field>
        <b-field
          label="Spécialité"
          :type="specialtyAttributes.specialtyType"
          :message="specialtyAttributes.specialtyMessage"
        >
          <b-select placeholder="sa spécialité ?" v-model="influence.specialty" required>
            <option
              v-for="specialty in specialtyAttributes.specialties"
              :key="specialty"
              :value="specialty"
            >
              {{ specialty }}
            </option>
          </b-select>
        </b-field>
        <b-field
          label="Niveau"
          :type="levelAttributes.levelType"
          :message="levelAttributes.levelMessage"
        >
          <b-numberinput
            size="is-small"
            v-model="influence.level"
            :min="0"
            :max="7"
            :step="1"
            controls-position="compact"
            required
          />
        </b-field>
        <b-field label="District">
          <b-input type="text" v-model="influence.district" disabled> </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Close" @click="$emit('close')" />
        <b-button v-if="!isEdition()" label="Ajouter" type="is-primary" @click="addInfluence" />
        <b-button v-if="isEdition()" label="Modifier" type="is-primary" @click="editInfluence" />
      </footer>
    </div>
  </form>
</template>
