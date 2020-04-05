<template>
  <div class="games">
    <h1>Start a new game</h1>
    <b-form @submit="onSubmit" >
      <b-form-group
        id="input-group-name"
        label="Name:"
        label-for="input-name"
        description="Your name"
      >
        <b-form-input
          id="input-name"
          v-model="form.name"
          required
          placeholder="Enter your name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: ''
        }
      }
    },
    computed: {
      gameInstance () {
        return this.$store.state.currentGameInstance
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()
        alert(this.form.name);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>