<template>
  <div class="games">
    <h5>Other players</h5>
    <b-container fluid>
        <b-row align-content="center" cols="1" cols-sm="2" cols-md="3" cols-lg="4" cols-xl="5">
          <b-col class="mt-3" v-for="player in otherPlayers" :key="player.name">
            <b-card
            :border-variant="consent ? 'success' : explainPlayers.includes(player) ? 'danger' : 'primary'">
              <template v-slot:header>
                <b-avatar size="sm" variant="secondary"></b-avatar> 
                <span class="mr-auto" v-if="player">
                  {{player.name}}
                </span>
                <b-icon-chat-dots-fill v-if="explainPlayers.includes(player)" variant="danger"/>
              </template>
              <b-card v-if="allPlayersVoted"
                :title=player.chosenCard.value.toString()
                class="text-center m-auto"
                style="max-width: 10rem; width: 10rem;"
              >
                <b-card-text >{{ player.chosenCard.shortDescription }}</b-card-text>
              </b-card>
              <b-card  v-else
                class="text-center m-auto"
                style="max-width: 10rem; width: 10rem;"
              >
                <b-card-title class="text-center">
                  <b-spinner label="thinking"></b-spinner> 
                </b-card-title>
              </b-card>
            </b-card>
          </b-col>
        </b-row>
    </b-container>
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
      },
      otherPlayersVoted() {
        return this.$store.getters.otherPlayersVoted
      },
      allPlayersVoted() {
        return this.$store.getters.allPlayersVoted
      },
      explainPlayers() {
        return this.$store.getters.explainPlayers
      },
      consent() {
        return this.$store.getters.consent
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>