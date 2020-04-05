<template>
  <div class="games">
    <h1>Choose your card</h1>
    <b-avatar variant="primary"/> <span class="mr-auto">{{this.player.name}}</span>
    <b-card-group deck>
      <b-card v-for="card in possibleCards" :key="card.name"
        :title=card.value.toString()
        :sub-title=card.name 
        img-top
        :img-alt=card.name
        style="max-width: 20rem;"
      >
        <b-card-text>{{ card.shortDescription }}</b-card-text>
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>