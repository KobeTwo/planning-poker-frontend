<template>
  <div class="home">
    <Nav/>
    <GameList/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import GameList from '@/components/GameList.vue'
export default {
  name: 'home',
  components: {
    Nav,
    GameList
  },
  created() {
    this.$store.dispatch('setCurrentGameInstance', {})
    this.$store.dispatch('setCurrentGame', {})
  }
}
</script>