<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BoardStorytellerComponent',
  components: {},
  data() {
    return {
      content: ''
    }
  }
})
</script>

<template>
  <div class="container">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
