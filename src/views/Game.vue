<template>
  <div>
    <b-overlay :show="showEnterNameFormOverlay" rounded="sm">
      <GameInfo/>
      <YourCardChooser/>


      <template v-slot:overlay>
        <div class="text-center">
          <EnterNameForm/>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import GameInfo from '@/components/GameInfo.vue'
import EnterNameForm from '@/components/EnterNameForm.vue'
import YourCardChooser from '@/components/YourCardChooser.vue'
import axios from 'axios';
// @ is an alias to /src
export default {
  name: 'game',
  components: {
    EnterNameForm,
    GameInfo,
    YourCardChooser
  },
  data: function() {
    return {
      showEnterNameFormOverlay: true
    };
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
                              game{
                                id
                                cards(sort: "value:asc"){
                                  name
                                  value
                                  shortDescription
                                  longDescription
                                  icon {
                                    url
                                  }
                                }
                              }
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