<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="container">
      <b-table :data="users">

        <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>
        <b-table-column field="name" label="nom" v-slot="props">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="email" label="e-mail" v-slot="props">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column field="roles" label="rôles" v-slot="props">
          {{ formatRoles(props.row.roles) }}
        </b-table-column>
        <b-table-column field="actions" label="actions">
          <div class="buttons">
            <b-button>
              <b-icon icon="pencil"></b-icon>
            </b-button>
            <b-button @click="isDeleteModalOpen = true">
              <b-icon icon="delete" type="is-danger"></b-icon>
            </b-button>
          </div>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user.service'
import AdminService from '../services/admin.service'

export default {
  name: 'BoardAdminComponent',
  data() {
    return {
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      isNewMemberModalOpen: false,
      content: '',
      users: []
    }
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data
      },
      (error) => {
        this.content =
          (error.response?.data?.message) ||
          error.message ||
          error.toString()
      }
    )
    AdminService.getUsers().then(
      (response) => {
        this.users = response.data
        console.log(response.data)
      },
      (error) => {
        this.content =
          (error.response?.data?.message) ||
          error.message ||
          error.toString()
      }
    )
  },
  methods: {
    formatRoles(roles) {
      return roles.map(role => this.formatRole(role)).reduce((acc, cur) => acc + cur + ', ', ' ').slice(0, -2)
    },
    formatRole(role) {
      switch (role) {
        case 'ROLE_ADMIN':
          return 'admin'
        case 'ROLE_PLAYER':
          return 'joueur'
        case 'ROLE_STORY_TELLER':
          return 'conteur'
      }
    }
  }
}
</script>

<style scoped>
.button-div {
  display: flex;
  justify-content: space-around;
}
</style>