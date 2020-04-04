<template>
  <div class="games">
    <h1>Games</h1>
    <b-card-group deck>
      <b-card v-for="game in games" :key="game.name"
        :title=game.name 
        img-top
        :img-alt=game.name
        :img-src="strapiBaseURL + game.Icon.url"
        style="max-width: 20rem;"
      >
        <b-card-text>{{ game.shortDescription }}</b-card-text>
        <router-link to="/StartGame"><b-button variant="primary">Start Game</b-button></router-link>
      </b-card>
    </b-card-group>
  </div>
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
        strapiBaseURL: process.env.VUE_APP_STRAPI_BASE_URL,
        graphqlURL: process.env.VUE_APP_STRAPI_BASE_URL + '/graphql',
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>