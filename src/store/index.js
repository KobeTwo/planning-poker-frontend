import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentGameInstance: {}
  },
  mutations: {
    setCurrentGameInstance(state, currentGameInstance){
      state.currentGameInstance = currentGameInstance;
    }
  },
  actions: {
    setCurrentGameInstance(context, gameInstance){
      context.commit('setCurrentGameInstance', gameInstance)
    }
  },
  modules: {
  },
  getters: {
    currentGameInstance: state => {
      return state.currentGameInstance;
    },
    possibleCards: state => {
      if(state.currentGameInstance.game?.cards){
        return state.currentGameInstance?.game?.cards;
      }else{
        return [];
      }
    }
  }
})
