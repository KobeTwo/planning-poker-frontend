<template>
  <div class="games">
    <h5>Other players</h5>
    <b-card-group  deck>
      <b-card v-for="player in otherPlayers" :key="player.name"
        style="max-width: 16rem; width: 16rem;"
      >
        <template v-slot:header>
          <b-avatar size="sm" variant="secondary"></b-avatar> <span class="mr-auto" v-if="player">{{player.name}}</span>
        </template>
        <b-card-title class="text-center">
          <b-spinner label="thinking"></b-spinner> 
        </b-card-title>
         
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  export default {
    computed: {
      gameInstance () {
        return this.$store.getters.currentGameInstance
      },
      possibleCards() {
        return this.$store.getters.possibleCards
      },
      player () {
        return this.$store.getters.currentPlayer
      },
      otherPlayers () {
        return this.$store.getters.otherPlayers
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>