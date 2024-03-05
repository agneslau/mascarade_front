<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>

  </div>
</template>

<script>

export default {
  name: "HomeComponent",
  data() {
    return {
      content: "Bienvenue sur la Mascarade de Lille.",
    };
  },
};
</script>