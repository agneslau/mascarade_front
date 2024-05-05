<template>
  <aip-sessions-form-component
    :aip-session="emptyAipSession"
    :is-new="true"
    @add-aip-session="addAipSession"
  />
  <div v-for="aipSession in aipSessions" :key="aipSession.id">
    <aip-sessions-form-component
      :aip-session="aipSession"
      :is-new="false"
      @delete-aip-session="confirmDeleteAipSession"
      @save-session="confirmSaveSession"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AipSessionsFormComponent from '@/components/forms/AipSessionsFormComponent.vue'
import AipService from '@/services/aip.service'
import type { AipSession } from '@/types/aipSession'
import EventBus from '@/common/EventBus'

export default defineComponent({
  name: 'AipSessionsComponent.vue',
  components: { AipSessionsFormComponent },
  data() {
    return {
      content: '',
      aipSessions: [] as AipSession[],
      emptyAipSession: {
        id: '',
        name: '',
        beginDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isOpen: false,
        isClosed: false,
        isRendered: false
      } as AipSession
    }
  },
  mounted() {
    AipService.getAipSessions().then(
      (response: AipSession[]) => {
        this.aipSessions = response
      },
      (error: any) => {
        this.content = error.response?.data?.message || error.message || error.toString()
      }
    )
  },
  methods: {
    openNewAipSession() {
      console.log('open new aip session')
    },
    addAipSession(aipSession: AipSession) {
      AipService.addAipSession(aipSession).then(
        (response: AipSession) => {
          this.aipSessions.push(response)
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
      console.log(this.aipSessions)
      this.reinitEmptyAipSession()
    },
    reinitEmptyAipSession() {
      this.emptyAipSession = {
        id: '',
        name: '',
        beginDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isOpen: false,
        isClosed: false,
        isRendered: false
      }
    },
    confirmDeleteAipSession(aipSession: AipSession) {
      this.$buefy.dialog.confirm({
        title: "Supprimer une session d'AIP",
        message:
          "Etes-vous sûr de vouloir <b>supprimer</b> cette session d'AIP? Cette action est irréversible. Tous les joueurs ayant créé des AIP pour cette session les perdront. " +
          '<br>' +
          '<br> ID: ' +
          '<b>' +
          aipSession.id +
          '</b>' +
          '<br> nom: ' +
          '<b>' +
          aipSession.name +
          '</b>' +
          '<br> Etat: ' +
          '<b>' +
          this.getAipSessionState(aipSession) +
          '</b>',
        confirmText: 'Supprimer',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteAipSession(aipSession)
          this.$buefy.toast.open("Session d'AIP supprimée!")
        }
      })
    },
    confirmSaveSession(aipSession: AipSession) {
      this.$buefy.dialog.confirm({
        title: "Modifier une session d'AIP",
        message:
          "Etes-vous sûr de vouloir <b>modifier</b> cette session d'AIP? " +
          '<br>' +
          '<br> ID: ' +
          '<b>' +
          aipSession.id +
          '</b>' +
          '<br> nom: ' +
          '<b>' +
          aipSession.name +
          '</b>' +
          '<br> Etat: ' +
          '<b>' +
          this.getAipSessionState(aipSession) +
          '</b>',
        confirmText: 'Modifier',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.saveAipSession(aipSession)
          this.$buefy.toast.open(
            "Session d'AIP modifiée, statut : " + this.getAipSessionState(aipSession)
          )
        }
      })
    },
    getAipSessionState(aipSession: AipSession) {
      return aipSession.isRendered
        ? 'Rendu'
        : aipSession.isClosed
          ? 'Fermée'
          : aipSession.isOpen
            ? 'Ouverte'
            : 'Créée'
    },
    deleteAipSession(aipSessionToDelete: AipSession) {
      console.log('delete aip session')
      AipService.deleteAipSession(aipSessionToDelete.id).then(
        (response) => {
          this.aipSessions = this.aipSessions.filter(
            (aipSession) => aipSession.id !== aipSessionToDelete.id
          )
        },
        (error: any) => {
          this.content = error.response?.data?.message || error.message || error.toString()
          if (error.response && error.response.status === 403) {
            EventBus.dispatch('logout')
          }
        }
      )
    },
    saveAipSession(aipSession: AipSession) {
      console.log('save aip session')
      AipService.saveAipSession(aipSession).then(
        (response: AipSession) => {
          this.aipSessions = this.aipSessions.map((aipSession) =>
            aipSession.id === response.id ? response : aipSession
          )
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    }
  }
})
</script>
