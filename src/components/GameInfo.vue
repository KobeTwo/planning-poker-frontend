<template>
  <div>
    <h1>Game Admin</h1>
    Title: {{this.gameInstance.title}}
    Description: {{this.gameInstance.description}}
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