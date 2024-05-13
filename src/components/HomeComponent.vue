<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeComponent',
  data() {
    return {
      content: 'Bienvenue sur la Mascarade de Lille.'
    }
  }
})
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>
