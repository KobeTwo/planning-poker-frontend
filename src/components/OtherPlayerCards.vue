<template>
  <div class="games">
    <h1>Other player cards</h1>
    <b-card-group deck>
      <b-card v-for="player in otherPlayers" :key="player.name"
        :header=player.name
        title="???"
        sub-title="???"
        style="max-width: 20rem;"
      >
        <b-card-text>???</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  export default {
    computed: {
      gameInstance () {
        return this.$store.state.currentGameInstance
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