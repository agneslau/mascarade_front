<template>
  <div class="container">
    <header>
      <h3>{{ content }}</h3>
    </header>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavService from '../services/nav.service'

export default {
  name: 'BoardPlayerComponent',
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    NavService.getPlayerBoard().then(
      (response) => {
        this.content = response.data
      },
      (error) => {
        this.content = error.response?.data?.message || error.message
        error.toString()
      }
    )
  }
}
</script>
