<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Mascarade</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <RouterLink to="/home" class="nav-link">
            Home
          </RouterLink>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <RouterLink to="/admin" class="nav-link">Board Admin</RouterLink>
        </li>
        <li v-if="showPlayerBoard" class="nav-item">
          <RouterLink to="/player" class="nav-link">Board Joueur</RouterLink>
        </li>
        <li v-if="showStorytellerBoard" class="nav-item">
          <RouterLink to="/storyteller" class="nav-link">Board Conteur</RouterLink>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <RouterLink to="/login" class="nav-link">
            Login
          </RouterLink>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <RouterLink to="/profile" class="nav-link">
            {{ currentUser.name }}
          </RouterLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <RouterView ></RouterView>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      console.log("current user :",this.$store.state.auth.user)
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showPlayerBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_PLAYER');
      }

      return false;
    },
    showStorytellerBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_STORY_TELLER');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>