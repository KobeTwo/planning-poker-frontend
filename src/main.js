import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueClipboard)
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.mixin({
  data: function() {
    return {
      strapiBaseURL: process.env.VUE_APP_STRAPI_BASE_URL,
      graphqlURL: process.env.VUE_APP_STRAPI_BASE_URL + '/graphql'
    };
  },
  methods:{
    async initGameInstance () {
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
                                name
                                shortDescription
                                Icon {
                                  url
                                }
                                cards(sort: "value:asc"){
                                  id
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
        this.$store.dispatch('setCurrentGame', res.data.data.gameinstance.game)
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    },
    async initGame () {
      try {
        const res = await axios.post(
                this.graphqlURL, {
                  query: `query {
                            game (id: "${this.$attrs.gameId}"){
                              id
                              name
                              shortDescription
                              Icon {
                                url
                              }
                              cards(sort: "value:asc"){
                                id
                                name
                                value
                                shortDescription
                                longDescription
                                icon {
                                  url
                                }
                              }
                            }
                          }`
                })
        this.$store.dispatch('setCurrentGame', res.data.data.game)
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    },
    async getAllPlayers () {
      try {
        let res = await axios.post(
                  this.graphqlURL, {
                    query: `query {
                              gameinstance( id: "${this.$attrs.gameInstanceId}")
                              {
                                id
                                players
                                {
                                  id
                                  name
                                  chosenCard {
                                  id
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
        this.$store.dispatch('setAllPlayers', res.data.data.gameinstance.players)
      } catch (e) {
        alert(e);
        console.log('err', e)
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
