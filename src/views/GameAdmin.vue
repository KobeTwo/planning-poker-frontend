<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <GameInfo/>
    <ClipboardGameURL/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameInfo from '@/components/GameInfo.vue'
import ClipboardGameURL from '@/components/ClipboardGameURL.vue'
import axios from 'axios';
export default {
  name: 'gameadmin',
  components: {
    GameInfo,
    ClipboardGameURL
  },
  created() {
    this.getGameInstance();
  },
  methods:{
    async getGameInstance () {
      try {
        const res = await axios.post(
                this.graphqlURL, {
                  query: `query {
                            gameinstance(id: "${this.$attrs.gameInstanceId}")
                            {
                              id
                              title
                              description
                            }
                          }`
                })
        this.$store.dispatch('setCurrentGameInstance', res.data.data.gameinstance)
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    }
  }
}
</script>