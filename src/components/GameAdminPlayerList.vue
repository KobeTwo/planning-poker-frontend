<template>
  <div class="games">

    <b-row class="pb-3">
      <b-col cols="auto" class="mr-auto"><h5 class="mr-auto"><b-icon-people/> Players</h5></b-col>
      <b-col cols="auto" class=""><b-button class="ml-auto" variant="warning" @click="resetAllCards"><b-icon-skip-start-fill></b-icon-skip-start-fill> Reset Cards</b-button></b-col>
    </b-row>
    <b-container fluid>
      <b-table striped :items="this.allPlayers" :fields="this.fields">
        <template v-slot:cell(card)="data">
          <span v-if="allPlayersVoted && data && data.item && data.item.chosenCard">
            {{ data.item.chosenCard.value}} - {{ data.item.chosenCard.name}}
          </span>
           <b-icon-check v-else-if="!allPlayersVoted && data && data.item && data.item.chosenCard"/>
           <b-icon-question v-else />
        </template>
      
        <template v-slot:cell(action)="row">
          <b-button size="sm" variant="danger" @click="deletePlayer(row.item)"><b-icon-trash></b-icon-trash></b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        fields: [
          {
            key: 'id',
            sortable: true
          },
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'card',
            sortable: false
          },
          {
            key: 'action',
            sortable: false
          }
        ]
      }
    },
    computed: {
      gameInstance () {
        return this.$store.getters.currentGameInstance
      },
      allPlayers () {
        return this.$store.getters.allPlayers
      },
      allPlayersVoted() {
        return this.$store.getters.allPlayersVoted
      }
    },methods: {
      async deletePlayer(item) {
        try {
          const res = await axios.post(
                this.graphqlURL, {
                  query: `mutation {
                            deletePlayer(
                              input: {
                                where: { id: "${item.id}" }
                              }
                            ) {
                              player {
                                id
                                name
                              }
                            }
                          }`
                  })
          const playername = res.data.data.deletePlayer.player.name;
          
          let newAllPlayers = this.allPlayers.filter(player => player.id !== item.id)
          this.$store.dispatch('setAllPlayers', newAllPlayers)

          this.$bvToast.toast("Player " + playername + " was deleted", {
            autoHideDelay: 3000,
            variant: "info",
            noCloseButton: true
          })
        } catch (e) {
          alert(e);
          console.log('err', e)
        }
      },
      async resetAllCards() {
        try {
          this.allPlayers.forEach(async player => {
            await axios.post(
                  this.graphqlURL, {
                    query: `mutation {
                              updatePlayer(
                                input: {
                                  where: { id: "${player.id}" }
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
          });
          this.$bvToast.toast(`All cards were resetted`, {
            autoHideDelay: 3000,
            variant: "info",
            noCloseButton: true
          })
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