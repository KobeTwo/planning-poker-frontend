<template>
  <div class="games">
    <h1>Start a new game</h1>
    <b-form @submit="onSubmit" >
      <b-form-group
        id="input-group-title"
        label="Title:"
        label-for="input-title"
        description="Title of the game"
      >
        <b-form-input
          id="input-title"
          v-model="form.title"
          required
          placeholder="Enter title of the game"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-description"
        label="Description:"
        label-for="input-description"
        description="Description of the game"
      >
        <b-form-input
          id="input-description"
          v-model="form.description"
          placeholder="Enter description of the game"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    props: {
      gameId: String
    },
    data() {
      return {
        form: {
          title: '',
          description: '',
        }
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault()

        try {
          const res = await axios.post(
                  this.graphqlURL, {
                    query: `mutation {
                              createGameinstance(
                                input: {
                                  data: {
                                    title: "${this.form.title}"
                                    description: "${this.form.description}"
                                    game: "${this.gameId}"
                                  }
                                }
                              ) {
                                gameinstance {
                                  id
                                  title
                                  description
                                }
                              }
                            }`
                  })
          const gameInstanceId = res.data.data.createGameinstance.gameinstance.id;
          this.$router.push({ name: 'GameAdmin', params: { gameInstanceId: gameInstanceId} }) 

        } catch (e) {
          alert(e);
          console.log('err', e)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>