<template>
  <div class="games">
    <h1>Games</h1>
  
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Game',
    created() {
      this.getGames();
    },
    data: function() {
      return {
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