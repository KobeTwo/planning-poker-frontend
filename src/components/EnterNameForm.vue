<template>
  <div class="games">
    <b-container>
      <b-row>
        <b-col>
          <h1 class="m-5">Enter your name to play</h1>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col col>
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-name"
            >
            <b-input-group >
              <template v-slot:prepend><b-input-group-text><b-icon-person/></b-input-group-text></template>
              <b-form-input
                id="input-name"
                v-model="form.name"
                required
                placeholder="Enter your name"
              ></b-form-input>
              <template v-slot:append>
                <b-button type="submit" variant="primary">Submit</b-button>
              </template>
            </b-input-group>
            </b-form-group>
            
          </b-form>
        </b-col>
      </b-row>
    </b-container>
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
                                    gameinstance: "${this.gameInstance.id}"
                                  }
                                }
                              ) {
                                player {
                                  id
                                  name
                                  chosenCard {
                                    id
                                    name
                                    value
                                    shortDescription
                                    longDescription
                                    icon {
                                      url
                                    }
                                  }
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