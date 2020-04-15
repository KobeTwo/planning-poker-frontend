<template>
  <div class="home">
    <Nav/>
    <b-jumbotron fluid container-fluid header-level="5" >
      <template v-slot:header>
        <b-icon-tools/> <br>{{gameInstance.title}}
      </template>
      <template v-slot:lead>
        {{gameInstance.description}}
      </template>
      <hr class="my-4">
      <ClipboardGameURL/>
      <hr class="my-4">
      <GameAdminPlayerList/>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import ClipboardGameURL from '@/components/ClipboardGameURL.vue'
import GameAdminPlayerList from '@/components/GameAdminPlayerList.vue'
export default {
  name: 'gameadmin',
  components: {
    Nav,
    ClipboardGameURL,
    GameAdminPlayerList
  },
  created() {
    this.initGameInstance();
    setInterval(function () {       
      this.getAllPlayers();
    }.bind(this), 2000);
  },
  computed: {
    gameInstance () {
      return this.$store.state.currentGameInstance
    }
  }
}
</script>