<script lang="ts">
import { defineComponent } from 'vue'
import type { AipSession } from '@/types/aipSession'

export default defineComponent({
  name: 'AipSessionFormComponent.vue',
  emits: ['addAipSession', 'deleteAipSession', 'saveSession'],
  props: {
    isNew: {
      type: Boolean,
      required: false,
      default: false
    },
    aipSession: {
      type: Object as () => AipSession,
      required: true
    }
  },
  data() {
    return {
      nameAttributes: {
        nameType: '',
        nameMessage: '',
        isNameTaken: false,
        isNameValid: true
      }
    }
  },
  methods: {
    addAipSession() {
      if (this.aipSession.name === '') {
        this.nameAttributes.nameType = 'is-danger'
        this.nameAttributes.nameMessage = 'Le nom est obligatoire'
        this.nameAttributes.isNameValid = false
      } else {
        this.nameAttributes.nameType = 'is-success'
        this.nameAttributes.nameMessage = ''
        this.nameAttributes.isNameValid = true
      }

      if (this.nameAttributes.isNameValid) {
        this.$emit('addAipSession', this.aipSession)
        this.nameAttributes.nameType = ''
      }
    },
    deleteAipSession() {
      this.$emit('deleteAipSession', this.aipSession)
    },
    saveSession() {
      this.$emit('saveSession', this.aipSession)
    },
    openSession() {
      this.$router.push({ path: 'sessions/' + this.aipSession.id })
    }
  }
})
</script>

<template>
  <div class="aip_session_form">
    <b-field label="Id" class="aip_session_form__id">
      <b-input type="text" disabled v-model="aipSession.id" />
    </b-field>
    <b-field label="Nom" :type="nameAttributes.nameType" :message="nameAttributes.nameMessage">
      <b-input type="text" :disabled="aipSession.isOpen" v-model="aipSession.name" />
    </b-field>
    <b-field label="Début">
      <b-datepicker :disabled="aipSession.isOpen" v-model="aipSession.beginDate" />
    </b-field>
    <b-field label="Fin">
      <b-datepicker :disabled="aipSession.isOpen" v-model="aipSession.endDate" />
    </b-field>
    <b-field label="Ouvrir">
      <b-switch :disabled="isNew || aipSession.isClosed" v-model="aipSession.isOpen" />
    </b-field>
    <b-field label="Fermer">
      <b-switch
        :disabled="isNew || !aipSession.isOpen || aipSession.isRendered"
        v-model="aipSession.isClosed"
      />
    </b-field>
    <b-field label="Rendre">
      <b-switch :disabled="isNew || !aipSession.isClosed" v-model="aipSession.isRendered" />
    </b-field>
    <div v-if="!isNew" class="aip_session_form___buttons">
      <b-button @click="saveSession">
        <b-icon icon="content-save"></b-icon>
      </b-button>
      <b-button :disabled="aipSession.isOpen" @click="deleteAipSession">
        <b-icon icon="delete" type="is-danger"></b-icon>
      </b-button>
      <b-button v-if="aipSession.aips?.length > 0" @click="openSession">
        <b-icon icon="eye" type="is-info"></b-icon>
      </b-button>
    </div>

    <div v-if="isNew" class="aip_session_form___buttons">
      <b-button rounded @click="addAipSession" type="is-primary">
        <b-icon icon="plus"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.aip_session_form {
  display: flex;
  flex-direction: row;
  gap: 1rem;

  &__id {
    width: 100px;
  }

  &___buttons {
    padding-top: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5rem;
    min-width: 150px;
  }
}
</style>
