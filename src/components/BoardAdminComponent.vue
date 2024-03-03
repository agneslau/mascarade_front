<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="container">
      <b-button @click="openNewUser" rounded type="is-primary">
        <b-icon icon="plus"></b-icon>
      </b-button>
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
        <b-table-column field="actions" label="actions" v-slot="props">
          <div class="buttons">
            <b-button @click="openEditUser(props.row.id)">
              <b-icon icon="pencil" ></b-icon>
            </b-button>
            <b-button @click="confirmDelete(props.row.id)">
              <b-icon icon="delete" type="is-danger"></b-icon>
            </b-button>
          </div>
        </b-table-column>
      </b-table>
      <b-modal
        v-model="isModalOpen"
        has-modal-card
        :destroy-on-hide="true"
      >
        <template #default="props">
          <UserFormComponent v-bind="formProps" @close="props.close()" @addUser="addUser" />
        </template>
      </b-modal>

    </div>
  </div>

</template>

<script>
import UserService from '../services/user.service'
import NavService from '@/services/nav.service.js'
import UserFormComponent from '@/components/forms/UserFormComponent.vue'

export default {
  name: 'BoardAdminComponent',
  components: { UserFormComponent },
  data() {
    return {
      isDeleteModalOpen: false,
      isModalOpen: false,
      content: '',
      users: [],
      formProps: {
        title: '',
        id: '',
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        isPlayer: false,
        isStoryTeller: false,
      }
    }
  },
  mounted() {
    NavService.getAdminBoard().then(
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
    this.updateUsers()
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
    },
    confirmDelete(id) {
      console.log(id)
      const user = this.users.find(user => user.id === id)
      console.log(user)
      this.$buefy.dialog.confirm({
        title: 'Supprimer un compte',
        message: 'Etes-vous sûr de vouloir <b>supprimer</b> le compte suivant? Cette action est irréversible. '
          + '<br>'
          + '<br> ID: ' + '<b>' + user.id + '</b>'
          + '<br> nom: ' + '<b>' + user.name + '</b>'
          + '<br> e-mail: ' + '<b>' + user.email + '</b>',
        confirmText: 'Supprimer',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteUser(id)
          this.$buefy.toast.open('Compte supprimé!')
        }
      })
    },
    openEditUser(id) {
      const user = this.users.find(user => user.id === id)
      console.log(user)
      this.formProps.title = 'Modifier un utilisateur'
      this.formProps.id = user.id
      this.formProps.name = user.name
      this.formProps.email = user.email
      this.formProps.password = ''
      this.formProps.isAdmin = user.roles.includes('ROLE_ADMIN')
      this.formProps.isPlayer = user.roles.includes('ROLE_PLAYER')
      this.formProps.isStoryTeller = user.roles.includes('ROLE_STORY_TELLER')
      this.isModalOpen = true
    },
    openNewUser() {
      console.log('here')
      this.formProps.title = 'Ajouter un utilisalteur'
      this.formProps.id = ''
      this.formProps.name = ''
      this.formProps.email = ''
      this.formProps.password = ''
      this.formProps.isAdmin = false
      this.formProps.isPlayer = false
      this.formProps.isStoryTeller = false
      this.isModalOpen = true
    },
    updateUsers() {
      UserService.getUsers().then(
        (response) => {
          this.users = response.data
        },
        (error) => {
          this.content =
            (error.response?.data?.message) ||
            error.message ||
            error.toString()
        }
      )
    },
    addUser(user){
      const userToSave = {
        name: user.name,
        email: user.email,
        password: user.password,
        roles: [
          user.isAdmin ? 'ROLE_ADMIN' : '',
          user.isPlayer ? 'ROLE_PLAYER' : '',
          user.isStoryTeller ? 'ROLE_STORY_TELLER' : ''
        ].filter(role => role !== '')
      }
      UserService.addUser(userToSave).then(
        () => {
          this.$buefy.toast.open('Utilisateur ajouté!')
          this.updateUsers()
        },
        (error) => {
          this.content =
            (error.response?.data?.message) ||
            error.message ||
            error.toString()
        }
      )
      console.log("here :"+user.name)
    },
    deleteUser(id) {
      UserService.deleteUser(id).then(
        () => {
          this.$buefy.toast.open('Utilisateur supprimé!')
          this.updateUsers()
        },
        (error) => {
          this.content =
            (error.response?.data?.message) ||
            error.message ||
            error.toString()
        }
      )
    }
  }
}
</script>
