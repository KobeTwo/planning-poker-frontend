import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentGameInstance: {},
    currentPlayer: {}
  },
  mutations: {
    setCurrentGameInstance(state, currentGameInstance){
      state.currentGameInstance = currentGameInstance;
    }, 
    setCurrentPlayer(state, currentPlayer){
      state.currentPlayer = currentPlayer;
    }
  },
  actions: {
    setCurrentGameInstance(context, gameInstance){
      context.commit('setCurrentGameInstance', gameInstance)
    },
    setCurrentPlayer(context, currentPlayer){
      context.commit('setCurrentPlayer', currentPlayer)
    }
  },
  modules: {
  },
  getters: {
    currentGameInstance: state => {
      return state.currentGameInstance;
    },
    currentPlayer: state => {
      return state.currentPlayer;
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
