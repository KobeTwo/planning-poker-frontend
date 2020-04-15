<template>
  <div>
    <b-overlay no-center :show="showEnterNameFormOverlay" rounded="sm">
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
    },
    allPlayers() {
      return this.$store.getters.appPlayers
    }
  },
  created() {
    this.initGameInstance();
    setInterval(function () {       
      this.getAllPlayers();
    }.bind(this), 2000);
  },
  watch: {
    gameInstance () {
      this.getPlayer();
      this.evaluateEnterNameFormOverlay();
    },
    player(val) {
      if(!val.id){
        this.$cookies.remove("player_" + this.$attrs.gameInstanceId)
      }
      this.evaluateEnterNameFormOverlay();
    },
    allPlayers(newAllPlayers, oldAllPlayers) {
      let joined = newAllPlayers.filter(x => !oldAllPlayers.includes(x));
       alert(joined);
      joined.forEach(function (player) {
        alert(player.id);
      })
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
        if(this.$cookies.get("player_" + this.gameInstance.id)){
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
          let currentPlayer = res.data.data.player;
          if(currentPlayer){
            this.$store.dispatch('setCurrentPlayer', res.data.data.player)
          }
        }
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    }
  }
}
</script>