<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import NavService from "../services/nav.service";

export default {
  name: "BoardStorytellerComponent",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    NavService.getStorytellerBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response?.data?.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>