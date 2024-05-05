<script lang="ts">
import { defineComponent } from 'vue'
import type { AipSession } from '@/types/aipSession'

export default defineComponent({
  name: 'AipSessionCard',
  props: {
    aipSession: {
      type: Object as () => AipSession,
      required: true
    }
  },
  methods: {
    toDisplayableDate(date: Date) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }
  }
})
</script>

<template>
  <div class="aip_session_card">
    <div class="aip_session_card__info">
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
          @click="console.log('edit')"
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
