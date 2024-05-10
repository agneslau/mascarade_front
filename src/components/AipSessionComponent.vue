<script lang="ts">
import { defineComponent } from 'vue'
import AipService from '@/services/aip.service'
import type { AipSession } from '@/types/aipSession'
import AipCard from '@/components/cards/AipCard.vue'

export default defineComponent({
  name: 'AipSessionComponent',
  components: { AipCard },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      aipSession: {} as AipSession,
      content: ''
    }
  },
  mounted() {
    AipService.getAipSessionById(this.id).then(
      (response: AipSession) => {
        this.aipSession = response
      },
      (error) => {
        this.content = error.response?.data?.message || error.message || error.toString()
      }
    )
  }
})
</script>

<template>
  <div class="session">
    <h1>
      nom : <strong>{{ aipSession.name }}</strong>
    </h1>
    <h2>
      dates : {{ aipSession.beginDate?.toLocaleDateString('fr-FR') }} -
      {{ aipSession.endDate?.toLocaleDateString('fr-FR') }}
    </h2>
    <div class="session__status">
      <div class="session__status__tags">
        <p>état :</p>
        <b-tag type="is-info" v-if="aipSession.isRendered">Rendue</b-tag>
        <b-tag type="is-warning" v-if="aipSession.isClosed && !aipSession.isRendered">Fermée</b-tag>
        <b-tag type="is-success" v-if="!aipSession.isClosed">Ouvert</b-tag>
      </div>
      <div class="session__status__count">
        <p>nombre d'AIP rendues :</p>
        <b-tag type="is-success">{{ aipSession.aips?.length }}</b-tag>
      </div>
    </div>
  </div>
  <div class="aips">
    <div v-for="aip in aipSession.aips" :key="aip.characterId">
      <aip-card :aip="aip" :aipSession="aipSession" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.session {
  border: 1px solid black;
  padding: 1rem;
  border-radius: 10px;
  background-color: lightyellow;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  margin-bottom: 2rem;

  h1 {
    margin-right: 2rem;
    font-size: 1.5rem;
    width: 200px;
  }
  h2 {
    margin-right: 2rem;
    font-size: 1.5rem;
  }
  &__status {
    display: flex;
    flex-direction: row;
    &__tags {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: baseline;
    }

    &__count {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: baseline;
      margin-left: 10px;
    }
    p {
      margin-right: 1rem;
      font-size: 1.5rem;
    }
  }
}
</style>
