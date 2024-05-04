<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css"
  />

  <div id="app">
    <NavBarComponent @openLoginModal="redirectToLogIn" />

    <div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue'
import EventBus from '@/common/EventBus'

export default {
  components: {
    NavBarComponent
  },
  methods: {
    redirectToLogIn() {
      this.$router.push('/home')
    },
    logOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/home')
    }
  },
  mounted() {
    EventBus.on('logOut', () => this.logOut())
  },
  beforeDestroy() {
    EventBus.remove('logOut')
  }
}
</script>
