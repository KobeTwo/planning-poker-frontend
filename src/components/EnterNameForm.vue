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
  import axios from 'axios';
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
        try {
          const res = await axios.post(
                  this.graphqlURL, {
                    query: `mutation {
                              createPlayer(
                                input: {
                                  data: {
                                    name: "${this.form.name}"
                                    lastActive: "${new Date().toISOString()}"
                                    gameinstance: "${this.gameInstance.id}"
                                  }
                                }
                              ) {
                                player {
                                  id
                                  name
                                }
                              }
                            }`
                  })
          let player = res.data.data.createPlayer.player
          this.$cookies.set("player_" + this.gameInstance.id,player.id, -1); 
          this.$store.dispatch('setCurrentPlayer', player)
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