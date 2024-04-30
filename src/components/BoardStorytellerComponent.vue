<template>
  <div class="container">
    <header>
      <h2>{{ content }}</h2>
    </header>
    <div>board des dernières infos</div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavService from '../services/nav.service'

export default {
  name: 'BoardStorytellerComponent',
  components: {},
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    NavService.getStorytellerBoard().then(
      (response) => {
        this.content = response.data
      },
      (error) => {
        this.content = error.response?.data?.message || error.message || error.toString()
      }
    )
  }
}
</script>
