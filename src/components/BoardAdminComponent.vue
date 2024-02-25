<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="container">
      <div v-for="user in users" :key="user.name">
        <UserComponent :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import AdminService from "../services/admin.service";
import UserComponent from '@/components/UserComponent.vue'

export default {
  name: "BoardAdminComponent",
  components: { UserComponent },
  data() {
    return {
      content: "",
      users: []
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
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
    AdminService.getUsers().then(
      (response) => {
        this.users = response.data;
        console.log(response.data)
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