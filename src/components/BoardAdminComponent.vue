<script lang="ts">
import UserService from '../services/user.service'
import UserFormComponent from '@/components/forms/UserFormComponent.vue'
import { defineComponent } from 'vue'
import type { User } from '@/types/user'
import type { Role } from '@/types/enums/role'

export default defineComponent({
  name: 'BoardAdminComponent',
  components: { UserFormComponent },
  data() {
    return {
      isModalOpen: false,
      content: '',
      users: [] as User[],
      formProps: {
        title: '',
        id: '',
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        isPlayer: false,
        isStoryTeller: false
      }
    }
  },
  mounted() {
    this.updateUsers()
  },
  methods: {
    formatRoles(roles: Role[]): string {
      return roles
        .map((role) => role.toString())
        .reduce((acc, cur) => acc + cur + ', ', ' ')
        .slice(0, -2)
    },
    confirmDelete(id: string): void {
      const user = this.users.find((user) => user.id === id)
      this.$buefy.dialog.confirm({
        title: 'Supprimer un compte',
        message:
          'Etes-vous sûr de vouloir <b>supprimer</b> le compte suivant? Cette action est irréversible. ' +
          '<br>' +
          '<br> ID: ' +
          '<b>' +
          user.id +
          '</b>' +
          '<br> nom: ' +
          '<b>' +
          user.name +
          '</b>' +
          '<br> e-mail: ' +
          '<b>' +
          user.email +
          '</b>',
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
    openEditUser(id: string): void {
      const user = this.users.find((user) => user.id === id)
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
    openNewUser(): void {
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
    updateUsers(): void {
      UserService.getUsers().then(
        (response: User[]) => {
          this.users = response
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    addUser(user) {
      const userToSave = {
        name: user.name,
        email: user.email,
        password: user.password,
        roles: [
          user.isAdmin ? 'ROLE_ADMIN' : '',
          user.isPlayer ? 'ROLE_PLAYER' : '',
          user.isStoryTeller ? 'ROLE_STORY_TELLER' : ''
        ].filter((role) => role !== '')
      } as User
      UserService.addUser(userToSave).then(
        () => {
          this.$buefy.toast.open('Utilisateur ajouté!')
          this.updateUsers()
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    editUser(user): void {
      const userToSave = {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: [
          user.isAdmin ? 'ROLE_ADMIN' : '',
          user.isPlayer ? 'ROLE_PLAYER' : '',
          user.isStoryTeller ? 'ROLE_STORY_TELLER' : ''
        ].filter((role) => role !== '')
      } as User
      UserService.editUser(userToSave).then(
        () => {
          this.$buefy.toast.open('Utilisateur modifié!')
          this.updateUsers()
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    deleteUser(id: string): void {
      UserService.deleteUser(id).then(
        () => {
          this.$buefy.toast.open('Utilisateur supprimé!')
          this.updateUsers()
        },
        (error) => {
          this.content = error.response?.data?.message || error.message || error.toString()
        }
      )
    }
  }
})
</script>

<template>
  <div class="container">
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
              <b-icon icon="pencil"></b-icon>
            </b-button>
            <b-button @click="confirmDelete(props.row.id)">
              <b-icon icon="delete" type="is-danger"></b-icon>
            </b-button>
          </div>
        </b-table-column>
      </b-table>
      <b-modal v-model="isModalOpen" has-modal-card :destroy-on-hide="true">
        <template #default="props">
          <UserFormComponent
            v-bind="formProps"
            @close="props.close()"
            @addUser="addUser"
            @editUser="editUser"
          />
        </template>
      </b-modal>
    </div>
  </div>
</template>
