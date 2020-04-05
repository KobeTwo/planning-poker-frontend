import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
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
Vue.use(VueClipboard)
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.mixin({
  data: function() {
    return {
      strapiBaseURL: process.env.VUE_APP_STRAPI_BASE_URL,
      graphqlURL: process.env.VUE_APP_STRAPI_BASE_URL + '/graphql'
    };
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
