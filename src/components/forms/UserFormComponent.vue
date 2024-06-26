<script lang="ts">
import UserService from '@/services/user.service'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserFormComponent',
  emits: ['close', 'addUser', 'editUser', 'canCancel'],
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    email: {
      type: String,
      required: false,
      default: ''
    },
    password: {
      type: String,
      required: false,
      default: ''
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false
    },
    isPlayer: {
      type: Boolean,
      required: false,
      default: false
    },
    isStoryTeller: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      message: '',
      nameAttributes: {
        nameMessage: '',
        nameType: '',
        isNameTaken: false,
        isNameValid: false
      },
      emailAttributes: {
        emailMessage: '',
        emailType: '',
        isEmailTaken: false,
        isEmailValid: false
      },
      passwordAttributes: {
        passwordMessage: '',
        passwordType: '',
        isPasswordValid: false
      },
      rolesAttributes: {
        rolesMessage: '',
        rolesType: '',
        isRolesValid: false
      },
      isAddUser: true,
      formData: {
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
    this.updateFormProps()
  },
  methods: {
    async addUser() {
      this.nameAttributes.isNameValid = await this.checkName()
      this.emailAttributes.isEmailValid = await this.checkEmail()
      this.passwordAttributes.isPasswordValid = this.checkPassword()
      this.rolesAttributes.isRolesValid = this.checkRoles()

      if (
        this.nameAttributes.isNameValid &&
        this.emailAttributes.isEmailValid &&
        this.passwordAttributes.isPasswordValid &&
        this.rolesAttributes.isRolesValid
      ) {
        const user = {
          name: this.formData.name,
          email: this.formData.email,
          password: this.formData.password,
          isAdmin: this.formData.isAdmin,
          isPlayer: this.formData.isPlayer,
          isStoryTeller: this.formData.isStoryTeller
        }
        this.$emit('addUser', user)
        this.$emit('close')
      }
    },
    editUser() {
      this.nameAttributes.isNameValid = this.name === this.formData.name ? true : this.checkName()
      this.emailAttributes.isEmailValid =
        this.email === this.formData.email ? true : this.checkEmail()
      this.rolesAttributes.isRolesValid = this.checkRoles()

      if (
        this.nameAttributes.isNameValid &&
        this.emailAttributes.isEmailValid &&
        this.rolesAttributes.isRolesValid
      ) {
        const user = {
          id: this.formData.id,
          name: this.formData.name,
          email: this.formData.email,
          isAdmin: this.formData.isAdmin,
          isPlayer: this.formData.isPlayer,
          isStoryTeller: this.formData.isStoryTeller
        }
        this.$emit('editUser', user)
        this.$emit('close')
      }
    },
    async checkName(): boolean {
      await UserService.isNameTaken(this.formData.name).then(
        (response) => {
          this.nameAttributes.isNameTaken = response
        },
        (error) => {
          this.message = error.response?.data?.message || error.message || error.toString()
        }
      )
      if (this.formData.name === '') {
        this.setNameTypeInfo('Le nom est obligatoire', 'is-danger')
        return false
      } else if (this.nameAttributes.isNameTaken) {
        this.setNameTypeInfo('Ce nom est déjà pris', 'is-danger')
        return false
      }
      this.setNameTypeInfo('', 'is-success')
      return true
    },
    async checkEmail(): boolean {
      await UserService.isEmailTaken(this.formData.email).then(
        (response) => {
          this.emailAttributes.isEmailTaken = response
        },
        (error) => {
          this.message = error.response?.data?.message || error.message || error.toString()
        }
      )
      if (this.formData.email === '') {
        this.setEmailTypeInfo("L'email est obligatoire", 'is-danger')
        return false
      } else if (!this.formData.email.includes('@')) {
        this.setEmailTypeInfo("L'email est invalide", 'is-danger')
        return false
      } else if (this.emailAttributes.isEmailTaken) {
        this.setEmailTypeInfo('Cet email est déjà pris', 'is-danger')
        return false
      }
      this.setEmailTypeInfo('', 'is-success')
      return true
    },
    checkPassword(): boolean {
      if (this.isAddUser && this.formData.password === '') {
        this.setPasswordTypeInfo('Le mot de passe est obligatoire', 'is-danger')
        return false
      }
      this.setPasswordTypeInfo('', 'is-success')
      return true
    },
    checkRoles(): boolean {
      if (!this.formData.isAdmin && !this.formData.isPlayer && !this.formData.isStoryTeller) {
        this.setRolesTypeInfo('Au moins un rôle est obligatoire', 'is-danger')
        return false
      }
      this.setRolesTypeInfo('', 'is-success')
      return true
    },
    setNameTypeInfo(message: string, type: string): void {
      this.nameAttributes.nameMessage = message
      this.nameAttributes.nameType = type
    },
    setEmailTypeInfo(message: string, type: string): void {
      this.emailAttributes.emailMessage = message
      this.emailAttributes.emailType = type
    },
    setPasswordTypeInfo(message: string, type: string): void {
      this.passwordAttributes.passwordMessage = message
      this.passwordAttributes.passwordType = type
    },
    setRolesTypeInfo(message: string, type: string): void {
      this.rolesAttributes.rolesMessage = message
      this.rolesAttributes.rolesType = type
    },
    updateFormProps() {
      this.isAddUser = this.id === ''
      this.formData.id = this.id
      this.formData.name = this.name
      this.formData.email = this.email
      this.formData.password = this.password
      this.formData.isAdmin = this.isAdmin
      this.formData.isPlayer = this.isPlayer
      this.formData.isStoryTeller = this.isStoryTeller
    }
  }
})
</script>

