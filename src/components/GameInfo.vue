<template>
  <div>
    <b-jumbotron :header="this.gameInstance.title" :lead="this.gameInstance.description">
    </b-jumbotron>
  </div>
</template>

<script>
  export default {
    name: 'GameInfo',
    computed: {
      gameInstance () {
        return this.$store.state.currentGameInstance
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>