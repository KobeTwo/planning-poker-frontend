<template>
  <b-container fluid class="games mt-3">
    <b-card-group deck>
      <b-card v-for="game in games" :key="game.name"
        :title=game.name 
        img-top
        :img-alt=game.name
        :img-src="strapiBaseURL + game.Icon.url"
        style="max-width: 20rem;"
      >
        <b-card-text>{{ game.shortDescription }}</b-card-text>
        <router-link :to="{ name: 'StartGame', params: { gameId: game.id }}"><b-button variant="primary">Start Game</b-button></router-link>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'GameList',
    created() {
      this.getGames();
    },
    data: function() {
      return {
        games: Object
      };
    },
    methods:{
      async getGames () {
        try {
          const res = await axios.post(
                  this.graphqlURL, {
                    query: `query {
                              games
                              {
                                id
                                name
                                shortDescription
                                Icon {
                                  url
                                }
                              }
                            }`
                  })
          this.games = res.data.data.games;
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