<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <b-icon icon="account" type="is-info" size="is-large"> </b-icon>
        <p class="modal-card-title">{{ title }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <b-field label="ID">
          <b-input
            type="text"
            :value="formData.id"
            placeholder="Id généré automatiquement"
            autocomplete="off"
            disabled
          >
          </b-input>
        </b-field>
        <b-field
          label="Nom"
          :type="nameAttributes.nameType"
          :message="nameAttributes.nameMessage"
          @input="setNameTypeInfo('', '')"
        >
          <b-input
            type="text"
            v-model="formData.name"
            placeholder="Nom d'utilistateur"
            autocomplete="off"
            required
          >
          </b-input>
        </b-field>
        <b-field
          label="Email"
          :type="emailAttributes.emailType"
          :message="emailAttributes.emailMessage"
          @input="setEmailTypeInfo('', '')"
        >
          <b-input
            type="text"
            v-model="formData.email"
            placeholder="email de l'utilisateur"
            autocomplete="off"
            required
          >
          </b-input>
        </b-field>
        <b-field
          v-if="isAddUser"
          label="Mot de passe"
          :type="passwordAttributes.passwordType"
          :message="passwordAttributes.passwordMessage"
          @input="setPasswordTypeInfo('', '')"
        >
          <b-input
            type="text"
            v-model="formData.password"
            placeholder="mot de passe"
            autocomplete="off"
            required
          >
          </b-input>
        </b-field>
        <b-field
          label="Rôles"
          :type="rolesAttributes.rolesType"
          :message="rolesAttributes.rolesMessage"
          @input="setRolesTypeInfo('', '')"
        >
          <b-checkbox v-model="formData.isAdmin">Admin</b-checkbox>
          <b-checkbox v-model="formData.isPlayer">Joueur</b-checkbox>
          <b-checkbox v-model="formData.isStoryTeller">Conteur</b-checkbox>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button label="Fermer" @click="$emit('close')" />
        <b-button v-if="isAddUser" label="Ajouter" type="is-primary" @click="addUser" />
        <b-button v-if="!isAddUser" label="Modifier" type="is-primary" @click="editUser" />
      </footer>
    </div>
  </form>
</template>
