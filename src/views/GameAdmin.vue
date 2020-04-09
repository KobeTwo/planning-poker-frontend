<template>
  <div class="home">
    <Nav/>
    <b-jumbotron fluid container-fluid  header-level="5" :header="this.gameInstance.title" :lead="this.gameInstance.description">
      <ClipboardGameURL/>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import ClipboardGameURL from '@/components/ClipboardGameURL.vue'
export default {
  name: 'gameadmin',
  components: {
    Nav,
    ClipboardGameURL
  },
  created() {
    this.initGameInstance();
  },
  computed: {
    gameInstance () {
      return this.$store.state.currentGameInstance
    }
  }
}
</script>