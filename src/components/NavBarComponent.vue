<template>


  <b-navbar>
      <b-navbar-item tag="router-link" to="/">Mascarade</b-navbar-item>
    <template #start>
      <b-navbar-item tag="router-link" to="/">Mascarade</b-navbar-item>
      <b-navbar-item tag="router-link" to="/home" >
        <b-icon
          icon="home"
          type="is-info">
        </b-icon>
        Home
      </b-navbar-item>
      <b-navbar-dropdown v-if="currentUser" label="Boards">
        <b-navbar-item v-if="showAdminBoard" tag="router-link" to="/admin">Board Admin</b-navbar-item>
        <b-navbar-item v-if="showPlayerBoard" tag="router-link" to="/player">Board Joueur</b-navbar-item>
        <b-navbar-item v-if="showStorytellerBoard" tag="router-link" to="/storyteller">Board Conteur</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>

      <b-navbar-item tag="div">
        <b-button v-if="!currentUser" type="is-primary" label="Connection" @click="isComponentModalActive = true"/>
        <div class="buttons" v-if="currentUser">
          <a class="button is-light" @click.prevent="logOut">
            <strong>LogOut</strong>
          </a>
          <a class="button is-light" v-if="currentUser" href="/profile">
            <b-icon
              icon="account"
              type="is-info">
            </b-icon>
            <strong>{{ currentUser.name }}</strong>
          </a>
        </div>
      </b-navbar-item>

      </template>


  </b-navbar>


</template>

<script>


export default {

  data() {
    return {
      isComponentModalActive: false,
    };
  },
  computed: {
    currentUser() {
      console.log('current user :', this.$store.state.auth.user)
      return this.$store.state.auth.user
    },
    showAdminBoard() {
      if (this.currentUser?.['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN')
      }

      return false
    },
    showPlayerBoard() {
      if (this.currentUser?.['roles']) {
        return this.currentUser['roles'].includes('ROLE_PLAYER')
      }

      return false
    },
    showStorytellerBoard() {
      if (this.currentUser?.['roles']) {
        return this.currentUser['roles'].includes('ROLE_STORY_TELLER')
      }

      return false
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>