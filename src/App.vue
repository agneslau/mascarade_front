<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css">

  <div id="app">
    <NavBarComponent />

    <div class="container">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script>

import NavBarComponent from '@/components/NavBarComponent.vue'

export default {
  components: {
    NavBarComponent
  },
}
</script>