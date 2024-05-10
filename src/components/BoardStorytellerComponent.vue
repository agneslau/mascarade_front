<template>
  <div class="container">
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardStorytellerComponent',
  components: {},
  data() {
    return {
      content: ''
    }
  }
}
</script>
