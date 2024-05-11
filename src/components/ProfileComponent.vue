<script lang="ts">
import { defineComponent } from 'vue'
import type { AuthResponse } from '@/types/authResponse'

export default defineComponent({
  name: 'ProfileComponent',
  computed: {
    currentUser(): AuthResponse {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login')
    }
  }
})
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        Profile de <strong>{{ currentUser.name }}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
    </ul>
  </div>
</template>
