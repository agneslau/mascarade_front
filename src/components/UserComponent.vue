<template>
  <div class="user_container" :id="user.email">
      <div class="user_container__name">
        {{user.name}}
      </div>
      <div class="user_container__email">
        {{user.email}}
      </div>
    <div>
      <button>edit</button>
      <button>delete</button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'UserComponent',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.user_container {
  margin-top: 10px;
  background-color: red;
  height: 40px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &__name {
    background-color:blue;
    margin-left: 10px;
    width:30%
  }
  &__email {
    background-color:green;
    margin-left: 10px;
    width:50%
  }
}

</style>