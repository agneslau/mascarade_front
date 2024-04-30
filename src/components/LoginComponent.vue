<template>
  <b-modal
    v-model="isComponentModalActive"
    has-modal-card
    :destroy-on-hide="false"
    @close="closeLoginModale"
  >
    <template #default="props">
      <div v-bind="formProps" @close="props.close">
        <form action="">
          <div class="modal-card" @close="props.close">
            <header class="modal-card-head">
              <b-icon icon="account" type="is-info" size="is-large"> </b-icon>
              <p class="modal-card-title">Connection</p>
              <button type="button" class="delete" @click="$emit('close')" />
            </header>
            <section class="modal-card-body">
              <b-field label="Email">
                <b-input
                  type="text"
                  v-model="formProps.email"
                  placeholder="Your email"
                  autocomplete="off"
                  required
                >
                </b-input>
              </b-field>
            </section>
            <section class="modal-card-body">
              <b-field label="Password">
                <b-input
                  type="password"
                  v-model="formProps.password"
                  password-reveal
                  placeholder="Your password"
                  autocomplete="off"
                  required
                >
                </b-input>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <b-button label="Close" @click="$emit('close')" />
              <b-button label="Login" type="is-primary" @click="handleLogin" />
            </footer>
          </div>
        </form>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'LoginComponent',
  data() {
    return {
      isComponentModalActive: true,
      formProps: {
        email: 'adresse@email.com',
        password: 'tonMotDePasse'
      },
      loading: false,
      message: ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile')
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      const user = {
        email: this.formProps.email,
        password: this.formProps.password
      }

      this.$store.dispatch('auth/login', user).then(
        () => {
          this.$router.push('/profile')
        },
        (error) => {
          this.loading = false
          this.message = error.response?.data?.message || error.message || error.toString()
        }
      )
    },
    closeLoginModale() {
      this.$router.push('/')
    }
  }
}
</script>
