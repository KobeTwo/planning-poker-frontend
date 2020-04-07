<template>
  <b-navbar class="nav" toggleable="sm" type="light" variant="light">
    <router-link to="/"><b-navbar-brand>Poker Games</b-navbar-brand></router-link> <span v-if="game.id"><b-icon-chevron-right/> {{this.game.name}}</span>
  </b-navbar>
</template>

<script>
  export default {
    computed: {
    game () {
      return this.$store.getters.currentGame
    }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>