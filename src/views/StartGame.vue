<template>
  <div class="startgame">
    <StartGameForm v-bind:gameId="this.$attrs.gameId"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StartGameForm from '@/components/StartGameForm.vue'
export default {
  name: 'startgame',
  components: {
    StartGameForm
  }
}
</script>