<template>
  <div class="games">
    <h5>Choose your card</h5>
    <b-card 
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white">
      
      <template v-slot:header>
        <b-avatar size="sm" variant="light"></b-avatar> <span class="mr-auto" v-if="player">{{player.name}}</span>
      </template>
      <b-container fluid  v-if="this.player && !this.player.chosenCard">
        <b-row align-content="center" cols="1" cols-sm="2" cols-md="3" cols-lg="4" cols-xl="5">
          <b-col class="mt-3" v-for="card in possibleCards" :key="card.name">
            <b-card 
              :title=card.value.toString()
              :sub-title=card.name 
              img-top
              :img-alt=card.name
              class="text-center"
              style="max-width: 10rem; width: 10rem;"
              @click="chooseCard(card)"
            >
              <b-card-text>{{ card.shortDescription }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid v-if="this.player && this.player.chosenCard">
        <b-row align-content="center">
          <b-col class="mt-3">
            <div @click="resetCard()" style="max-width: 10rem; width: 10rem;" @mouseenter="showCardResetOverlay = true" @mouseleave="showCardResetOverlay = false">
              <b-overlay :show="showCardResetOverlay" >
                <b-card 
                  bg-variant="primary" text-variant="white"
                  sub-title-text-variant="white"
                  :title=this.player.chosenCard.value.toString()
                  :sub-title=this.player.chosenCard.name 
                  img-top
                  :img-alt=this.player.chosenCard.name
                  class="text-center"
                  style="max-width: 10rem; width: 10rem;"
                >
                  <b-card-text>{{ this.player.chosenCard.shortDescription }}</b-card-text>
                </b-card> 
                <template v-slot:overlay>
                  <div class="text-center">
                    <b-icon-pencil-square  style="width: 2rem; height: 2rem;"/>
                    <br/>
                    Click to edit
                  </div>
                </template>
              </b-overlay >
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data: function () {
      return {
        showCardResetOverlay: false
      }
    },
    computed: {
      gameInstance () {
        return this.$store.getters.currentGameInstance
      },
      possibleCards() {
        return this.$store.getters.possibleCards
      },
      player () {
        return this.$store.getters.currentPlayer
      }
    },
    methods:{
      async chooseCard(chosenCard) {
        this.showCardResetOverlay = false
        this.player.chosenCard = chosenCard;
        try {
          await axios.post(
                  this.graphqlURL, {
                    query: `mutation {
                              updatePlayer(
                                input: {
                                  where: { id: "${this.player.id}" }
                                  data: {
                                    chosenCard: "${this.player.chosenCard.id}"
                                  }
                                }
                              ) {
                                player {
                                  id
                                  name
                                }
                              }
                            }`
                    })
        } catch (e) {
          alert(e);
          console.log('err', e)
        }
      },
      async resetCard() {
        try {
          await axios.post(
                  this.graphqlURL, {
                    query: `mutation {
                              updatePlayer(
                                input: {
                                  where: { id: "${this.player.id}" }
                                  data: {
                                    chosenCard: null
                                  }
                                }
                              ) {
                                player {
                                  id
                                  name
                                }
                              }
                            }`
                    })
          this.player.chosenCard = null;
        } catch (e) {
          alert(e);
          console.log('err', e)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>