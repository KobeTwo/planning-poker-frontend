<template>
  <div>
    <b-overlay :show="showEnterNameFormOverlay" rounded="sm">
      <GameInfo/>
      <YourCardChooser/>


      <template v-slot:overlay>
        <div class="text-center">
          <EnterNameForm/>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import GameInfo from '@/components/GameInfo.vue'
import EnterNameForm from '@/components/EnterNameForm.vue'
import YourCardChooser from '@/components/YourCardChooser.vue'
import axios from 'axios';
// @ is an alias to /src
export default {
  name: 'game',
  components: {
    EnterNameForm,
    GameInfo,
    YourCardChooser
  },
  data: function () {
    return {
      showEnterNameFormOverlay: false
    }
  },
  computed: {
    gameInstance () {
      return this.$store.getters.currentGameInstance
    },
    player () {
      return this.$store.getters.currentPlayer
    }
  },
  created() {
    this.getGameInstance();
    setInterval(function () {       
      this.sendPlayerKeepAlive();
    }.bind(this), 2000);
  },
  watch: {
    gameInstance () {
      this.evaluateEnterNameFormOverlay();
      this.getPlayer();
    },
    player() {
      this.evaluateEnterNameFormOverlay();
    }

  },
  methods:{
    evaluateEnterNameFormOverlay () {
      if(this.$cookies.get("player_" + this.gameInstance.id)){
        this.showEnterNameFormOverlay = false
      }else{
        this.showEnterNameFormOverlay = true
      }
    },
    async getGameInstance () {
      try {
        const res = await axios.post(
                this.graphqlURL, {
                  query: `query {
                            gameinstance(id: "${this.$attrs.gameInstanceId}")
                            {
                              id
                              title
                              description
                              game{
                                id
                                cards(sort: "value:asc"){
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
        this.$store.dispatch('setCurrentGameInstance', res.data.data.gameinstance)
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    },
    async getPlayer () {
      try {
        let playerId = this.$cookies.get("player_" + this.gameInstance.id);
        let res = await axios.post(
                this.graphqlURL, {
                  query: `query {
                            player(id: "${playerId}")
                            {
                              name
                              chosenCard {
                                id
                              }
                            }
                          }`
                })
        this.$store.dispatch('setCurrentPlayer', res.data.data.player)
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    },
    async sendPlayerKeepAlive () {
      try {
        await axios.post(
                  this.graphqlURL, {
                    query: `mutation {
                              updatePlayer(
                                input: {
                                  where: { id: "5b28f1747c739e4afb48605c" }
                                  data: {
                                    lastActive: "${new Date().toISOString()}"
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
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    }
  }
}
</script>