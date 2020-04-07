<template>
  <div class="startgame">
    <Nav/>
    <StartGameForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import StartGameForm from '@/components/StartGameForm.vue'
export default {
  name: 'startgame',
  components: {
    Nav,
    StartGameForm
  },
  computed: {
    game () {
      return this.$store.getters.currentGame
    }
  },
  created() {
    this.initGame();
  }
}
</script>