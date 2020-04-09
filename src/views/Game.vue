<template>
  <div>
    <b-overlay :show="showEnterNameFormOverlay" rounded="sm">
      <Nav/>
      <b-jumbotron fluid container-fluid header-level="5" :header="this.gameInstance.title" :lead="this.gameInstance.description">
        <hr class="my-4">
        <YourCardChooser/>
        <hr class="my-4">
        <OtherPlayerCards/>
      </b-jumbotron>


      <template v-slot:overlay>
        <div class="text-center">
          <EnterNameForm/>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import EnterNameForm from '@/components/EnterNameForm.vue'
import YourCardChooser from '@/components/YourCardChooser.vue'
import OtherPlayerCards from '@/components/OtherPlayerCards.vue'
import axios from 'axios';
// @ is an alias to /src
export default {
  name: 'game',
  components: {
    Nav,
    EnterNameForm,
    YourCardChooser,
    OtherPlayerCards
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
    this.initGameInstance();
    setInterval(function () {   
      if(this.player){
        this.sendPlayerKeepAlive();
      }    
    }.bind(this), 2000);
    setInterval(function () {       
      this.getAllPlayers();
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
    async getPlayer () {
      try {
        let playerId = this.$cookies.get("player_" + this.$attrs.gameInstanceId);
        let res = await axios.post(
                this.graphqlURL, {
                  query: `query {
                            player(id: "${playerId}")
                            {
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
                                  where: { id: "${this.player.id}" }
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
    },
    async getAllPlayers () {
      try {
        let res = await axios.post(
                  this.graphqlURL, {
                    query: `query {
                              gameinstance( id: "${this.$attrs.gameInstanceId}")
                              {
                                id
                                players ( where: {lastActive_gt:"${new Date(new Date - 20000).toISOString()}"})
                                {
                                  id
                                  name
                                  lastActive
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
        this.$store.dispatch('setAllPlayers', res.data.data.gameinstance.players)
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    }
  }
}
</script>